import { useCallback, useEffect, useState } from 'react'

import { Plan } from '@/src/core/entities/plan'
import { request } from '@/src/infra/net'

export default function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [isLoading, setIsLoading] = useState(false)

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
        void getPlans()
      }
    },
    [getPlans]
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
        void getPlans()
      }
    },
    [getPlans]
  )

  return {
    plans,
    createOrUpdatePlan,
    isLoading,
    deletePlan,
  }
}
