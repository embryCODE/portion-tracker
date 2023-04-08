import { Day, DayRepo } from '@/src/core/entities/day'
import { testPlan } from '@/src/core/infra/repositories/TestPlanRepo'

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
const days: Day[] = [testDay]

export class TestDayRepo implements DayRepo {
  public getDayByDate = (id: string) => {
    return Promise.resolve({
      ok: true as const,
      value: days.find((day) => day.id === id) ?? null,
    })
  }

  public createOrUpdateDay = (userId: string, day: Day) => {
    const foundDay = days.find((day) => day.id === day.id)

    if (foundDay) {
      const index = days.indexOf(foundDay)
      days[index] = day
      return Promise.resolve({ ok: true as const, value: day })
    } else {
      days.push(day)
      return Promise.resolve({ ok: true as const, value: day })
    }
  }

  public deleteDay = (id: string) => {
    const foundDay = days.find((day) => day.id === id)

    if (foundDay) {
      const index = days.indexOf(foundDay)
      days.splice(index, 1)
      return Promise.resolve({ ok: true as const, value: true as never })
    } else {
      return Promise.resolve({
        ok: false as const,
        error: new Error('Day not found'),
      })
    }
  }
}
