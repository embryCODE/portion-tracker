import { FormEvent, useEffect, useReducer } from 'react'

import MacroInput from '@/src/components/tracker/MacroInput'
import { Day } from '@/src/core/entities/day'
import { Plan } from '@/src/core/entities/plan'

const dayReducer = (state: Day, newState: Partial<Day>) => ({
  ...state,
  ...newState,
})

export default function DayForm({
  day,
  plans,
  createOrUpdateDay,
}: {
  day: Day
  plans: Plan[]
  createOrUpdateDay: (day: Day) => Promise<void>
}) {
  const [localDay, setLocalDay] = useReducer(dayReducer, day)

  useEffect(() => {
    setLocalDay(day)
  }, [day])

  const handlePlanSelection = (e: FormEvent<HTMLSelectElement>) => {
    const selectedPlan = plans.find((plan) => plan.id === e.currentTarget.value)

    if (selectedPlan) {
      setLocalDay({ plan: selectedPlan })
    }
  }

  const handleChange =
    <V,>(prop: string) =>
    (value: V) => {
      setLocalDay({ [prop]: value })

      void createOrUpdateDay({
        id: day.id,
        date: day.date,
        notes: localDay.notes,
        protein: localDay.protein,
        vegetables: localDay.vegetables,
        carbs: localDay.carbs,
        fat: localDay.fat,
        plan: localDay.plan,
        // This will override previous values as necessary
        [prop]: value,
      })
    }

  return (
    <form>
      <div>
        <label htmlFor={'plan'}>Plan</label>
        <select
          id={'plan'}
          className={
            'tw-rounded tw-border tw-border-gray-300 tw-px-2 tw-py-0.5 tw-mr-2 tw-block'
          }
          value={localDay.plan.id}
          onChange={handlePlanSelection}
        >
          {plans.map((planOption) => (
            <option key={planOption.id} value={planOption.id}>
              {planOption.name ?? planOption.id}
            </option>
          ))}
        </select>
      </div>

      <div className={'tw-mt-4 tw-grid md:tw-grid-cols-4 tw-gap-4'}>
        <MacroInput
          label={'Protein'}
          onChange={handleChange<number>('protein')}
          value={localDay.protein}
          desiredValue={localDay.plan.protein}
        />
        <MacroInput
          label={'Vegetables'}
          onChange={handleChange<number>('vegetables')}
          value={localDay.vegetables}
          desiredValue={localDay.plan.vegetables}
        />
        <MacroInput
          label={'Carbs'}
          onChange={handleChange<number>('carbs')}
          value={localDay.carbs}
          desiredValue={localDay.plan.carbs}
        />
        <MacroInput
          label={'Fat'}
          onChange={handleChange<number>('fat')}
          value={localDay.fat}
          desiredValue={localDay.plan.fat}
        />
      </div>

      <div className={'tw-mt-4'}>
        <label htmlFor={'notes'}>Notes</label>
        <textarea
          id={'notes'}
          className={
            'tw-w-full tw-rounded tw-border tw-border-gray-300 tw-px-2 tw-py-0.5 tw-mr-2 tw-block'
          }
          value={localDay.notes ?? ''}
          onChange={(e) => handleChange<string>('notes')(e.currentTarget.value)}
        />
      </div>
    </form>
  )
}
