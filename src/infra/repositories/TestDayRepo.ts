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

// In-memory database for testing
const days: Day[] = []

export class TestDayRepo implements DayRepo {
  public getDayByDate = (id: string, date: Date) => {
    const startOfDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )

    return Promise.resolve(
      Result.ok(
        days.find((day) => day.date.getDate() === startOfDate.getDate()) ?? null
      )
    )
  }

  public createOrUpdateDay = (userId: string, day: Day) => {
    const foundDay = days.find((day) => day.id === day.id)

    if (foundDay) {
      const index = days.indexOf(foundDay)
      days[index] = day
      return Promise.resolve(Result.ok(day))
    } else {
      days.push(day)
      return Promise.resolve(Result.ok(day))
    }
  }

  public deleteDay = (id: string) => {
    const foundDay = days.find((day) => day.id === id)

    if (foundDay) {
      const index = days.indexOf(foundDay)
      days.splice(index, 1)
      return Promise.resolve(Result.ok())
    } else {
      return Promise.resolve(Result.fail(new Error('Day not found')))
    }
  }
}
