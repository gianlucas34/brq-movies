import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { AsyncStorageStatic } from '@react-native-async-storage/async-storage'
import { UserEntity } from '../../../domain/entities/UserEntity'
import {
  ICredentials,
  LoginUsecase,
} from '../../../domain/usecases/auth/loginUsecase'

interface IAuthContext {
  loggedUser?: UserEntity
  setLoggedUser: Dispatch<SetStateAction<IAuthContext['loggedUser']>>
  shouldValidateAuth: boolean
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<SetStateAction<IAuthContext['isAuthenticated']>>
  login: (props: ICredentials) => void
  logout: () => void
  isLoading: boolean
  error: string
  setError: Dispatch<SetStateAction<IAuthContext['error']>>
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({
  children,
  usecase,
  storage,
}: {
  children: React.ReactNode
  usecase: LoginUsecase
  storage: AsyncStorageStatic
}) => {
  const [shouldValidateAuth, setShouldValidateAuth] = useState<boolean>(true)
  const [loggedUser, setLoggedUser] = useState<UserEntity>()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const validateAuth = (user: UserEntity) => {
    setIsAuthenticated(true)
    setLoggedUser(user)
    setIsLoading(false)
    setShouldValidateAuth(false)
  }

  const login = async (credentials: ICredentials) => {
    setIsLoading(true)

    const result = await usecase.execute(credentials)

    if ('token' in result) {
      storage.setItem('user', JSON.stringify(result))

      return validateAuth(result)
    }

    setShouldValidateAuth(false)
    setIsLoading(false)
    setError(result.message)
  }

  const logout = () => {
    storage.clear()

    setIsAuthenticated(false)
    setLoggedUser(undefined)
  }

  useEffect(() => {
    ;(async () => {
      if (shouldValidateAuth) {
        const storagedUser = await storage.getItem('user')

        if (storagedUser) {
          const user = JSON.parse(storagedUser)

          setIsLoading(true)
          validateAuth(user)
        } else {
          setShouldValidateAuth(false)
        }
      }
    })()
  }, [shouldValidateAuth])

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
        shouldValidateAuth,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        isLoading,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext(): IAuthContext {
  return useContext(AuthContext)
}
