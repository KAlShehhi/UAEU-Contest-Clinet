import React, { useState, useEffect } from 'react'
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp'

function CustomDropdown({ title, data, placeHolder, onSelect, otherStyles, initialPick = null }) {
    const [visible, setVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedString, setSelectedString] = useState(placeHolder);

    useEffect(() => {
        if (initialPick) {
            const selectedItem = data.find(item => item.name === initialPick);
            if (selectedItem) {
                setSelectedId(selectedItem.key);
                setSelectedString(selectedItem.name);
            }
        }
    }, [initialPick]);

    const handleItemPress = (key) => {
        setSelectedId(key);
        const selectedItem = data.find(item => item.key === key);
        if (selectedItem) {
            setSelectedString(selectedItem.name);
            if (onSelect) onSelect(selectedItem); // Notify parent about the selected item
        }
        setVisible(false); // Optionally hide dropdown after selection
    };

    return (
        <View className={`space-y-0 ${otherStyles}`}>
            <Text className='text-textColor font-lBold text-2xl'>{title}</Text>
            <TouchableOpacity onPress={() => { setVisible(!visible) }} activeOpacity={1}>
                <View className={`flex-row w-full h-16 px-4 bg-primary border-2 ${visible ? "border-secondary rounded-t-2xl" : "border-primary-300 rounded-2xl"} flex items-center`}>
                    <Text className="text-textColor font-lBold text-lg flex-1">{selectedString}</Text>
                    <View className="w-6">
                        {visible
                            ? <FontAwesomeIcon icon={faChevronUp} style={{ color: "#99C35F", padding: 15, marginTop: 4, marginRight: 10 }} />
                            : <FontAwesomeIcon icon={faChevronDown} style={{ color: "#696969", padding: 15, marginTop: 4, marginRight: 10 }} />}
                    </View>
                </View>
                {visible && (
                    <View className={`border-2 bg-primary rounded-b-2xl border-x-secondary border-b-secondary border-t-0 w-full`}>
                        <View>
                            {data.map(item => (
                                <TouchableOpacity key={item.key} onPress={() => handleItemPress(item.key)}>
                                    <View style={{ padding: 5, borderBottomWidth: 0, borderBottomColor: '#99C35F' }}>
                                        <Text className="font-lRegular text-white p-4 text-lg">{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
}

export default CustomDropdown;