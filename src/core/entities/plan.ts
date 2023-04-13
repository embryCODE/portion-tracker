import { v4 as uuidv4 } from 'uuid'

import { Result } from '@/src/core/shared/result'

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
  deletePlan(id: string): Promise<Result>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validatePlan(plan: any): Result<Plan> {
  if (
    typeof plan !== 'object' ||
    plan === null ||
    !plan.id ||
    typeof plan.name !== 'string' ||
    typeof plan.description !== 'string' ||
    typeof plan.protein !== 'number' ||
    typeof plan.vegetables !== 'number' ||
    typeof plan.carbs !== 'number' ||
    typeof plan.fat !== 'number' ||
    typeof plan.meals !== 'number'
  ) {
    return Result.fail(new Error('Invalid plan'))
  }

  return Result.ok<Plan>(plan)
}

export function createEmptyPlan() {
  return {
    id: uuidv4(),
    name: '',
    description: '',
    protein: 0,
    vegetables: 0,
    carbs: 0,
    fat: 0,
    meals: 0,
  }
}
