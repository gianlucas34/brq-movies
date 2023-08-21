import { useRef } from 'react'
import {
  Animated,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

export const MovieDetailsScreen = () => {
  const navigation = useNavigation()

  const { width, height } = Dimensions.get('screen')
  const bannerHeight = height * 0.6
  const scrollY = useRef(new Animated.Value(0)).current

  const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity)

  return (
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
          Missão: Impossível 7
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
          source={require('../../../../../assets/images/poster.png')}
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
          <Text className="text-white text-2xl mb-3">Missão: Impossível 7</Text>
          <Text className="text-[#EC8B00] text-md mb-3">SINOPSE</Text>
          <Text className="text-white text-lg mb-3">
            Em Missão Impossível 7: Acerto de Contas Parte 1, Ethan Hunt (Tom
            Cruise) e a equipe do IMF formada por Ilsa Faust (Rebecca Ferguson),
            Benji Dunn (Simon Pegg) e Luther Stickell (Ving Rhames) devem
            rastrear uma nova e aterrorizante arma que representa uma ameaça
            para toda a humanidade se cair em mãos erradas. Com o controle do
            futuro e o destino do mundo em jogo, a equipe parte em uma corrida
            mortal ao redor do planeta. Confrontado por um novo inimigo
            misterioso e muito perigoso, Ethan assume que nada pode importar
            mais do que a missão - nem mesmo sua própria vida.Verifique a
            classificação indicativa no Portal Online da Cultura Digital.
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
