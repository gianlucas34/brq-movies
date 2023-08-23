import { useEffect } from 'react'
import { Animated, Dimensions } from 'react-native'
import {
  ParamListBase,
  TabNavigationState,
  useIsFocused,
} from '@react-navigation/native'

export const TabIndicator = ({
  state,
}: {
  state: TabNavigationState<ParamListBase>
}) => {
  const isFocused = useIsFocused()

  const { width } = Dimensions.get('screen')
  const indicatorWidth = width / 2
  const translateValue = new Animated.Value(0)

  const slide = () => {
    Animated.timing(translateValue, {
      toValue: indicatorWidth * state.index,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  useEffect(() => {
    slide()
  }, [state, isFocused, slide])

  return (
    <Animated.View
      className="absolute border-b-2 border-b-[#EC8B00] bottom-0"
      style={{
        width: indicatorWidth,
        transform: [{ translateX: translateValue }],
      }}
    />
  )
}
