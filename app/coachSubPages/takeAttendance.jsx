import CustomLayout from "../../components/CustomLayout";
import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faUserXmark } from "@fortawesome/free-solid-svg-icons/faUserXmark";
import { faX } from "@fortawesome/free-solid-svg-icons/faX";
import CustomToast from "../../components/CustomToast";
import { connection } from "../../constants";
import * as SecureStore from "expo-secure-store"; // Import SecureStore

function TakeAttendance() {
	const [facing, setFacing] = useState("back");
	const [permission, requestPermission] = useCameraPermissions();
	const [disableScanning, setDisableScanning] = useState(false);
	const [toast, setToast] = useState({
		text: "Scanning",
		colorHEX: "#CFCFCF",
		loadingSign: true,
	});

	useEffect(() => {
		setToast({ text: "Scanning", colorHEX: "#CFCFCF", loadingSign: true });
	}, []);

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.granted) {
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

	const handleBarCodeScanned = async ({ type, data }) => {
		if (!disableScanning) {
			setDisableScanning(true);
			try {
				setToast({
					text: "Processing",
					colorHEX: "#CFCFCF",
					loadingSign: true,
				});
				const userId = await SecureStore.getItem("userId");
				const token = await SecureStore.getItem("token");
				const url = `${connection.serverURL}/activity/markAttendance/`;
				console.log(url);
				const response = await fetch(url, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						userId,
						token,
						scannedVale: data,
					}),
				});

				if (response.status === 200) {
					setToast({
						icon: faCheck,
						text: "User scanned",
						colorHEX: "#99C35F",
					});
				} else if (response.status === 403) {
					setToast({
						icon: faUserXmark,
						text: "User already scanned",
						colorHEX: "#FF5733",
					});
				} else {
					setToast({ icon: faX, text: "Error", colorHEX: "#ED4337" });
				}
			} catch (error) {
				setToast({ icon: faX, text: "Error", colorHEX: "#ED4337" });
			} finally {
				// Show the response toast for 3 seconds then re-display the "Scanning" toast
				setTimeout(() => {
					setToast({
						text: "Scanning",
						colorHEX: "#CFCFCF",
						loadingSign: true,
					});
					setDisableScanning(false);
				}, 3000);
			}
		}
	};

	return (
		<>
			<Stack.Screen options={{ headerShown: false }} />
			<CustomLayout title="Edit activity" hasBack={true} noScrollView={true}>
				<View className="h-full w-full">
					{toast && (
						<CustomToast
							icon={toast.icon}
							colorHEX={toast.colorHEX}
							text={toast.text}
							show={true}
							loadingSign={toast.loadingSign}
						/>
					)}
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

export default TakeAttendance;
