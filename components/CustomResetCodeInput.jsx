import React, { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

const CustomResetCodeInput = ({ setResetCode }) => {
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);
    const input5Ref = useRef(null);
    const [code, setCode] = useState("");

    const handleInputChange = (text, currentInputRef, nextInputRef) => {
        if (text.length === 1) {
            if (nextInputRef) {
                nextInputRef.current.clear();
                nextInputRef.current.focus();
            }
            // Update the code state
            setCode((prevCode) => {
                const newCode = prevCode + text;
                setResetCode(newCode);
                return newCode;
            });
        }
    };

    return (
        <View className="flex-row justify-center">
            <TextInput
                ref={input1Ref}
                className="border-b-2 border-primary-300 mx-3 w-12 text-center p-4 focus:border-secondary font-lBold text-textColor text-3xl"
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(text) => handleInputChange(text, input1Ref, input2Ref)}
            />
            <TextInput
                ref={input2Ref}
                className="border-b-2 border-primary-300 mx-3 w-12 text-center p-4 focus:border-secondary font-lBold text-textColor text-3xl"
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(text) => handleInputChange(text, input2Ref, input3Ref)}
            />
            <TextInput
                ref={input3Ref}
                className="border-b-2 border-primary-300 mx-3 w-12 text-center p-4 focus:border-secondary font-lBold text-textColor text-3xl"
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(text) => handleInputChange(text, input3Ref, input4Ref)}
            />
            <TextInput
                ref={input4Ref}
                className="border-b-2 border-primary-300 mx-3 w-12 text-center p-4 focus:border-secondary font-lBold text-textColor text-3xl"
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(text) => handleInputChange(text, input4Ref, input5Ref)}
            />
            <TextInput
                ref={input5Ref}
                className="border-b-2 border-primary-300 mx-3 w-12 text-center p-4 focus:border-secondary font-lBold text-textColor text-3xl"
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(text) => handleInputChange(text, input5Ref, null)}
            />
        </View>
    );
};

export default CustomResetCodeInput;
