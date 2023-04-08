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
