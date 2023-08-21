import { ActivityIndicator, View } from 'react-native'

export const Loading = () => (
  <View className="flex-1 bg-[#16171B] items-center justify-center">
    <ActivityIndicator size="large" color="#FFF" />
  </View>
)
