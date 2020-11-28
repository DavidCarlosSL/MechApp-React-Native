import React, { useContext } from "react";
import { Image, Text, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import {
  ImageContainer,
  TextContainer,
  PrimaryText,
  SecondaryText,
  BodyTextContainer,
  BodyPrimaryText,
  BodySecondaryText,
  PrimaryButton,
  PrimaryButtonText,
} from "./styles";
import { Background } from '../../index.components';

import { PersonContext } from '../../../contexts/person.context';

function EmptyState() {
  const navigation = useNavigation();

  const { person } = useContext(PersonContext);

  return (
    <Background>
      {
        person ?  
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <TextContainer>
            <PrimaryText>Olá, {person.mechanicalData.nameMechanical}</PrimaryText>
            <SecondaryText>Confira seus agendamentos:</SecondaryText>
          </TextContainer>

          <ImageContainer>
            <Image source={require("../../../../assets/img/draw.png")}/>
          </ImageContainer>

          <BodyTextContainer>
            <BodyPrimaryText>Você ainda não tem agendamentos</BodyPrimaryText>
            <BodySecondaryText>
              Para conseguir agendamentos e clientes configure o perfil da sua
              oficina!
            </BodySecondaryText>
            <PrimaryButton onPress={() => {navigation.navigate('EditMechanicalProfile')}}>
              <PrimaryButtonText>Quero editar meu perfil!</PrimaryButtonText>
            </PrimaryButton>
          </BodyTextContainer>
        </View> : <Text></Text>
      }
    </Background>
  );
}

export default EmptyState;