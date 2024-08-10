import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Stack, router} from 'expo-router';
import CustomLayout from '../../components/CustomLayout';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp'
import ActivityItem from '../../components/ActivityItem';
import CustomSegmentControlTab from '../../components/CustomSegmentControlTab';
import { connection } from '../../constants';
import * as SecureStore from 'expo-secure-store';
import CustomLoading from '../../components/CustomLoading';

function viewActivites() {

    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleIndexChange = (index) => {
      setSelectedIndex(index);
    };

    const [completedActivities, setCompletedActivities] = useState([]);
    const [upcomingActivities, setUpcomingActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getActivities = async () => {
            try {
                const userID = await SecureStore.getItem('userId');
                const url = `${connection.serverURL}/activity/getCoachActivities/${userID}`;
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setCompletedActivities(data.completed || []);
                setUpcomingActivities(data.upcoming || []);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(error);
                setLoading(false);
            }
        };

        getActivities();
    }, [connection.serverURL]);

    
    

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <CustomLoading
                isVisible={loading}
            />
            <CustomLayout
                title="View activites"
                hasBack={true}
            >
                <CustomSegmentControlTab
                    firstString="Upcoming"
                    secondString="Completed"
                    selectedIndex={handleIndexChange}
                />
                    {selectedIndex === 0 ?
                        <View>
                            {
                                upcomingActivities.map(up => (
                                    <View key={up._id}>
                                        <ActivityItem
                                            name={up.name}
                                            date={up.date}
                                            time={up.time}
                                            type={up.type}
                                            attendees={up.expectedAttendees}
                                            building={up.building}
                                            room={up.room}
                                            campus={up.campus}
                                            when={up.when}
                                        />
                                    </View>
                                ))
                            }
                        </View>
                    :
                        <View>
                            {
                                completedActivities.map(comp => (
                                    <View key={comp._id}>
                                        <ActivityItem
                                         name={comp.name}
                                         date={comp.date}
                                         time={comp.time}
                                         type={comp.type}
                                         attendees={comp.expectedAttendees}
                                         building={comp.building}
                                         room={comp.room}
                                         campus={comp.campus}
                                         when="Done"
                                        />
                                    </View>
                                ))
                            }
                        </View> 
                    }

            </CustomLayout>
        </>
  )
}


export default viewActivites