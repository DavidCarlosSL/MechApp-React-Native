import React, { createContext, useContext, useState } from 'react';
import Api from '../services/api';


import { PersonContext } from './person.context';

export const MechanicalContext = createContext({});

function MechanicalProvider ({children}) {
    const { person } =  useContext(PersonContext);
    const [mechanicalOwnProfile, setMechanicalOwnProfile] = useState(null);
    const [mechanicalProfile, setMechanicalProfile] = useState(null);
    const [mechanicalOwnRatings, setMechanicalOwnRatings] = useState([]);
    const [mechanicalsHome, setMechanicalsHome] = useState([]);
    const [mechanicalsCategory, setMechanicalsCategory] = useState([]);
    const [mechanicalsSearch, setMechanicalsSearch] = useState([]);
    const [newMechanicalImageUri, setNewMechanicalImageUri] = useState(null);
    const [mechanicalChats, setMechanicalChats] = useState([]);

    async function signUpMechanical(cnpjMechanical, companyName, nameMechanical, emailMechanical, passwordMechanical){
        const response = await Api.post("/mechanical/signup", {
            cnpj_mechanical: cnpjMechanical,
            company_name: companyName,
            name_mechanical: nameMechanical,
            email_mechanical: emailMechanical,
            password_mechanical: passwordMechanical 
        }).then((response) => {return(response)})
        .catch((error) => {return(error)});
    }

    async function forgotPasswordMechanical(emailMechanical) {
        const response = await Api.put('/mechanical/password/forgot', {
            email_mechanical: emailMechanical
        }).then((response) => {return response})
        .catch((error) => {return error});
    }

    async function changePasswordMechanical(oldPassword, newPassword, mechanicalToken){
        try{
            const response = await Api.put('/mechanical/password/change',  {
                "oldPassword_mechanical": oldPassword,
                "newPassword_mechanical": newPassword
            }, {headers: {'x-access-token': mechanicalToken}});

            if(response.data.passwordChanged == false)
                return false
            else
                return true
        }catch(error){  
            return error;
        }
    }

    function handleResetMechanicalsCategory(){
        setMechanicalsCategory([]);
    }

    function handleResetMechanicalProfile(){
        setMechanicalProfile(null);
    }

    function handleResetMechanicalOwnProfile(){
        setMechanicalOwnProfile(null);
    }

    function handleResetMechanicalsSearch(){
        setMechanicalsSearch([]);
    }

    function handleResetMechanicalOwnRatings(){
        setMechanicalOwnRatings([]);
    }

    async function getMechanicalChats(){
        try{
            const response = await Api.get('/chat/mechanical/', {headers: {'x-access-token': person.mechanicalToken}});
            if(response.data.haveChats)
                setMechanicalChats(response.data.chats);
        }catch(error){
            return error;
        }
    }

    function handleResetMechanicalChats(){
        setMechanicalChats([]);
    }

    async function getMechanicalOwnProfile(limit) {
        try{
            let response = await Api.get("/mechanical/profile/own", {headers: {'x-access-token': person.mechanicalToken}});
            setMechanicalOwnProfile(response.data.mechanical[0]);
            const mechanicalId = response.data.mechanical[0].id_mechanical;
            response = await Api.post('/rating/mechanical', {
                "mechanicalId": mechanicalId,
                "limit": limit
            });
            if(response.data.haveRatings)
                setMechanicalOwnRatings(response.data.ratings);
            
        }catch(error) {
            return error
        }
    }

    async function getMechanicalProfile(mechanicalId){
        try{
            const response = await Api.post('/mechanical/profile/', {"mechanicalId": mechanicalId})

            if(response.data.mechanical.length > 0)
                setMechanicalProfile(response.data.mechanical[0]);
        }catch(error){
            return error;
        }
    }

    async function getMechanicalsBySearch(nameMechanical){
        try{
            const response = await Api.get(`/mechanical/search/${nameMechanical}`);
            if(response.data.haveMechanicals)
                setMechanicalsSearch(response.data.mechanicals)
                
        }catch(error){
            return error;
        }
    }

    function sortMechanicalsSearch(sortBy){
        try{
            if(sortBy == "averageScore"){
                const sortedMechanicals = mechanicalsSearch.sort((a, b) => {
                    return (a.averageScore > b.averageScore ? -1 : ((b.averageScore > a.averageScore) ? 1 : 0))
                })
                setMechanicalsSearch(sortedMechanicals);
            }

            if(sortBy == "nameMechanical"){
                const sortedMechanicals = mechanicalsSearch.sort((a, b) => {
                    return (a.nameMechanical > b.nameMechanical ? 1 : ((b.nameMechanical > a.nameMechanical) ? -1 : 0))
                })
                setMechanicalsSearch(sortedMechanicals);
            }
        }catch(error){
            return error;
        }
    }

    async function changeMechanicalProfile(descriptionMechanical, averagePriceMechanical){
        try{    
            const response = await Api.put("/mechanical/profile/update", {
                "description_mechanical": descriptionMechanical,
                "averagePrice_mechanical": averagePriceMechanical
            }, {headers: {'x-access-token': person.mechanicalToken}});
        }catch(error) {
            return error;   
        }
    }

    async function sendImageMechanical(imageBase64, tokenMechanical){
        try{
            const response = await Api.put("/mechanical/profile/update/image", {
                "imageBase64_mechanical": imageBase64
            }, {headers: {'x-access-token': tokenMechanical}});
            

            if(response.data.uploadedImage)
                setNewMechanicalImageUri(response.data.uri);
        }catch(error){
            return error;
        }
    }

    async function getMechanicalsHome(limit){
        try{
            const response = await Api.post('/mechanical/', {"limit": limit})
            setMechanicalsHome(response.data.mechanicals)
        }catch(error){
            return error;
        }
    }

    function sortMechanicalsHome(sortBy){
        try{
            if(sortBy == "averageScore"){
                const sortedMechanicals = mechanicalsHome.sort((a, b) => {
                    return (a.averageScore > b.averageScore ? -1 : ((b.averageScore > a.averageScore) ? 1 : 0))
                })
                setMechanicalsHome(sortedMechanicals);
            }

            if(sortBy == "nameMechanical"){
                const sortedMechanicals = mechanicalsHome.sort((a, b) => {
                    return (a.nameMechanical > b.nameMechanical ? 1 : ((b.nameMechanical > a.nameMechanical) ? -1 : 0))
                })
                setMechanicalsHome(sortedMechanicals);
            }
        }catch(error){
            return error;
        }
    }

    function sortMechanicalsCategory(sortBy){
        try{
            if(sortBy == "averageScore"){
                const sortedMechanicals = mechanicalsCategory.sort((a, b) => {
                    return (a.averageScore > b.averageScore ? -1 : ((b.averageScore > a.averageScore) ? 1 : 0))
                })
                setMechanicalsCategory(sortedMechanicals);
            }

            if(sortBy == "nameMechanical"){
                const sortedMechanicals = mechanicalsCategory.sort((a, b) => {
                    return (a.nameMechanical > b.nameMechanical ? 1 : ((b.nameMechanical > a.nameMechanical) ? -1 : 0))
                })
                setMechanicalsCategory(sortedMechanicals);
            }
        }catch(error){
            return error;
        }
    }

    async function getMechanicalsByCategory(categoryId, limit){
        try{
            const response = await Api.post('/mechanical/category/', {
                "categoryId": categoryId,
                "limit": limit
            })
            setMechanicalsCategory(response.data.mechanicals);
        }catch(error){
            return error;
        }
    }

    return(
        <MechanicalContext.Provider value={{signUpMechanical, forgotPasswordMechanical, getMechanicalOwnProfile, mechanicalOwnProfile, changeMechanicalProfile, 
        getMechanicalsHome, mechanicalsHome, getMechanicalsByCategory, mechanicalsCategory, getMechanicalProfile, mechanicalProfile, handleResetMechanicalsCategory,
        handleResetMechanicalProfile, handleResetMechanicalOwnProfile, mechanicalOwnRatings, handleResetMechanicalOwnRatings, changePasswordMechanical, sendImageMechanical,
        newMechanicalImageUri, mechanicalChats, getMechanicalChats, handleResetMechanicalChats, getMechanicalsBySearch, mechanicalsSearch, handleResetMechanicalsSearch, 
        sortMechanicalsHome, sortMechanicalsCategory, sortMechanicalsSearch}}>
            {children}
        </MechanicalContext.Provider>
    )
}

export default MechanicalProvider;