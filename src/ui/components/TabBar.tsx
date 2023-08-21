import { Animated, Text, TouchableOpacity, View } from 'react-native'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { TabIndicator } from './TabIndicator'

export const TabBar = ({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) => (
  <View className="bg-[#16171B]">
    <View className="flex-row items-center justify-between mb-8 px-5 pt-5">
      <Text className="text-white text-lg">BRQ Movies</Text>
      <TouchableOpacity>
        <Text className="text-white">Sair</Text>
      </TouchableOpacity>
    </View>
    <View className="flex-row border-b-[1px] border-b-[#2E2F33]">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({
              name: route.name,
              merge: true,
              params: undefined,
            })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            key={route.name}
            className="w-6/12 h-8 items-center"
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Animated.Text className="text-white">
              {label as React.ReactNode}
            </Animated.Text>
          </TouchableOpacity>
        )
      })}
      <TabIndicator state={state} />
    </View>
  </View>
)
