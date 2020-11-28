import React, { useState, useContext } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Background, ContainerCenter, PrimaryBoldText, TextContainer, PrimaryButtonBottom, AreaInput, PrimaryButtonText, LabelInput, Input } from '../../../components/index.components';

import { ClientContext } from '../../../contexts/client.context';

function ForgotPasswordClient() {
  const navigation = useNavigation();

  const { forgotPasswordClient } = useContext(ClientContext);

  const [emailClient, setEmailClient] = useState(null);

  function handleForgotPasswordClient(){
    forgotPasswordClient(emailClient);
    navigation.navigate("SignIn");
  }
  
  return (
    <ScrollView style={{backgroundColor: "#FFF"}}>
      <Background>
        <ContainerCenter>
          <TextContainer>
            <PrimaryBoldText>
              Insira seu email para recuperarmos sua senha!
            </PrimaryBoldText>
          </TextContainer>

          <AreaInput>
            <LabelInput>Email:</LabelInput>
            <Input value={emailClient} onChangeText={(text) => setEmailClient(text)} />
          </AreaInput>

          <PrimaryButtonBottom onPress={handleForgotPasswordClient}>
            <PrimaryButtonText>Continuar</PrimaryButtonText>
          </PrimaryButtonBottom>
        </ContainerCenter>
      </Background>
    </ScrollView>
  );
}

export default ForgotPasswordClient;