import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'
import { MovieDetailsScreen } from '../app/presentation/screens/movies/MovieDetailsScreen'
import { AppTabs } from './app.tabs'

export type AppRoutesParams = NativeStackNavigationProp<{
  Movies: undefined
  FavoriteMovies: undefined
  MovieDetails: { id: number }
}>

export type MovieDetailsParams = RouteProp<{
  params: { id: number }
}>

const { Navigator, Screen } = createNativeStackNavigator()

export const AppRoutes = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <Screen name="Tabs" component={AppTabs} />
    <Screen name="MovieDetails" component={MovieDetailsScreen} />
  </Navigator>
)
