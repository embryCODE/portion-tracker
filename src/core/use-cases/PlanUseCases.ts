import {
  createEmptyPlan,
  Plan,
  PlanRepo,
  validatePlan,
} from '@/src/core/entities/plan'
import { UserRepo } from '@/src/core/entities/user'

export class PlanUseCases {
  planRepo: PlanRepo
  userRepo: UserRepo

  constructor({
    planRepo,
    userRepo,
  }: {
    planRepo: PlanRepo
    userRepo: UserRepo
  }) {
    this.planRepo = planRepo
    this.userRepo = userRepo
    this.getAllPlansByUserId = planRepo.getAllPlansByUserId
    this.getPlanById = planRepo.getPlanById
    this.deletePlan = planRepo.deletePlan
  }

  public async createOrUpdatePlan(userId: string, plan?: Plan) {
    // Checking ID here because an empty object could be sent in
    plan = plan?.id ? plan : undefined

    const wasNewPlan = !plan

    if (!plan) {
      plan = createEmptyPlan()
    }

    const validatedPlan = validatePlan(plan)

    if (validatedPlan.isFailure) {
      return validatedPlan
    }

    const newPlan = await this.planRepo.createOrUpdatePlan(
      userId,
      validatedPlan.getValue()
    )

    if (wasNewPlan) {
      const newPlanId = newPlan.getValue()?.id

      if (newPlanId) {
        await this.userRepo.updateUser(userId, {
          defaultPlanId: newPlanId,
        })
      }
    }

    return newPlan
  }

  public getAllPlansByUserId
  public getPlanById
  public deletePlan
}
