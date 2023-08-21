import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export const Error = ({ message }: { message: string }) => (
  <View className="flex-1 bg-[#16171B] items-center justify-center">
    <Icon name="warning-outline" size={44} color="#dc2626" />
    <Text className="text-red-600 text-xl">{message}</Text>
  </View>
)
