import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';

import MapView, { Marker } from 'react-native-maps';
import Axios from 'axios';

import { GoogleCloudPlataformKey } from "../../../config/custom-variables.json";

function PositionOnMapMechanical({route}){
    const [currentLocation, setCurrentLocation] = useState(null);
    const [mechanicalLocation, setMechanicalLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        handleGetCurrentLocation();
        handleGetMechanicalLocation();
      }, []);

    async function handleGetCurrentLocation(){
        
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location);
    }

    async function handleGetMechanicalLocation(){
        try{
            const response = await Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${route.params.zipCodeAddress}&region=BR&key=${GoogleCloudPlataformKey}`)
            if(response.data.status == "OK"){
                setMechanicalLocation(response.data.results[0].geometry.location);
            }
        }catch(error){
            return error;
        }
        
    }

    return(
        <View style={{flex: 1, backgroundColor: '#ffff'}}>
            <MapView
            region={{
                latitude: mechanicalLocation ? mechanicalLocation.lat : -23.5639953,
                longitude: mechanicalLocation ? mechanicalLocation.lng : -46.66655,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }}
            style={{flex: 1}}
            >
                {mechanicalLocation ? <Marker coordinate={{latitude: mechanicalLocation.lat, longitude: mechanicalLocation.lng}} title="Mecânica"/> : console.log('')}
                {currentLocation ? <Marker coordinate={{latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude}} title="Você" pinColor={"#1E22AA"}/> : console.log('')}
            </MapView>
        </View>
    )
}

export default PositionOnMapMechanical;