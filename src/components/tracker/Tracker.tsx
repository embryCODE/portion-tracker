import dayjs from 'dayjs'

import DayForm from '@/src/components/tracker/DayForm'
import useDays from '@/src/hooks/useDays'
import usePlans from '@/src/hooks/usePlans'

export default function Tracker() {
  const { day, setDate } = useDays()
  const { plans } = usePlans()

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

      {day && plans && <DayForm day={day} plans={plans} />}
    </div>
  )
}
