import { NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { useAuthContext } from '../app/presentation/states/useAuthContext'

export const Routes = () => {
  const { isAuthenticated } = useAuthContext()

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
