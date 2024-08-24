import { connection } from "../../constants";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import CustomAlert from "../../components/CustomAlert";
import React, { useState } from "react";
import { Alert, Dimensions, SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomTextAlert from "../../components/CustomTextAlert";
import { router, useLocalSearchParams } from 'expo-router';

const resetPassword = () => {
    const { email } = useLocalSearchParams(); 
	const [passwordRules, setPasswordRules] = useState({});
    const [errors, setErrors] = useState({});
	const [form, setForm] = useState({
		password: "",
		confirmPassword: "",
	});

	//Validate form
	const validate = () => {
		let errors = {};
		if (form.password.length === 0) errors.password = "Please enter a password";
		if (form.password != form.confirmPassword)
			errors.password = "Password and Confirm password do not match";
		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	//Validate password strength
	hasUpperCase = (str) => {
		const uppercasePattern = /[A-Z]/;
		return uppercasePattern.test(str);
	};

	hasLowerCase = (str) => {
		const uppercasePattern = /[a-z]/;
		return uppercasePattern.test(str);
	};

	hasNumber = (str) => {
		const numberPattern = /\d/;
		return numberPattern.test(str);
	};

	hasSpecialChar = (str) => {
		const specialCharPattern = /[!@#$%^&*(),.?":{}|<>_-]/;
		return specialCharPattern.test(str);
	};

	const validatePassword = (password) => {
		let passwordRules = {};
		if (password.length < 8) passwordRules.lengthPass = true;
		if (!hasLowerCase(password)) passwordRules.lowerCase = true;
		if (!hasUpperCase(password)) passwordRules.upperCase = true;
		if (!hasNumber(password)) passwordRules.hasNumber = true;
		if (!hasSpecialChar(password)) passwordRules.hasSpecialChar = true;
		setPasswordRules(passwordRules);
	};

    const submit = async () => {
        if (!validate()) return;
        try {
            const url = `${connection.serverURL}/user/resetPassword`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: form.password,
                }),
            });
    
            console.log("Response status:", response.status); // Log the status code
            console.log("Response body:", await response.text()); // Log the response body as text
    
            if (response.status === 200) {
                // Success: Navigate to sign-in page
                router.replace('sign-in');
            } else {
                const data = await response.json();
                Alert.alert("Error", data.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.log("Error:", error); // Log any errors caught
            Alert.alert("Server Error", "Unable to connect to the server. Please check your internet connection and try again.");
        }
    };
    

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View
					className="w-full flex justify-center h-full px-4 my-6 "
					style={{
						minHeight: Dimensions.get("window").height - 270,
					}}
				>
					<Text className="text-white text-3xl font-lBold">Reset Password</Text>
					{passwordRules.lengthPass ? (
						<CustomTextAlert text="Password must be 8 characters long" />
					) : null}
					{passwordRules.lowerCase ? (
						<CustomTextAlert text="Password must contain a lower case character" />
					) : null}
					{passwordRules.upperCase ? (
						<CustomTextAlert text="Password must contain a upper case character" />
					) : null}
					{passwordRules.hasNumber ? (
						<CustomTextAlert text="Password must contain a number" />
					) : null}
					{passwordRules.hasSpecialChar ? (
						<CustomTextAlert text="Password must contain a special character" />
					) : null}

                    {errors.password ? <CustomAlert message={errors.password}/> : null}
					<FormField
						title="Password"
						value={form.password}
						handleChangeText={(e) => {
							setForm({ ...form, password: e });
							validatePassword(e);
						}}
						otherStyles="mt-5"
						isPassword={true}
					/>
					<FormField
						title="Confirm password"
						value={form.confirmPassword}
						handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
						otherStyles="mt-5"
						isPassword={true}
					/>
                    <CustomButton
                        title="Reset password"
                        handlePress={submit}
                    />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default resetPassword;
