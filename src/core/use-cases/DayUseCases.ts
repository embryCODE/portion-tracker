import {
  createEmptyDay,
  Day,
  DayRepo,
  validateDay,
} from '@/src/core/entities/day'
import { PlanRepo } from '@/src/core/entities/plan'
import { UserRepo } from '@/src/core/entities/user'

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
      return { ok: false as const, error: new Error('Invalid date') }
    }

    const date = new Date(iso)

    const userResult = await this.userRepo.getUserById(userId)

    if (!userResult.ok) {
      return {
        ok: false as const,
        error: new Error('Unknown error'),
      }
    }

    const user = userResult.value

    if (!user) {
      return {
        ok: false as const,
        error: new Error('User not found'),
      }
    }

    let day = await this.dayRepo.getDayByDate(userId, date)

    if (!day.ok) {
      return {
        ok: false as const,
        error: new Error('Unknown error'),
      }
    }

    if (!day.value) {
      const plans = await this.planRepo.getAllPlansByUserId(userId)

      if (!plans.ok) {
        return {
          ok: false as const,
          error: new Error('Unknown error'),
        }
      }

      const defaultPlan = plans.value.find(
        (plan) => user.defaultPlanId === plan.id
      )

      if (!defaultPlan) {
        return {
          ok: false as const,
          error: new Error('Cannot create a new day without a default plan'),
        }
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

    if (!validatedDay.ok) {
      return validatedDay
    }

    return this.dayRepo.createOrUpdateDay(userId, validatedDay.value)
  }

  public deleteDay
}
