import { FormEvent, useEffect, useState } from 'react'

import { Plan as PlanType } from '../../core/entities/plan'

interface PlanProps {
  plan: PlanType
  onSubmit: (plan: PlanType) => void
}

export default function PlanForm({ plan, onSubmit }: PlanProps) {
  const [name, setName] = useState(plan.name || '')

  useEffect(() => {
    setName(plan.name || '')
  }, [plan])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    onSubmit({ ...plan, name })
  }

  return (
    <form className={'tw-border tw-rounded tw-p-2'} onSubmit={handleSubmit}>
      <label htmlFor={'name'}>Name</label>
      <input
        id={'name'}
        className={
          'tw-rounded tw-border tw-border-gray-300 tw-px-2 tw-py-0.5 tw-mr-2 tw-block'
        }
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        className={
          'tw-rounded tw-bg-protein tw-text-white tw-px-2 tw-py-0.5 tw-mt-1'
        }
        type="submit"
      >
        Update
      </button>
    </form>
  )
}
