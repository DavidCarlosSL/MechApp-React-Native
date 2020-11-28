import styled from "styled-components/native";

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const TextContainer = styled.View`
  flex-direction: column;
  width: 90%;
  margin-top: 48px;
  margin-bottom: 32px;
  justify-content: center;
`;

export const PrimaryText = styled.Text`
  color: #1E22AA;
  font-size: 20px;
  font-weight: bold;
  flex-direction: row;
  font-family: DMSans_700Bold;
  margin-left: 16px;
`;
export const SecondaryText = styled.Text`
  color: #000;
  font-size: 18px;
  flex-direction: row;
  font-family: DMSans_500Medium;
  margin-left: 16px;
`;

export const Ilustration = styled.Image`
    height: 250px;
    width: 390px;
`;

export const ImageContainer = styled.KeyboardAvoidingView`
  background-color: #fff;
  flex: 1;
  align-items: center;
  margin-top: 32px;
`;

export const BodyTextContainer = styled.View`
  background-color: #fff;
  flex:1;
  flex-direction: column;
  margin-top: 32px;
  margin-bottom: 40px;
  justify-content: center;
`;

export const BodyPrimaryText = styled.Text`
  color: #1E22AA;
  font-size: 18px;
  flex-direction: row;
  font-family: DMSans_500Medium;
  text-align: center;
`;

export const BodySecondaryText = styled.Text`
  color: #000000;
  font-size: 16px;
  flex-direction: row;
  font-family: DMSans_400Regular;
  text-align: center;
`;

export const PrimaryButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #1e22aa;
  height: 56px;
  border-radius: 6px;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 32px;
`;
export const PrimaryButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-family: DMSans_500Medium
`;