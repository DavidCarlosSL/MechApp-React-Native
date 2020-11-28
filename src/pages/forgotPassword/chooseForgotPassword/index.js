import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
  TextContainer,
} from "./styles.index";

import { Background, Container, PrimaryText, SecondaryButton, SecondaryButtonText } from '../../../components/index.components';

function ChooseForgotPassword() {
  const navigation = useNavigation();

  return (
    <Background>
      <Container>
        <TextContainer>
          <PrimaryText>
            Para recuperarmos sua senha, precisamos saber, que tipo de perfil você tem?
          </PrimaryText>
        </TextContainer>

        <SecondaryButton onPress={() => {navigation.navigate("ForgotPasswordClient")}}>
          <SecondaryButtonText>
            Pessoa Física
          </SecondaryButtonText>
        </SecondaryButton>

        <SecondaryButton onPress={() => {navigation.navigate("ForgotPasswordMechanical")}}>
          <SecondaryButtonText>Pessoa Jurídica</SecondaryButtonText>
        </SecondaryButton>
      </Container>
    </Background>
  );
}

export default ChooseForgotPassword;