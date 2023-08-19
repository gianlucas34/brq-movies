import { NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { MoviesRoutes } from './movies.routes'

export const Routes = () => (
  <NavigationContainer>
    <AuthRoutes />
    <MoviesRoutes />
  </NavigationContainer>
)
