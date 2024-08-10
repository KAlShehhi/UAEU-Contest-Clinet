import { Platform, Pressable, Text, TextInput, View } from 'react-native'
import { useState, useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from './CustomButton';

function CustomTimePicker({ setParentTime, otherStyles, initialTime }) {
  const parseTime = (timeString) => {
      const [time, modifier] = timeString.split(' ');
      let [hours, minutes] = time.split(':');
      
      hours = parseInt(hours, 10);

      if (modifier === 'PM' && hours < 12) {
          hours += 12;
      }
      if (modifier === 'AM' && hours === 12) {
          hours = 0;
      }

      const date = new Date();
      date.setHours(hours);
      date.setMinutes(parseInt(minutes, 10));
      date.setSeconds(0);
      date.setMilliseconds(0);
      
      return date;
  };

  const [time, setTime] = useState(initialTime ? parseTime(initialTime) : new Date());
  const [showTime, setShowTime] = useState(false);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  useEffect(() => {
      setParentTime(formattedTime);
  }, [time]);

  const toggleTimePicker = () => {
      setShowTime(!showTime);
  };

  const onChange = (event, selectedDate) => {
      if (selectedDate) {
          setTime(selectedDate);
      }
      if (Platform.OS === "android") {
          toggleTimePicker();
      }
  };

  const confirmIOSDate = () => {
      toggleTimePicker();
  };

  return (
      <View className={`${otherStyles}`}>
          <View className="flex-row items-center">
              <Text className="font-lBold text-textColor text-2xl pr-10"> Time </Text>
              {showTime && (
                  <DateTimePicker
                      mode='time'
                      display='spinner'
                      value={time}
                      onChange={onChange}
                      textColor='#CDCDCD'
                      style={{ height: 120, marginTop: -10 }}
                  />
              )}
              {!showTime && (
                  <Pressable onPress={toggleTimePicker} className="flex-1">
                      <TextInput
                          className="w-full bg-primary border-primary-300 border-2 rounded-2xl p-4 text-lg font-lRegular text-textColor"
                          placeholder='10:00 AM'
                          placeholderTextColor={"#CFCFCF"}
                          value={formattedTime}
                          editable={false}
                          onPressIn={toggleTimePicker}
                      />
                  </Pressable>
              )}
          </View>
          {showTime && Platform.OS === "ios" && (
              <CustomButton
                  title="Confirm time"
                  containerStyle="ml-20"
                  handlePress={confirmIOSDate}
              />
          )}
      </View>
  );
}

export default CustomTimePicker;