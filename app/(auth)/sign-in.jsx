import { View, Text, ScrollView, Dimensions, Alert} from 'react-native'
import { Link, router } from "expo-router";
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connection } from '../../constants';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import * as SecureStore from 'expo-secure-store';
import CustomAlert from '../../components/CustomAlert';
import axios from 'axios'

const SignIn = () => {
  //UseStates 
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  //Validation
  validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const validate = () => {
    let errors = {};
    if((form.email.length === 0)) errors.email = "Please enter your email"
    if(form.password.length === 0 ) errors.password = "Please enter a password"
    if(!validateEmail(form.email)) errors.email = "Password enter a valid email"
    setErrors(errors)
    return Object.keys(errors).length === 0;
  }
  
  const submit = async () => {
    if(!validate()) return null
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('userId');

    const request = {
      method: 'post',
      url: `${connection.serverURL}/user/login`,
      data: {
        email: form.email,
        password: form.password
      }
    };
    //Response
    try {
      let errors = {};
      await axios(request).then(async (response) => {
        const token = String(response.data.token);
        const userId = String(response.data.userId);
        const role = String(response.data.role);
        await SecureStore.setItemAsync('token', token);
        await SecureStore.setItemAsync('userId', userId);
        if(role === 'USER') router.replace("/home");
        if(role === 'COACH') router.replace("/homeCoach");
   
      }).catch((error) => {
        errors.invalid = "Invalid email or password";
        setErrors(errors);
      });
    } catch (error) {
      errors.invalid = "Server Error";
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView>
            <View className="w-full flex justify-center h-full px-4 my-6 " 
                style={{
                  minHeight: Dimensions.get("window").height - 270,
                }}>
                <Text className="text-white text-3xl font-lBold">Sign in</Text>
                {errors.email ? <CustomAlert message={errors.email}/> : null}
                {errors.password ? <CustomAlert message={errors.password}/> : null}
                {errors.invalid ? <CustomAlert message={errors.invalid}/> : null}
                {errors.serverError ? <CustomAlert message={errors.serverError}/> : null}
                <FormField
                  title="Email"
                  value={form.email}
                  handleChangeText={(e) => setForm({ ...form, email: e })}
                  otherStyles="mt-7"
                  keyboardType="email-address"
                />
                <FormField
                  title="Password"
                  value={form.password}
                  handleChangeText={(e) => setForm({ ...form, password: e })}
                  otherStyles="mt-7"
                  isPassword={true}
                />
                <Text className="text-textColor pt-3 text-right font-lBold">Forget Password?</Text>
                <CustomButton
                  title="Login"
                  handlePress={submit}
                />
                <Text className="text-textColor font-lBold text-center pt-3 text-lg">
                  Don't have an account? { }
                  <Link className="text-secondary" href="/sign-up"> Sign up </Link> 
                </Text>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn