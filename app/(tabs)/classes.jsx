import { ScrollView, View, Text, Alert, StyleSheet } from "react-native";
import React, { useRef, useMemo } from 'react';
import CustomLayout from "../../components/CustomLayout";
import CustomSegmentControlTab from "../../components/CustomSegmentControlTab";
import { useCallback, useState, useEffect } from "react";
import ActivityItemRegister from "../../components/ActivityItemRegister";
import { useFocusEffect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { connection } from "../../constants";
import CustomLoading from "../../components/CustomLoading";
import CustomDropdown from "../../components/CustomDropdown";
import CustomButtonNoStyle from "../../components/CustomButtonNoStyle";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import QRCode from 'react-native-qrcode-svg';

const classes = () => {
  const data = [
    { key: 0, name: "All" },
    { key: 1, name: "Workshop" },
    { key: 2, name: "Class" },
    { key: 3, name: "Event" },
    { key: 4, name: "Relaxation session" },
  ];


  const bottomSheetRef = useRef(null);

  // Define snap points for the BottomSheet
  const snapPoints = useMemo(() => ['60%'], []);

  // Function to show the BottomSheet
  const showBottomSheet = async (aId) => {
    setQrVale("")
    setQrVale(`${await SecureStore.getItem('userId')}-${aId}`)
    bottomSheetRef.current?.snapToIndex(0);
  };
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [unRegistered, setUnRegistered] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrVale, setQrVale] = useState("")
  const [selectedType, setSelectedType] = useState("All");

  const handleIndexChange = (index) => {
    setSelectedIndex(index);
  };

  const handleSelect = (item) => {
    setSelectedType(item.name);
  };

  const Register = async (activityId) => {
    setDisabled(true);
    setLoading(true);
    const url = `${connection.serverURL}/activity/registerUser/`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: await SecureStore.getItem('userId'),
        token: await SecureStore.getItem('token'),
        activityId,
      }),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw new Error('Bad Request');
        } else {
          throw new Error(`Unexpected status code: ${response.status}`);
        }
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        if (error.message === 'Bad Request') {
          Alert.alert('Error', error.message)
        } else {
          Alert.alert('Error', error.message)
        }
      });
    setLoading(false);
    getActivities();
    getRegisteredActivities();
  };

  const getActivities = async () => {
    try {
      setDisabled(false);
      setLoading(true);
      const bodyRequest = {
        userId: await SecureStore.getItem("userId"),
        token: await SecureStore.getItem("token"),
      };
      const url = `${connection.serverURL}/activity/getUnregisterdActivites/`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyRequest),
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setUnRegistered(data);

      // Filter activities based on selected type
      filterActivities(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getRegisteredActivities = async () => {
    try {
      setDisabled(false);
      setLoading(true);
      const bodyRequest = {
        userId: await SecureStore.getItem("userId"),
        token: await SecureStore.getItem("token"),
      };
      const url = `${connection.serverURL}/activity/getRegisteredActivities/`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyRequest),
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setRegistered(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };


  const filterActivities = (activities) => {
    if (selectedType === "All") {
      setFilteredActivities(activities);
    } else {
      const filtered = activities.filter(
        (activity) => activity.type === selectedType
      );
      setFilteredActivities(filtered);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getActivities();
      getRegisteredActivities();
    }, [])
  );

  useEffect(() => {
    // Filter activities whenever `unRegistered` or `selectedType` changes
    filterActivities(unRegistered);
  }, [unRegistered, selectedType]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <CustomLayout title="Activities">
      <CustomLoading isVisible={loading} />
      <CustomSegmentControlTab
        firstString="Register"
        secondString="Registered"
        selectedIndex={handleIndexChange}
      />
      {selectedIndex === 0 ? (
        <View>
          <CustomDropdown
            data={data}
            placeHolder="All"
            onSelect={handleSelect}
            otherStyles="mb-3"
            initialPick="All"
          />
          {filteredActivities.length === 0 ? (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text className="text-textColor font-lBold text-3xl">No activities available for the selected type....</Text>
            </View>
          ) : (
            <View>
              {filteredActivities.map((activity) => (
                <View key={activity._id}>
                  <ActivityItemRegister
                    type={activity.type}
                    name={activity.name}
                    time={activity.time}
                    date={activity.date}
                    points={activity.points}
                    building={activity.building}
                    room={activity.room}
                    campus={activity.campus}
                    attendees={activity.attendees}
                    expectedAttendees={activity.expectedAttendees}
                    cFname={activity.coachId.firstName}
                    cLname={activity.coachId.lastName}
                    handlePress={() => {
                      Register(activity._id);
                    }}
                    disabled={disabled}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      ) : (
        <View>
          {registered.map((activity) => (
                <View key={activity._id}>
                  <ActivityItemRegister
                    type={activity.type}
                    name={activity.name}
                    time={activity.time}
                    date={activity.date}
                    points={activity.points}
                    building={activity.building}
                    room={activity.room}
                    campus={activity.campus}
                    attendees={activity.attendees}
                    expectedAttendees={activity.expectedAttendees}
                    cFname={activity.coachId.firstName}
                    cLname={activity.coachId.lastName}
                    attendanceBtn={true}
                    showBottomSheet={() => {
                      showBottomSheet(activity._id)
                    }}
                    disabled={disabled}
                  />
                </View>
              ))}
        </View>
      )}

    </CustomLayout>

    <BottomSheet
        ref={bottomSheetRef}
        index={-1} // Initial state is closed
        snapPoints={snapPoints}
        enablePanDownToClose={true} // Enable swipe-to-close
        backgroundStyle={{ backgroundColor: '#494949'}}
        handleIndicatorStyle={{ backgroundColor: '#FFF'}}
     >
      <View className="flex-1 items-center">
            <View>
              <View className="bg-primary border-primary-300 m-2 border-2 rounded-2xl p-3">
                <Text className="text-lg text-textColor font-lBold py-3">Show this QR code to your coach to attend this activity</Text>
                <View className="items-center justify-center align-middle">
                  <QRCode
                  backgroundColor={'#383838'}
                  color="#99C35F"
                  size={300}
                  value={qrVale || " "}
                  />
                </View>
              </View>


            </View>
      </View>
      </BottomSheet>

    </GestureHandlerRootView >
  );
};



export default classes;
