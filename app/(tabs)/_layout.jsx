import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { icons } from '../../constants/'
import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy'
import { faHome} from '@fortawesome/free-solid-svg-icons/faHome'
import { faPersonWalking} from '@fortawesome/free-solid-svg-icons/faPersonWalking'
import { faUser} from '@fortawesome/free-solid-svg-icons/faUser'


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-1 pt-4">
      <FontAwesomeIcon icon={icon} style={{ color: `${color}` , padding: 12}} />
      <Text className={`${focused ? "font-lBold" : "font-lRegular"} text-sm`} style={{color : color}}>
        {name}
      </Text>
    </View>
  );
}

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#99C35F',
          tabBarInactiveTintColor: '#CFCFCF',
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#383838',
            borderTopWidth: 1,
            borderTopColor: '#99C35F',
            height: 85,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={faHome}
                color={color}
                name="Home"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="classes"
          options={{
            title: "Activites",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={faPersonWalking}
                color={color}
                name="Activites"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="tally"
          options={{
            title: "Tally",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={faTrophy}
                color={color}
                name="Tally"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={faUser}
                color={color}
                name="Profile"
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}

export default TabLayout