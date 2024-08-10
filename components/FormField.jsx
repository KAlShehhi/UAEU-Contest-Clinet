import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";


const FormField = ({title, value, placeholder, handleChangeText, otherStyles, isPassword, ...props}) => {

    const [showPassword, setShowPassword] = useState(false);
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className='text-textColor font-lBold text-lg'>{title}</Text>
            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-primary-200 focus:border-secondary flex flex-row items-center">
                <TextInput
                    className="flex-1 text-white font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7B7B8B"
                    onChangeText={handleChangeText}
                    secureTextEntry={isPassword == true  && !showPassword}
                    {...props}
                />

                {isPassword == true && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image
                    source={!showPassword ? icons.eye : icons.eyeHide}
                    className="w-6 h-6"
                    resizeMode="contain"
                    />
                </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField