import {
  createEmptyPlan,
  Plan,
  PlanRepo,
  validatePlan,
} from '@/src/core/entities/plan'

export class PlanUseCases {
  planRepo: PlanRepo

  constructor(planRepo: PlanRepo) {
    this.planRepo = planRepo
    this.getAllPlansByUserId = planRepo.getAllPlansByUserId
    this.getPlanById = planRepo.getPlanById
    this.deletePlan = planRepo.deletePlan
  }

  public createOrUpdatePlan(userId: string, plan?: Plan) {
    if (!plan?.id) {
      plan = createEmptyPlan()
    }

    const validatedPlan = validatePlan(plan)

    if (!validatedPlan.ok) {
      return validatedPlan
    }

    return this.planRepo.createOrUpdatePlan(userId, validatedPlan.value)
  }

  public getAllPlansByUserId
  public getPlanById
  public deletePlan
}
