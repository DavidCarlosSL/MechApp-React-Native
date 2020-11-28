import React, { useContext, useEffect, useRef, useState } from "react";
import { Checkbox, RadioButton } from "react-native-paper";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Modalize } from "react-native-modalize";
import * as ImagePicker from "expo-image-picker";

import {
  Background,
  Container,
  NameMechanical,
  ImageView,
  ImageTouchable,
  DefaultImage,
  ImageMechanical,
  DescriptionText,
  Input2,
  DefaultLabel,
  CheckBoxView,
  TextCheckBox,
  RadioButtonView,
  RadioButtonItem,
  RadioButtonText,
  AddressTouchable,
  AddressLabel,
  EditProfileTouchable,
  EditProfileText,
  ModalView,
  TitleModal,
  ModalInputRow,
  FirstInputView,
  SecondInputView,
  TouchableAddAddress,
  AddAddressText,
} from "./styles";
import {
  AreaInput,
  Input,
  LabelInput,
} from "../../../components/index.components";

import { MechanicalContext } from "../../../contexts/mechanical.context";
import { CategoryContext } from "../../../contexts/category.context";
import { AddressContext } from "../../../contexts/address.context";
import { PersonContext } from "../../../contexts/person.context";

function EditMechanicalProfile() {
  const navigation = useNavigation();
  const modalizeRef = useRef(Modalize);

  const {
    getMechanicalOwnProfile,
    mechanicalOwnProfile,
    changeMechanicalProfile,
    sendImageMechanical,
    newMechanicalImageUri,
  } = useContext(MechanicalContext);
  const { addNewRelation } = useContext(CategoryContext);
  const { getZipCodeData, newAddress } = useContext(AddressContext);
  const { person, handleChangeMechanicalImage } = useContext(PersonContext);

  const [image, setImage] = useState(null);
  const [mechanicalDescription, setMechanicalDescription] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [street, setStreet] = useState(false);
  const [neighborhood, setNeighborhood] = useState(null);
  const [number, setNumber] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const [checkBox3, setCheckBox3] = useState(false);
  const [checkBox4, setCheckBox4] = useState(false);
  const [invalidCEP, setInvalidCEP] = useState(true);
  const [radioSelected, setRadioSelected] = useState("first");
  const label = "Adicionar endereço >";

  useEffect(() => {
    getMechanicalOwnProfile();
    handleChangeMechanicalImage(newMechanicalImageUri);
  }, [newMechanicalImageUri]);

  function onOpen() {
    modalizeRef.current?.open();
  }

  function getCategories() {
    let categories = [];
    if (checkBox1) categories.push({ categoryId: 1 });
    if (checkBox2) categories.push({ categoryId: 2 });
    if (checkBox3) categories.push({ categoryId: 3 });
    if (checkBox4) categories.push({ categoryId: 4 });

    return categories;
  }

  function verifyMechanicalDescription() {
    if (mechanicalDescription == null)
      return mechanicalOwnProfile.descriptionMechanical;
    else return mechanicalDescription;
  }

  function verifyAveragePrice() {
    if (radioSelected == "first") return "low";
    if (radioSelected == "second") return "medium";
    if (radioSelected == "third") return "high";
  }

  async function handleChangeMechanicalProfile() {
    const description = verifyMechanicalDescription();
    const price = verifyAveragePrice();
    changeMechanicalProfile(description, price);
    addNewRelation(getCategories());
    await sendImageMechanical(image, person.mechanicalToken);
    navigation.navigate("MechanicalProfile");
  }

  async function handleGetZipCodeData() {
    let data = await getZipCodeData(zipCode);
    if(data == false){
      setInvalidCEP(true);
      setStreet(null);
      setNeighborhood(null);
      setCity(null);
      setState(null);
    }
    else{
      setInvalidCEP(false);
      setStreet(data.logradouro);
      setNeighborhood(data.bairro);
      setCity(data.localidade);
      setState(data.uf);
    }
  }

  function handleNewAddress() {
    newAddress({
      zipAddress: zipCode,
      cityAddress: city,
      neighborhoodAddress: neighborhood,
      streetAddress: street,
      numberAddress: number,
    });
    setStreet(null);
    setNeighborhood(null);
    setCity(null);
    setState(null);
    modalizeRef.current?.close();
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [3, 4],
      quality: 0.5,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(`data:image/png;base64,${result.base64}`);
    }
  }

  return (
    <Background>
      {mechanicalOwnProfile == null ? (
        <Text></Text>
      ) : (
        <View>
        <Container>
          <NameMechanical>{mechanicalOwnProfile.nameMechanical}</NameMechanical>
          <ImageView>
            <ImageTouchable onPress={pickImage}>
              {image ? (
                <ImageMechanical source={{ uri: image }} />
              ) : mechanicalOwnProfile.imageMechanical == null ? (
                <DefaultImage
                  source={require("../../../../assets/img/defaultMechanicalImage.png")}
                />
              ) : (
                <ImageMechanical
                  source={{ uri: mechanicalOwnProfile.imageMechanical }}
                />
              )}
            </ImageTouchable>
          </ImageView>

          <DescriptionText>Adicione uma descrição:</DescriptionText>

          <Input2
            value={
              mechanicalDescription == null
                ? mechanicalOwnProfile.descriptionMechanical
                : mechanicalDescription
            }
            onChangeText={(text) => {
              setMechanicalDescription(text);
            }}
            multiline={true}
            numberOfLines={5}
            placeholder="Digite uma curta descrição"
          />

          <DefaultLabel>Quais serviços você presta?</DefaultLabel>
          <CheckBoxView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <Checkbox
              status={checkBox1 ? "checked" : "unchecked"}
              onPress={() => setCheckBox1(!checkBox1)}
              color={"#1E22AA"}
            />
            <TextCheckBox> Pintura </TextCheckBox>
            <Checkbox
              status={checkBox2 ? "checked" : "unchecked"}
              onPress={() => setCheckBox2(!checkBox2)}
              color={"#1E22AA"}
            />
            <TextCheckBox> Manutenção </TextCheckBox>
            <Checkbox
              status={checkBox3 ? "checked" : "unchecked"}
              onPress={() => setCheckBox3(!checkBox3)}
              color={"#1E22AA"}
            />
            <TextCheckBox> Funilaria </TextCheckBox>
            <Checkbox
              status={checkBox4 ? "checked" : "unchecked"}
              onPress={() => setCheckBox4(!checkBox4)}
              color={"#1E22AA"}
            />
            <TextCheckBox> Tunagem </TextCheckBox>
          </CheckBoxView>

          <DefaultLabel>Selecione o seu valor:</DefaultLabel>
          <RadioButtonView>
            <RadioButtonItem>
              <RadioButton
                value="first"
                status={radioSelected == "first" ? "checked" : "unchecked"}
                onPress={() => setRadioSelected("first")}
                color={"#1E22AA"}
              />
              <RadioButtonText>Baixo</RadioButtonText>
            </RadioButtonItem>
            <RadioButtonItem style={{ marginLeft: 16 }}>
              <RadioButton
                value="second"
                status={radioSelected == "second" ? "checked" : "unchecked"}
                onPress={() => setRadioSelected("second")}
                color={"#1E22AA"}
              />
              <RadioButtonText>Médio</RadioButtonText>
            </RadioButtonItem>
            <RadioButtonItem style={{ marginLeft: 16 }}>
              <RadioButton
                value="third"
                status={radioSelected == "third" ? "checked" : "unchecked"}
                onPress={() => setRadioSelected("third")}
                color={"#1E22AA"}
              />
              <RadioButtonText>Alto</RadioButtonText>
            </RadioButtonItem>
          </RadioButtonView>

          <DefaultLabel>Cadastre seus endereços:</DefaultLabel>
          <AddressTouchable onPress={onOpen}>
            <AddressLabel>{label}</AddressLabel>
          </AddressTouchable>
        
            

          
          <EditProfileTouchable onPress={handleChangeMechanicalProfile}>
            <EditProfileText> Editar perfil </EditProfileText>
          </EditProfileTouchable>
          
        </Container>

        <Modalize
        ref={modalizeRef}
        snapPoint={720}
        >
        <ModalView>
        <TitleModal>Adicionar Endereço</TitleModal>
        <AreaInput style={{ marginTop: 32 }}>
            <LabelInput>CEP:</LabelInput>
            <Input
            keyboardType="number-pad"
            onBlur={handleGetZipCodeData}
            value={zipCode}
            onChangeText={(text) => {
                setZipCode(text);
            }}
            />
            <ModalInputRow>
            <FirstInputView>
                <LabelInput>Logradouro: </LabelInput>
                <Input
                style={{backgroundColor: '#f5f5f5'}}
                editable={false}
                value={street}
                onChangeText={(text) => {
                    setStreet(text);
                }}
                />
            </FirstInputView>
            <SecondInputView>
                <LabelInput>N: </LabelInput>
                <Input
                value={number}
                onChangeText={(text) => {
                    setNumber(text);
                }}
                keyboardType={"number-pad"}
                />
            </SecondInputView>
            </ModalInputRow>
            <LabelInput>Bairro:</LabelInput>
            <Input
            style={{backgroundColor: '#f5f5f5'}}
            editable={false}
            value={neighborhood}
            onChangeText={(text) => {
                setNeighborhood(text);
            }}
            />
            <ModalInputRow>
            <FirstInputView>
                <LabelInput>Cidade: </LabelInput>
                <Input
                style={{backgroundColor: '#f5f5f5'}}
                editable={false}
                value={city}
                onChangeText={(text) => {
                    setCity(text);
                }}
                />
            </FirstInputView>
            <SecondInputView>
                <LabelInput>UF: </LabelInput>
                <Input
                style={{backgroundColor: '#f5f5f5'}}
                editable={false}
                value={state}
                onChangeText={(text) => {
                    setState(text);
                }}
                />
            </SecondInputView>
            </ModalInputRow>
            <TouchableAddAddress style={{backgroundColor: zipCode == null || zipCode == "" || invalidCEP == true ? "rgba(30, 34, 170, 0.7)" : "#1E22AA"}}
            disabled={zipCode == null || zipCode == "" || invalidCEP == true ? true : false}
            onPress={handleNewAddress}>
            <AddAddressText> Adicionar </AddAddressText>
            </TouchableAddAddress>
        </AreaInput>
        </ModalView>
        </Modalize>
        </View>
      )}
    </Background>
  );
}

export default EditMechanicalProfile;
