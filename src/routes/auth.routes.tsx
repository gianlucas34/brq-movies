import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { LoginScreen } from '../app/presentation/screens/auth/LoginScreen'

export type AuthRoutesParams = NativeStackNavigationProp<{
  Login: undefined
}>

const { Navigator, Screen } = createNativeStackNavigator()

export const AuthRoutes = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <Screen name="Login" component={LoginScreen} />
  </Navigator>
)
