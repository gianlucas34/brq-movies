import { useEffect } from 'react'
import { Animated, Dimensions } from 'react-native'
import { ParamListBase, TabNavigationState } from '@react-navigation/native'

export const TabIndicator = ({
  state,
}: {
  state: TabNavigationState<ParamListBase>
}) => {
  const { width } = Dimensions.get('screen')
  const indicatorWidth = width / 2
  const translateValue = new Animated.Value(width * 0)
  const toValue = indicatorWidth + (state.index - 1) * indicatorWidth

  useEffect(() => {
    Animated.timing(translateValue, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [state])

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
