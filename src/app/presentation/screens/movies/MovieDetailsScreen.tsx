import { useEffect, useRef } from 'react'
import {
  Animated,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { IMAGE_BASE_URL } from '@env'
import { useMovieByIdContext } from '../../states/movies/useMovieByIdContext'
import { Loading } from '../../../../ui/components/Loading'
import { Error } from '../../../../ui/components/Error'
import { MovieDetailsParams } from '../../../../routes/app.routes'

export const MovieDetailsScreen = () => {
  const navigation = useNavigation()
  const route = useRoute<MovieDetailsParams>()
  const { getMovieById, movie, isLoading, error } = useMovieByIdContext()

  const { width, height } = Dimensions.get('screen')
  const bannerHeight = height * 0.6
  const scrollY = useRef(new Animated.Value(0)).current

  const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity)

  useEffect(() => {
    ;(async () => {
      await getMovieById(route.params.id)
    })()
  }, [])

  return isLoading ? (
    <Loading />
  ) : !!error ? (
    <Error message={error} />
  ) : (
    <>
      <StatusBar translucent backgroundColor="transparent" style="light" />
      <Animated.View
        className="absolute w-full h-28 flex-row p-5 z-10 items-end justify-between"
        style={{
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 0, 0],
                extrapolate: 'clamp',
              }),
            },
            {
              scale: scrollY.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 1, 1],
                extrapolate: 'clamp',
              }),
            },
          ],
          backgroundColor: scrollY.interpolate({
            inputRange: [0, height / 2, height / 1.5],
            outputRange: ['transparent', '#2E2F33', '#2E2F33'],
            extrapolate: 'clamp',
          }),
        }}
      >
        <AnimatedButton
          className="w-7 h-7 rounded-full items-center justify-center"
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: scrollY.interpolate({
              inputRange: [0, height / 2, height / 1.5],
              outputRange: ['white', '#EC8B00', '#EC8B00'],
              extrapolate: 'clamp',
            }),
          }}
        >
          <Icon name="arrow-back" size={18} />
        </AnimatedButton>
        <Animated.Text
          className="text-white text-lg"
          style={{
            opacity: scrollY.interpolate({
              inputRange: [0, height / 2],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
          }}
        >
          {movie?.title}
        </Animated.Text>
        <AnimatedButton
          className="w-7 h-7 rounded-full items-center justify-center"
          style={{
            backgroundColor: scrollY.interpolate({
              inputRange: [0, height / 2, height / 1.5],
              outputRange: ['white', '#EC8B00', '#EC8B00'],
              extrapolate: 'clamp',
            }),
          }}
        >
          <Icon name="heart" size={18} />
        </AnimatedButton>
      </Animated.View>
      <Animated.ScrollView
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
          { useNativeDriver: true }
        )}
      >
        <Animated.Image
          source={{ uri: `${IMAGE_BASE_URL}${movie?.poster_path}` }}
          style={{
            width: width,
            height: bannerHeight,
            resizeMode: 'stretch',
            transform: [
              {
                translateY: scrollY,
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [
                    -bannerHeight,
                    0,
                    bannerHeight,
                    bannerHeight + 1,
                  ],
                  outputRange: [0, 1, 2, 0],
                }),
              },
            ],
          }}
        />
        <View className="p-5 bg-[#16171B]">
          <Text className="text-white text-2xl mb-3">{movie?.title}</Text>
          <Text className="text-[#EC8B00] text-md mb-3">SINOPSE</Text>
          <Text className="text-white text-lg mb-3 text-justify">
            {movie?.overview}
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
      </Animated.ScrollView>
    </>
  )
}
