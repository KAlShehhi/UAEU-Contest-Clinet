import { Stack, router, useLocalSearchParams } from 'expo-router';
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import CustomLayout from '../../components/CustomLayout';
import ActivityItem from '../../components/ActivityItem';
import CustomLoading from '../../components/CustomLoading';
import { useState } from 'react';
import axios from 'axios'
import { connection } from '../../constants';
import * as SecureStore from 'expo-secure-store';

function deleteActivity() {
    const { name, activityId, type, expectedAttendees, building, room, campus, time, date, when } = useLocalSearchParams(); 
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({});
    const deleteItem = async () => {
        setIsLoading(true);
        const request = {
            method: 'delete',
            url: `${connection.serverURL}/activity/delete/${activityId}`,
            data: {
              userId: await SecureStore.getItemAsync('userId'),
              token: await SecureStore.getItemAsync('token'),
            }
          };
          try {
            const response = await axios(request);
            if (response.status === 200) {
              setIsLoading(false)
              router.back();
            } else {
              setErrors({ server: "Error connecting to the server" });
            }
          } catch (error) {
            setErrors({ server: "An error occurred" });
            console.error(error);
          }
    }

    return (
        <>
        <Stack.Screen options={{headerShown: false}}/>
        <CustomLayout title="Delete activity" hasBack={true}>
            <CustomLoading isVisible={isLoading}/>
            <ActivityItem
                name={name}
                type={type}
                attendees={expectedAttendees}
                building={building}
                room={room}
                campus={campus}
                time={time}
                date={date}
                when={when}
            />
            <View className="justify-center items-center pb-3 pt-9">
                <Text className="text-textColor text-2xl font-lBold">Are you sure you want to delete this activiy?</Text>
            </View>
            <View className="flex-row">
                <TouchableOpacity className="basis-1/2" activeOpacity={0.9} onPress={deleteItem}>
                    <View className="bg-errorRed p-4 m-3 rounded-2xl">
                        <Text className="text-2xl font-lBold text-center text-white"> Yes </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className="basis-1/2" activeOpacity={0.9} onPress={() => {router.back()}}>
                    <View className="bg-secondary p-4 m-3 rounded-2xl">
                        <Text className="text-2xl font-lBold text-center text-white"> No </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </CustomLayout>
        </>
    )
}

export default deleteActivity