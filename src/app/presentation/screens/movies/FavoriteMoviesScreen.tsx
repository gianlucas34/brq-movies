import { ScrollView, TouchableOpacity, View } from 'react-native'

export const FavoritesScreen = () => {
  return (
    <View className="flex-1 bg-[#16171B] px-2 py-5">
      <ScrollView>
        <View className="flex-row flex-wrap justify-between">
          <TouchableOpacity className="w-[48%]" onPress={() => ({})}>
            <View className="bg-white h-56 mb-4" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
