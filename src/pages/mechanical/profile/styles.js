import styled from "styled-components/native";

export const Background = styled.ScrollView`
flex: 1;
background-color: #fff;
`;

export const Container = styled.View`
align-items: center;
align-self: center;
width: 90%;
`;

export const NameMechanical = styled.Text`
font-size: 20px;
font-family: DMSans_700Bold;
margin-top: 20px;
`;

export const ImageView = styled.View`
margin-top: 15px
`;

export const ImageTouchable = styled.TouchableOpacity`

`;

export const DefaultImage = styled.Image`
width: 370px;
height: 230px;
border-radius: 7px;
`;

export const ImageMechanical = styled.Image`
width: 370px;
height: 230px;
border-radius: 7px;
`;

export const DescriptionText = styled.Text`
align-self: flex-start; 
margin-top: 16px;
margin-bottom: 8px;  
font-size: 16px; 
font-family: DMSans_500Medium;
`;

export const Input2 = styled.TextInput`
background-color: #fff;
width: 100%;
border-width: 0.5px;
border-radius: 6px;
border-color: rgba(0, 0, 0, 0.32);
font-size: 14px;
font-family: DMSans_400Regular;
justify-content: center;
padding: 8px;
margin-top: 8px;
`;

export const DefaultLabel = styled.Text`
align-self: flex-start; 
margin-top: 16px;
margin-bottom: 8px;  
font-size: 16px; 
font-family: DMSans_500Medium;
`;

export const BigLabel = styled.Text`
align-self: flex-start;
margin-top: 12px;
font-size: 18px; 
font-family: DMSans_400Regular;
`;

export const CheckBoxView = styled.ScrollView`
align-self: flex-start;
flex-direction: row;
margin-left: -8px;
`;

export const TextCheckBox = styled.Text`
align-self: center;
font-family: DMSans_400Regular;
`;


export const RadioButtonView = styled.View`
flex-direction: row; 
align-items: center; 
align-self: flex-start;
margin-left: -8px;
`;

export const RadioButtonItem = styled.View`
flex-direction: row; 
align-items: center;
`;

export const RadioButtonText = styled.Text`
font-size: 14px; 
font-family: DMSans_400Regular;
`;


export const AddressTouchable = styled.TouchableOpacity`
margin-top: 8px; 
align-self: flex-start; 
background-color: #1E22AA; 
border-radius: 6px; 
height: 48px;
width: 180px; 
align-items: center; 
justify-content: center
`;

export const AddressLabel = styled.Text`
color: #fff;
font-family: DMSans_400Regular;
font-size: 13px;
`;

export const EditProfileTouchable = styled.TouchableOpacity`
width: 100%; 
height: 60px; 
backgroundColor: #1E22AA; 
marginTop: 24px;
marginBottom: 16px; 
borderRadius: 6px; 
alignItems: center; 
justifyContent: center
`;

export const EditProfileText = styled.Text`
color: #fff; 
fontSize: 18px; 
fontFamily: DMSans_400Regular;
`;

export const ModalView = styled.View`
align-items: center;
`;

export const TitleModal = styled.Text`
font-size: 18px;
font-family: DMSans_700Bold;
margin-top: 16px;
`;

export const ModalInputRow = styled.View`
flex-direction: row;
`;

export const FirstInputView = styled.View`
flex-direction: column;
width: 75%;
`;

export const SecondInputView = styled.View`
flex-direction: column; 
width: 20%; 
margin-left: 5%;

`;

export const TouchableAddAddress = styled.TouchableOpacity`
width: 100%; 
height: 60px; 
backgroundColor: #1E22AA; 
marginTop: 0px; 
marginBottom: 0px;
borderRadius: 6px; 
alignItems: center; 
justifyContent: center
`;

export const AddAddressText = styled.Text`
color: #fff; 
fontSize: 18px; 
fontFamily: DMSans_400Regular;
`;