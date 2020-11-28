import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';

import { MechanicalContext } from '../../../contexts/mechanical.context';
import { PersonContext } from '../../../contexts/person.context';

import { Background, ContainerCenter, PrimaryBoldText, PrimaryButtonBottom, TextContainer, AreaInput, PrimaryButtonText, LabelInput, Input } from '../../../components/index.components';

function SignUpMechanical(data) {
    const { signUpMechanical } = useContext(MechanicalContext);
    const { signInPerson } = useContext(PersonContext);

    const [nameMechanical, setNameMechanical] = useState(null);
    const [emailMechanical, setEmailMechanical] = useState(null);
    const [passwordMechanical, setPasswordMechanical] = useState(null);

    async function handleSignUpMechanical(){
        await signUpMechanical(data.route.params.cnpjMechanical, data.route.params.companyName, nameMechanical, emailMechanical, passwordMechanical);
        await signInPerson(emailMechanical, passwordMechanical);
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
                        <LabelInput>Razão Social:</LabelInput>
                        <Input style={{backgroundColor: '#eeeeee'}} editable={false} value={data.route.params.companyName} />
                    </AreaInput>

                    <AreaInput>
                        <LabelInput>Nome da oficina:</LabelInput>
                        <Input
                        value={nameMechanical}
                        onChangeText={(text) => setNameMechanical(text)}
                        />
                    </AreaInput>

                    <AreaInput>
                        <LabelInput>Email:</LabelInput>
                        <Input
                        value={emailMechanical}
                        autoCapitalize="none"
                        onChangeText={(text) => setEmailMechanical(text)}
                        />
                    </AreaInput>

                    <AreaInput>
                        <LabelInput>Senha:</LabelInput>
                        <Input
                        secureTextEntry={true}
                        value={passwordMechanical}
                        autoCapitalize="none"
                        onChangeText={(text) => setPasswordMechanical(text)}
                        />
                    </AreaInput>

                    <PrimaryButtonBottom onPress={handleSignUpMechanical}>
                        <PrimaryButtonText>Continuar</PrimaryButtonText>
                    </PrimaryButtonBottom>
                </ContainerCenter>
            </Background>
        </ScrollView>
    )
}

export default SignUpMechanical;