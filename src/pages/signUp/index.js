import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Background, Container, PrimaryText, TextContainer, SecondaryButton, SecondaryButtonText } from '../../components/index.components';

function SignUpIndex() {
    const navigation = useNavigation();

    return(
        <Background>
            <Container>
                <TextContainer>
                    <PrimaryText>
                        Vamos cadastrar você no Mech! Primeiro, em que tipo de perfil você
                        se encaixa?
                    </PrimaryText>
                </TextContainer>

                <SecondaryButton onPress={() => {navigation.navigate('SignUpClient')}}>
                    <SecondaryButtonText>
                        Pessoa Física
                    </SecondaryButtonText>
                </SecondaryButton>

                <SecondaryButton onPress={() => {navigation.navigate('SignUpMechanicalCNPJ')}}>
                    <SecondaryButtonText>Pessoa Jurídica</SecondaryButtonText>
                </SecondaryButton>
            </Container>
        </Background>
    )
}

export default SignUpIndex;