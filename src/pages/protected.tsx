import { useSession } from 'next-auth/react'

export default function ProtectedPage() {
  const { data: session } = useSession()

  if (!session) {
    return <h1>Access denied</h1>
  }

  return (
    <>
      <h1>Access granted</h1>

      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  )
}
