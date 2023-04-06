import { useSession } from 'next-auth/react'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { User } from '@/src/core/entities/user'
import { request } from '@/src/core/infra/net'

export interface AuthContext {
  user: User | null
  isLoading: boolean
  update: () => void
}
const AuthContext = createContext<AuthContext>({
  user: null,
  isLoading: true,
  update() {
    // do nothing
  },
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const update = useCallback(() => {
    setIsLoading(true)

    if (status === 'loading') {
      setIsLoading(true)
      return
    }

    if (status === 'unauthenticated') {
      setUser(null)
      setIsLoading(false)
      return
    }

    request<User>('/api/me')
      .then((user) => {
        setUser(user)
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [status])

  useEffect(() => {
    update()
  }, [update])

  const value = {
    user,
    isLoading,
    update,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
