import { FormEvent, useEffect, useState } from 'react'

import { Day } from '@/src/core/entities/day'
import { Plan } from '@/src/core/entities/plan'
import useDays from '@/src/hooks/useDays'

export default function DayForm({ day, plans }: { day: Day; plans: Plan[] }) {
  const [protein, setProtein] = useState(day.protein)
  const [vegetables, setVegetables] = useState(day.vegetables)
  const [carbs, setCarbs] = useState(day.carbs)
  const [fat, setFat] = useState(day.fat)
  const [notes, setNotes] = useState(day.notes ?? '')
  const [plan, setPlan] = useState(day.plan)

  const { createOrUpdateDay, isLoading } = useDays()

  useEffect(() => {
    setProtein(day.protein)
    setVegetables(day.vegetables)
    setCarbs(day.carbs)
    setFat(day.fat)
    setNotes(day.notes ?? '')
    setPlan(day.plan)
  }, [day])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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
  }

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
    plan !== day.plan

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={'protein'}>Protein</label>
      <input
        id={'protein'}
        type={'number'}
        className={
          'tw-rounded tw-border tw-border-gray-300 tw-px-2 tw-py-0.5 tw-mr-2 tw-block'
        }
        value={protein}
        onChange={(e) => setProtein(parseInt(e.target.value))}
      />

      <label htmlFor={'vegetables'}>Vegetables</label>
      <input
        id={'vegetables'}
        type={'number'}
        className={
          'tw-rounded tw-border tw-border-gray-300 tw-px-2 tw-py-0.5 tw-mr-2 tw-block'
        }
        value={vegetables}
        onChange={(e) => setVegetables(parseInt(e.target.value))}
      />

      <label htmlFor={'carbs'}>Carbs</label>
      <input
        id={'carbs'}
        type={'number'}
        className={
          'tw-rounded tw-border tw-border-gray-300 tw-px-2 tw-py-0.5 tw-mr-2 tw-block'
        }
        value={carbs}
        onChange={(e) => setCarbs(parseInt(e.target.value))}
      />

      <label htmlFor={'fat'}>Fat</label>
      <input
        id={'fat'}
        type={'number'}
        className={
          'tw-rounded tw-border tw-border-gray-300 tw-px-2 tw-py-0.5 tw-mr-2 tw-block'
        }
        value={fat}
        onChange={(e) => setFat(parseInt(e.target.value))}
      />

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

      {!isLoading && hasChanged && (
        <button
          className={
            'tw-rounded tw-bg-protein tw-text-white tw-px-2 tw-py-0.5 tw-mt-1 tw-ml-2'
          }
          type="submit"
        >
          Update
        </button>
      )}

      {isLoading && <div>Loading...</div>}
    </form>
  )
}
