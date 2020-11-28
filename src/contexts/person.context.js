import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../services/api';

export const PersonContext = createContext({});

function PersonProvider ({children}) {
    const [person, setPerson] = useState(null);

    useEffect(() => {
        async function loadStorage() {
            const personStorage = await AsyncStorage.getItem("personData");
            if(personStorage)
                setPerson(JSON.parse(personStorage));
        }
        loadStorage();
    }, [])

    async function signOut(){
        await AsyncStorage.clear();
        setPerson(null);
    }

    async function signInPerson(emailPerson, passwordPerson) {
        const responsePerson = await Api.post("/person/signin", {
            "email_person": emailPerson,
            "password_person": passwordPerson
        }).then((response) => {return(response)})
        .catch((error) => {return(error)});
        
        if(responsePerson.data.auth == true){
            if(responsePerson.data.typePerson == "client"){
                setPerson(responsePerson.data.client);
                await AsyncStorage.setItem("personData", JSON.stringify(responsePerson.data.client));
            }
            if(responsePerson.data.typePerson == "mechanical"){
                if(responsePerson.data.mechanical.mechanicalData.verified == "false")
                    setPerson(responsePerson.data.mechanical);
                else{
                    setPerson(responsePerson.data.mechanical);
                    await AsyncStorage.setItem("personData", JSON.stringify(responsePerson.data.mechanical));
                }
            }
        }else{
            return false;
        }
    }

    async function handleSetNewPerson(newPerson){
        await AsyncStorage.removeItem("personData");
        await AsyncStorage.setItem("personData", JSON.stringify(newPerson));
        setPerson(newPerson);
    }

    async function handleChangeClientImage(imageUri){
        if(imageUri) {
            const newPerson = {
                clientData: {
                    emailClient: person.clientData.emailClient,
                    imageClient: imageUri,
                    nameClient: person.clientData.nameClient
                },
                clientToken: person.clientToken
            };
            handleSetNewPerson(newPerson);
        }
    }

    async function handleChangeMechanicalImage(imageUri){
        if(imageUri) {
            const newPerson = {
                mechanicalData: {
                    companyName: person.mechanicalData.companyName,
                    cnpjMechanical: person.mechanicalData.cnpjMechanical,
                    nameMechanical: person.mechanicalData.nameMechanical,
                    emailMechanical: person.mechanicalData.emailMechanical,
                    imageMechanical: imageUri,
                    verified: person.mechanicalData.verified,
                    createdAt: person.mechanicalData.createdAt
                },
                mechanicalToken: person.mechanicalToken
            };
            handleSetNewPerson(newPerson);
        }
    }

    return(
        <PersonContext.Provider value={{person, signInPerson, signOut, handleChangeClientImage, handleChangeMechanicalImage}}>
            {children}
        </PersonContext.Provider>
    )
}

export default PersonProvider;