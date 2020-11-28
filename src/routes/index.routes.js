import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import { PersonContext } from '../contexts/person.context';

import Auth from './auth/index';
import Client from './client/index';
import Mechanical from './mechanical/index';
import ValidateMechanicalRoute from './mechanical/mechanical.validate';

function Routes() {
    const { person } = useContext(PersonContext);
    const [ route, setRoute ] = useState(null);

    useEffect(() => {
        if(person){
            if(person.clientData)
                setRoute(<Client />);
            else{
                if(person.mechanicalData.verified == "false") 
                    setRoute(<ValidateMechanicalRoute />)
                else
                    setRoute(<Mechanical />)
            }
        }else
            setRoute(<Auth />)
    }, [person])

    return(
        <View style={{flex: 1}}>
            {route}
        </View>
    )
}

export default Routes;