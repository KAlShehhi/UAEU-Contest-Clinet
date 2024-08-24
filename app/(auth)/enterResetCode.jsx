import { View, Text, ScrollView, Dimensions, Alert, TouchableOpacity, TextInput} from 'react-native'
import { Link, router } from "expo-router";
import { useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connection } from '../../constants';
import CustomResetCodeInput from '../../components/CustomResetCodeInput';
import CustomButton from '../../components/CustomButton';
import CountdownTimer from '../../components/CountdownTimer';
import { useLocalSearchParams } from 'expo-router';
import FormField from '../../components/FormField';
import CustomAlert from '../../components/CustomAlert';

const enterResetCode = () => {
    const [resetCode, setResetCode] = useState("");
    const { email } = useLocalSearchParams(); 
    const [form, setForm] = useState({
        emailInput: "",
    });
    const handleCountdownFinish = () => {};
    const handleResetCode = (code) => {
        setResetCode(code);
    };


    const [errors, setErrors] = useState([]);

    validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    
    const validate = () => {
        let errors = {};
        if((form.emailInput.length === 0)) errors.email = "Please enter your email"
        setErrors(errors)
        return Object.keys(errors).length === 0;
    }
    

    const submitCode = async () => {
        console.log(resetCode.length);
        if(resetCode.length != 5){
            let errors = {};
            console.log(12333);
            errors.resetCodeLength = "Please enter a reset code"
            setErrors(errors)
            return;
        }
        const url = `${connection.serverURL}/user/submitResetCode`;
        if (email) {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        resetCode: resetCode,
                    }),
                });
    
                if (response.status === 200) {
                    router.push({
                        pathname: 'resetPassword',
                        params: { 
                            email: email, 
                        }
                    });
                } else {
                    const data = await response.json();
                    Alert.alert("Error", data.message || "Something went wrong. Please try again.");
                }
            } catch (error) {
                Alert.alert("Server Error", "Unable to connect to the server. Please check your internet connection and try again.");
            }
        } else {
            console.log(123);
            try {
                if(validate()){
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: form.emailInput.toLocaleLowerCase(),
                            resetCode: resetCode,
                        }),
                    });
        
                    if (response.status === 200) {
                        router.push({
                            pathname: 'resetPassword',
                            params: { 
                                email: form.emailInput.toLocaleLowerCase(), 
                            }
                        });
                    } else {
                        const data = await response.json();
                        Alert.alert("Error", data.message || "Something went wrong. Please try again.");
                    }
                }
            } catch (error) {
                Alert.alert("Server Error", "Unable to connect to the server. Please check your internet connection and try again.");
            }
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
                    <Text className="text-white text-3xl font-lBold">Enter your reset code</Text>
                    {email ? <Text className="text-white text-base font-lRegular">Sent to: {email}</Text> : null}
                    {errors.email ? <CustomAlert message={errors.email}/> : null}
                    {errors.resetCodeLength ? <CustomAlert message={errors.resetCodeLength}/> : null}
                    {errors.invalid ? <CustomAlert message={errors.invalid}/> : null}
                    {!email 
                        ? 
                        
                            <FormField
                            title="Email"
                            value={form.emailInput}
                            handleChangeText={(e) => setForm({ ...form, emailInput: e })}
                            otherStyles="mt-7"
                            keyboardType="email-address"
                            />
                        :
                            null
                    }
                    <CustomResetCodeInput setResetCode={handleResetCode} otherStyles="pt-4"/>
                    {email 
                        ?                 
                            <View className="justify-end items-end">
                                <CountdownTimer onFinish={handleCountdownFinish} email={email} />
                            </View>
                        : 
                            null    
                    }
                    <CustomButton 
                        title={"Submit"}
                        handlePress={()=>{submitCode()}}
                    />
                </View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default enterResetCode;
