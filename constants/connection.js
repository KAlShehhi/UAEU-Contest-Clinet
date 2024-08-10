import { Platform } from 'react-native';
let serverURL;

//Debug
if (Platform.OS !== 'android') {
    serverURL = "http://192.168.0.131:3000/api";
}else{
    serverURL = "http://192.168.0.131:3000/api"
}

// const serverURL = "url/api";

export default {
    serverURL
}