import { FormEvent, useEffect, useState } from 'react'

import Container from '@/src/components/layout/Container'
import { useAuth } from '@/src/hooks/AuthProvider'

export default function UserForm() {
  const { user, updateUser, isLoading } = useAuth()
  const [name, setName] = useState(user?.name || '')

  useEffect(() => {
    setName(user?.name || '')
  }, [user])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user) {
      return
    }

    updateUser({ ...user, name })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  // We should always have a user due to middleware
  if (!user) {
    return (
      <Container>
        <p>User not found</p>
      </Container>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className={'tw-block'} htmlFor="name">
        Name
      </label>

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
            'tw-rounded tw-bg-protein tw-text-white tw-px-2 tw-py-0.5 tw-mt-1'
          }
          type="submit"
        >
          Update
        </button>
      )}
    </form>
  )
}
