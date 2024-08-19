import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

function CustomToast({ show, color, colorHEX, text, icon, loadingSign }) {
  if (!show) {
    return null;
  }

  return (
    <View style={{
      borderWidth: 2,
      borderColor: colorHEX,
      backgroundColor: `${colorHEX}1A`, // HEX with alpha for 10% opacity
      padding: 10,
      borderRadius: 20,
      flexDirection: 'row',
      marginVertical: 10
    }}>
      <View style={{ padding: 10 }}>
        {
          loadingSign ? <ActivityIndicator size={"large"} color={"#CFCFCF"}/> : <FontAwesomeIcon icon={icon} style={{ color: colorHEX, padding: 15, marginTop: 4, marginRight: 10 }} />
        }
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colorHEX, fontSize: 18, fontFamily: 'Lato-Bold' }}>{text}</Text>
      </View>
    </View>
  );
}

export default CustomToast;
