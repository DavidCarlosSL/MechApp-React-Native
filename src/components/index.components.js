import styled from "styled-components/native";

export const Background = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Container = styled.KeyboardAvoidingView`
flex: 1;
align-items: center;
`;

export const ContainerCenter = styled.KeyboardAvoidingView`
flex: 1;
align-items: center;
justify-content: center;
`;

export const PrimaryText = styled.Text`
  font-size: 18px;
  color: #1E22AA;
  flex-direction: row;
  font-family: DMSans_700Bold
`;

export const PrimaryBoldText = styled.Text`
color: #000;
font-size: 18px;
font-weight: bold;
flex-direction: row;
font-family: DMSans_700Bold;
`;

export const TextContainer = styled.View`
  flex-direction: row;
  width: 90%;
  margin-top: 48px;
  margin-bottom: 48px;
`;

export const PrimaryButtonBottom = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #1e22aa;
  height: 56px;
  width: 90%;
  border-radius: 6px;
  margin-bottom: 16px;
`;

export const PrimaryButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-family: DMSans_500Medium;
`;

export const SecondaryButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid;
  border-color: #1e22aa;
  height: 56px;
  width: 90%;
  border-radius: 6px;
  margin-top: 16px;
`;

export const SecondaryButtonText = styled.Text`
  color: #1e22aa;
  font-size: 18px;
  font-family: DMSans_500Medium
`;

export const AreaInput = styled.View`
  flex-direction: column;
  width: 90%;
  margin: 0%;
`;

export const LabelInput = styled.Text`
  margin-bottom: 8px;
  font-size: 16px;
  font-family: DMSans_500Medium;
`;

export const Input = styled.TextInput`
  border: 0.5px solid rgba(0, 0, 0, 0.32);
  width: 100%;
  height: 48px;
  color: #000;
  margin-bottom: 32px;
  padding: 16px;
  border-radius: 6px;
  font-family: DMSans_400Regular;
`;