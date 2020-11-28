import React, { useContext, useState } from 'react';
import { Keyboard, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { PersonContext } from '../../contexts/person.context';

import {
    Logo,
    AreaInput,
    Input,
    PrimaryButton,
    TextContainer,
    Link,
    LinkText,
    LabelArea,
    ForgotLink,
    LabelError,
  } from "./signIn.styles";
import { Background, ContainerCenter, PrimaryText, SecondaryButton, SecondaryButtonText, PrimaryButtonText, LabelInput } from '../../components/index.components';

function SignInPage() {
    const navigation = useNavigation();

    const [personEmail, setPersonEmail] = useState(null);
    const [personPassword, setPersonPassword] = useState(null);
    const [invalidLogin, setInvalidLogin] = useState(false);

    const { signInPerson } = useContext(PersonContext);

    async function handleSignIn(){
        const response = await signInPerson(personEmail, personPassword);
        if(response == false)
            setInvalidLogin(true)
        else
            setInvalidLogin(false);
        
        Keyboard.dismiss();
        setPersonEmail("");
        setPersonPassword("");
    }

    return(
        <Background>
            <ContainerCenter>
                <Logo source={require("../../../assets/img/logo.png")} />
                <TextContainer>
                    <PrimaryText>
                        Entre ou cadastre-se para acessar as nossas funcionalidades!
                    </PrimaryText>
                </TextContainer>

                <AreaInput>
                    {
                        invalidLogin ? 
                        <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                            <LabelInput>Email:</LabelInput>
                            <Text style={{fontSize: 15, fontFamily: 'DMSans_500Medium', color: '#e53935'}}> Usuário e/ou senha inválidos </Text>
                        </View> 
                        : <LabelInput>Email:</LabelInput>
                    }
                    <Input style={{borderColor: invalidLogin ? "#e53935" : "rgba(0,0,0,0.32)"}} autoCapitalize="none" value={personEmail} onChangeText={(text) => setPersonEmail(text)} />
                </AreaInput>

                <AreaInput>
                    <LabelArea style={{justifyContent: 'space-between'}}>
                        <LabelInput>Senha:</LabelInput>
                        <ForgotLink onPress={() => {navigation.navigate('ChooseForgotPassword')}}>
                            <LinkText>Esqueceu sua senha?</LinkText>
                        </ForgotLink>
                    </LabelArea>
                    <Input style={{borderColor: invalidLogin ? "#e53935" : "rgba(0,0,0,0.32)"}} secureTextEntry={true} value={personPassword} autoCapitalize="none" onChangeText={(text) => setPersonPassword(text)} />
                </AreaInput>

                <PrimaryButton onPress={handleSignIn}>
                    <PrimaryButtonText>Entrar</PrimaryButtonText>
                </PrimaryButton>

                <SecondaryButton onPress={() => {navigation.navigate('SignUp')}}>
                    <SecondaryButtonText>Cadastrar</SecondaryButtonText>
                </SecondaryButton>
            </ContainerCenter>
        </Background>
    )
}

export default SignInPage;