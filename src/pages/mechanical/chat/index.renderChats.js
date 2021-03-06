import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Feather, MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons'

function RenderMechanicalChats(params){
    const navigation = useNavigation();
    
    return(
        <View>
            <TouchableOpacity onPress={() => {navigation.navigate('RenderMessagesMechanical', {
                chatId: params.data.id_chat, nameClient: params.data.name_client, emailClient: params.data.email_client, clientId: params.data.client_id_client
                })}}>
                <View style={{height: 88, marginTop: 24, borderWidth: params.position == 0 ? 1 : 0.5, borderColor: params.position == 0 ? '#1e22aa' : 'rgba(0, 0, 0, 0.3)', borderRadius: 6, flexDirection: 'row'}}>
                    {
                        params.data.image_client ? <Image source={{uri: params.data.image_client}} style={{height: 86, width: 86, borderRadius: 6, alignSelf: 'flex-start'}}/>
                        : <Image source={require('../../../../assets/img/ImageNotFound.png')} style={{height: 86, width: 86, borderRadius: 6, alignSelf: 'flex-start'}}/>
                    }
                    <View style={{flexDirection: 'row', width: 260, justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 14, fontFamily: 'DMSans_500Medium', alignSelf: 'center', marginLeft: 16}}>{params.data.name_client}</Text>
                        <View style={{alignSelf: 'center', height: 56, width: 80}}>
                            {
                                params.data.status_chat == 'On going' ? 
                                <View style={{alignItems: "center"}}>
                                    <Feather name="message-circle" size={34} color="#1E22AA"/>
                                    <Text style={{fontSize: 13, fontFamily: 'DMSans_400Regular', color: '#1E22AA'}}>Em Aberto</Text>
                                </View>
                                : params.data.status_chat == 'Done' ? 
                                <View style={{alignItems: "center"}}>
                                    <MaterialIcons name="done" size={34} color="#1E22AA"/>
                                    <Text style={{fontSize: 13, fontFamily: 'DMSans_400Regular', color: '#1E22AA'}}>Concluído</Text>
                                </View>
                                : params.data.status_chat == 'Scheduled' ?
                                <View style={{alignItems: "center"}}>
                                    <AntDesign name="calendar" size={34} color="#1E22AA"/>
                                    <Text style={{fontSize: 13, fontFamily: 'DMSans_400Regular', color: '#1E22AA'}}>Agendado</Text>
                                </View>
                                : params.data.status_chat == 'Canceled' ?
                                <View style={{alignItems: "center"}}>
                                    <Entypo name="cross" size={34} color="#1E22AA"/>
                                    <Text style={{fontSize: 13, fontFamily: 'DMSans_400Regular', color: '#1E22AA'}}>Cancelado</Text>
                                </View>
                                : <Text></Text>
                            }
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        
    )
}

export default RenderMechanicalChats;