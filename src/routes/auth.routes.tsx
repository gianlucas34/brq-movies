import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from '../app/presentation/screens/auth/LoginScreen'

const { Navigator, Screen } = createNativeStackNavigator()

export const AuthRoutes = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="Login" component={LoginScreen} />
  </Navigator>
)
