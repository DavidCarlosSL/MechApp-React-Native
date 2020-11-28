import React, {createContext, useContext, useState} from 'react';
import Api from '../services/api';
import { PersonContext } from './person.context';

export const CategoryContext = createContext({});

function CategoryProvider({children}) {
    const { person } = useContext(PersonContext);
    const [categories, setCategories] = useState([]);

    async function getCategories() {
        try{
            const response = await Api.get("/category/");
            setCategories(response.data.categories);
        }catch(error){
            return error
        }
    }

    async function addNewRelation(categories) {
        try{    
            const response = await Api.post("/category/mechanical/add", {"categories" : categories}, {headers: {'x-access-token': person.mechanicalToken}});
        }catch(error){
            return error;
        }
    }

    return(
        <CategoryContext.Provider value={{getCategories, categories, addNewRelation}}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider;