import React, { createContext, useState } from 'react';

import Api from '../services/api';

export const CodeContext = createContext({});

function CodeProvider ({children}) {
    async function addCode(emailMechanical, mechanicalToken){
        const response = await Api.post('/code/add', {
            "email_mechanical": emailMechanical
        }, {
            headers: {'x-access-token': mechanicalToken}
        }).then((response) => {return(response)})
        .catch((error) => {return(error)});
    }

    async function validateCode(valueCode, mechanicalToken) {
        const response = await Api.put("/code/validate", {
            "value_code": valueCode
        }, {
            headers: {'x-access-token': mechanicalToken}
        }).then((response) => {return(response)})
        .catch((error) => {return(error)});
    }

    return(
        <CodeContext.Provider value={{addCode, validateCode}}>
            {children}
        </CodeContext.Provider>
    )
}

export default CodeProvider;