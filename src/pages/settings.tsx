import { signOut } from 'next-auth/react'
import { FormEvent, useEffect, useState } from 'react'

import Container from '@/src/components/Container'
import { User } from '@/src/core/entities/user'
import { request } from '@/src/core/infra/net'

export default function Settings() {
  const [me, setMe] = useState<User>()
  const [name, setName] = useState('')
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    request<User>('/api/me')
      .then((user) => {
        setMe(user)

        if (user.name) {
          setName(user.name)
        }
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    request<User>('/api/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
      .then((user) => {
        setMe(user)

        if (user.name) {
          setName(user.name)
        }
      })
      .catch((e) => {
        console.error(e)
        setName(me?.name || '')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (isLoading)
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    )

  // We should always have a user due to middleware
  if (!me)
    return (
      <Container>
        <p>User not found</p>
      </Container>
    )

  return (
    <Container>
      <h1 className="tw-text-3xl tw-font-bold tw-mb-6">Settings</h1>

      <p>Signed in as {me.email}</p>

      <button
        className={
          'tw-rounded tw-bg-protein tw-text-white tw-px-2 tw-py-0.5 tw-mt-1'
        }
        onClick={() => signOut()}
      >
        Sign out
      </button>

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

        {name !== me.name && (
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
