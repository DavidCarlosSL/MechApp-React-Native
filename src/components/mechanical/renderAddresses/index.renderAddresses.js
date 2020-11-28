import React, { useContext, useEffect } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

function RenderAddresses({data}) {
    const navigation = useNavigation();

    return(
        <View>
            <TouchableOpacity onPress={() => {navigation.navigate('PositionOnMapMechanical', {zipCodeAddress: data.zipAddress})}} 
            style={{backgroundColor: '#1E22AA', borderRadius: 6, marginLeft: 5, height: 45, alignItems: 'center', justifyContent: "center", padding: 15}}>
                <Text style={{color: '#fff', fontFamily: 'DMSans_400Regular'}}>{`${data.streetAddress}, ${data.numberAddress} >`}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default RenderAddresses;