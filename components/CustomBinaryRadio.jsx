import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck'
import { faSquare as faSquareRegular } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';

function CustomBinaryRadio({ 
    text, 
    firstOption, 
    secondOption, 
    hasText, 
    otherStyles, 
    setParentPick, 
    initialPick 
}) {
    const [firstSelected, setFirstSelected] = useState(false);
    const [secondSelected, setSecondSelected] = useState(false);

    // Set initial selection based on the parent component's choice
    useEffect(() => {
        if (initialPick === firstOption) {
            setFirstSelected(true);
            setParentPick(firstOption);
        } else if (initialPick === secondOption) {
            setSecondSelected(true);
            setParentPick(secondOption);
        }
    }, [initialPick]);

    return (
        <View className={`flex-row h-16 w-full items-center ${otherStyles}`}>
            {hasText && (
                <Text className="text-textColor font-lBold text-2xl pr-4">
                    {text}
                </Text>
            )}

            <View className="flex-1 border-primary-300 border-2 rounded-2xl bg-primary">
                <View className="flex-row p-4 justify-center">
                    <TouchableOpacity 
                        className="flex-row items-center" 
                        activeOpacity={1} 
                        onPress={() => {
                            setFirstSelected(true);
                            setSecondSelected(false);
                            setParentPick(firstOption);
                        }}
                    >
                        {firstSelected ? 
                            <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#99C35F", padding: 15 }} /> 
                            : 
                            <FontAwesomeIcon icon={faSquareRegular} style={{ color: "#494949", padding: 15 }} />
                        }
                        <Text className="text-textColor font-lRegular text-lg px-4">
                            {firstOption}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        className="flex-row items-center" 
                        activeOpacity={1} 
                        onPress={() => {
                            setFirstSelected(false);
                            setSecondSelected(true);
                            setParentPick(secondOption);
                        }}
                    >
                        {secondSelected ? 
                            <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#99C35F", padding: 15 }} /> 
                            : 
                            <FontAwesomeIcon icon={faSquareRegular} style={{ color: "#494949", padding: 15 }} />
                        }
                        <Text className="text-textColor font-lRegular text-lg px-4">
                            {secondOption}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default CustomBinaryRadio;