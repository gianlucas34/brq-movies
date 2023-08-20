import { Text, TextInput, TextInputProps, View } from 'react-native'

interface IInput {
  error?: string
}

export const Input = ({ error, ...props }: IInput & TextInputProps) => {
  return (
    <View className="w-full">
      <View className="bg-[#49454F] h-12 rounded-sm mt-6 justify-center border-b-[1px] border-white focus:border-[#EC8B00]">
        <TextInput
          className="text-white"
          placeholderTextColor="white"
          {...props}
        />
      </View>
      {!!error && <Text className="text-red-600 w-full mt-1">{error}</Text>}
    </View>
  )
}
