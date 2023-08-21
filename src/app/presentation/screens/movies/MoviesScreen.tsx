import React, { useEffect } from 'react'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { IMAGE_BASE_URL } from '@env'
import { AppRoutesParams } from '../../../../routes/app.routes'
import { useMoviesContext } from '../../states/movies/useMoviesContext'
import { Loading } from '../../../../ui/components/Loading'

export const MoviesScreen = () => {
  const navigation = useNavigation<AppRoutesParams>()
  const { getMovies, movies, isLoading } = useMoviesContext()

  useEffect(() => {
    ;(async () => {
      await getMovies()
    })()
  }, [])

  return isLoading ? (
    <Loading />
  ) : (
    <View className="flex-1 bg-[#16171B] px-2 py-5">
      <ScrollView>
        <View className="flex-row flex-wrap justify-between">
          {movies.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="w-[48%] h-56 mb-4"
              onPress={() => navigation.navigate('MovieDetails')}
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
