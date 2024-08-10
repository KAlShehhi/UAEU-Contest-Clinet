import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Stack, router} from 'expo-router';
import CustomLayout from '../../components/CustomLayout';
import CustomDropdown from '../../components/CustomDropdown';
import CustomFormField from '../../components/CustomFormField';
import CustomButton from '../../components/CustomButton';
import CustomBinaryRadio from '../../components/CustomBinaryRadio';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomTimePicker from '../../components/CustomTimePicker';
import CustomAlert from '../../components/CustomAlert';
import dayjs from 'dayjs';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import CustomLoading from '../../components/CustomLoading';
import { connection } from '../../constants';

import { useLocalSearchParams } from 'expo-router';
const data = [
    { key: 0, name: "Workshop" },
    { key: 1, name: "Class" },
    { key: 2, name: "Event" },
    { key: 3, name: "Relaxation session" }
  ];
  

function editActivity() {
    const { name, activityId, type, expectedAttendees, building, room, campus, time, date } = useLocalSearchParams(); 
    const [errors, setErrors] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const [form, setForm] = useState({
        userId: SecureStore.getItem("userId"),
        token: SecureStore.getItem("token"),
        name: name,
        type: type,
        campus: campus,
        building: building,
        room: room,
        attendees: expectedAttendees,
        date: dayjs().format('DD/MM/YYYY'), 
        time: time,
      });

    const validateNumber = (str) => {
        return /^\d+$/.test(str);
    }
    
    const validate = () => {
        let errors = {};
        if (!form.name.replace(" ", "")) errors.name = "Name is required";
        if (!form.type) errors.type = "Type is required";
        if(!form.attendees){
          errors.attendees = "Attendees are required";
        }else if (!validateNumber(form.attendees)){
          errors.attendees = "Attendees cannot be a string";
        } 
        if (!form.building) errors.building = "Building is required";
        if (!form.room) errors.room = "Room is required";
        if (!form.campus) errors.room = "Campus is required";
        if (!form.date) errors.date = "Date is required";
        if (!form.time) errors.time = "Time is required";
    
        setErrors(errors);
        return Object.keys(errors).length === 0;
      };
    
      const handleSelect = (item) => {
        setSelectedItem(item);
        setForm({ ...form, type: item.name });
      };
    
      const handleDateChange = (date) => {
        const formattedDate = dayjs(date).format('DD/MM/YYYY');
        setForm({ ...form, date: formattedDate });
      };
    
      const setPick = (pick) => {
        setForm({ ...form, campus: pick });
      }

      const submit = async () => {
        if (!validate()) return;
        const updatedForm = { ...form, time: selectedTime };
        console.log(`${connection.serverURL}/activity/update/${activityId}`);
        const request = {
            method: 'put',
            url: `${connection.serverURL}/activity/update/${activityId}`,
            data: {
              userId: await SecureStore.getItemAsync('userId'),
              token: await SecureStore.getItemAsync('token'),
              name: updatedForm.name,
              type: updatedForm.type,
              expectedAttendees: updatedForm.attendees,
              building: updatedForm.building,
              room: updatedForm.room,
              campus: updatedForm.campus,
              time: updatedForm.time,
              date: updatedForm.date,
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
      };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <CustomLayout title={name} hasBack={true}>

            <CustomLoading isVisible={isLoading}/>
            {errors.name ? <CustomAlert message={errors.name}/> : null}
            {errors.type ? <CustomAlert message={errors.type}/> : null}
            {errors.attendees ? <CustomAlert message={errors.attendees}/> : null}
            {errors.building ? <CustomAlert message={errors.building}/> : null}
            {errors.room ? <CustomAlert message={errors.room}/> : null}
            {errors.date ? <CustomAlert message={errors.date}/> : null}
            {errors.time ? <CustomAlert message={errors.time}/> : null}
            <CustomFormField
                title="Name"
                otherStyles="mb-7"
                value={form.name}
                handleChangeText={(e) => setForm({ ...form, name: e })}
            />

        <CustomDropdown
          title="Choose the type of the activity"
          data={data}
          placeHolder="Select"
          onSelect={handleSelect}
          otherStyles="mb-7"
          initialPick={type}
        />
    
      <CustomFormField
          title="Expected attendees"
          otherStyles="mb-7"
          value={form.attendees}
          handleChangeText={(e) => setForm({ ...form, attendees: e })}
          keyboardType="numeric"
        />

        <View className="flex-row mb-7">
          <CustomFormField
            title="Building"
            otherStyles=" flex-1 pr-3"
            value={form.building}
            handleChangeText={(e) => setForm({ ...form, building: e })}
          />
          <CustomFormField
            title="Room"
            otherStyles="flex-1 pl-3"
            value={form.room}
            handleChangeText={(e) => setForm({ ...form, room: e })}
          />
        </View>
        <CustomBinaryRadio
          hasText={true}
          text="Campus"
          firstOption="Male"
          secondOption="Female"
          setParentPick={setPick}
          otherStyles="mb-8"
          initialPick={campus}
        />
        <CustomTimePicker setParentTime={setSelectedTime} initialTime={time}/>
        <CustomDatePicker onDateChange={handleDateChange} initialDate={date} />

        <CustomButton
          title="Edit activity"
          handlePress={submit}
          containerStyle="mb-20"
        />
            </CustomLayout>
        </>
    )
}

export default editActivity