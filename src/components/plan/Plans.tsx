import PlanForm from '@/src/components/plan/PlanForm'
import { Plan } from '@/src/core/entities/plan'
import { useAuth } from '@/src/hooks/AuthProvider'
import usePlans from '@/src/hooks/usePlans'

export default function Plans() {
  const { user, updateUser, isLoading: isUserLoading } = useAuth()
  const {
    plans,
    createOrUpdatePlan,
    isLoading: arePlansLoading,
    deletePlan,
  } = usePlans()

  const isLoading = isUserLoading || arePlansLoading

  const handleNew = () => {
    void createOrUpdatePlan()
  }

  const handleMakeDefault = (plan: Plan) => async () => {
    if (!user) {
      return
    }

    await updateUser({ ...user, defaultPlanId: plan.id })
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
            isDefault={user?.defaultPlanId === plan.id}
            onMakeDefault={handleMakeDefault(plan)}
          />
        </div>
      ))}
    </div>
  )
}
