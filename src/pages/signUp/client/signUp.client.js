import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';

import { ClientContext } from '../../../contexts/client.context';
import { PersonContext } from '../../../contexts/person.context';

import { Background, ContainerCenter, PrimaryBoldText, PrimaryButtonBottom, TextContainer, AreaInput, PrimaryButtonText, LabelInput, Input } from '../../../components/index.components';

function SignUpClient() {
    const { signUpClient } = useContext(ClientContext);
    const { signInPerson } = useContext(PersonContext);

    const [nameClient, setNameClient] = useState(null);
    const [emailClient, setEmailClient] = useState(null);
    const [passwordClient, setPasswordClient] = useState(null);

    async function handleSignUpClient(){
        await signUpClient(nameClient, emailClient, passwordClient);
        await signInPerson(emailClient, passwordClient);
    }

    return(
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
            <Background>
                <ContainerCenter>
                    <TextContainer>
                        <PrimaryBoldText>
                        Preencha os campos abaixo para se cadastrar!
                        </PrimaryBoldText>
                    </TextContainer>

                    <AreaInput>
                        <LabelInput>Nome Completo:</LabelInput>
                        <Input value={nameClient} onChangeText={(text) => setNameClient(text)} />
                    </AreaInput>

                    <AreaInput>
                        <LabelInput>Email:</LabelInput>
                        <Input value={emailClient} autoCapitalize={"none"} onChangeText={(text) => setEmailClient(text)} />
                    </AreaInput>

                    <AreaInput>
                        <LabelInput>Senha:</LabelInput>
                        <Input secureTextEntry={true} value={passwordClient} autoCapitalize={"none"} onChangeText={(text) => setPasswordClient(text)} />
                    </AreaInput>

                    <PrimaryButtonBottom onPress={handleSignUpClient}>
                        <PrimaryButtonText>Continuar</PrimaryButtonText>
                    </PrimaryButtonBottom>
                </ContainerCenter>
            </Background>
        </ScrollView>
    )
}

export default SignUpClient;