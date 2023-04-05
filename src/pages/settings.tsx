import { signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  if (isLoading) return <p>Loading...</p>

  // We should always have a user due to middleware
  if (!me) return <p>User not found</p>

  return (
    <>
      Signed in as {JSON.stringify(me, null, 2)} <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  )
}
