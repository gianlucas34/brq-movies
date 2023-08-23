import { useEffect, useRef } from 'react'
import {
  Animated,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { IMAGE_BASE_URL } from '@env'
import { useMovieByIdContext } from '../../states/movies/useMovieByIdContext'
import { Loading } from '../../../../ui/components/Loading'
import { Error } from '../../../../ui/components/Error'
import { MovieDetailsParams } from '../../../../routes/app.routes'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('screen')
const H_MAX_HEIGHT = height * 0.6
const H_MIN_HEIGHT = 110

export const MovieDetailsScreen = () => {
  const navigation = useNavigation()
  const route = useRoute<MovieDetailsParams>()
  const {
    getMovieById,
    checkMovieIsFavorited,
    favoriteMovie,
    disfavorMovie,
    isFavorited,
    movie,
    isLoading,
    error,
  } = useMovieByIdContext()

  const scrollY = useRef(new Animated.Value(0)).current
  const headerBackground = scrollY.interpolate({
    inputRange: [0, H_MAX_HEIGHT / 1.3, H_MAX_HEIGHT - H_MIN_HEIGHT],
    outputRange: ['rgba(0, 0, 0,0)', '#2E2F33', '#2E2F33'],
    extrapolate: 'clamp',
  })
  const imageScale = scrollY.interpolate({
    inputRange: [0, H_MAX_HEIGHT / 1.3, H_MAX_HEIGHT - H_MIN_HEIGHT],
    outputRange: [H_MAX_HEIGHT, H_MAX_HEIGHT - H_MAX_HEIGHT / 1.3, 0],
    extrapolate: 'clamp',
  })
  const buttonBackground = scrollY.interpolate({
    inputRange: [0, H_MAX_HEIGHT / 1.3, H_MAX_HEIGHT - H_MIN_HEIGHT],
    outputRange: ['white', '#EC8B00', '#EC8B00'],
    extrapolate: 'clamp',
  })

  const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity)

  useEffect(() => {
    ;(async () => {
      await getMovieById(route.params.id)
    })()
  }, [])

  useEffect(() => {
    if (!!movie) {
      checkMovieIsFavorited(movie.id)
    }
  }, [movie])

  return isLoading ? (
    <Loading />
  ) : !!error ? (
    <Error message={error} />
  ) : (
    !!movie && (
      <View className="flex-1 bg-[#16171B]">
        <StatusBar translucent backgroundColor="transparent" style="light" />
        <Animated.Image
          className="absolute z-10 top-0 left-0 right-0 overflow-hidden"
          source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
          style={{
            width: width,
            height: imageScale,
            resizeMode: 'stretch',
          }}
        />
        <Animated.View
          className="absolute z-20 top-0 left-0 right-0 overflow-hidden"
          style={{
            height: H_MIN_HEIGHT,
            backgroundColor: headerBackground,
          }}
        >
          <SafeAreaView className="flex-1 flex-row items-center justify-between px-4">
            <AnimatedButton
              className="w-7 h-7 rounded-full items-center justify-center"
              onPress={() => navigation.goBack()}
              style={{ backgroundColor: buttonBackground }}
            >
              <Icon name="arrow-back" size={18} />
            </AnimatedButton>
            <Animated.Text
              className="text-white text-md"
              style={{
                opacity: scrollY.interpolate({
                  inputRange: [0, height / 2],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
                }),
              }}
            >
              {movie.title}
            </Animated.Text>
            <AnimatedButton
              className="w-7 h-7 rounded-full items-center justify-center"
              onPress={() =>
                isFavorited ? disfavorMovie(movie.id) : favoriteMovie(movie)
              }
              style={{ backgroundColor: buttonBackground }}
            >
              <Icon name={isFavorited ? 'heart' : 'heart-outline'} size={18} />
            </AnimatedButton>
          </SafeAreaView>
        </Animated.View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: scrollY },
                },
              },
            ],
            { useNativeDriver: false }
          )}
          contentContainerStyle={{ paddingTop: H_MAX_HEIGHT }}
        >
          <View className="p-5">
            <Text className="text-white text-2xl mb-3">{movie.title}</Text>
            <Text className="text-[#EC8B00] text-md mb-3">SINOPSE</Text>
            <Text className="text-white text-lg mb-3 text-justify">
              {movie.overview}
            </Text>
            <Text className="text-white text-lg mb-3 text-justify">
              {movie.overview}
            </Text>
            <View className="flex-row flex-wrap justify-between mt-5">
              {[...Array(4)].map((_, index) => (
                <TouchableOpacity
                  key={index}
                  className="w-[48%] bg-[#2E2F33] h-20 mb-4 rounded-lg"
                >
                  <View className="flex-1 p-2 flex-col justify-between">
                    <View className="flex-row items-center">
                      <View className="bg-[#16171B] w-7 h-7 rounded-full items-center justify-center mr-2">
                        <Icon name="heart-outline" size={16} color="#EC8B00" />
                      </View>
                      <Text className="text-[#EC8B00]">LABEL</Text>
                    </View>
                    <Text className="text-white text-lg">Text</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    )
  )
}
