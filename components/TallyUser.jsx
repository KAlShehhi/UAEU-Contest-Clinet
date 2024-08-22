import React from 'react'
import { View, Text } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'


function TallyUser({place, name, points}) {
  return (
    <>
    <View className="flex-row items-center p-3">
        {place === 1 ?         
        <View className="w-1/7 items-center">
            <FontAwesomeIcon icon={faTrophy} style={{ color: "#EBCC29" , padding: 15}} />
        </View>
        : null
        }
        {place === 2 ?         
        <View className="w-1/7 items-center">
            <FontAwesomeIcon icon={faTrophy} style={{ color: "#B5B5B5" , padding: 15}} />
        </View>
        : null
        }
        {place === 3 ?         
        <View className="w-1/7 items-center">
            <FontAwesomeIcon icon={faTrophy} style={{ color: "#A5683C" , padding: 15}} />
        </View>
        : null
        }
        {place > 3 ?         
        <View className="w-1/7 items-center">
            <Text className="font-lBold text-textColor text-lg">#{place}</Text>
        </View>
        : null
        }
        <View className="flex-grow mx-5">
            <Text className="font-lBold text-textColor text-lg truncate">
                {name}
            </Text>
        </View>

        {/* Star and points section, fixed width */}
        <View className="w-auto flex-row items-center">
            <FontAwesomeIcon icon={faStar} style={{ color: "#FFCA42", marginRight: 10 , padding: 10 }} />
            <Text className="font-lBold text-textColor text-lg">{points}</Text>
        </View>
    </View>
    <View className="border-secondary border-[0.8px] mx-3"/>
    </>
  )
}

export default TallyUser