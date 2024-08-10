import React from 'react'
import { ActivityIndicator, Modal, View, Text } from 'react-native'

function CustomLoading({isVisible}) {
  return (
    <Modal
        animationType='slide'
        transparent={true}
        visible={isVisible}>
      <View className="flex-1 justify-center items-center mt-10">
        <View className="m-10 bg-primary-100 p-10 rounded-2xl border-2 border-secondary">
            <ActivityIndicator size={'large'}  color={"#99C35F"}/>
            <Text className="text-secondary pt-5 text-lg font-lBold">Loading</Text>
        </View>
      </View>
  </Modal>
  )
}

export default CustomLoading