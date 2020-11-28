import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, Text, View } from 'react-native';

import { MechanicalContext } from '../../../contexts/mechanical.context';
import { PersonContext } from '../../../contexts/person.context';
import { SocketContext } from '../../../contexts/socket.context';

import RenderMechanicalChats from './index.renderChats';

function MechanicalChat() {
    const {person} = useContext(PersonContext);
    const {getMechanicalChats, mechanicalChats, handleResetMechanicalChats} = useContext(MechanicalContext);
    const {newSocket} = useContext(SocketContext);

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getMechanicalChats();

        return() => {
            handleResetMechanicalChats();
        }
    }, [])

    newSocket.onmessage = (message) => {
        const messageFromSocket = JSON.parse(message.data);
        if(messageFromSocket.emailReceiver == person.mechanicalData.emailMechanical){
            getMechanicalChats();
        }
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
          try {
            await getMechanicalChats();
            setRefreshing(false)
          } catch (error) {
            return error;
          }
      }, [refreshing]);

    return(
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }>
            <View style={{width: "90%", alignSelf: "center", marginTop: 32}}>
                <Text style={{fontSize: 18, alignSelf: 'center', fontFamily: 'DMSans_700Bold'}}>Conversas</Text>
                {
                    mechanicalChats.length > 0
                    ? <FlatList 
                    data={mechanicalChats}
                    keyExtractor={(item) => item.id_chat.toString()}
                    renderItem={({item, index}) => <RenderMechanicalChats data={item} position={index}/>}
                    /> 
                    : <Text></Text>
                }
            </View>
        </ScrollView>
    )
}

export default MechanicalChat;