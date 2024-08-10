import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft'
import { router } from 'expo-router'
import { useEffect } from 'react'

const CustomLayout = ({ title, children, hasBack, noScrollView, otherStyles }) => {
  return (
    <View className="bg-primary h-full">
        <View className="bg-secondary rounded-br-3xl">
          <View className="flex-row pt-20 pl-2 pb-2">
            <TouchableOpacity 
              className={`${hasBack ? "" : "hidden"}`}
              onPress={() => router.back()}
              >
              <View>
                <FontAwesomeIcon icon={faChevronLeft} style={{ color: "#FFFFFF",  padding: 15, marginTop: 4, marginRight: 10}} />
              </View>
            </TouchableOpacity>
            <Text className="text-white text-4xl font-lBold">{title}</Text>
          </View>
        </View>
        {
          noScrollView ? 
            <View className="p-3">
              <View className="bg-primary-200 rounded-lg p-3 ">
                {children}
              </View>
            </View>
          :
            <ScrollView className="p-3">
              <View className={`h-full bg-primary-200 rounded-lg p-3 ${otherStyles}`}>
                  {children}
              </View>
            </ScrollView>
        }
    </View>
  )
}

export default CustomLayout