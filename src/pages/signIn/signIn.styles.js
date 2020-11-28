import styled from "styled-components/native";

export const Logo = styled.Image`
  margin-bottom: 32px;
`;

export const TextContainer = styled.View`
  flex-direction: row;
  width: 90%;
  margin-bottom: 52px;
`;

export const AreaInput = styled.View`
  flex-direction: column;
  width: 90%;
  margin-bottom: 24px;
`;

export const LabelArea = styled.View`
  flex-direction: row;
`;

export const LabelError = styled.Text`
  margin-bottom: 8px;
  font-size: 16px;
  width: 55%;
  color: #A91E22;
  font-family: DMSans_400Regular
`;

export const ForgotLink = styled.TouchableOpacity`
  align-items: flex-end;
`;

export const Input = styled.TextInput`
  border: 0.5px solid rgba(0, 0, 0, 0.32);
  width: 100%;
  height: 48px;
  color: #000;
  margin-bottom: 8px;
  padding: 16px;
  border-radius: 6px;
  font-family: DMSans_400Regular
`;

export const PrimaryButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #1e22aa;
  height: 56px;
  width: 90%;
  border-radius: 6px;
`;

export const Link = styled.TouchableOpacity`
  margin-bottom: 16px;
  margin-top: 32px;
`;

export const LinkText = styled.Text`
  font-size: 16px;
  color: #1e22aa;
  font-family: DMSans_500Medium;
`;
