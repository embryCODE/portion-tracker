import { signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { User } from '@/src/core/entities/user'

export default function Settings() {
  const [me, setMe] = useState<User>()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/me')
      .then((res) => res.json())
      .then((user) => {
        setMe(user)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>

  // We should always have a user due to middleware
  if (!me) return <p>User not found</p>

  return (
    <>
      Signed in as {JSON.stringify(me, null, 2)} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  )
}
