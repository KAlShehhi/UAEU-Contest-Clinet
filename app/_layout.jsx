import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "Lato-Black"        :   require("../assets/fonts/Lato-Black.ttf"),
        "Lato-BlackItalic"  :   require("../assets/fonts/Lato-BlackItalic.ttf"),
        "Lato-Bold"         :   require("../assets/fonts/Lato-Bold.ttf"),
        "Lato-BoldItalic"   :   require("../assets/fonts/Lato-BoldItalic.ttf"),
        "Lato-Italic"       :   require("../assets/fonts/Lato-Italic.ttf"),
        "Lato-Light"        :   require("../assets/fonts/Lato-Light.ttf"),
        "Lato-LightItalic"  :   require("../assets/fonts/Lato-LightItalic.ttf"),
        "Lato-Regular"      :   require("../assets/fonts/Lato-Regular.ttf"),
        "Lato-Thin"         :   require("../assets/fonts/Lato-Thin.ttf"),
        "Lato-ThinItalic"   :   require("../assets/fonts/Lato-ThinItalic.ttf"),
    });

    useEffect(() => {
        if(error) throw error;
        if(fontsLoaded){
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);

    if(!fontsLoaded){
        return null
    }
    if(!fontsLoaded && !error){
        return null;
    }
    
  return (
    <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="(auth)" options={{headerShown: false}}/>
        <Stack.Screen name="(coach)" options={{headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
    </Stack>
  )
}

export default RootLayout