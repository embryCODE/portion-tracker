import { useCallback, useEffect, useState } from 'react'

import { Day } from '@/src/core/entities/day'
import { request } from '@/src/infra/net'
import { useUiState } from '@/src/providers/UiStateProvider'

export default function useDays() {
  const [date, setDate] = useState<Date>(new Date())
  const [day, setDay] = useState<Day>()
  const [isLoading, setIsLoading] = useState(false)

  const { setShouldShowLoadingIndicator } = useUiState()

  useEffect(() => {
    setShouldShowLoadingIndicator(isLoading)
  }, [isLoading, setShouldShowLoadingIndicator])

  const getDayByDate = useCallback(async () => {
    setIsLoading(true)

    // Remove timezone info from date. Server expects date in UTC.
    const dateString = buildDateString(date)

    try {
      const day = await request<Day>(`/api/days?date=${dateString}`)
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

  const createOrUpdateDay = useCallback(
    async (day: Day) => {
      setIsLoading(true)

      try {
        await request('/api/days', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(day),
        })
      } catch (e) {
        console.error(e)
      } finally {
        void getDayByDate()
      }
    },
    [getDayByDate]
  )

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
        void getDayByDate()
      }
    },
    [getDayByDate]
  )

  return {
    day,
    isLoading,
    deleteDay,
    setDate,
    createOrUpdateDay,
  }
}

function buildDateString(date: Date) {
  // YYYY-MM-DD
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
