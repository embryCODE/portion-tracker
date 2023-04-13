import { Plan, PlanRepo } from '@/src/core/entities/plan'
import { Result } from '@/src/core/shared/result'

export const testPlan: Plan = {
  id: '123',
  name: 'Test Plan',
  description: 'Test Plan description',
  protein: 1,
  vegetables: 1,
  carbs: 1,
  fat: 1,
  meals: 1,
}

// In-memory database for testing
const plans: Plan[] = []

export class TestPlanRepo implements PlanRepo {
  public getAllPlansByUserId = (userId: string) => {
    if (userId === '123') {
      return Promise.resolve(Result.ok(plans))
    } else {
      return Promise.resolve(Result.ok([]))
    }
  }

  public getPlanById = (id: string) => {
    return Promise.resolve(
      Result.ok(plans.find((plan) => plan.id === id) ?? null)
    )
  }

  public createOrUpdatePlan = (userId: string, plan: Plan) => {
    const foundPlan = plans.find((plan) => plan.id === plan.id)

    if (foundPlan) {
      const index = plans.indexOf(foundPlan)
      plans[index] = plan
      return Promise.resolve(Result.ok(plan))
    } else {
      plans.push(plan)
      return Promise.resolve(Result.ok(plan))
    }
  }

  public deletePlan = (id: string) => {
    const foundPlan = plans.find((plan) => plan.id === id)

    if (foundPlan) {
      const index = plans.indexOf(foundPlan)
      plans.splice(index, 1)
      return Promise.resolve(Result.ok())
    } else {
      return Promise.resolve(Result.fail(new Error('Plan not found')))
    }
  }
}
