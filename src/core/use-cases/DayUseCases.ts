import {
  createEmptyDay,
  Day,
  DayRepo,
  validateDay,
} from '@/src/core/entities/day'
import { PlanRepo } from '@/src/core/entities/plan'

export class DayUseCases {
  dayRepo: DayRepo
  planRepo: PlanRepo

  constructor(dayRepo: DayRepo, planRepo: PlanRepo) {
    this.dayRepo = dayRepo
    this.planRepo = planRepo
    this.deleteDay = dayRepo.deleteDay
  }

  public async getDayByDate(userId: string, iso: unknown) {
    if (typeof iso !== 'string') {
      return { ok: false as const, error: new Error('Invalid date') }
    }

    const date = new Date(iso)

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

      if (!plans.value.length) {
        return {
          ok: false as const,
          error: new Error('Cannot create a new day without at least one plan'),
        }
      }

      day = await this.createOrUpdateDay(
        userId,
        createEmptyDay(date, plans.value[0])
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
