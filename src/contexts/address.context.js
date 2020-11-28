import React, { createContext, useContext } from 'react';
import Api from '../services/api';
import Axios from 'axios';

import { PersonContext } from './person.context';

export const AddressContext = createContext({});

function AddressProvider({children}) {
    const {person} = useContext(PersonContext);

    async function getZipCodeData(zipCode) {
        try{
            const response = await Axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
            if(response.data.erro)
                return false
            else
                return response.data;
        }catch(error){
            return false;
        }
    }

    async function newAddress(addressData) {
        try{
            const response = await Api.post('/address/add', {
                "zip_address": addressData.zipAddress,
                "city_address": addressData.cityAddress,
                "neighborhood_address": addressData.neighborhoodAddress,
                "street_address": addressData.streetAddress,
                "number_address": addressData.numberAddress,
                "stateId": 1
            }, {headers: {'x-access-token': person.mechanicalToken}});
        }catch(error){
            return error;
        }
    }
    return(
        <AddressContext.Provider value={{newAddress, getZipCodeData}}>
            {children}
        </AddressContext.Provider>
    )
}

export default AddressProvider;