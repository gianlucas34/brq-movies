import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AppRoutesParams } from '../../../../routes/app.routes'

export const MoviesScreen = () => {
  const navigation = useNavigation<AppRoutesParams>()

  return (
    <View className="flex-1 bg-[#16171B] px-2 py-5">
      <ScrollView>
        <View className="flex-row flex-wrap justify-between">
          <TouchableOpacity
            className="w-[48%]"
            onPress={() => navigation.navigate('MovieDetails')}
          >
            <View className="bg-white h-56 mb-4" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
