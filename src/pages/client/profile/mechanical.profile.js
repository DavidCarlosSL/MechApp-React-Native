import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Modalize } from "react-native-modalize";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import RenderCategories from "../../../components/mechanical/renderCategories/index.renderCategories";
import RenderAddresses from "../../../components/mechanical/renderAddresses/index.renderAddresses";
import RenderRatings from "../../../components/mechanical/renderRatings/index.renderRatings";

import { PersonContext } from "../../../contexts/person.context";
import { RatingContext } from "../../../contexts/rating.context";
import { MechanicalContext } from "../../../contexts/mechanical.context";
import { ChatContext } from "../../../contexts/chat.contex";
import { ClientContext } from "../../../contexts/client.context";

import { ModalView, TitleModal } from "../../mechanical/profile/styles";

function ClientMechanicalProfile({ route }) {
  const navigation = useNavigation();
  const modalizeRef = useRef(Modalize);

  const { person } = useContext(PersonContext);
  const { getClientChats } = useContext(ClientContext);
  const {
    getMechanicalProfile,
    mechanicalProfile,
    handleResetMechanicalProfile,
  } = useContext(MechanicalContext);
  const {
    getRatingByMechanicalAndClient,
    clientRating,
    getMechanicalRatings,
    ratings,
    handleResetClientRating,
    handleResetRatings,
    changeRating,
  } = useContext(RatingContext);
  const { newChatClient } = useContext(ChatContext);

  const [quantityRatings, setQuantityRatings] = useState(10);
  const [newRatingDescription, setNewRatingDescription] = useState(null);
  const [newRatingScore, setNewRatingScore] = useState(null);
  const [labelScoreRating, setLabelScoreRating] = useState("");
  const [updatedRating, setUpdatedRating] = useState(false);
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);

  useEffect(() => {
    getMechanicalProfile(route.params.mechanicalId);
    getRatingByMechanicalAndClient(route.params.mechanicalId);
    getMechanicalRatings(route.params.mechanicalId, quantityRatings);

    return () => {
      handleResetMechanicalProfile();
      handleResetRatings();
      handleResetClientRating();
    };
  }, [updatedRating]);

  function onOpen() {
    modalizeRef.current?.open();
    if (clientRating) {
      setNewRatingDescription(clientRating.descriptionRating);
      setNewRatingScore(clientRating.scoreRating);
      handleFillStars(clientRating.scoreRating);
    }
  }

  async function handleAddNewChat() {
    const chatData = await newChatClient(mechanicalProfile.id_mechanical);
    if (chatData.chatId) {
      await getClientChats();
      navigation.navigate("RenderMessagesClient", {
        chatId: chatData.chatId,
        nameMechanical: mechanicalProfile.nameMechanical,
        emailMechanical: mechanicalProfile.emailMechanical,
        mechanicalId: route.params.mechanicalId,
      });
    }
  }

  function handleFillStars(scoreRating) {
    if (scoreRating == 1) {
      setStar1(true);
      setStar2(false);
      setStar3(false);
      setStar4(false);
      setStar5(false);
      setLabelScoreRating("Péssimo");
      setNewRatingScore(scoreRating);
    }
    if (scoreRating == 2) {
      setStar1(true);
      setStar2(true);
      setStar3(false);
      setStar4(false);
      setStar5(false);
      setLabelScoreRating("Ruim");
      setNewRatingScore(scoreRating);
    }
    if (scoreRating == 3) {
      setStar1(true);
      setStar2(true);
      setStar3(true);
      setStar4(false);
      setStar5(false);
      setLabelScoreRating("Mediano");
      setNewRatingScore(scoreRating);
    }
    if (scoreRating == 4) {
      setStar1(true);
      setStar2(true);
      setStar3(true);
      setStar4(true);
      setStar5(false);
      setLabelScoreRating("Bom");
      setNewRatingScore(scoreRating);
    }
    if (scoreRating == 5) {
      setStar1(true);
      setStar2(true);
      setStar3(true);
      setStar4(true);
      setStar5(true);
      setLabelScoreRating("Ótimo");
      setNewRatingScore(scoreRating);
    }
  }

  function handleChangeRating() {
    changeRating(
      clientRating.id_rating,
      newRatingScore,
      newRatingDescription,
      person.clientToken
    );
    setUpdatedRating(!updatedRating);
    modalizeRef.current?.close();
  }

  async function renderMoreRatings() {
    await getMechanicalRatings(route.params.mechanicalId, quantityRatings + 5);
    setQuantityRatings(quantityRatings + 5);
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View>
        {mechanicalProfile ? (
          <View>
            {mechanicalProfile.imageMechanical ? (
              <Image
                source={{ uri: `${mechanicalProfile.imageMechanical}` }}
                style={{
                  width: 370,
                  height: 230,
                  borderRadius: 7,
                  alignSelf: "center",
                }}
              />
            ) : (
              <Image
                source={require("../../../../assets/img/ImageNotFound.png")}
                style={{
                  width: 370,
                  height: 230,
                  borderRadius: 7,
                  alignSelf: "center",
                }}
              />
            )}
            <Modalize
              ref={modalizeRef}
              snapPoint={600}
            >
              <ModalView>
                <TitleModal style={{ fontSize: 20 }}>
                  Editar avaliação
                </TitleModal>
                {clientRating ? (
                  <View style={{ width: 370, marginTop: 30 }}>
                    <Text
                      style={{ fontSize: 18, fontFamily: "DMSans_500Medium" }}
                    >
                      O serviço foi:{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "DMSans_500Medium",
                        alignSelf: "center",
                        marginTop: 18,
                      }}
                    >
                      {labelScoreRating}
                    </Text>
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                      <TouchableOpacity
                        onPress={() => {
                          handleFillStars(1);
                        }}
                      >
                        {star1 ? (
                          <AntDesign name="star" size={50} color="#1E22AA" />
                        ) : (
                          <AntDesign name="staro" size={50} color="#1E22AA" />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          handleFillStars(2);
                        }}
                      >
                        {star2 ? (
                          <AntDesign name="star" size={50} color="#1E22AA" />
                        ) : (
                          <AntDesign name="staro" size={50} color="#1E22AA" />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          handleFillStars(3);
                        }}
                      >
                        {star3 ? (
                          <AntDesign name="star" size={50} color="#1E22AA" />
                        ) : (
                          <AntDesign name="staro" size={50} color="#1E22AA" />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          handleFillStars(4);
                        }}
                      >
                        {star4 ? (
                          <AntDesign name="star" size={50} color="#1E22AA" />
                        ) : (
                          <AntDesign name="staro" size={50} color="#1E22AA" />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          handleFillStars(5);
                        }}
                      >
                        {star5 ? (
                          <AntDesign name="star" size={50} color="#1E22AA" />
                        ) : (
                          <AntDesign name="staro" size={50} color="#1E22AA" />
                        )}
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        marginTop: 32,
                        fontSize: 18,
                        fontFamily: "DMSans_500Medium",
                      }}
                    >
                      Descrição:{" "}
                    </Text>
                    <TextInput
                      value={newRatingDescription}
                      onChangeText={(text) => setNewRatingDescription(text)}
                      style={{
                        height: 48,
                        backgroundColor: "#fff",
                        borderWidth: 0.5,
                        borderRadius: 6,
                        borderColor: "rgba(0, 0, 0, 0.32)",
                        fontSize: 14,
                        fontFamily: "DMSans_400Regular",
                        justifyContent: "center",
                        padding: 8,
                        marginTop: 10,
                      }}
                    />
                    <TouchableOpacity
                      onPress={handleChangeRating}
                      style={{
                        marginTop: 20,
                        backgroundColor: "#1E22AA",
                        borderRadius: 6,
                        justifyContent: "center",
                        alignItems: "center",
                        height: 56,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontFamily: "DMSans_500Medium",
                          fontSize: 18,
                        }}
                      >
                        Editar avaliação
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text></Text>
                )}
              </ModalView>
            </Modalize>
            <View style={{ marginTop: 20, width: 370, marginTop: 18, alignSelf: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "DMSans_700Bold",
                      alignSelf: "flex-start",
                    }}
                  >
                    {mechanicalProfile.nameMechanical} -{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={handleAddNewChat}
                    style={{
                      flexDirection: "row",
                      backgroundColor: "#1E22AA",
                      borderRadius: 6,
                      height: 30,
                      width: 90,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../../../../assets/img/chat.png")}
                      style={{ height: 20, width: 20 }}
                    />
                    <Text
                      style={{
                        fontFamily: "DMSans_400Regular",
                        marginLeft: 5,
                        color: "#FFF",
                        fontSize: 16,
                      }}
                    >
                      Chat
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {mechanicalProfile.averageScore ? (
                    <Text
                      style={{
                        marginRight: 5,
                        fontSize: 18,
                        fontFamily: "DMSans_500Medium",
                        color: "#1E22AA",
                      }}
                    >
                      {mechanicalProfile.averageScore}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        marginRight: 5,
                        fontSize: 18,
                        fontFamily: "DMSans_500Medium",
                        color: "#1E22AA",
                      }}
                    >
                      0
                    </Text>
                  )}
                  <AntDesign name="star" size={28} color="#1E22AA" />
                </View>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "DMSans_400Regular",
                  marginLeft: -4,
                  marginTop: 10,
                }}
              >
                {" "}
                {mechanicalProfile.descriptionMechanical}{" "}
              </Text>
              <FlatList
                data={mechanicalProfile.categories}
                keyExtractor={(item) => item.id_category.toString()}
                renderItem={({ item }) => <RenderCategories data={item} />}
                horizontal={true}
                style={{ marginLeft: -5, marginTop: 15 }}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  fontFamily: "DMSans_500Medium",
                }}
              >
                Endereços:{" "}
              </Text>
              <FlatList
                data={mechanicalProfile.addresses}
                keyExtractor={(item) => item.id_address.toString()}
                renderItem={({ item }) => <RenderAddresses data={item} />}
                style={{ marginLeft: -5, marginTop: 9 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
              {clientRating ? (
                <View>
                  <Text
                    style={{
                      marginTop: 15,
                      fontSize: 18,
                      fontFamily: "DMSans_500Medium",
                    }}
                  >
                    Sua avaliação:{" "}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      height: 82,
                      marginTop: 10,
                      marginBottom: 5,
                      borderWidth: 0.5,
                      borderColor: "rgba(0, 0, 0, 0.3)",
                      borderRadius: 6,
                    }}
                  >
                    {clientRating.client.imageClient ? (
                      <Image
                        source={{ uri: clientRating.client.imageClient }}
                        style={{
                          height: 82,
                          width: 82,
                          borderRadius: 6,
                          alignSelf: "flex-start",
                        }}
                      />
                    ) : (
                      <Image
                        source={require("../../../../assets/img/ImageNotFound.png")}
                        style={{
                          height: 82,
                          width: 82,
                          borderRadius: 6,
                          alignSelf: "flex-start",
                        }}
                      />
                    )}
                    <View
                      style={{
                        flexDirection: "column",
                        width: 275,
                        marginLeft: 10,
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: "DMSans_500Medium",
                          }}
                        >
                          {clientRating.client.nameClient}
                        </Text>
                        <View style={{ flexDirection: "row", marginRight: 10 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: "DMSans_400Regular",
                              color: "#1E22AA",
                              marginRight: 5,
                            }}
                          >
                            {clientRating.scoreRating}
                          </Text>
                          <AntDesign name="star" size={20} color="#1E22AA" />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: "DMSans_400Regular",
                            width: 200,
                          }}
                        >
                          {clientRating.descriptionRating}
                        </Text>
                        <TouchableOpacity
                          onPress={onOpen}
                          style={{
                            marginRight: 10,
                            marginTop: 10,
                            flexDirection: "row",
                            height: 25,
                          }}
                        >
                          <MaterialIcons
                            name="edit"
                            size={20}
                            color="#e53935"
                          />
                          <Text style={{ marginLeft: 2, color: "#e53935" }}>
                            Editar
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <Text style={{ marginTop: -15 }}></Text>
              )}
              <View>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 18,
                    fontFamily: "DMSans_500Medium",
                  }}
                >
                  Avaliações:{" "}
                </Text>
              </View>
              {ratings.length > 0 ? (
                <View style={{ marginTop: 10 }}>
                  <FlatList
                    data={ratings}
                    keyExtractor={(item) => item.id_rating.toString()}
                    renderItem={({ item }) => <RenderRatings data={item} />}
                  />
                  <TouchableOpacity
                    onPress={renderMoreRatings}
                    style={{
                      alignSelf: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                      borderColor: "#1E22AA",
                      borderWidth: 0.5,
                      borderRadius: 6,
                      width: 120,
                      height: 40,
                      marginBottom: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "DMSans_400Regular",
                        color: "#1E22AA",
                      }}
                    >
                      Mostrar mais
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 56,
                    fontSize: 22,
                    fontFamily: "DMSans_500Medium",
                    color: "rgba(0, 0, 0, 0.3)",
                  }}
                >
                  Sem avaliações
                </Text>
              )}
            </View>
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
    </ScrollView>
  );
}

export default ClientMechanicalProfile;
