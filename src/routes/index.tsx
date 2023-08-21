import { NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { useAuthContext } from '../app/presentation/states/auth/useAuthContext'
import { AppRoutes } from './app.routes'
import { Loading } from '../ui/components/Loading'

export const Routes = () => {
  const { shouldValidateAuth, isAuthenticated } = useAuthContext()

  return (
    <NavigationContainer>
      {shouldValidateAuth ? (
        <Loading />
      ) : isAuthenticated ? (
        <AppRoutes />
      ) : (
        <AuthRoutes />
      )}
    </NavigationContainer>
  )
}
