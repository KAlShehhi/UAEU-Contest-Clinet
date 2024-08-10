import { View, Text } from 'react-native'
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation'

const CustomTextAlert = ({text}) => {
  return (
    <View className="mt-3 mb-2">
        <Text className="font-lBold text-errorRed">
            <FontAwesomeIcon icon={faCircleExclamation} style={{color: "#ED4337", marginRight: 10,}}/> 
            {text}
        </Text>
    </View>
  )
}

export default CustomTextAlert