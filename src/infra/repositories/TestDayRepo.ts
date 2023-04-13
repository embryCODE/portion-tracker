import { Day, DayRepo } from '@/src/core/entities/day'
import { Result } from '@/src/core/shared/result'
import { testPlan } from '@/src/infra/repositories/TestPlanRepo'

export const testDay: Day = {
  id: '123',
  notes: 'Test notes',
  protein: 1,
  vegetables: 1,
  carbs: 1,
  fat: 1,
  date: new Date(),
  plan: testPlan,
}

export class TestDayRepo implements DayRepo {
  days: Day[] = []

  public getDayByDate = (id: string, date: Date) => {
    const startOfDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )

    return Promise.resolve(
      Result.ok(
        this.days.find((day) => day.date.getDate() === startOfDate.getDate()) ??
          null
      )
    )
  }

  public createOrUpdateDay = (userId: string, day: Day) => {
    const foundDay = this.days.find((day) => day.id === day.id)

    if (foundDay) {
      const index = this.days.indexOf(foundDay)
      this.days[index] = day
      return Promise.resolve(Result.ok(day))
    } else {
      this.days.push(day)
      return Promise.resolve(Result.ok(day))
    }
  }

  public deleteDay = (id: string) => {
    const foundDay = this.days.find((day) => day.id === id)

    if (foundDay) {
      const index = this.days.indexOf(foundDay)
      this.days.splice(index, 1)
      return Promise.resolve(Result.ok())
    } else {
      return Promise.resolve(Result.fail(new Error('Day not found')))
    }
  }
}
