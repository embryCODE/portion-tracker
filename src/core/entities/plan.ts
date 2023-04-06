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
  getAllPlansByUserId(userId: string): Promise<Plan[]>
  getPlanById(id: string): Promise<Plan | null>
  createOrUpdatePlan(userId: string, plan: Plan): Promise<Plan | null>
}
