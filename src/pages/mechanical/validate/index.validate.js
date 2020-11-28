import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CodeContext } from '../../../contexts/code.context';
import { PersonContext } from '../../../contexts/person.context';

import { Background, ContainerCenter, TextContainer, PrimaryBoldText, AreaInput, LabelInput, Input, PrimaryButtonBottom, PrimaryButtonText } from '../../../components/index.components';

function ValidateMechanical() {
    const navigation = useNavigation();

    const { addCode, validateCode } = useContext(CodeContext);
    const { person } = useContext(PersonContext);

    const [valueCode, setValueCode] = useState(null);

    async function handleValidateCode() {
        await validateCode(valueCode, person.mechanicalToken);
        navigation.navigate("MechanicalIndex");
    }

    useEffect(() => {
        addCode(person.mechanicalData.emailMechanical, person.mechanicalToken);
    }, [])

    return(
        <ScrollView style={{ backgroundColor: "#FFF" }}>
            <Background>
                <ContainerCenter>
                <TextContainer style={{marginTop: 10}}>
                    <PrimaryBoldText>
                    Enviamos um código em seu email! Insira ele para validarmos seu
                    perfil!
                    </PrimaryBoldText>
                </TextContainer>

                <AreaInput style={{marginTop: -10}}>
                    <LabelInput>Código</LabelInput>
                    <Input
                    value={valueCode}
                    keyboardType={"number-pad"}
                    onChangeText={(text) => setValueCode(text)}
                    />
                </AreaInput>

                <PrimaryButtonBottom onPress={handleValidateCode}>
                    <PrimaryButtonText>Continuar</PrimaryButtonText>
                </PrimaryButtonBottom>
                </ContainerCenter>
            </Background>
        </ScrollView>
    )
}

export default ValidateMechanical;