import PlanForm from '@/src/components/plan/PlanForm'
import { Plan } from '@/src/core/entities/plan'
import usePlans from '@/src/hooks/usePlans'

export default function Plans() {
  const { plans, isLoading, createOrUpdatePlan } = usePlans()

  const handleSubmit = async (plan: Plan) => {
    void createOrUpdatePlan(plan)
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      {plans.map((plan) => (
        <PlanForm key={plan.id} plan={plan} onSubmit={handleSubmit} />
      ))}
    </div>
  )
}
