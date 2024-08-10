import { useState, useEffect, useCallback } from 'react'
import CustomLayout from '../../components/CustomLayout'
import { Stack, router, useFocusEffect } from 'expo-router'
import ActivityItemMinimal from '../../components/ActivityItemMinimal'
import { connection } from '../../constants';
import * as SecureStore from 'expo-secure-store';
import { Text, View } from 'react-native';
import CustomLoading from '../../components/CustomLoading';

function editActivityList() {
    const [upcomingActivities, setUpcomingActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getActivities = async () => {
        try {
            const userID = await SecureStore.getItem('userId');
            const url = `${connection.serverURL}/activity/getCoachActivities/${userID}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setUpcomingActivities(data.upcoming || []);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError(error);
            setLoading(false);
        }
    };

    // Refetch activities when the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            getActivities();
        }, [])
    );

  return (
    <>
        <Stack.Screen options={{ headerShown: false }} />
        <CustomLayout
            title="Edit activity"
            hasBack={true}
            noScrollView={false}

        >
            <CustomLoading
                isVisible={loading}
            />
            <View className={`${upcomingActivities > 0 ? "justify-center items-center" : null}`}>
                {
                    upcomingActivities.length > 0 ?  
                        upcomingActivities.map(up => (
                            <View key={up._id}>
                                <ActivityItemMinimal
                                    name={up.name}
                                    date={up.date}
                                    time={up.time}
                                    onPress={() => {
                                        router.push({
                                            pathname: 'coachSubPages/editActivity',
                                            params: { 
                                                name: up.name, 
                                                date: up.date,
                                                time: up.time,
                                                type: up.type,
                                                building: up.building,
                                                room: up.room,
                                                campus: up.campus,
                                                expectedAttendees: up.expectedAttendees,
                                                activityId: up._id 
                                            }
                                        });
                                    }}
                                />
                            </View>
                        ))
                     : 
                     <View>
                        <Text className="text-2xl text-textColor font-lBold"> You have no activites </Text>
                    </View>
                }
            </View>
        </CustomLayout>
    </>
  )
}

export default editActivityList