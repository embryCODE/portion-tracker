import dayjs from 'dayjs'

import useDays from '@/src/hooks/useDays'

export default function Tracker() {
  const { day, setDate } = useDays()

  const dayJs = dayjs(day?.date)
  const prevDay = () => setDate(dayJs.subtract(1, 'day').toDate())
  const nextDay = () => setDate(dayJs.add(1, 'day').toDate())

  return (
    <div>
      <div className={'tw-mb-4'}>
        <button className={'tw-mr-2'} onClick={prevDay}>
          prev
        </button>

        {dayJs.format('MMM D, YYYY')}

        <button className={'tw-ml-2'} onClick={nextDay}>
          next
        </button>
      </div>

      <pre>{JSON.stringify(day, null, 2)}</pre>
    </div>
  )
}