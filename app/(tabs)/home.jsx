import { ScrollView, View, Text } from "react-native";
import CustomLayout from "../../components/CustomLayout";
import { faShoePrints } from "@fortawesome/free-solid-svg-icons/faShoePrints";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";




function home() {
  return (
    <CustomLayout title="Home">
      <View className="flex-row space-x-4 mb-4">
        <View className="bg-primary p-4 rounded-2xl flex-1">
          <View className="items-end">
            <FontAwesomeIcon
              icon={faCircleInfo}
              style={{ color: "#99C35F", padding: 10 }}
            />
          </View>
          <View className="items-center">
            <View className="border-secondary/100 border-2 rounded-full p-6 m-2">
              <FontAwesomeIcon
                icon={faShoePrints}
                style={{ color: "#99C35F", padding: 30 }}
              />
            </View>
          </View>
          <View className="pt-2">
            <Text className="text-white text-center font-lBold">
              Today's steps
            </Text>
            <Text className="text-white text-center font-lBold text-3xl">
              3000
            </Text>
          </View>
        </View>

        <View className="bg-primary p-4 rounded-2xl flex-1">
          <View className="items-end">
            <FontAwesomeIcon
              icon={faCircleInfo}
              style={{ color: "#99C35F", padding: 10 }}
            />
          </View>
          <View className="items-center">
            <View className="border-secondary/100 border-2 rounded-full p-6 m-2">
              <FontAwesomeIcon
                icon={faHeart}
                style={{ color: "#99C35F", padding: 30 }}
              />
            </View>
          </View>
          <View className="pt-2">
            <Text className="text-white text-center font-lBold">
              Avg. heart rate
            </Text>
            <Text className="text-white text-center font-lBold text-3xl">
              80 bpm
            </Text>
          </View>
        </View>
      </View>
    </CustomLayout>
  );
}

export default home;
