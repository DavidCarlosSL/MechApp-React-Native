import React, { useState, useContext } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Background, ContainerCenter, PrimaryBoldText, PrimaryButtonBottom, TextContainer, AreaInput, PrimaryButtonText, LabelInput, Input } from '../../../components/index.components';

import { MechanicalContext } from "../../../contexts/mechanical.context";

function ForgotPasswordMechanical() {
  const navigation = useNavigation();

  const { forgotPasswordMechanical } = useContext(MechanicalContext);

  const [emailMechanical, setEmailMechanical] = useState(null);

  function handleForgotPasswordMechanical(){
    forgotPasswordMechanical(emailMechanical);
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
            <Input value={emailMechanical} onChangeText={(text) => setEmailMechanical(text)} />
          </AreaInput>

          <PrimaryButtonBottom onPress={handleForgotPasswordMechanical}>
            <PrimaryButtonText>Continuar</PrimaryButtonText>
          </PrimaryButtonBottom>
        </ContainerCenter>
      </Background>
    </ScrollView>
  );
}

export default ForgotPasswordMechanical;