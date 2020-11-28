import React, { useContext} from 'react';
import { Text, View } from 'react-native';

import { PersonContext } from '../../../contexts/person.context';
import { Background, Container, DefaultLabel, TextPersonal } from './styles';

function PersonalDataMechanical(){
    const {person} = useContext(PersonContext);

    return(
        <Background>
            {
                person ? 
                <Container>
                    <DefaultLabel>Nome da Oficina:</DefaultLabel>
                    <TextPersonal>{person.mechanicalData.nameMechanical}</TextPersonal>
                    <DefaultLabel>Email:</DefaultLabel>
                    <TextPersonal>{person.mechanicalData.emailMechanical}</TextPersonal>
                    <DefaultLabel>Razão Social:</DefaultLabel>
                    <TextPersonal>{person.mechanicalData.companyName}</TextPersonal>
                    <DefaultLabel>CNPJ:</DefaultLabel>
                    <TextPersonal>{person.mechanicalData.cnpjMechanical}</TextPersonal>
                </Container>
                : <TextPersonal></TextPersonal>
            }
        </Background>
    )
}

export default PersonalDataMechanical;