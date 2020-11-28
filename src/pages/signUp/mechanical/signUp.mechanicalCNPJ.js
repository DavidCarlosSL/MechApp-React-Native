import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Api from '../../../services/api';

import { Background, ContainerCenter, AreaInput, PrimaryButtonText, LabelInput, Input, PrimaryButtonBottom } from '../../../components/index.components';

function SignUpMechanicalIndex() {
    const navigation = useNavigation();

    const [cnpjMechanical, setCnpjMechanical] = useState(null);
    const [companyName, setCompanyName] = useState(null);
    const [disabledButton, setDisabledButton] = useState(true);
    const [opacityButton, setOpacityButton] = useState(0.7);

    function enableButton() { setOpacityButton(1); setDisabledButton(false); }

    function disableButton(){ setOpacityButton(0.7); setDisabledButton(true); }

    async function getCompanyName(){
        try{
            const response = await Api.get(`/cnpj/${cnpjMechanical}`);
            if(!response.data.CNPJinUse){
                setCnpjMechanical(response.data.CNPJ);
                setCompanyName(response.data.CompanyName);
                enableButton();
            }else
                disableButton();
        }catch(error){
            disableButton();
        }
    }

    return(
        <Background>
            <ContainerCenter>
                <AreaInput>
                    <LabelInput>CNPJ:</LabelInput>
                    <Input keyboardType={"number-pad"} onBlur={getCompanyName} value={cnpjMechanical} onChangeText={(text) => (setCnpjMechanical(text))} />
                </AreaInput>
                <PrimaryButtonBottom
                        style={{opacity: opacityButton}} 
                        disabled={disabledButton} 
                        onPress={() => {navigation.navigate('SignUpMechanical', {cnpjMechanical: cnpjMechanical, companyName: companyName})}}
                >
                    <PrimaryButtonText> Prosseguir </PrimaryButtonText>
                </PrimaryButtonBottom>
            </ContainerCenter>
        </Background>
    )
}

export default SignUpMechanicalIndex;