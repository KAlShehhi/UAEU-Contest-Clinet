import { router } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import CustomButton from "../../components/CustomButton";
import * as SecureStore from "expo-secure-store";
import CustomLayout from "../../components/CustomLayout";
import { SvgXml } from "react-native-svg";  // Correct import
import { connection } from "../../constants";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons/faRotate'

const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("userId");
    router.replace("/sign-in");
};

const profile = () => {
    const [svgData, setSvgData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [avatarLoading, setAvatarLoading] = useState(false);
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = await SecureStore.getItem('userId');
                const response = await fetch(`${connection.serverURL}/user/getUser/${userId}`);
                const data = await response.json();
                setSvgData(data.profilePicture); 
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleAvatarChange = async () => {
        setAvatarLoading(true);
        try {
            const userId = await SecureStore.getItem('userId');
            const response = await fetch(`${connection.serverURL}/user/changeAvatar/${userId}`);
            const data = await response.json();
            setSvgData(data.user.profilePicture); // Update only the profile picture
        } catch (err) {
            setError(err.message);
        } finally {
            setAvatarLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <CustomLayout title="Profile">
            <View className="flex-row">
                <View>
                    {svgData ? (
                        <>
                            <View className="border-secondary border-2 rounded-full">
                                <SvgXml xml={svgData} width="75" height="75" />
                            </View>
                            <View className="absolute">
                                <TouchableOpacity
                                    className={`bg-secondary  rounded-xl justify-center items-center mt-2 p-2 left-14 top-10 border-primary-300 border-2`}
                                    onPress={handleAvatarChange}
                                    disabled={avatarLoading}
                                >
                                    {avatarLoading ? (
                                        <ActivityIndicator color="#FFFFFF" />
                                    ) : (
                                        <FontAwesomeIcon icon={faRotate} style={{ color: "#FFFFFF", }} size={10} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <Text>No Profile Picture</Text>
                    )}
                </View>
                
                <View className="align-middle justify-center pl-5">
                    <Text className="text-textColor font-lBold text-2xl">{user.firstName} {user.lastName}</Text>
                    <View className="border-[0.8px] border-textColor" />
                    <Text className="text-textColor font-lBold text-sm">{user.email}</Text>
                </View>
            </View>
            <View></View>
            <CustomButton title="Logout" handlePress={logout} />
        </CustomLayout>
    );
};

export default profile;
