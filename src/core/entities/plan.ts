import { Result } from '@/src/core/shared/typeUtils'

export interface Plan {
  id: string
  name: string | null
  description: string | null
  protein: number
  vegetables: number
  carbs: number
  fat: number
  meals: number
}

export interface PlanRepo {
  getAllPlansByUserId(userId: string): Promise<Result<Plan[]>>
  getPlanById(id: string): Promise<Result<Plan | null>>
  createOrUpdatePlan(userId: string, plan: Plan): Promise<Result<Plan | null>>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validatePlan(plan: any): Result<Plan> {
  if (
    typeof plan !== 'object' ||
    plan === null ||
    !plan.id ||
    !plan.name ||
    !plan.description ||
    typeof plan.protein !== 'number' ||
    typeof plan.vegetables !== 'number' ||
    typeof plan.carbs !== 'number' ||
    typeof plan.fat !== 'number' ||
    typeof plan.meals !== 'number'
  ) {
    return { ok: false, error: new Error('Invalid plan') }
  }

  return { ok: true, value: plan as Plan }
}
