import React, { createContext, useContext, useState } from 'react';
import Api from '../services/api';

import { PersonContext } from '../contexts/person.context';

export const SchedulingContext = createContext({});

function SchedulingProvider({ children }) {
    const { person } = useContext(PersonContext);

    const [mechanicalSchedulings, setMechanicalSchedulings] = useState([]);
    const [updatedSchedulings, setUpdatedSchedulings] = useState(false);
    const [clientScheduling, setClientScheduling] = useState(null);
    const [mechanicalScheduling, setMechanicalScheduling] = useState(null);

    async function getMechanicalSchedulings() {
        const response = await Api.get("/scheduling", {headers: {'x-access-token': person.mechanicalToken}})
        .then((response) => {return response})
        .catch((error) => {return error});

        if(response.data.haveSchedulings == true)
            setMechanicalSchedulings(response.data.schedulings);
        else
            setMechanicalSchedulings([]);
    }

    async function getSchedulingByClientAndMechanical(mechanicalId){
        try{
            const response = await Api.post('/scheduling/mechanical', {"mechanicalId": mechanicalId}, {headers: {'x-access-token': person.clientToken}});
            if(response.data.haveScheduling)
                setClientScheduling(response.data.scheduling)
        }catch(error){
            return error;
        }
    }

    async function getSchedulingByMechanicalAndClient(clientId){
        try{
            const response = await Api.post('/scheduling/client', {"clientId": clientId}, {headers: {'x-access-token': person.mechanicalToken}});
            if(response.data.haveScheduling)
                setMechanicalScheduling(response.data.scheduling)
        }catch(error){
            return error;
        }
    }
    
    function handleResetClientScheduling(){
        setClientScheduling(null);
    }

    function handleResetMechanicalScheduling(){
        setMechanicalScheduling(null);
    }

    async function concludeScheduling(schedulingId, clientId){
        try{
            const response = await Api.put('/scheduling/conclude', {
                "schedulingId": schedulingId,
                "clientId": clientId
            }, {headers: {'x-access-token': person.mechanicalToken}});

            getMechanicalSchedulings();
            setUpdatedSchedulings(true);
        }catch(error){
            return error;
        }
    }

    async function addNewScheduling(descriptionScheduling, dateScheduling, clientId, chatId){
        try {
            const response = await Api.post('/scheduling/add', {
                "description_scheduling": descriptionScheduling, 
                "date_scheduling": dateScheduling, 
                "clientId": clientId, 
                "chatId": chatId
            } , {headers: {'x-access-token': person.mechanicalToken}})
        }catch(error){
            return error;
        }
    }

    async function updateInactiveScheduling(descriptionScheduling, dateScheduling, schedulingId, chatId){
        try {
            const response = await Api.put('/scheduling/update/new', 
            {
                "description_scheduling": descriptionScheduling, 
                "date_scheduling": dateScheduling, 
                "schedulingId": schedulingId, 
                "chatId": chatId
            }, {headers: {'x-access-token': person.mechanicalToken}});
        }catch (error){
            return error;
        }
    }

    async function updateActiveScheduling(descriptionScheduling, dateScheduling, schedulingId){
        try{
            const response = await Api.put('/scheduling/update/scheduled', 
            {
                "description_scheduling": descriptionScheduling, 
                "date_scheduling": dateScheduling,
                "schedulingId": schedulingId
            }, {headers: {'x-access-token': person.mechanicalToken}})
        }catch(error){
            return error;
        }
    }

    async function cancelScheduling(schedulingId, chatId){
        try{
            const response = await Api.put('/scheduling/cancel', {"schedulingId": schedulingId, "chatId": chatId}, {headers: {'x-access-token': person.mechanicalToken}})
        }catch(error){
            return error;
        }
    }

    return(
        <SchedulingContext.Provider value={{getMechanicalSchedulings, mechanicalSchedulings, concludeScheduling, updatedSchedulings, addNewScheduling, handleResetClientScheduling,
        clientScheduling, getSchedulingByClientAndMechanical, handleResetMechanicalScheduling, getSchedulingByMechanicalAndClient, mechanicalScheduling, updateInactiveScheduling,
        updateActiveScheduling, cancelScheduling}}>
            {children}
        </SchedulingContext.Provider>
    )
}

export default SchedulingProvider;