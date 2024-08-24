import React, { useEffect, useState } from 'react';
import { Text, View, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowsRotate} from '@fortawesome/free-solid-svg-icons/faArrowsRotate'
import { connection } from '../constants';

const CountdownTimer = ({ onFinish, email }) => {
    const [secondsLeft, setSecondsLeft] = useState(300); 
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        if (secondsLeft > 0) {
            const timerId = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
            return () => clearTimeout(timerId); // Cleanup timeout on unmount or when secondsLeft changes
        } else {
            onFinish(); // Trigger the onFinish callback when countdown reaches zero
        }
    }, [secondsLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleResendCode = async () => {
        setIsResending(true);
        try {
            await axios.get(`${connection.serverURL}/user/forgetPassword/${email}`);
            setSecondsLeft(300);
        } catch (error) {
            console.error("Failed to resend code:", error);
        } finally {
            setIsResending(false);
        }
    };

    return (
        <View className="flex-row p-2">
            {secondsLeft > 0 ? (
                <Text className="font-lBold text-textColor text-lg">
                    {formatTime(secondsLeft)}
                </Text>
            ) : (
                <TouchableOpacity onPress={handleResendCode} disabled={isResending}>
                    {isResending ? (
                        <ActivityIndicator size="small" color="#CFCFCF" />
                    ) : (
                        <View className="flex-row align-middle items-center pt-3">
                            <FontAwesomeIcon icon={faArrowsRotate} style={{ color: "#CFCFCF", marginRight: 10 }} />
                            <Text className="font-lBold text-textColor text-lg underline">
                                Re-send
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            )}
        </View>
    );
};

export default CountdownTimer;
