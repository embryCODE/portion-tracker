import { FormEvent, useEffect, useState } from 'react'

import { Plan as PlanType } from '../../core/entities/plan'

interface PlanProps {
  plan: PlanType
  onSubmit: (plan: PlanType) => void
  onDelete: (plan: PlanType) => void
  onMakeDefault: () => void
  isLoading: boolean
  isDefault: boolean
}

export default function PlanForm({
  plan,
  onSubmit,
  isLoading,
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
    <form className={'tw-border tw-rounded tw-p-2'} onSubmit={handleSubmit}>
      <div>
        {isDefault ? (
          <span>Default</span>
        ) : (
          <button
            className={
              'tw-rounded tw-bg-protein tw-text-white tw-px-2 tw-py-0.5 tw-mt-1 tw-mb-2'
            }
            type="button"
            onClick={onMakeDefault}
          >
            Make default
          </button>
        )}
      </div>

      <label htmlFor={'name'}>Name</label>
      <input
        id={'name'}
        className={
          'tw-rounded tw-border tw-border-gray-300 tw-px-2 tw-py-0.5 tw-mr-2 tw-block'
        }
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor={'description'}>Description</label>
      <textarea
        id={'description'}
        className={
          'tw-rounded tw-border tw-border-gray-300 tw-px-2 tw-py-0.5 tw-mr-2 tw-block'
        }
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

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

      <label htmlFor={'meals'}>Meals</label>
      <input
        id={'meals'}
        type={'number'}
        className={
          'tw-rounded tw-border tw-border-gray-300 tw-px-2 tw-py-0.5 tw-mr-2 tw-block'
        }
        value={meals}
        onChange={(e) => setMeals(parseInt(e.target.value))}
      />

      <button
        className={
          'tw-rounded tw-bg-protein tw-text-white tw-px-2 tw-py-0.5 tw-mt-1'
        }
        type="button"
        onClick={handleDelete}
      >
        Delete
      </button>

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
