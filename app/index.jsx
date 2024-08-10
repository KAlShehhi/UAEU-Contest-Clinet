import React, { useEffect, useState } from 'react'
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, Image, Text, View } from 'react-native'
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import * as SecureStore from 'expo-secure-store';
import { connection } from '../constants';
import axios from 'axios'
import CustomLoading from '../components/CustomLoading';

const Welcome = () => {
    const [loading, setLoading] = useState(false);

    //Verify logged in user
    useEffect(() => {
        const checkUser = async () => {
            const token = await SecureStore.getItemAsync('token');
            const userId = await SecureStore.getItemAsync('userId');
            if (token && userId) {
                setLoading(true);
                try {
                    const response = await axios.post(`${connection.serverURL}/user/verifyToken`, { token });
                    if (response.status === 200) {
                        try {
                            const userResponse = await axios.get(`${connection.serverURL}/user/getUserRole/${userId}`);
                            if (userResponse.status === 200) {
                                const role = userResponse.data.role;
                                setLoading(false);
                                console.log(token);
                                console.log(userId);
                                  if (role === 'USER') return router.replace("/home");
                                  if (role === 'COACH') return router.replace("/homeCoach");
                                  //if (role === 'COACH') return router.replace("coachSubPages/deleteActivity");
                            }
                        } catch (error) {
                            setLoading(false);
        
                            return
                        }
                    }
                } catch (error) {
                    console.error("Token verification failed:", error);
                    return
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    return (
        <View className="flex-1 bg-primary">
        <View className="flex-1">
          <Image
            source={images.uaeuMap}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <CustomLoading isVisible={loading}/>
        <View className="px-3 pb-20 mt-10">
          <Text className="text-secondary font-lLight text-lg ">YOUR FITNESS APP</Text>
          <Text className="text-white font-lBold text-4xl pt-3">
            Welcome
            <Text className="font-lLight text-3xl"> to the UAEU 2024 Fitness Challenge</Text>
          </Text>
          <CustomButton
            title="Continue with email"
            handlePress={() => router.push("/sign-in")}
          />
        </View>
      </View>
    );
};

export default Welcome
