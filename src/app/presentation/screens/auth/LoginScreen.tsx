import React, { useState } from 'react'
import { Image, Keyboard, Text, TouchableOpacity, View } from 'react-native'
import { useAuthContext } from '../../states/useAuthContext'
import { Input } from '../../components/Input'
import { ICredentials } from '../../../domain/usecases/auth/loginUsecase'

export const LoginScreen = () => {
  const { login, error, setError } = useAuthContext()
  const [credentials, setCredentials] = useState<ICredentials>({
    user: '',
    password: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleError = ({
    input,
    message,
  }: {
    input: string
    message: string
  }) => setErrors((errors) => ({ ...errors, [input]: message }))

  const validate = (): boolean => {
    Keyboard.dismiss()

    const { user, password } = credentials

    if (!user || !password) {
      if (!user) {
        handleError({ input: 'user', message: 'Informe o usuário' })
      }

      if (!password) {
        handleError({ input: 'password', message: 'Informe a senha' })
      }

      return false
    }

    return true
  }

  return (
    <View className="flex-1 items-center justify-center bg-[#16171B] px-5">
      <Image source={require('../../../../../assets/images/logo.png')} />
      <Input
        placeholder="Usuário"
        error={errors.user}
        onChangeText={(text) =>
          setCredentials((credentials) => ({
            ...credentials,
            user: text,
          }))
        }
        onFocus={() => {
          handleError({ input: 'user', message: '' })
          setError('')
        }}
      />
      <Input
        secureTextEntry
        placeholder="Senha"
        error={errors.password}
        onChangeText={(text) =>
          setCredentials((credentials) => ({
            ...credentials,
            password: text,
          }))
        }
        onFocus={() => {
          handleError({ input: 'password', message: '' })
          setError('')
        }}
      />
      {!!error && <Text className="text-red-600 w-full mt-3">{error}</Text>}
      <TouchableOpacity
        className="bg-[#EC8B00] rounded-full w-full h-10 items-center justify-center mt-12 mb-6"
        onPress={() => {
          const isValid = validate()

          if (isValid) {
            login(credentials)
          }
        }}
      >
        <Text className="text-white">Entrar</Text>
      </TouchableOpacity>
      <Text className="text-white">Esqueci a senha</Text>
    </View>
  )
}
