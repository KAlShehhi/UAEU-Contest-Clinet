import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { icons } from "../../constants/";
import { faTrophy } from "@fortawesome/free-solid-svg-icons/faTrophy";
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-1 pt-4">
      <FontAwesomeIcon icon={icon} style={{ color: `${color}`, padding: 12 }} />
      <Text
        className={`${focused ? "font-lBold" : "font-lRegular"} text-sm`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#99C35F",
          tabBarInactiveTintColor: "#CFCFCF",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#383838",
            borderTopWidth: 1,
            borderTopColor: "#99C35F",
            height: 85,
          },
        }}
      >
        <Tabs.Screen
          name="control"
          options={{
            title: "Contol",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={faGear}
                color={color}
                name="Control"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="tallyAdmin"
          options={{
            title: "Tally",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={faTrophy}
                color={color}
                name="Tally"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profileAdmin"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={faUser}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;
