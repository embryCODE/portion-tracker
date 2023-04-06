import { FormEvent, useEffect, useState } from 'react'

import Container from '@/src/components/Container'
import { User } from '@/src/core/entities/user'
import { request } from '@/src/core/infra/net'
import { useAuth } from '@/src/hooks/AuthProvider'

export default function Settings() {
  const { user, update, isLoading: isLoadingUser } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [isUpdating, setIsUpdating] = useState(false)

  const isLoading = isLoadingUser || isUpdating

  useEffect(() => {
    setName(user?.name || '')
  }, [user])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsUpdating(true)

    request<User>('/api/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
      .then((user) => {
        update()

        if (user.name) {
          setName(user.name)
        }
      })
      .catch((e) => {
        console.error(e)
        setName(user?.name || '')
      })
      .finally(() => {
        setIsUpdating(false)
      })
  }

  if (isLoading)
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    )

  // We should always have a user due to middleware
  if (!user)
    return (
      <Container>
        <p>User not found</p>
      </Container>
    )

  return (
    <Container>
      <div className={'tw-prose'}>
        <h1>Settings</h1>
      </div>

      <form className={'tw-mt-4'} onSubmit={handleSubmit}>
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
    </Container>
  )
}
