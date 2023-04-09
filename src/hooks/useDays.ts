import { useCallback, useEffect, useState } from 'react'

import { Day } from '@/src/core/entities/day'
import { request } from '@/src/infra/net'

export default function useDays() {
  const [date, setDate] = useState<Date>(new Date())
  const [day, setDay] = useState<Day>()
  const [isLoading, setIsLoading] = useState(false)

  const getDayByDate = useCallback(async () => {
    setIsLoading(true)

    try {
      const day = await request<Day>(`/api/days?date=${date}`)
      setDay(day)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }, [date])

  useEffect(() => {
    void getDayByDate()
  }, [getDayByDate])

  const deleteDay = useCallback(
    async (day: Day) => {
      setIsLoading(true)

      try {
        await request('/api/days', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(day),
        })
      } catch (e) {
        console.error(e)
      } finally {
        void getDayByDate
      }
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
