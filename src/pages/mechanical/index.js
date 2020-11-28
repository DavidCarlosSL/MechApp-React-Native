import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'; 

import MechanicalHome from './home/mechanical.home';
import SchedulingProvider from '../../contexts/scheduling.context';
import MechanicalProfile from './profile/profile';
import MechanicalChat from './chat/index.chat';

const MechanicalTabs = createBottomTabNavigator();

const icons = {
    MechanicalHome: {
      lib: Feather,
      name: "home",
    },
    MechanicalChat: {
      lib: Feather,
      name: "message-circle",
    },
    MechanicalProfile: {
      lib: Feather,
      name: "briefcase",
    },
  };

function MechanicalIndex() {
    return(
      <MechanicalTabs.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
          const { lib: Icon, name } = icons[route.name];
          return <Icon name={name} size={size} color={color} />;
          }
      })}
      tabBarOptions={{showLabel: false, activeTintColor: "#1e22aa"}}>
      <MechanicalTabs.Screen name="MechanicalHome" component={MechanicalHome} tabBarOptions={{title: "Home"}}/>
      <MechanicalTabs.Screen name="MechanicalChat" component={MechanicalChat} tabBarOptions={{title: "Chat"}}/>
      <MechanicalTabs.Screen name="MechanicalProfile" component={MechanicalProfile} tabBarOptions={{title: "Profile"}}/>
      </MechanicalTabs.Navigator>
    )
}

export default MechanicalIndex;