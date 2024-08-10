import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation'
const CustomAlert = ({message, type}) => {
  return (
    <View className="px-2 my-4">
        <View className="h-12 px-4 bg-errorRed rounded-2xl flex flex-row items-center ">
            <FontAwesomeIcon icon={faCircleExclamation} style={{color: "#FFFFFF", marginRight: 10}}/>
            <Text className="font-lBold text-white">{message}</Text>
        </View>
    </View>

  )
}

export default CustomAlert