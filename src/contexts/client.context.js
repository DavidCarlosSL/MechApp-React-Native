import React, { createContext, useContext, useState } from 'react';
import { PersonContext } from './person.context';

import Api from '../services/api';

export const ClientContext = createContext({});

function ClientProvider ({children}) {
    const {person} = useContext(PersonContext);

    const [newClientImageUri, setNewClientImageUri] = useState(null);
    const [clientChats, setClientChats] = useState([]);

    async function signUpClient(nameClient, emailClient , passwordClient){
        const response = await Api.post("/client/signup", {
            name_client: nameClient,
            email_client: emailClient,
            password_client: passwordClient 
        }).then((response) => {return(response)})
        .catch((error) => {return(error)});
    }

    async function forgotPasswordClient(emailClient){
        const response = await Api.put('/client/password/forgot', {
            email_client: emailClient
        }).then((response) => {return response})
        .catch((error) => {return error});
    }

    async function changePasswordClient(oldPassword, newPassword, tokenClient){
        try{
            const response = await Api.put('/client/password/change', {
                "oldPassword_client": oldPassword,
                "newPassword_client": newPassword
            }, {headers: {'x-access-token': tokenClient}})
            if(response.data.passwordChanged == false)
                return false;
            else
                return true;
        }catch(error){
            return error;
        }
    }

    async function sendImageClient(imageBase64, tokenClient){
        try{
            const response = await Api.put("/client/profile/update/image", {
                "imageBase64_client": imageBase64
            }, {headers: {'x-access-token': tokenClient}});

            if(response.data.uploadedImage)
                setNewClientImageUri(response.data.uri);
        }catch(error){
            return error;
        }
    }

    async function getClientChats(){
        try{
            const response = await Api.get('/chat/client', {headers: {'x-access-token': person.clientToken}});
            if(response.data.haveChats)
                setClientChats(response.data.chats);
        }catch(error){
            return error;
        }
    }

    function handleResetClientChats(){
        setClientChats([]);
    }

    return(
        <ClientContext.Provider value={{signUpClient, forgotPasswordClient, changePasswordClient, sendImageClient, newClientImageUri, clientChats, getClientChats, handleResetClientChats}}>
            {children}
        </ClientContext.Provider>
    )
}

export default ClientProvider;