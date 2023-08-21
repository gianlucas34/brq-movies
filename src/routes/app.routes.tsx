import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { MovieDetailsScreen } from '../app/presentation/screens/movies/MovieDetailsScreen'
import { AppTabs } from './app.tabs'

export type AppRoutesParams = NativeStackNavigationProp<{
  Movies: undefined
  FavoriteMovies: undefined
  MovieDetails: undefined
}>

const { Navigator, Screen } = createNativeStackNavigator()

export const AppRoutes = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="Tabs" component={AppTabs} />
    <Screen name="MovieDetails" component={MovieDetailsScreen} />
  </Navigator>
)
