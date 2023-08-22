import React, { useCallback } from 'react'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { IMAGE_BASE_URL } from '@env'
import { AppRoutesParams } from '../../../../routes/app.routes'
import { useMoviesContext } from '../../states/movies/useMoviesContext'
import { Loading } from '../../../../ui/components/Loading'
import { Error } from '../../../../ui/components/Error'

export const MoviesScreen = () => {
  const navigation = useNavigation<AppRoutesParams>()
  const { getMovies, movies, isLoading, error } = useMoviesContext()

  useFocusEffect(
    useCallback(() => {
      ;(async () => {
        await getMovies()
      })()
    }, [])
  )

  return isLoading ? (
    <Loading />
  ) : !!error ? (
    <Error message={error} />
  ) : (
    <View className="flex-1 bg-[#16171B] p-4">
      <ScrollView>
        <View className="flex-row flex-wrap justify-between">
          {movies.map((item) => (
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
  )
}
