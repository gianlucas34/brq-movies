import { useState } from 'react'
import { Animated, Modal, Text, TouchableOpacity, View } from 'react-native'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TabIndicator } from './TabIndicator'
import { useAuthContext } from '../../app/presentation/states/useAuthContext'

export const TabBar = ({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) => {
  const { logout } = useAuthContext()

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <View className="bg-[#16171B]">
      <View className="flex-row items-center justify-between mb-8 px-5 pt-5">
        <Text className="text-white text-lg">BRQ Movies</Text>
        <TouchableOpacity
          className={`w-6 h-6 items-center justify-center ${
            modalOpen ? 'bg-[#EC8B00] rounded-full' : ''
          }`}
          onPress={() => setModalOpen((modalOpen) => !modalOpen)}
        >
          <Icon
            name="dots-vertical"
            color={modalOpen ? 'black' : 'white'}
            size={18}
          />
          <Modal
            transparent
            animationType="fade"
            visible={modalOpen}
            onRequestClose={() => setModalOpen((modalOpen) => !modalOpen)}
          >
            <TouchableOpacity
              className="flex-1"
              onPress={() => setModalOpen((modalOpen) => !modalOpen)}
            >
              <View className="bg-[#2E2F33] w-24 h-10 rounded-md absolute top-12 right-6">
                <TouchableOpacity
                  className="flex-1 flex-row items-center justify-center px-5"
                  onPress={() => logout()}
                >
                  <Icon name="location-exit" color="white" size={18} />
                  <Text className="text-white ml-3">Sair</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
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
}
