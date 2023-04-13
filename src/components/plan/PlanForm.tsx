import { FormEvent, useEffect, useState } from 'react'

import MacroInput from '@/src/components/tracker/MacroInput'

import { Plan as PlanType } from '../../core/entities/plan'

interface PlanProps {
  plan: PlanType
  onSubmit: (plan: PlanType) => void
  onDelete: (plan: PlanType) => void
  onMakeDefault: () => void
  isDefault: boolean
}

export default function PlanForm({
  plan,
  onSubmit,
  onDelete,
  isDefault,
  onMakeDefault,
}: PlanProps) {
  const [name, setName] = useState(plan.name || '')
  const [description, setDescription] = useState(plan.description || '')
  const [protein, setProtein] = useState(plan.protein)
  const [vegetables, setVegetables] = useState(plan.vegetables)
  const [carbs, setCarbs] = useState(plan.carbs)
  const [fat, setFat] = useState(plan.fat)
  const [meals, setMeals] = useState(plan.meals)

  useEffect(() => {
    setName(plan.name || '')
    setDescription(plan.description || '')
    setProtein(plan.protein)
    setVegetables(plan.vegetables)
    setCarbs(plan.carbs)
    setFat(plan.fat)
    setMeals(plan.meals)
  }, [plan])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    onSubmit({
      ...plan,
      name,
      description,
      protein,
      vegetables,
      carbs,
      fat,
      meals,
    })
  }

  const handleDelete = () => {
    onDelete(plan)
  }

  const hasChanged =
    name !== plan.name ||
    description !== plan.description ||
    protein !== plan.protein ||
    vegetables !== plan.vegetables ||
    carbs !== plan.carbs ||
    fat !== plan.fat ||
    meals !== plan.meals

  return (
    <form
      className={'tw-border tw-rounded tw-p-2 tw-shadow'}
      onSubmit={handleSubmit}
    >
      <div className={'tw-flex tw-flex-wrap'}>
        <div className={'tw-mr-4 tw-mb-2'}>
          <label htmlFor={'name'}>Name</label>
          <input
            id={'name'}
            className={
              'tw-rounded tw-border tw-border-gray-300 tw-px-2 tw-py-0.5 tw-block'
            }
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor={'meals'}>Meals per day</label>
          <input
            id={'meals'}
            type={'number'}
            className={
              'tw-rounded tw-border tw-border-gray-300 tw-px-2 tw-py-0.5 tw-w-16 tw-block'
            }
            value={meals}
            onChange={(e) => setMeals(parseInt(e.target.value))}
          />
        </div>
      </div>

      <div
        className={
          'tw-mt-4 tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-4'
        }
      >
        <MacroInput
          label={'Protein'}
          onChange={setProtein}
          value={protein}
          desiredValue={protein + 1}
          showNumber={true}
        />
        <MacroInput
          label={'Vegetables'}
          onChange={setVegetables}
          value={vegetables}
          desiredValue={vegetables + 1}
          showNumber={true}
        />
        <MacroInput
          label={'Carbs'}
          onChange={setCarbs}
          value={carbs}
          desiredValue={carbs + 1}
          showNumber={true}
        />
        <MacroInput
          label={'Fat'}
          onChange={setFat}
          value={fat}
          desiredValue={fat + 1}
          showNumber={true}
        />
      </div>

      <div className={'tw-mt-4'}>
        <label htmlFor={'description'}>Description</label>
        <textarea
          id={'description'}
          className={
            'tw-rounded tw-border tw-border-gray-300 tw-px-2 tw-py-0.5 tw-mr-2 tw-block tw-w-full'
          }
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className={'tw-flex tw-mt-4 tw-items-center'}>
        {isDefault ? (
          <span className={'tw-font-bold tw-text-carbs tw-mr-4'}>Default</span>
        ) : (
          <button
            className={
              'tw-rounded tw-bg-carbs tw-text-white tw-px-2 tw-py-0.5 tw-mr-4'
            }
            type="button"
            onClick={onMakeDefault}
          >
            Make default
          </button>
        )}

        <button
          className={'tw-rounded tw-bg-protein tw-text-white tw-px-2 tw-py-0.5'}
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>

        {hasChanged && (
          <button
            className={
              'tw-rounded tw-bg-protein tw-text-white tw-px-2 tw-py-0.5 tw-ml-4'
            }
            type="submit"
          >
            Save changes
          </button>
        )}
      </div>
    </form>
  )
}
