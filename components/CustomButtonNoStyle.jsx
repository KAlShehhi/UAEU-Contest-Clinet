import { TouchableOpacity, Text, View } from 'react-native'


function CustomButtonNoStyle({handlePress,containerStyle,isLoading, textStyles, title}) {
  return (
    <View className={`${containerStyle}`}>
        <TouchableOpacity 
                onPress={handlePress}
                activeOpacity={0.7}
                className={`bg-secondary  rounded-xl min-h-[62px] justify-center items-center  ${isLoading ? 'opacity-50' : ''} `}
            >
            <Text className={`text-primary font-lBold text-lg ${textStyles}`}>{title}</Text>
            </TouchableOpacity>
    </View>

  )
}

export default CustomButtonNoStyle