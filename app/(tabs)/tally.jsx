import { Stack, useFocusEffect } from "expo-router";
import { ScrollView, View, Text } from "react-native";
import CustomLayout from "../../components/CustomLayout";
import TallyUser from "../../components/TallyUser";
import { useCallback, useState } from "react";
import { connection } from "../../constants";
import CustomLoading from "../../components/CustomLoading";

const tally = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getUsers = async () => {
    try {
      setIsLoading(true);
      const url = `${connection.serverURL}/tally/getTop20`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setIsLoading(false);
    }
  };

  // Refetch activities when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      getUsers();
    }, [])
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <CustomLoading isVisible={isLoading} />
      <CustomLayout title="Tally">
        <View className={`${users > 0 ? "justify-center items-center" : null}`}>
          {users.length > 0 ? (
            users.map((user) => (
              <View key={user._id}>
                <TallyUser
                  name={user.firstName + " " + user.lastName}
                  place={user.place}
                  points={user.points}
                />
              </View>
            ))
          ) : (
            <View>
              <Text className="text-2xl text-textColor font-lBold">
                {" "}
                There are no users :({" "}
              </Text>
            </View>
          )}
        </View>
      </CustomLayout>
    </>
  );
};

export default tally;
