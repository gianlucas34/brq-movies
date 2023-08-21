import { Text, TextInput, TextInputProps, View } from 'react-native'

interface IInput {
  icon?: React.ReactNode
  error?: string
}

export const Input = ({ error, icon, ...props }: IInput & TextInputProps) => {
  return (
    <View className="w-full">
      <View
        className={`bg-[#49454F] h-12 rounded-sm mt-6 items-center pl-3 border-b-[1px] flex-row ${
          !!error ? 'border-red-600' : 'border-white'
        } focus:border-[#EC8B00]`}
      >
        {icon}
        <TextInput
          className={`flex-1 text-white ${!!icon ? 'ml-3' : ''}`}
          placeholderTextColor="white"
          {...props}
        />
      </View>
      {!!error && <Text className="text-red-600 w-full mt-1">{error}</Text>}
    </View>
  )
}
