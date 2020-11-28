import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { PersonContext } from '../../contexts/person.context';

function RenderChatMessages({data}){
    const {person} = useContext(PersonContext);

    const [typePerson, setTypePerson] = useState(null);
    const [messageCreatedAt, setMessageCreatedAt] = useState(null);
    const [dateMessage, setDateMessage] = useState(null);

    useEffect(() => {
        function getTypePerson(){
            if(person.clientData)
                setTypePerson('client');
            else
                setTypePerson('mechanical');
        }

        function getMessageCreatedAt(){
            let newCreatedAt = data.createdAt.split('T');
            newCreatedAt = newCreatedAt[1];
            newCreatedAt = newCreatedAt.split('.');
            newCreatedAt = newCreatedAt[0].split(':');
            newCreatedAt = newCreatedAt[0] + ':' + newCreatedAt[1];
            setMessageCreatedAt(newCreatedAt);
        }
        
        function getDateMessage(){
            let newData = data.createdAt.split('T');
            newData = newData[0].split('-');
            newData = newData[2] + '/' + newData[1];
            setDateMessage(newData)
        }

        getTypePerson();
        getMessageCreatedAt();
        getDateMessage();
    }, [data])

    return(
        <ScrollView style={{backgroundColor: '#fff'}}>
            <View style={{marginBottom: 16}}>
            {
                typePerson == data.typeSender ?
                <View style={{backgroundColor: '#E86320', padding: 16, alignSelf: 'flex-end', borderRadius: 6}}>
                    <Text style={{color: '#fff', fontSize: 14, fontFamily: 'DMSans_400Regular', alignSelf: 'flex-end'}}>{data.content}</Text>
                    <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 16}}>
                        <Text style={{color: '#fff', fontSize: 10, fontFamily: 'DMSans_400Regular', marginRight: 16}}>{dateMessage}</Text>
                        <Text style={{color: '#fff', fontSize: 10, fontFamily: 'DMSans_400Regular'}}>{messageCreatedAt}</Text> 
                    </View>
                </View> 
                : <View style={{backgroundColor: '#182A7C', padding: 16, alignSelf: 'flex-start', borderRadius: 6}}>
                    <Text style={{color: '#fff', fontSize: 14, fontFamily: 'DMSans_400Regular', alignSelf: 'flex-start'}}>{data.content}</Text>
                    <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 16}}>
                        <Text style={{color: '#fff', fontSize: 10, fontFamily: 'DMSans_400Regular', marginRight: 16}}>{dateMessage}</Text>
                        <Text style={{color: '#fff', fontSize: 10, fontFamily: 'DMSans_400Regular'}}>{messageCreatedAt}</Text> 
                    </View>
                </View>
            }
            </View>
        </ScrollView>
    )
}

export default RenderChatMessages;