import { ScrollView, View, Text } from 'react-native'

const tally = () => {
  return (
    <View className="bg-primary h-full">
        <View className="bg-secondary rounded-br-3xl">
            <Text className="text-white text-4xl font-lBold pt-20 pl-2 pb-2">Tally</Text>
        </View>
        <ScrollView>
            <Text>123123</Text>
        </ScrollView>
    </View>
  )
}

export default tally