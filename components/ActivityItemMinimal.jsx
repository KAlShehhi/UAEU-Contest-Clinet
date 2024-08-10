import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'

function ActivityItemMinimal({name, date, time, onPress}) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} className="pb-3">
        <View className="border-primary-300 rounded-2xl  border-2 bg-primary p-4  flex-row justify-between">
            <View>
                <Text className="font-lBold text-textColor text-2xl">{name}</Text>
                <Text className="font-lRegular text-textColor text-base">{date} - {time}</Text>
            </View>
            <View className="justify-center">
                <FontAwesomeIcon icon={faChevronRight} style={{ color: "#CFCFCF", padding: 15, marginTop: 4, marginRight: 10 }}/>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default ActivityItemMinimal