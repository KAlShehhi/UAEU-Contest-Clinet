import CustomLayout from "../../components/CustomLayout";
import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faUserXmark } from "@fortawesome/free-solid-svg-icons/faUserXmark";
import { faX } from "@fortawesome/free-solid-svg-icons/faX";
import CustomToast from "../../components/CustomToast";

function takeAttendance() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [disableScanning, setDisableScanning] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleBarCodeScanned = ({ type, data }) => {
    if (!disableScanning) {
      setDisableScanning(true);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <CustomLayout title="Edit activity" hasBack={true} noScrollView={true}>
        <View className="h-full w-full">
          {/* <CustomToast
            icon={faCheck}
            colorHEX={"#99C35F"}
            text={"User scanned"}
            show={true}
          />
          <CustomToast
            icon={faUserXmark}
            colorHEX={"#FF5733"}
            text={"User already scanned"}
            show={true}
          />
          <CustomToast
            icon={faX}
            colorHEX={"#ED4337"}
            text={"Error"}
            show={true}
          /> */}

          <CustomToast
            colorHEX={"#CFCFCF"}
            text={"Scanning"}
            show={true}
            loadingSign={true}
          />
          <CameraView
            className="h-3/5 rounded-2xl"
            facing={facing}
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={handleBarCodeScanned}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraFacing}
              >
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      </CustomLayout>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    borderRadius: "30px",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default takeAttendance;
