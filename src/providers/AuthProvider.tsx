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
import { request } from '@/src/infra/net'
import { useUiState } from '@/src/providers/UiStateProvider'

export interface AuthContext {
  user: User | null
  isLoading: boolean
  updateUser: (user: User) => void
  updateFromServer: () => void
}
const AuthContext = createContext<AuthContext>({
  user: null,
  isLoading: true,
  updateUser() {
    // do nothing
  },
  updateFromServer() {
    // do nothing
  },
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isUpdatingFromServer, setIsUpdatingFromServer] = useState(true)
  const [isUpdatingUser, setIsUpdatingUser] = useState(false)

  const { status } = useSession()
  const { setShouldShowLoadingIndicator } = useUiState()

  const isLoading = isUpdatingFromServer || isUpdatingUser

  useEffect(() => {
    setShouldShowLoadingIndicator(isLoading)
  }, [isLoading, setShouldShowLoadingIndicator])

  const updateFromServer = useCallback(async () => {
    setIsUpdatingFromServer(true)

    if (status === 'loading') {
      setIsUpdatingFromServer(true)
      return
    }

    if (status === 'unauthenticated') {
      setUser(null)
      setIsUpdatingFromServer(false)
      return
    }

    try {
      const user = await request<User>('/api/me')
      setUser(user)
    } catch (e) {
      console.error(e)
    } finally {
      setIsUpdatingFromServer(false)
    }
  }, [status])

  useEffect(() => {
    void updateFromServer()
  }, [updateFromServer])

  const updateUser = useCallback(
    async (user: User) => {
      setIsUpdatingUser(true)

      try {
        await request<User>('/api/me', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        })

        return updateFromServer()
      } catch (e) {
        console.error(e)
      } finally {
        setIsUpdatingUser(false)
      }
    },
    [updateFromServer]
  )

  const value = {
    user,
    updateUser,
    updateFromServer,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
