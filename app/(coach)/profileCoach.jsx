import { router } from "expo-router";
import { ScrollView, View, Text } from 'react-native'
import CustomButton from '../../components/CustomButton'

import * as SecureStore from 'expo-secure-store';
import CustomLayout from "../../components/CustomLayout";

const logout = async() => {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('userId');
    router.replace("/sign-in");
}
function ProfileCoach() {
  return (

    <CustomLayout title="Profile">
        <CustomButton
            title="Logout"
            handlePress={logout}
            
        />
    </CustomLayout>
  )
}

export default ProfileCoach