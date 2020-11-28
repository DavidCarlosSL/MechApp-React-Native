import React, { createContext, useContext, useState } from 'react';
import momentTz from 'moment-timezone';

import Api from '../services/api';
import { PersonContext } from './person.context';

export const ChatContext = createContext({});

function ChatProvider({children}){
    const {person} = useContext(PersonContext);

    const [chatMessages, setChatMessages] = useState([]);

    async function newChatClient(mechanicalId){
        try{
            const response = await Api.post('/chat/add', {mechanicalId: mechanicalId}, {headers: {'x-access-token': person.clientToken}});
            if(response.data.createdChat)
                return {chatId: response.data.chatId}
            else{
                if(response.data.existingChat)
                    return {chatId: response.data.chatId}
            }
        }catch(error){
            return error;
        }
    }

    async function getMessagesClientChat(chatId, limit){
        try{
            const response = await Api.post('/chat/messages', {
                "chatId": chatId,
                "limit": limit
            }, {headers: {'x-access-token': person.clientToken}})

            if(response.data.haveMessages)
                setChatMessages(response.data.messages);
        }catch(error){
            return error;
        }
    }

    async function getMessagesMechanicalChat(chatId, limit){
        try{
            const response = await Api.post('/chat/messages', {
                "chatId": chatId,
                "limit": limit
            }, {headers: {'x-access-token': person.mechanicalToken}})

            if(response.data.haveMessages)
                setChatMessages(response.data.messages);
        }catch(error){
            return error;
        }
    }

    async function sendNewMessage(chatId, content, typePerson, token){
        try{
            const response = await Api.post('/chat/sendmessage', {
                "typeSender": typePerson,
                "content": content,
                "chatId": chatId
            }, {headers: {'x-access-token': token}});
        }catch(error){
            return error;
        }
    }

    async function sendNewComplaint(mechanicalId, complaint){
        try{
            const response = await Api.post('/complaint/add', {"description_complaint": complaint, "mechanicalId": mechanicalId}, {headers: {'x-access-token': person.clientToken}});
        }catch(error){
            return error;
        }
    }

    function handleResetChatMessages(){
        setChatMessages([]);
    }

    function addNewMessage(messageData){
        chatMessages.unshift(messageData);
    }
    

    return(
        <ChatContext.Provider value={{getMessagesClientChat, chatMessages, handleResetChatMessages, addNewMessage, sendNewMessage, getMessagesMechanicalChat, newChatClient, sendNewComplaint}}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;