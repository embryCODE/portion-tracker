import { useCallback, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Day } from '@/src/core/entities/day'
import { Plan } from '@/src/core/entities/plan'
import { request } from '@/src/core/infra/net'

export default function useDays() {
  const [date, setDate] = useState<Date>(new Date())
  const [day, setDay] = useState<Day>()
  const [isLoading, setIsLoading] = useState(false)

  const getDayByDate = useCallback(async () => {
    setIsLoading(true)

    let day = await request<Day>(`/api/days?date=${date}`)
    const plans = await request<Plan[]>(`/api/plans`)

    if (!day) {
      day = await request<Day>('/api/days', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: uuidv4(),
          notes: '',
          date,
          protein: 0,
          vegetables: 0,
          carbs: 0,
          fat: 0,
          plan: plans[0],
        }),
      })
    }

    setDay(day)
    setIsLoading(false)
  }, [date])

  useEffect(() => {
    void getDayByDate()
  }, [getDayByDate])

  const deleteDay = useCallback(
    async (day: Day) => {
      setIsLoading(true)

      await request('/api/days', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(day),
      })

      void getDayByDate
    },
    [getDayByDate]
  )

  return {
    day,
    isLoading,
    deleteDay,
    setDate,
  }
}
