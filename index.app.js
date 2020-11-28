import "react-native-gesture-handler";
import React, { useContext, useState } from "react";
import { StatusBar } from "react-native"
import { AppLoading } from "expo";
import * as Location from 'expo-location';

console.disableYellowBox = true;

import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
} from "@expo-google-fonts/dm-sans";

import Routes from './src/routes/index.routes';

import PersonProvider from './src/contexts/person.context';
import ClientProvider from './src/contexts/client.context';
import MechanicalProvider from './src/contexts/mechanical.context';
import { SocketContext } from "./src/contexts/socket.context";

function IndexApp() {
  const { newSocket } = useContext(SocketContext);
  const [permission, setPermission] = useState(false);

  let [fontsLoaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic,
  });

  getLocationPermission();

  async function getLocationPermission(){
    let { status } = await Location.requestPermissionsAsync();
    if(status == "granted")
      setPermission(true)
  }
  
  if (!fontsLoaded || !newSocket || permission == false) {
    return <AppLoading />;
  }

  return (
    <PersonProvider>
        <ClientProvider>
        <MechanicalProvider>
            <StatusBar backgroundColor="#cccccc" barStyle="light-content" />
            <Routes />
        </MechanicalProvider>
        </ClientProvider>
    </PersonProvider>
  );
}

export default IndexApp;