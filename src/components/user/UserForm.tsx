import { FormEvent, useLayoutEffect, useState } from 'react'

import { useAuth } from '@/src/providers/AuthProvider'

export default function UserForm() {
  const { user, updateUser } = useAuth()
  const [name, setName] = useState(user?.name || '')

  useLayoutEffect(() => {
    setName(user?.name || '')
  }, [user])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user) {
      return
    }

    updateUser({ ...user, name })
  }

  // We should always have a user due to middleware
  if (!user) return null

  return (
    <form onSubmit={handleSubmit}>
      <label className={'tw-block'} htmlFor="name">
        Name
      </label>

      <div className={'tw-flex tw-space-x-2 tw-items-center'}>
        <input
          className={
            'tw-rounded tw-border tw-border-gray-300 tw-px-2 tw-py-0.5 tw-mr-2 tw-block'
          }
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />

        {name !== user.name && (
          <button
            className={
              'tw-rounded tw-bg-protein tw-text-white tw-px-2 tw-py-0.5'
            }
            type="submit"
          >
            Save
          </button>
        )}
      </div>
    </form>
  )
}
