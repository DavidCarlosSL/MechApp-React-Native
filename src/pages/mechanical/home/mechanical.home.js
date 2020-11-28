import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import { SchedulingContext } from '../../../contexts/scheduling.context';

import EmptyState from '../../../components/mechanical/emptyState/emptyState.mechanical';
import Schedulings from '../../../components/mechanical/schedulings/index.schedulings';

function MechanicalHome () {
    const { getMechanicalSchedulings, mechanicalSchedulings, updatedSchedulings } = useContext(SchedulingContext);
    const [ emptyState, setEmptyState] = useState(false);
    const [ loop, setLoop ] = useState(0);

    useEffect(() => {
        if(updatedSchedulings){
            if(mechanicalSchedulings.length == 0)
                setEmptyState(true);
            else{
                setEmptyState(false);
            }
        }else{
            if(mechanicalSchedulings.length == 0){
                if(loop == 0){
                    setLoop(loop + 1);
                    getMechanicalSchedulings();
                }
                else{
                    if(mechanicalSchedulings.length > 0)
                        setEmptyState(false);
                    else
                        setEmptyState(true);
                }
            }else
                setEmptyState(false);
        }
    }, [mechanicalSchedulings])

    return(
        <View style={{flex: 1}}>
            {
               emptyState ? <EmptyState /> : <Schedulings schedulings={mechanicalSchedulings}/>
            }
        </View>
    )
}

export default MechanicalHome;