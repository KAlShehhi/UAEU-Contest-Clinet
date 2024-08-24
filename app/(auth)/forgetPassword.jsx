import React, { useState } from 'react'
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { router } from 'expo-router'
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import CustomAlert from '../../components/CustomAlert';
import axios from 'axios'
import { connection } from '../../constants'


function forgetPassword() {
    const [form, setForm] = useState({
        email: "",
    });

    const [errors, setErrors] = useState([]);
    const [loading, isLoading] = useState(false);

    //Validation
    validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    
    const validate = () => {
        let errors = {};
        if((form.email.length === 0)) errors.email = "Please enter your email"
        if(!validateEmail(form.email)) errors.email = "Password enter a valid email"
        setErrors(errors)
        return Object.keys(errors).length === 0;
    }
    
    const submit = async () => {
        if (!validate()) return;
    
        const request = {
            method: 'GET',
            url: `${connection.serverURL}/user/forgetPassword/${form.email.toLocaleLowerCase()}`,
        };
    
        try {
            await axios(request)
                .then((response) => {
                    router.push({
                        pathname: 'enterResetCode',
                        params: { 
                            email: form.email.toLocaleLowerCase(), 
                        }
                    });
                })
                .catch((error) => {
                    let errors = {};
                    console.log(error.response.data);
                    errors.invalid = "Email not found";
                    setErrors(errors);
                });
        } catch (error) {
            let errors = {};
            errors.invalid = "Server Error";
            setErrors(errors);
        }
    };
    


    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <TouchableOpacity onPress={() => {router.back();}}>
                    <View className="flex-row items-center  align-middle">
                        <FontAwesomeIcon icon={faChevronLeft} style={{ color: "#CFCFCF",  padding: 9, marginLeft: 10}} />
                        <Text className="text-textColor font-lBold text-lg">Back</Text>
                    </View>
                </TouchableOpacity>
                <View className="w-full flex justify-center h-full px-4 my-6 " 
                    style={{
                        minHeight: Dimensions.get("window").height - 270,
                    }}>
                    <Text className="text-white text-3xl font-lBold">Forget Password</Text>
                    {errors.email ? <CustomAlert message={errors.email}/> : null}
                    {errors.password ? <CustomAlert message={errors.password}/> : null}
                    {errors.invalid ? <CustomAlert message={errors.invalid}/> : null}
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />
                    <CustomButton
                        title="Send verification code"
                        handlePress={submit}
                    />
                    <View className="border-primary-300 border-[0.8px] mx-3 mt-6"/>
                    <CustomButton
                        title="I already have a code"
                        handlePress={() => {router.push("enterResetCode")}}
                        isPrimaryAction={true}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default forgetPassword