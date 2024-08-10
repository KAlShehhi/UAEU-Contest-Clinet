import { View, Text, ScrollView, Dimensions, Alert} from 'react-native'
import { Link, router } from "expo-router";
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connection } from '../../constants';
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import CustomAlert from '../../components/CustomAlert';
import CustomLoading from '../../components/CustomLoading';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation'
import CustomTextAlert from '../../components/CustomTextAlert';

const SignUp = () => {

  //useStates
  const [errors, setErrors] = useState({});
  const [loading, isLoading] = useState(false);
  const [passwordRules, setPasswordRules] = useState({})
  const [form, setForm] = useState({
    firstName : "",
    lastName : "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  
  //Validate form
  const validate = () => {
    let errors = {};
    if((form.firstName.length === 0)) errors.firstName = "Please enter your first name"
    if((form.lastName.length === 0)) errors.lastName = "Please enter your last name"
    if((form.email.length === 0)) errors.email = "Please enter your email"
    if(form.password.length === 0 ) errors.password = "Please enter a password"
    if(!validateEmail(form.email)) errors.email = "Password enter a valid email"
    if((form.password != form.confirmPassword)) errors.password = "Password and Confirm password do not match"
    setErrors(errors)
    return Object.keys(errors).length === 0;
  }


  //Validate password strength
  hasUpperCase = (str) => {
    const uppercasePattern = /[A-Z]/;
    return uppercasePattern.test(str);
  }
  
  hasLowerCase = (str) =>  {
    const uppercasePattern = /[a-z]/;
    return uppercasePattern.test(str);
  }
  
  hasNumber = (str) => {
    const numberPattern = /\d/;
    return numberPattern.test(str);
  }

  hasSpecialChar = (str) => {
    const specialCharPattern  = /[!@#$%^&*(),.?":{}|<>_-]/;
    return specialCharPattern.test(str);
  }

  const validatePassword = (password) => {
    let passwordRules = {};
    if(password.length < 8) passwordRules.lengthPass = true
    if(!(hasLowerCase(password))) passwordRules.lowerCase = true
    if(!(hasUpperCase(password))) passwordRules.upperCase = true
    if(!(hasNumber(password))) passwordRules.hasNumber = true
    if(!(hasSpecialChar(password))) passwordRules.hasSpecialChar = true
    setPasswordRules(passwordRules)
  }

  const submit = async () => {
    if(!validate()) return null
    if(Object.keys(passwordRules) != 0) return null;
    isLoading(loading);
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('userId');
    //Request server
    const request = {
      method: 'post',
      url: `${connection.serverURL}/user/register`,
      data: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password
      }
    };
    //Response
    try {
      const response = await axios(request);
      if (response.status === 201) {
        const token = String(response.data.token);
        const userId = String(response.data.userId);
        await SecureStore.setItemAsync('token', token);
        await SecureStore.setItemAsync('userId', userId);
        router.replace("/home");
      } else if (response.status === 400) {
        setErrors({ server: "Bad request. Please check the input and try again." });
      } else {
        setErrors({ server: "Error connecting to the server" });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors({ server: "Email already in use" });
      } else {
        setErrors({ server: "An error occurred" });
        console.error(error);
      }
    }
    
    
    isLoading(false);
  }

  return (
  <SafeAreaView className="bg-primary h-full">
    <ScrollView>
      <View className="w-full flex justify-center h-full px-4" >
        <CustomLoading isVisible={loading}/>
        <Text className="text-white text-3xl font-lBold">Sign Up</Text>
        {errors.firstName ? <CustomAlert message={errors.firstName}/> : null}
        {errors.lastName ? <CustomAlert message={errors.lastName}/> : null}
        {errors.email ? <CustomAlert message={errors.email}/> : null}
        {errors.password ? <CustomAlert message={errors.password}/> : null}
        {errors.server ? <CustomAlert message={errors.server}/> : null}
        <FormField
            title="First name"
            value={form.firstName}
            handleChangeText={(e) => setForm({ ...form, firstName: e })}
            otherStyles="mt-5"
          />
        <FormField
            title="Last name"
            value={form.lastName}
            handleChangeText={(e) => setForm({ ...form, lastName: e })}
            otherStyles="mt-5"
          />
        <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-5 mb-2"
            keyboardType="email-address"
          />
          {passwordRules.lengthPass ? <CustomTextAlert text="Password must be 8 characters long"/>: null}
          {passwordRules.lowerCase ? <CustomTextAlert text="Password must contain a lower case character"/>: null}
          {passwordRules.upperCase ? <CustomTextAlert text="Password must contain a upper case character"/>: null}
          {passwordRules.hasNumber ? <CustomTextAlert text="Password must contain a number"/>: null}
          {passwordRules.hasSpecialChar ? <CustomTextAlert text="Password must contain a special character"/>: null}
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => {
              setForm({ ...form, password: e })
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
            title="Sign up"
            handlePress={submit}
          />
          <Text className="text-textColor font-lBold text-center pt-3 text-lg">
            Have an account? { }
            <Link className="text-secondary" href="/sign-in"> Log in </Link> 
          </Text>
        </View>
      </ScrollView>
  </SafeAreaView>
  )
}

export default SignUp