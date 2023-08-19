import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MoviesScreen } from '../app/presentation/screens/movies/MoviesScreen'

const { Navigator, Screen } = createNativeStackNavigator()

export const MoviesRoutes = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="movies" component={MoviesScreen} />
  </Navigator>
)
