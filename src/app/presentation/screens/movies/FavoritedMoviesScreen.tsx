import React, { useCallback } from 'react'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { IMAGE_BASE_URL } from '@env'
import { AppRoutesParams } from '../../../../routes/app.routes'
import { Loading } from '../../../../ui/components/Loading'
import { useFavoritedMoviesContext } from '../../states/movies/useFavoritedMoviesContext'
import { Empty } from '../../../../ui/components/Empty'

export const FavoritedMoviesScreen = () => {
  const navigation = useNavigation<AppRoutesParams>()
  const { getFavoritedMovies, favoritedMovies, isLoading } =
    useFavoritedMoviesContext()

  useFocusEffect(
    useCallback(() => {
      ;(async () => {
        await getFavoritedMovies()
      })()
    }, [])
  )

  return isLoading ? (
    <Loading />
  ) : !!favoritedMovies.length ? (
    <View className="flex-1 bg-[#16171B] px-2 py-5">
      <ScrollView>
        <View className="flex-row flex-wrap justify-between">
          {favoritedMovies.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="w-[48%] h-56 mb-4"
              onPress={() =>
                navigation.navigate('MovieDetails', { id: item.id })
              }
            >
              <Image
                className="w-full h-full rounded-lg"
                source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                style={{ resizeMode: 'stretch' }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  ) : (
    <Empty message="Você ainda não tem nem um filme favoritado!" />
  )
}
