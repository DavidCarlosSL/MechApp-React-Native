import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import { MechanicalContext } from '../../../contexts/mechanical.context';

import { GoogleCloudPlataformKey } from '../../../config/custom-variables.json';
import Axios from 'axios';

function RenderMechanicalCategories({data}){
    return(
        <View style={{marginRight: 6}}>
            <Text style={{fontFamily: 'DMSans_400Regular', color: '#1E22AA', fontSize: 12}}>{data.nameCategory}</Text>
        </View>
    )
}

function RenderMechanicals({data}) {
    const navigation = useNavigation();

    const [averagePrice, setAveragePrice] = useState(null);
    const { handleResetMechanicalsCategory } = useContext(MechanicalContext);
    const [distance, setDistance] = useState(null);

    let distanceMiles = [];

    useEffect(() => {
        async function handleInitiateHome (){
            handleSetMechanicalAveragePrice();
            // await handleGetDistanceBetween();
        }
        handleInitiateHome();
        return() => {
            handleResetMechanicalsCategory();
        }
    }, [])

    async function handleGetDistanceBetween(){
        try{
            let clientLocation = await Location.getCurrentPositionAsync({});
            if(clientLocation){
                data.addresses.forEach(async (e) => {
                    let response = await Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${e.zipAddress}&region=BR&key=${GoogleCloudPlataformKey}`);
                    if(response.data.status == "OK"){
                        let mechanicalLocation = response.data.results[0].geometry.location;
                        response = await Axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${clientLocation.coords.latitude},${clientLocation.coords.longitude}&destinations=${mechanicalLocation.lat},${mechanicalLocation.lng}&key=${GoogleCloudPlataformKey}`)
                        if(response.data.status == "OK"){
                            if(response.data.rows[0].elements[0].distance.value < 1000)
                                setDistance('> 1')
                            else{
                                distanceMiles.push(response.data.rows[0].elements[0].distance.value);
                                let lowestDistance = Math.min(...distanceMiles);
                                lowestDistance = lowestDistance / 1000;
                                setDistance(Math.round(lowestDistance));
                            }
                        }
                    }
                })
            }
        }catch(error){
            return error;
        }
    }

    function handleSetMechanicalAveragePrice(){
        if(data.averagePrice == "low")
        setAveragePrice(
            <View style={{flexDirection: 'row'}}>
                <Text> -</Text>
                <MaterialIcons name="attach-money" size={18} color="black" />
            </View>
        )
    if(data.averagePrice == "medium")
        setAveragePrice(<View style={{flexDirection: 'row'}}>
            <Text> -</Text>
            <MaterialIcons name="attach-money" size={18} color="black" style={{marginRight: -8}}/>
            <MaterialIcons name="attach-money" size={18} color="black" style={{marginRight: -8}}/>
        </View>)
    if(data.averagePrice == "high")
    setAveragePrice(<View style={{flexDirection: 'row'}}>
        <Text> -</Text>
        <MaterialIcons name="attach-money" size={18} color="black" style={{marginRight: -8}}/>
        <MaterialIcons name="attach-money" size={18} color="black" style={{marginRight: -8}}/>
        <MaterialIcons name="attach-money" size={18} color="black" style={{marginRight: -8}}/>
    </View>)
    }

    return(
        <View style={{height: 100, marginTop: 20, borderWidth: 0.5, borderColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 6}}>
            <View>
                <TouchableOpacity onPress={() => {navigation.navigate('ClientMechanicalProfile', {mechanicalId: data.id_mechanical})}} style={{flexDirection: "row"}}>
                {
                    data.imageMechanical ? 
                    <Image source={{uri: data.imageMechanical}} style={{height: 99, width: 99, borderRadius: 6, alignSelf: 'flex-start'}}/> 
                    : <Image source={require('../../../../assets/img/ImageNotFound.png')} style={{height: 99, width: 99, borderRadius: 6, alignSelf: 'flex-start'}}/>
                }
                    <View style={{flexDirection: 'column', width: 275, marginTop: 10}}>
                        <View style={{marginLeft: 10}}>
                            <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                                <View style={{flexDirection: "row"}}>
                                    <Text style={{fontSize: 14, fontFamily: 'DMSans_500Medium'}}>{data.nameMechanical}</Text>
                                    {averagePrice}
                                </View>
                                <View style={{flexDirection: 'row', marginTop: -20, alignSelf: 'flex-end', marginRight: 10}}>
                                    {
                                    data.averageScore ? 
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontSize: 15, fontFamily: 'DMSans_400Regular', color: '#1E22AA', marginRight: 2}}>{data.averageScore}</Text>
                                        <AntDesign name="star" size={20} color="#1E22AA"/>
                                    </View>
                                    : <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontSize: 15, fontFamily: 'DMSans_400Regular', color: '#1E22AA', marginRight: 3}}>0</Text>
                                        <AntDesign name="star" size={20} color="#1E22AA"/>
                                    </View>
                                    }
                                </View>
                            </View>
                            <FlatList
                            style={{marginTop: 8}}
                            data={data.categories}
                            keyExtractor={(item) => item.id_category.toString()}
                            renderItem={({item}) => (<RenderMechanicalCategories data={item}/>)}
                            horizontal={true} />
                            {
                                distance ? <Text style={{fontFamily: 'DMSans_400Regular', marginTop: 8, fontSize: 13.5}}>{distance}km</Text> : <Text style={{fontFamily: 'DMSans_400Regular', marginTop: 8, fontSize: 13.5, color: 'rgba(0, 0, 0, 0.3)'}}>calculando...</Text>
                            }

                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RenderMechanicals;