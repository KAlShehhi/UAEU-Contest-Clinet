import React from 'react'
import { Text, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

function ActivityItemDetail({icon, text, value}) {
  return (
    <View className=" bg-primary rounded-2xl items-center w-40 py-3">
        <FontAwesomeIcon icon={icon} style={{ color: "#CFCFCF", padding: 17, marginTop: 2,}}/>
        <Text className="text-base font-lBold text-textColor mt-2">{text}</Text>
        <View className="border-textColor border-2 w-10 mt-2  border-b-0"/>
        <Text className="text-lg font-lRegular text-textColor mt-2">{value}</Text>
    </View>
  )
}

export default ActivityItemDetail