import { v4 as uuidv4 } from 'uuid'

import { Plan } from '@/src/core/entities/plan'
import { Result } from '@/src/core/shared/typeUtils'

export interface Day {
  id: string
  notes: string | null
  date: Date
  protein: number
  vegetables: number
  carbs: number
  fat: number
  plan: Plan
}

export interface DayRepo {
  getDayByDate(userId: string, date: Date): Promise<Result<Day | null>>
  createOrUpdateDay(userId: string, day: Day): Promise<Result<Day | null>>
  deleteDay(id: string): Promise<Result>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateDay(day: any): Result<Day> {
  if (
    typeof day !== 'object' ||
    day === null ||
    !day.id ||
    typeof day.notes !== 'string' ||
    typeof day.protein !== 'number' ||
    typeof day.vegetables !== 'number' ||
    typeof day.carbs !== 'number' ||
    typeof day.fat !== 'number' ||
    !day.plan
  ) {
    return { ok: false, error: new Error('Invalid day') }
  }

  return { ok: true, value: day as Day }
}

export function createEmptyDay(date: Date, plan: Plan) {
  return {
    id: uuidv4(),
    notes: '',
    date,
    protein: 0,
    vegetables: 0,
    carbs: 0,
    fat: 0,
    plan,
  }
}
