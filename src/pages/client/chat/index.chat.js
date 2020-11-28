import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, RefreshControl } from 'react-native';
import RenderChats from './index.renderChats';

import { ClientContext } from '../../../contexts/client.context';
import { SocketContext } from '../../../contexts/socket.context';
import { PersonContext } from '../../../contexts/person.context';

function ChatProfile(){
    const {person} = useContext(PersonContext);
    const {getClientChats, clientChats, handleResetClientChats} = useContext(ClientContext);
    const {newSocket} = useContext(SocketContext);

    const [refreshing, setRefreshing] = useState(false);
    
    useEffect(() => {
        getClientChats();

        return() => {
            handleResetClientChats();
        }
    }, [])

    newSocket.onmessage = (message) => {
        const messageFromSocket = JSON.parse(message.data);
        if(messageFromSocket.emailReceiver == person.clientData.emailClient){
            getClientChats();
        }
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
          try {
            await getClientChats();
            setRefreshing(false)
          } catch (error) {
            return error;
          }
      }, [refreshing]);

    return(
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }>
            <View style={{width: 370, alignSelf: "center", marginTop: 32}}>
                <Text style={{fontSize: 18, alignSelf: 'center', fontFamily: 'DMSans_700Bold'}}>Conversas</Text>
                {
                    clientChats.length > 0
                    ? <FlatList 
                    data={clientChats}
                    keyExtractor={(item) => item.id_chat.toString()}
                    renderItem={({item, index}) => <RenderChats data={item} position={index}/>}
                    /> 
                    : <Text></Text>
                }
            </View>
        </ScrollView>
    )
}

export default ChatProfile;