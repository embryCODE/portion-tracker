import { useCallback, useEffect, useState } from 'react'

import { Plan } from '@/src/core/entities/plan'
import { request } from '@/src/infra/net'
import { useAuth } from '@/src/providers/AuthProvider'
import { useUiState } from '@/src/providers/UiStateProvider'

export default function usePlans() {
  const { updateFromServer } = useAuth()
  const [plans, setPlans] = useState<Plan[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { setShouldShowLoadingIndicator } = useUiState()

  useEffect(() => {
    setShouldShowLoadingIndicator(isLoading)
  }, [isLoading, setShouldShowLoadingIndicator])

  const getPlans = useCallback(async () => {
    setIsLoading(true)

    try {
      const plans = await request<Plan[]>('/api/plans')
      setPlans(plans)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void getPlans()
  }, [getPlans])

  const createOrUpdatePlan = useCallback(
    async (plan?: Plan) => {
      setIsLoading(true)

      try {
        await request<Plan>('/api/plans', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(plan),
        })
      } catch (e) {
        console.error(e)
      } finally {
        await getPlans()
        // Default plan may have changed, so pull the latest user data
        await updateFromServer()
      }
    },
    [getPlans, updateFromServer]
  )

  const deletePlan = useCallback(
    async (plan: Plan) => {
      setIsLoading(true)

      try {
        await request('/api/plans', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(plan),
        })
      } catch (e) {
        console.error(e)
      } finally {
        await getPlans()
        // Default plan may have changed, so pull the latest user data
        await updateFromServer()
      }
    },
    [getPlans, updateFromServer]
  )

  return {
    plans,
    createOrUpdatePlan,
    isLoading,
    deletePlan,
  }
}
