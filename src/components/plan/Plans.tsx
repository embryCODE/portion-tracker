import { v4 as uuidv4 } from 'uuid'

import PlanForm from '@/src/components/plan/PlanForm'
import { Plan } from '@/src/core/entities/plan'
import usePlans from '@/src/hooks/usePlans'

export default function Plans() {
  const { plans, createOrUpdatePlan, isLoading, deletePlan } = usePlans()

  const handleNew = () => {
    void createOrUpdatePlan({
      id: uuidv4(),
      name: '',
      description: '',
      protein: 0,
      vegetables: 0,
      carbs: 0,
      fat: 0,
      meals: 0,
    })
  }

  const handleSubmit = async (plan: Plan) => {
    void createOrUpdatePlan(plan)
  }

  const handleDelete = async (plan: Plan) => {
    void deletePlan(plan)
  }

  return (
    <div>
      <button
        className={
          'tw-rounded tw-bg-protein tw-text-white tw-px-2 tw-py-0.5 tw-mt-1 tw-mb-2'
        }
        type="button"
        onClick={handleNew}
      >
        New
      </button>

      {plans.map((plan) => (
        <div key={plan.id} className={'tw-mb-4'}>
          <PlanForm
            plan={plan}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  )
}
