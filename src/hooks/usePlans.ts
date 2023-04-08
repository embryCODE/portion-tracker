import { useCallback, useEffect, useState } from 'react'

import { Plan } from '@/src/core/entities/plan'
import { request } from '@/src/core/infra/net'

export default function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getPlans = useCallback(async () => {
    setIsLoading(true)

    const plans = await request<Plan[]>('/api/plans')

    setPlans(plans)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    void getPlans()
  }, [getPlans])

  const createOrUpdatePlan = useCallback(
    async (plan: Plan) => {
      setIsLoading(true)

      await request<Plan>('/api/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plan),
      })

      void getPlans()
    },
    [getPlans]
  )

  const deletePlan = useCallback(
    async (plan: Plan) => {
      setIsLoading(true)

      await request('/api/plans', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plan),
      })

      void getPlans()
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
