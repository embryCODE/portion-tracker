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
    const wasNewPlan = !plan

    if (!plan) {
      plan = createEmptyPlan()
    }

    const validatedPlan = validatePlan(plan)

    if (validatedPlan.isFailure) {
      return validatedPlan
    }

    const newPlan = this.planRepo.createOrUpdatePlan(
      userId,
      validatedPlan.getValue()
    )

    if (wasNewPlan) {
      await this.userRepo.updateUser(userId, {
        defaultPlanId: validatedPlan.getValue().id,
      })
    }

    return newPlan
  }

  public getAllPlansByUserId
  public getPlanById
  public deletePlan
}
