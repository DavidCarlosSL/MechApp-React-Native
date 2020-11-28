import React, { createContext, useContext, useState } from 'react';
import Api from '../services/api';

import { PersonContext } from './person.context';

export const RatingContext = createContext({});

function RatingProvider({children}) {
    const {person} = useContext(PersonContext);

    const [ratings, setRatings] = useState([]);
    const [clientRating, setClientRating] = useState(null);

    function handleResetClientRating(){
        setClientRating(null);
    }

    function handleResetRatings() {
        setRatings([]);
    }

    async function getMechanicalRatings(mechanicalId, limit) {
        try{
            const response = await Api.post('/rating/mechanical', {
                "mechanicalId": mechanicalId,
                "limit": limit
            });

            if(response.data.haveRatings)
                setRatings(response.data.ratings)
        }catch(error){
            return error;
        }
    }

    async function getRatingByMechanicalAndClient(mechanicalId){
        try{
            const response = await Api.post('/rating/client', {"mechanicalId": mechanicalId}, {headers: {'x-access-token': person.clientToken}})

            if(response.data.haveRating)
                setClientRating(response.data.clientRating[0]);
        }catch(error){
            return error;
        }
    }

    async function changeRating(ratingId, scoreRating, descriptionRating, clientToken){
        try{
            const response = await Api.put('/rating/client/update', {
                "ratingId": ratingId,
                "score_rating": scoreRating,
                "description_rating": descriptionRating
            }, {headers: {'x-access-token': clientToken}});
        }catch(error){
            return error;
        }
    }

    async function addNewRating(scoreRating, descriptionRating, mechanicalId){
        try{
            const response = await Api.post('/rating/add', {
                "score_rating": scoreRating, 
                "description_rating": descriptionRating, 
                "mechanicalId": mechanicalId
            }, {headers: {'x-access-token': person.clientToken}})
        }catch(error){
            return error;
        }
    }

    return(
        <RatingContext.Provider value={{getMechanicalRatings, ratings, getRatingByMechanicalAndClient, clientRating, handleResetClientRating, handleResetRatings, changeRating, addNewRating}}>
            {children}
        </RatingContext.Provider>
    )
}

export default RatingProvider;