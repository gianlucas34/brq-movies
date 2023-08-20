import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MoviesScreen } from '../app/presentation/screens/movies/MoviesScreen'

const { Navigator, Screen } = createNativeStackNavigator()

export const AppRoutes = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="movies" component={MoviesScreen} />
  </Navigator>
)
