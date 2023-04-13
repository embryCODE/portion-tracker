import {
  createEmptyDay,
  Day,
  DayRepo,
  validateDay,
} from '@/src/core/entities/day'
import { PlanRepo } from '@/src/core/entities/plan'
import { UserRepo } from '@/src/core/entities/user'
import { Result } from '@/src/core/shared/result'

export class DayUseCases {
  userRepo: UserRepo
  dayRepo: DayRepo
  planRepo: PlanRepo

  constructor({
    userRepo,
    dayRepo,
    planRepo,
  }: {
    userRepo: UserRepo
    dayRepo: DayRepo
    planRepo: PlanRepo
  }) {
    this.userRepo = userRepo
    this.dayRepo = dayRepo
    this.planRepo = planRepo
    this.deleteDay = dayRepo.deleteDay
  }

  public async getDayByDate(userId: string, iso: unknown) {
    if (typeof iso !== 'string') {
      return Result.fail(new Error('Invalid date'))
    }

    const date = new Date(iso)

    const userResult = await this.userRepo.getUserById(userId)

    if (userResult.isFailure) {
      return Result.fail(new Error('Unknown error'))
    }

    const user = userResult.getValue()

    if (!user) {
      return Result.fail(new Error('User not found'))
    }

    let day = await this.dayRepo.getDayByDate(userId, date)

    if (day.isFailure) {
      return Result.fail(new Error('Unknown error'))
    }

    if (!day.getValue()) {
      const plans = await this.planRepo.getAllPlansByUserId(userId)

      if (plans.isFailure) {
        return Result.fail(new Error('Unknown error'))
      }

      const defaultPlan = plans
        .getValue()
        .find((plan) => user.defaultPlanId === plan.id)

      if (!defaultPlan) {
        return Result.fail(
          new Error('Cannot create a new day without a default plan')
        )
      }

      day = await this.createOrUpdateDay(
        userId,
        createEmptyDay(date, defaultPlan)
      )
    }

    return day
  }

  public createOrUpdateDay(userId: string, day: Day) {
    const validatedDay = validateDay(day)

    if (validatedDay.isFailure) {
      return validatedDay
    }

    return this.dayRepo.createOrUpdateDay(userId, validatedDay.getValue())
  }

  public deleteDay
}
