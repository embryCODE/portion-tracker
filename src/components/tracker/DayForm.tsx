import { FormEvent, useEffect, useState } from 'react'

import MacroInput from '@/src/components/tracker/MacroInput'
import { Day } from '@/src/core/entities/day'
import { Plan } from '@/src/core/entities/plan'

export default function DayForm({
  day,
  plans,
  createOrUpdateDay,
}: {
  day: Day
  plans: Plan[]
  createOrUpdateDay: (day: Day) => Promise<void>
}) {
  const [protein, setProtein] = useState(day.protein)
  const [vegetables, setVegetables] = useState(day.vegetables)
  const [carbs, setCarbs] = useState(day.carbs)
  const [fat, setFat] = useState(day.fat)
  const [notes, setNotes] = useState(day.notes ?? '')
  const [plan, setPlan] = useState(day.plan)

  useEffect(() => {
    setProtein(day.protein)
    setVegetables(day.vegetables)
    setCarbs(day.carbs)
    setFat(day.fat)
    setNotes(day.notes ?? '')
    setPlan(day.plan)
  }, [day])

  const handlePlanSelection = (e: FormEvent<HTMLSelectElement>) => {
    const selectedPlan = plans.find((plan) => plan.id === e.currentTarget.value)

    if (selectedPlan) {
      setPlan(selectedPlan)
    }
  }

  const hasChanged =
    notes !== day.notes ||
    protein !== day.protein ||
    vegetables !== day.vegetables ||
    carbs !== day.carbs ||
    fat !== day.fat ||
    plan?.id !== day.plan?.id

  useEffect(() => {
    if (!hasChanged) return

    void createOrUpdateDay({
      id: day.id,
      date: day.date,
      notes,
      protein,
      vegetables,
      carbs,
      fat,
      plan,
    })
  }, [
    carbs,
    createOrUpdateDay,
    day.date,
    day.id,
    fat,
    hasChanged,
    notes,
    plan,
    protein,
    vegetables,
  ])

  return (
    <form>
      <MacroInput label={'Protein'} onChange={setProtein} value={protein} />
      <MacroInput
        label={'Vegetables'}
        onChange={setVegetables}
        value={vegetables}
      />
      <MacroInput label={'Carbs'} onChange={setCarbs} value={carbs} />
      <MacroInput label={'Fat'} onChange={setFat} value={fat} />

      <label htmlFor={'notes'}>Notes</label>
      <textarea
        id={'notes'}
        className={
          'tw-rounded tw-border tw-border-gray-300 tw-px-2 tw-py-0.5 tw-mr-2 tw-block'
        }
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <label htmlFor={'plan'}>Plan</label>
      <select
        id={'plan'}
        className={
          'tw-rounded tw-border tw-border-gray-300 tw-px-2 tw-py-0.5 tw-mr-2 tw-block'
        }
        value={plan.id}
        onChange={handlePlanSelection}
      >
        {plans.map((planOption) => (
          <option key={planOption.id} value={planOption.id}>
            {planOption.name ?? planOption.id}
          </option>
        ))}
      </select>
    </form>
  )
}
