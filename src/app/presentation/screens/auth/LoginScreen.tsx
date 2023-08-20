import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useAuthContext } from '../../states/useAuthContext'

export const LoginScreen = () => {
  const { login, error } = useAuthContext()

  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity
        className="bg-black rounded w-3/12 h-7 items-center justify-center"
        onPress={() => login({ user: 'a', password: '1' })}
      >
        <Text className="text-white">Entrar</Text>
      </TouchableOpacity>
      {!!error && <Text>{error}</Text>}
    </View>
  )
}
