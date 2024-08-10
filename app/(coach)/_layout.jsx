import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { icons } from '../../constants/'

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="flex items-center justify-center gap-1 pt-4">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-7 h-7"
            />
            <Text className={`${focused ? "font-lBold" : "font-lRegular"} text-sm`} style={{color : color}}>
                {name}
            </Text>
        </View>
    );
}


function CoachLayout() {
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
          name="homeCoach"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            )
          }}
        />

        <Tabs.Screen
          name="tallyCoach"
          options={{
            title: "Tally",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.trophy}
                color={color}
                name="Tally"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="profileCoach"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.profile}
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

export default CoachLayout