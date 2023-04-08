import { Plan, PlanRepo } from '@/src/core/entities/plan'

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
const plans: Plan[] = [testPlan]

export class TestPlanRepo implements PlanRepo {
  public getAllPlansByUserId = (userId: string) => {
    if (userId === '123') {
      return Promise.resolve({ ok: true as const, value: plans })
    } else {
      return Promise.resolve({ ok: true as const, value: [] })
    }
  }

  public getPlanById = (id: string) => {
    return Promise.resolve({
      ok: true as const,
      value: plans.find((plan) => plan.id === id) ?? null,
    })
  }

  public createOrUpdatePlan = (userId: string, plan: Plan) => {
    const foundPlan = plans.find((plan) => plan.id === plan.id)

    if (foundPlan) {
      const index = plans.indexOf(foundPlan)
      plans[index] = plan
      return Promise.resolve({ ok: true as const, value: plan })
    } else {
      plans.push(plan)
      return Promise.resolve({ ok: true as const, value: plan })
    }
  }

  public deletePlan = (id: string) => {
    const foundPlan = plans.find((plan) => plan.id === id)

    if (foundPlan) {
      const index = plans.indexOf(foundPlan)
      plans.splice(index, 1)
      return Promise.resolve({ ok: true as const, value: true as never })
    } else {
      return Promise.resolve({
        ok: false as const,
        error: new Error('Plan not found'),
      })
    }
  }
}
