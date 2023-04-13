import {
  createEmptyPlan,
  Plan,
  PlanRepo,
  validatePlan,
} from '@/src/core/entities/plan'
import { UserRepo } from '@/src/core/entities/user'
import { Result } from '@/src/core/shared/result'

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

  public async deletePlan(userId: string, planId: string) {
    const wasDefaultPlanResult = await this.getWasDefaultPlan(userId, planId)

    if (wasDefaultPlanResult.isFailure) {
      return wasDefaultPlanResult
    }

    const wasDefaultPlan = wasDefaultPlanResult.getValue()

    // Delete the plan
    const deletePlanRes = await this.planRepo.deletePlan(planId)

    if (wasDefaultPlan) {
      await this.setNewDefaultPlan(userId)
    }

    return deletePlanRes
  }

  public getAllPlansByUserId
  public getPlanById

  private getWasDefaultPlan = async (userId: string, planId: string) => {
    const userResult = await this.userRepo.getUserById(userId)

    if (userResult.isFailure) {
      return Result.fail(new Error('User not found'))
    }

    const user = userResult.getValue()

    if (!user) {
      return Result.fail(new Error('User not found'))
    }

    return Result.ok(user.defaultPlanId === planId)
  }

  private setNewDefaultPlan = async (userId: string) => {
    const plans = await this.getAllPlansByUserId(userId)

    if (plans.isFailure) {
      return Result.fail(new Error('Unknown error'))
    }

    const mostRecentPlan = plans.getValue()[0]

    return this.userRepo.updateUser(userId, {
      defaultPlanId: mostRecentPlan?.id ?? null,
    })
  }
}
