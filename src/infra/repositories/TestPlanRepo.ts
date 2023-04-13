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

export class TestPlanRepo implements PlanRepo {
  plans: Plan[] = []

  public getAllPlansByUserId = (userId: string) => {
    if (userId === '123') {
      return Promise.resolve(Result.ok(this.plans))
    } else {
      return Promise.resolve(Result.ok([]))
    }
  }

  public getPlanById = (id: string) => {
    return Promise.resolve(
      Result.ok(this.plans.find((plan) => plan.id === id) ?? null)
    )
  }

  public createOrUpdatePlan = (userId: string, plan: Plan) => {
    const foundPlan = this.plans.find((plan) => plan.id === plan.id)

    if (foundPlan) {
      const index = this.plans.indexOf(foundPlan)
      this.plans[index] = plan
      return Promise.resolve(Result.ok(plan))
    } else {
      this.plans.push(plan)
      return Promise.resolve(Result.ok(plan))
    }
  }

  public deletePlan = (id: string) => {
    const foundPlan = this.plans.find((plan) => plan.id === id)

    if (foundPlan) {
      const index = this.plans.indexOf(foundPlan)
      this.plans.splice(index, 1)
      return Promise.resolve(Result.ok())
    } else {
      return Promise.resolve(Result.fail(new Error('Plan not found')))
    }
  }
}
