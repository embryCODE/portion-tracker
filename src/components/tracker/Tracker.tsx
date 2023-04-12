import dayjs from 'dayjs'
import { FaArrowLeft, FaArrowRight, FaSave } from 'react-icons/fa'

import DayForm from '@/src/components/tracker/DayForm'
import useDays from '@/src/hooks/useDays'
import useDebouncedCallback from '@/src/hooks/useDebouncedCallback'
import usePlans from '@/src/hooks/usePlans'

export default function Tracker() {
  const { day, setDate, createOrUpdateDay, isLoading } = useDays()
  const debouncedCreateOrUpdateDay = useDebouncedCallback(
    createOrUpdateDay,
    500
  )

  const { plans } = usePlans()

  const dayJs = dayjs(day?.date)
  const prevDay = () => setDate(dayJs.subtract(1, 'day').toDate())
  const nextDay = () => setDate(dayJs.add(1, 'day').toDate())

  return (
    <div>
      <div className={'tw-prose tw-mt-4'}>
        <table>
          <thead>
            <tr>
              <th className={'tw-font-bold tw-uppercase'}>Frequency</th>
              <th className={'tw-text-protein tw-font-bold tw-uppercase'}>
                Protein
              </th>
              <th className={'tw-text-veg tw-font-bold tw-uppercase'}>
                Vegetables
              </th>
              <th className={'tw-text-carbs tw-font-bold tw-uppercase'}>
                Carbs
              </th>
              <th className={'tw-text-fat tw-font-bold tw-uppercase'}>Fat</th>
            </tr>
          </thead>

          <tbody className={'tw-bg-gray-50'}>
            <tr>
              <td className={'tw-bg-gray-200 tw-font-bold tw-pl-2'}>
                Per meal
              </td>
              <td className={'tw-font-bold'}>
                {calculatePerMeal(day?.plan?.protein, day?.plan?.meals)}
              </td>
              <td className={'tw-font-bold'}>
                {calculatePerMeal(day?.plan?.vegetables, day?.plan?.meals)}
              </td>
              <td className={'tw-font-bold'}>
                {calculatePerMeal(day?.plan?.carbs, day?.plan?.meals)}
              </td>
              <td className={'tw-font-bold'}>
                {calculatePerMeal(day?.plan?.fat, day?.plan?.meals)}
              </td>
            </tr>

            <tr>
              <td className={'tw-bg-gray-200 tw-font-bold tw-pl-2'}>Per day</td>
              <td className={'tw-font-bold'}>{day?.plan?.protein}</td>
              <td className={'tw-font-bold'}>{day?.plan?.vegetables}</td>
              <td className={'tw-font-bold'}>{day?.plan?.carbs}</td>
              <td className={'tw-font-bold'}>{day?.plan?.fat}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={'tw-mt-6 tw-flex tw-items-center'}>
        <button className={'tw-mr-2'} onClick={prevDay} title={'Previous day'}>
          <FaArrowLeft />
        </button>

        {dayJs.format('ddd MMM D, YYYY')}

        <button className={'tw-ml-2'} onClick={nextDay} title={'Next day'}>
          <FaArrowRight />
        </button>

        {isLoading && <FaSave className={'tw-ml-2'} />}
      </div>

      <section className={'tw-mt-4'}>
        {day && plans && (
          <DayForm
            day={day}
            plans={plans}
            createOrUpdateDay={debouncedCreateOrUpdateDay}
          />
        )}
      </section>
    </div>
  )
}

function calculatePerMeal(
  macro: number | undefined,
  meals: number | undefined
) {
  if (!macro || !meals) {
    return 0
  }

  const roundedUp = Math.ceil(macro / meals)
  const roundedDown = Math.floor(macro / meals)

  if (roundedUp === roundedDown) {
    return roundedUp
  } else {
    return `${roundedDown} or ${roundedUp}`
  }
}
