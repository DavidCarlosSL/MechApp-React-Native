import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, MaterialIcons } from '@expo/vector-icons'; 

import ClientHome from './home/client.home';
import ClientChat from './chat/index.chat';
import ClientProfile from './profile/index.profile';
import CategoryProvider from '../../contexts/category.context';

const ClientTabs = createBottomTabNavigator();

const icons = {
    ClientHome: {
      lib: Feather,
      name: "home",
    },
    ClientChat: {
        lib: Feather,
        name: "message-circle",
    },
    ClientProfile: {
        lib: MaterialIcons,
        name: "person-outline",
    }
  };

function ClientIndex() {
    return(
        <CategoryProvider>
            <ClientTabs.Navigator 
            tabBarOptions={{showLabel: false, activeTintColor: "#1e22aa", keyboardHidesTabBar: true}}
            screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
            const { lib: Icon, name } = icons[route.name];
            return <Icon name={name} size={size} color={color}/>;
            }
            })}>
                <ClientTabs.Screen name="ClientHome" component={ClientHome} tabBarOptions={{title: "Home"}}/>
                <ClientTabs.Screen name="ClientChat" component={ClientChat} tabBarOptions={{title: "Chat"}}/>
                <ClientTabs.Screen name="ClientProfile" component={ClientProfile} tabBarOptions={{title: "Profile"}}/>
            </ClientTabs.Navigator>
        </CategoryProvider>
    )
}

export default ClientIndex;