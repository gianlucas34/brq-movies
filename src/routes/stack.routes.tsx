import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from '../app/presentation/screens/LoginScreen'
import { MoviesScreen } from '../app/presentation/screens/MoviesScreen'

const { Navigator, Screen } = createNativeStackNavigator()

export const StackRoutes = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="login" component={LoginScreen} />
    <Screen name="movies" component={MoviesScreen} />
  </Navigator>
)
