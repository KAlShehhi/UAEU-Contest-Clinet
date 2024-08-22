import React, { useMemo, useRef, useState } from "react";
import CustomLayout from "../../components/CustomLayout";
import CustomBigButton from "../../components/CustomBigButton";
import CustomFormField from "../../components/CustomFormField";
import { faPersonWalking } from "@fortawesome/free-solid-svg-icons/faPersonWalking";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { Alert, Modal, View, Text, StyleSheet } from "react-native";
import { connection } from "../../constants";
import * as SecureStore from "expo-secure-store";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";

function control() {
    const [form, setForm] = useState({
        email: "",
    });
    const [borderColor, setBorderColor] = useState('#696969'); 
    const [validEmail, setValidEmail] = useState(true)

    const handleInputChange = (field, value) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i;

        if (emailPattern.test(value)) {
            setValidEmail(true)
            setBorderColor("#696969")
        } else {
            setValidEmail(false)
            setBorderColor("#ED4337")
        }
    
        setForm(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };

    const snapPoints = useMemo(() => ["40%"], []);
    const bottomSheetRef = useRef(null);
    const showBottomSheet = async () => {
        bottomSheetRef.current?.snapToIndex(0);
    }

    const makeCoach = async () => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i;
        if (emailPattern.test(form.email)) {
            try {
                const userId = await SecureStore.getItem("userId");
                const token = await SecureStore.getItem("token");
                const url = `${connection.serverURL}/admin/makeCoach`;
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ 
                        userId,
                        token,
                        email: form.email
                    }),
                });
                if (!response.ok) {
                    throw new Error("Failed to reset points");
                }
                Alert.alert("Success", "User role changed to Coach.");
            } catch (error) {
                Alert.alert("Error", error.message);
            }
        }
    }


	const resetAllPoints = async () => {
		try {
			const userId = await SecureStore.getItem("userId");
			const token = await SecureStore.getItem("token");

			Alert.alert(
				"Reset all points",
				"Are you sure you want to reset all points for ALL users?",
				[
					{
						text: "Yes",
						onPress: async () => {
							try {
								const url = `${connection.serverURL}/admin/clearPoints`;
								const response = await fetch(url, {
									method: "POST",
									headers: {
										Accept: "application/json",
										"Content-Type": "application/json",
									},
									body: JSON.stringify({ userId, token }),
								});
								if (!response.ok) {
									throw new Error("Failed to reset points");
								}
								// Handle success (e.g., show a success message)
								Alert.alert("Success", "All points have been reset.");
							} catch (error) {
								// Handle fetch error
								Alert.alert("Error", error.message);
							}
						},
					},
					{
						text: "No",
						style: "cancel",
					},
				]
			);
		} catch (error) {
			Alert.alert("Error", error.message);
		}
	};
	return (
        <GestureHandlerRootView>
<CustomLayout title="Control Panel">
			<CustomBigButton
				icon={faPersonWalking}
				text={"Make a user a coach"}
                handlePress={() => {showBottomSheet()}}
			/>
			<CustomBigButton
				icon={faStar}
				text={"Reset all points"}
				handlePress={() => {
					resetAllPoints();
				}}
			/>

		</CustomLayout>
        <BottomSheet 
            snapPoints={snapPoints} 
            index={-1}  
            ref={bottomSheetRef}
            enablePanDownToClose={true} 
            backgroundStyle={{ backgroundColor: '#494949'}}
            handleIndicatorStyle={{ backgroundColor: '#FFF'}}
            >
            <View  className="p-3">
                <Text className="text-textColor font-lRegular text-lg pb-3">Enter the email of the user you want to change thier role to 'Coach'</Text>
                {
                    validEmail ? null : <Text className="text-errorRed font-lRegular text-sm pb-3">Invalid Email</Text>
                }
                <BottomSheetTextInput             
                    value={form.email}
                    style={[styles.textInput, { borderColor }]} // Apply dynamic border color
                    onChangeText={(text) => handleInputChange('email', text)}
                />
                <CustomButton title={"Submit"} handlePress={() => {makeCoach()}}/>
            </View>
            </BottomSheet>
        </GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: "grey",
    },
    textInput: {
      alignSelf: "stretch",
      marginHorizontal: 3,
      padding: 12,
      borderRadius: 12,
      borderColor: "#696969",
      borderWidth: 2,
      backgroundColor: "#383838",
      color: "white",
      textAlign: "center",
    },
    contentContainer: {
      flex: 1,
      alignItems: "center",
    },
})

export default control;
