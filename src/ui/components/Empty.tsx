import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export const Empty = ({ message }: { message: string }) => (
  <View className="flex-1 bg-[#16171B] px-4 items-center justify-center">
    <Icon name="sad-outline" size={40} color="white" />
    <Text className="text-white text-lg">{message}</Text>
  </View>
)
