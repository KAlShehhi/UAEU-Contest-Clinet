import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
function CustomDatePicker({ onDateChange, initialDate }) {
  const initialDateObj = initialDate
      ? new Date(initialDate.split('/')[2], initialDate.split('/')[1] - 1, initialDate.split('/')[0])
      : dayjs().toDate();
  const [date, setDate] = useState(initialDateObj);

  useEffect(() => {
      onDateChange(date);
  }, [date]);

  const handleDateChange = (params) => {
      const selectedDate = params.date || dayjs().toDate();
      setDate(selectedDate);
      onDateChange(selectedDate);
  };
  const yesterday = new Date();
 
  return (
      <>
          <Text className="text-textColor font-lBold text-2xl pb-2 pt-7">Date</Text>
          <View className="p-4 bg-primary-100 border-primary-300 border-2 rounded-2xl">
              <DateTimePicker
                  mode="single"
                  date={date}
                  minDate={ yesterday.setDate(yesterday.getDate() - 1)}
                  onChange={handleDateChange}
                  selectedItemColor="#99C35F"
                  headerButtonColor="#CFCFCF"
                  calendarTextStyle={{ color: "#CFCFCF" }}
                  headerTextStyle={{ color: "#CFCFCF" }}
                  weekDaysTextStyle={{ color: "#CFCFCF" }}
                  monthContainerStyle={{ backgroundColor: "#494949", color: "#000000" }}
                  yearContainerStyle={{ backgroundColor: "#494949" }}
              />
          </View>
      </>
  );
}
export default CustomDatePicker