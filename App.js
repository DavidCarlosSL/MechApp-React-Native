import "react-native-gesture-handler";

import React from "react";

console.disableYellowBox = true;

import { NavigationContainer } from "@react-navigation/native";

import IndexApp from "./index.app";
import SocketProvider from "./src/contexts/socket.context";

function App() {
  return (
    <NavigationContainer>
      <SocketProvider>
        <IndexApp />
      </SocketProvider>
    </NavigationContainer>
  );
}

export default App;