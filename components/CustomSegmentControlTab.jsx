import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

function CustomSegmentControlTab({ firstString, secondString, selectedIndex }) {
    const [firstSelected, setFirstSelected] = useState(true);
    const [secondSelected, setSecondSelected] = useState(false);

    // Ensure selectedIndex is a function
    const handleIndexChange = (index) => {
        if (typeof selectedIndex === 'function') {
            selectedIndex(index);
        }
    };

    return (
        <View className="flex-row mb-4">
            <TouchableOpacity 
                className={`basis-1/2 items-center px-5 py-1 rounded-l-2xl 
                    ${firstSelected ? "bg-secondary border-0" : "border-x-primary-300 border-y-primary-300 border-2"}`}
                activeOpacity={1}
                onPress={() => {
                    if (!firstSelected) {
                        setSecondSelected(false);
                        setFirstSelected(true);
                        handleIndexChange(0);
                    }
                }}
            >
                <View>
                    <Text className={`font-lBold text-lg ${
                        firstSelected ? "text-white" : "text-primary-300"
                    }`}>{firstString}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity  
                className={`basis-1/2 items-center px-5 py-1 rounded-r-2xl 
                    ${secondSelected ? "bg-secondary border-0" : "border-x-primary-300 border-y-primary-300 border-2"}`}
                activeOpacity={1}
                onPress={() => {
                    if (!secondSelected) {
                        setSecondSelected(true);
                        setFirstSelected(false);
                        handleIndexChange(1);
                    }
                }}
            >
                <View>
                    <Text className={`font-lBold text-lg ${
                        secondSelected ? "text-white" : "text-primary-300"
                    }`}>{secondString}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default CustomSegmentControlTab;
