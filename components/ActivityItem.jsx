import { Text, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons/faCircleQuestion'
import { faBuilding } from '@fortawesome/free-solid-svg-icons/faBuilding'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons/faUserGroup'
import { faVenusMars} from '@fortawesome/free-solid-svg-icons/faVenusMars'
import { faClock} from '@fortawesome/free-solid-svg-icons/faClock'
import ActivityItemDetail from './ActivityItemDetail';

function ActivityItem({name, date, time, type, building, room, attendees, campus, when, right}) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <TouchableOpacity
                className="pt-3"
                activeOpacity="100"
                onPress={() => {
                    if(isOpen) setIsOpen(false)
                    if(!isOpen) setIsOpen(true)
                }}
            >
                <View className={`${isOpen ?  "border-secondary  rounded-t-2xl" : "border-primary-300 rounded-2xl"}  border-2 bg-primary p-4  flex-row justify-between`}>
                    <View>
                        <Text className="font-lBold text-textColor text-2xl">{name}</Text>
                        <Text className="font-lRegular text-textColor text-base">{date} - {time}</Text>
                    </View>
                    <View className="justify-center">
                        {
                            isOpen ? 
                                <FontAwesomeIcon icon={faChevronUp} style={{ color: "#99C35F", padding: 15, marginTop: 4, marginRight: 10 }}/>
                            :  
                                <FontAwesomeIcon icon={faChevronDown} style={{ color: "#CFCFCF", padding: 15, marginTop: 4, marginRight: 10 }}/>
                        }
                    </View>
                </View>
            </TouchableOpacity>
            <View className={`${isOpen ? null : "hidden"} border-x-secondary border-b-secondary border-t-primary-200 border-2 py-2 rounded-b-2xl`}>
                <View className="flex flex-row flex-wrap justify-evenly items-center ">
                    <ActivityItemDetail
                        className="w-2/5 p-2 bg-gray-700 rounded-lg flex items-center justify-center mb-2"
                        icon={faCircleQuestion}
                        text="Type"
                        value={type}
                    />  
                    <ActivityItemDetail
                        className="w-2/5 p-2 bg-gray-700 rounded-lg flex items-center justify-center mb-2"
                        icon={faUserGroup}
                        text="Participants"
                        value={attendees}
                    />  
                </View>
                <View className="flex flex-row flex-wrap justify-evenly items-center pt-2">
                    <ActivityItemDetail
                        className="w-2/5 p-2 bg-gray-700 rounded-lg flex items-center justify-center mb-2"
                        icon={faBuilding }
                        text="Building"
                        value={building}
                    />  
                    <ActivityItemDetail
                        className="w-2/5 p-2 bg-gray-700 rounded-lg flex items-center justify-center mb-2"
                        icon={ faLocationDot}
                        text="Room"
                        value={room}
                    />  
                </View>
                <View className="flex flex-row flex-wrap justify-evenly items-center pt-2">
                    <ActivityItemDetail
                        className="w-2/5 p-2 bg-gray-700 rounded-lg flex items-center justify-center mb-2"
                        icon={faVenusMars }
                        text="Campus"
                        value={campus}
                    />  
                    <ActivityItemDetail
                        className="w-2/5 p-2 bg-gray-700 rounded-lg flex items-center justify-center mb-2"
                        icon={ faClock}
                        text="When"
                        value={when}
                    />  
                </View>
            </View>


        </>
    )
}

export default ActivityItem