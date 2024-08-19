import React, { useRef, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
  faChalkboardUser, faCouch, faCalendarCheck, 
  faUsersGear, faStar, faBuilding, faLocationDot, 
  faUserGroup, faVenusMars, faClock, faCalendarDays, faPersonChalkboard 
} from '@fortawesome/free-solid-svg-icons';
import BottomSheet from '@gorhom/bottom-sheet';

function ActivityItemRegister({ 
  type, name, building, room, campus, points, time, date, attendees, 
  expectedAttendees, cFname, cLname, handlePress, disabled, attendanceBtn, showBottomSheet
}) {
  return (
    <View className="pb-3">
      <View className="border-2 border-primary-300 p-2 rounded-t-2xl flex-row bg-primary">
        {type === "Class" && (
          <View className="basis-1/4 justify-center items-center">
            <FontAwesomeIcon icon={faChalkboardUser} style={{ color: "#99C35F", padding: 25 }} />
            <Text className="text-xs font-lLight text-secondary">{type}</Text>
          </View>
        )}
        {type === "Workshop" && (
          <View className="basis-1/4 justify-center items-center">
            <FontAwesomeIcon icon={faUsersGear} style={{ color: "#99C35F", padding: 25 }} />
            <Text className="text-xs font-lLight text-secondary">{type}</Text>
          </View>
        )}
        {type === "Event" && (
          <View className="basis-1/4 justify-center items-center">
            <FontAwesomeIcon icon={faCalendarCheck} style={{ color: "#99C35F", padding: 25 }} />
            <Text className="text-xs font-lLight text-secondary">{type}</Text>
          </View>
        )}
        {type === "Relaxation session" && (
          <View className="basis-1/4 justify-center items-center">
            <FontAwesomeIcon icon={faCouch} style={{ color: "#99C35F", padding: 25 }} />
            <Text className="text-xs font-lLight text-secondary">Relaxation</Text>
          </View>
        )}
        <View className="basis-1/2 justify-center">
          <Text className="text-textColor font-lBold text-lg">{name}</Text>
        </View>
        <View className="basis-1/4 justify-center items-center flex-row">
          <FontAwesomeIcon icon={faStar} style={{ color: "#FFCA42", padding: 12 }} />
          <Text className="text-textColor font-lRegular text-lg pl-1">{points}</Text>
        </View>
      </View>
      <View className="border-2 border-primary-300 border-t-0 flex-row bg-primary">
        <View className="basis-1/2 p-1 border-y-primary border-l-primary border-r-primary-300 border-2 flex-row space-x-2 items-center">
          <View className="items-center pl-2">
            <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#CFCFCF", padding: 10 }} />
            <Text className="text-xs font-lLight text-textColor">Date</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-textColor font-lRegular text-base">{date}</Text>
          </View>
        </View>
        <View className="basis-1/2 p-3 border-y-primary border-l-primary flex-row space-x-2 items-center">
          <View className="items-center pl-1">
            <FontAwesomeIcon icon={faClock} style={{ color: "#CFCFCF", padding: 10 }} />
            <Text className="text-xs font-lLight text-textColor">Time</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-textColor font-lRegular text-base">{time}</Text>
          </View>
        </View>
      </View>
      <View className="border-2 border-primary-300 border-t-0 flex-row bg-primary">
        <View className="basis-1/2 p-1 border-y-primary border-l-primary border-r-primary-300 border-2 flex-row space-x-2 items-center">
          <View className="items-center">
            <FontAwesomeIcon icon={faBuilding} style={{ color: "#CFCFCF", padding: 10 }} />
            <Text className="text-xs font-lLight text-textColor">Building</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-textColor font-lRegular text-base">{building}</Text>
          </View>
        </View>
        <View className="basis-1/2 p-3 border-y-primary border-l-primary flex-row space-x-2 items-center">
          <View className="items-center">
            <FontAwesomeIcon icon={faLocationDot} style={{ color: "#CFCFCF", padding: 10 }} />
            <Text className="text-xs font-lLight text-textColor">Room</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-textColor font-lRegular text-base">{room}</Text>
          </View>
        </View>
      </View>
      <View className="border-2 border-primary-300 border-t-0 flex-row bg-primary">
        <View className="basis-1/2 p-1 border-y-primary border-l-primary border-r-primary-300 border-2 flex-row space-x-2 items-center">
          <View className="items-center">
            <FontAwesomeIcon icon={faVenusMars} style={{ color: "#CFCFCF", padding: 10 }} />
            <Text className="text-xs font-lLight text-textColor">Campus</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-textColor font-lRegular text-base">
              {campus === "MALE" ? "Male" : "Female"}
            </Text>
          </View>
        </View>
        <View className="basis-1/2 p-3 border-y-primary border-l-primary flex-row space-x-2 items-center">
          <View className="items-center">
            <FontAwesomeIcon icon={faUserGroup} style={{ color: "#CFCFCF", padding: 10 }} />
            <Text className="text-xs font-lLight text-textColor">Registered</Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-textColor font-lRegular text-base">{attendees}/{expectedAttendees}</Text>
          </View>
        </View>
      </View>

      {/* Bottom section with instructor info and action button */}
      <View className="border-2 border-primary-300 border-t-0 flex-row rounded-b-2xl bg-primary">
        <View className="flex-row basis-3/5 items-center pl-2 p-3">
          <FontAwesomeIcon icon={faPersonChalkboard} style={{ color: "#CFCFCF", padding: 13 }} />
          <Text className="text-textColor font-lRegular text-lg pl-3">{cFname} {cLname}</Text>
        </View>
        {attendanceBtn ? (
          <View className="basis-2/5">
            <TouchableOpacity
              onPress={showBottomSheet}
              activeOpacity={0.7}
              className={`bg-secondary rounded-xl p-1 m-2 justify-center items-center ${disabled ? 'opacity-50' : ''}`}
            >
              <Text className="text-primary font-lBold text-base">Attend</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="basis-2/5">
            {attendees < expectedAttendees && (
              <TouchableOpacity
                onPress={handlePress}
                activeOpacity={0.7}
                className={`bg-secondary rounded-xl p-1 m-2 justify-center items-center ${disabled ? 'opacity-50' : ''}`}
              >
                <Text className="text-primary font-lBold text-base">Register</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

export default ActivityItemRegister;
