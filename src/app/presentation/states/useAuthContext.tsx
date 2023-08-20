import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { UserEntity } from '../../domain/entities/UserEntity'
import {
  ICredentials,
  LoginUsecase,
} from '../../domain/usecases/auth/loginUsecase'

interface IAuthContext {
  loggedUser?: UserEntity
  setLoggedUser: Dispatch<SetStateAction<IAuthContext['loggedUser']>>
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<SetStateAction<IAuthContext['isAuthenticated']>>
  login: (props: ICredentials) => void
  logout: () => void
  isLoading: boolean
  error?: string
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({
  children,
  loginUsecase,
}: {
  children: React.ReactNode
  loginUsecase: LoginUsecase
}) => {
  const [loggedUser, setLoggedUser] = useState<UserEntity>()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const login = async (credentials: ICredentials) => {
    setIsLoading(true)

    const result = await loginUsecase.execute(credentials)

    if ('token' in result) {
      setIsAuthenticated(true)
      setLoggedUser(result as UserEntity)
      setIsLoading(false)

      return
    }

    setIsLoading(false)
    setError(result.message)
  }

  const logout = () => {}

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext(): IAuthContext {
  return useContext(AuthContext)
}
