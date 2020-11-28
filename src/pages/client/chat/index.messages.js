import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import momentTz from "moment-timezone";
import { Modalize } from "react-native-modalize";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";

import { SocketContext } from "../../../contexts/socket.context";
import { ChatContext } from "../../../contexts/chat.contex";
import { PersonContext } from "../../../contexts/person.context";
import { SchedulingContext } from "../../../contexts/scheduling.context";
import { RatingContext } from "../../../contexts/rating.context";

import RenderChatMessages from "../../../components/renderChatMessages";

function RenderMessagesClient({ route }) {
  const modalizeRef1 = useRef(Modalize);
  const modalizeRef2 = useRef(Modalize);

  const { person } = useContext(PersonContext);
  const {
    chatMessages,
    getMessagesClientChat,
    handleResetChatMessages,
    addNewMessage,
    sendNewMessage,
    sendNewComplaint,
  } = useContext(ChatContext);
  const {
    getSchedulingByClientAndMechanical,
    clientScheduling,
    handleResetClientScheduling,
  } = useContext(SchedulingContext);
  const {
    getRatingByMechanicalAndClient,
    clientRating,
    changeRating,
    addNewRating,
  } = useContext(RatingContext);
  const { newSocket } = useContext(SocketContext);

  const [refresh, setRefresh] = useState(false);
  const [quantityMessages, setQuantityMessages] = useState(20);
  const [newMessageContent, setNewMessageContent] = useState(null);
  const [newComplaint, setNewComplaint] = useState(null);
  const [labelScoreRating, setLabelScoreRating] = useState("");
  const [ratingDescription, setRatingDescription] = useState(null);
  const [ratingScore, setRatingScore] = useState(null);
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);
  const [errorEmptyComplaint, setErrorEmptyComplaint] = useState(false);

  useEffect(() => {
    async function handleGetChatData() {
      await getMessagesClientChat(route.params.chatId, quantityMessages);
      await getSchedulingByClientAndMechanical(route.params.mechanicalId);
      await getRatingByMechanicalAndClient(route.params.mechanicalId);
    }
    handleGetChatData();
    return () => {
      handleResetChatMessages();
      handleResetClientScheduling();
    };
  }, []);

  function onClose1() {
    modalizeRef1.current?.close();
  }

  function onOpen1() {
    modalizeRef1.current?.open();
  }

  function onClose2() {
    modalizeRef2.current?.close();
  }

  function onOpen2() {
    modalizeRef2.current?.open();
    if (clientRating) {
      setRatingDescription(clientRating.descriptionRating);
      setRatingScore(clientRating.scoreRating);
      handleFillStars(clientRating.scoreRating);
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
      setRatingScore(scoreRating);
    }
    if (scoreRating == 2) {
      setStar1(true);
      setStar2(true);
      setStar3(false);
      setStar4(false);
      setStar5(false);
      setLabelScoreRating("Ruim");
      setRatingScore(scoreRating);
    }
    if (scoreRating == 3) {
      setStar1(true);
      setStar2(true);
      setStar3(true);
      setStar4(false);
      setStar5(false);
      setLabelScoreRating("Mediano");
      setRatingScore(scoreRating);
    }
    if (scoreRating == 4) {
      setStar1(true);
      setStar2(true);
      setStar3(true);
      setStar4(true);
      setStar5(false);
      setLabelScoreRating("Bom");
      setRatingScore(scoreRating);
    }
    if (scoreRating == 5) {
      setStar1(true);
      setStar2(true);
      setStar3(true);
      setStar4(true);
      setStar5(true);
      setLabelScoreRating("Ótimo");
      setRatingScore(scoreRating);
    }
  }

  function formatSchedulingDate(schedulingDate) {
    let formatDate = schedulingDate.split("T");
    let formatTime = formatDate[1];
    formatDate = formatDate[0].split("-");
    formatDate = formatDate[2] + "/" + formatDate[1];
    formatTime = formatTime.split(":");
    formatTime = formatTime[0] + ":" + formatTime[1];
    return `${formatDate} - ${formatTime}`;
  }

  async function handleSendNewComplaint() {
    if(newComplaint == null || newComplaint == ''){
        setErrorEmptyComplaint(true);
    }else{
      setErrorEmptyComplaint(false);
      await sendNewComplaint(route.params.mechanicalId, newComplaint);
      setNewComplaint(null);
      onClose1();
    }
  }

  function getMoreMessages(newQuantity) {
    getMessagesClientChat(route.params.chatId, newQuantity);
    setQuantityMessages(newQuantity);
  }

  async function handleAddNewRating() {
    await addNewRating(
      ratingScore,
      ratingDescription,
      route.params.mechanicalId
    );
    await getRatingByMechanicalAndClient(route.params.mechanicalId);
    onClose2();
    setRatingScore(null);
    setRatingDescription(null);
  }

  async function handleChangeRating() {
    await changeRating(
      clientRating.id_rating,
      ratingScore,
      ratingDescription,
      person.clientToken
    );
    await getRatingByMechanicalAndClient(route.params.mechanicalId);
    onClose2();
  }

  async function handleSendMessage() {
    let newDate = momentTz(new Date())
      .tz("America/Sao_Paulo")
      .format("YYYY-MM-DD HH:mm:ss");
    newDate = newDate.split(" ");
    newDate = newDate[0] + "T" + newDate[1] + ".000Z";

    let messageData = {
      content: newMessageContent,
      typeSender: "client",
      emailReceiver: route.params.emailMechanical,
      emailSender: person.clientData.emailClient,
      createdAt: newDate,
    };
    newSocket.send(JSON.stringify(messageData));
    addNewMessage(messageData);
    setRefresh(!refresh);
    setNewMessageContent(null);
    await sendNewMessage(
      route.params.chatId,
      newMessageContent,
      "client",
      person.clientToken
    );
  }

  newSocket.onmessage = (message) => {
    const messageFromSocket = JSON.parse(message.data);
    if (messageFromSocket.emailReceiver == person.clientData.emailClient) {
      if (messageFromSocket.emailSender == route.params.emailMechanical) {
        addNewMessage(messageFromSocket);
        setRefresh(!refresh);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, width: 370, alignSelf: "center" }}>
        {clientScheduling ? (
          clientScheduling.status_scheduling == "Active" ? (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderBottomColor: "#f5f5f5",
                  marginBottom: 8,
                }}
              >
                <Text style={{ fontSize: 20, fontFamily: "DMSans_500Medium" }}>
                  {route.params.nameMechanical}
                </Text>
                <TouchableOpacity onPress={onOpen1}>
                  <AntDesign name="warning" size={24} color="#1E22AA" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingBottom: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: "DMSans_400Regular",
                    color: "#1E22AA",
                    fontSize: 16,
                  }}
                >
                  Agendado para:{" "}
                </Text>
                <View
                  style={{
                    backgroundColor: "#1E22AA",
                    borderRadius: 6,
                    height: 32,
                    width: 104,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "DMSans_400Regular",
                      color: "#FFF",
                      fontSize: 15,
                    }}
                  >
                    {formatSchedulingDate(clientScheduling.date_scheduling)}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={{ paddingBottom: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{ fontSize: 20, fontFamily: "DMSans_500Medium" }}
                  >
                    {route.params.nameMechanical} -{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={onOpen2}
                    style={{
                      backgroundColor: "#1E22AA",
                      height: 32,
                      borderRadius: 6,
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    {clientRating ? (
                      <View
                        style={{
                          flexDirection: "row",
                          width: 104,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MaterialIcons name="done" size={20} color="#FFF" />
                        <Text
                          style={{
                            fontFamily: "DMSans_400Regular",
                            color: "#FFF",
                            fontSize: 16,
                            marginLeft: 3,
                          }}
                        >
                          Avaliado
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: "row",
                          width: 92,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <AntDesign name="star" size={18} color="#FFF" />
                        <Text
                          style={{
                            fontFamily: "DMSans_400Regular",
                            color: "#FFF",
                            fontSize: 16,
                            marginLeft: 3,
                          }}
                        >
                          Avaliar
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={onOpen1}>
                  <AntDesign name="warning" size={24} color="#1E22AA" />
                </TouchableOpacity>
              </View>
            </View>
          )
        ) : (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 20, fontFamily: "DMSans_500Medium" }}>
              {route.params.nameMechanical}
            </Text>
            <TouchableOpacity onPress={onOpen1}>
              <AntDesign name="warning" size={24} color="#1E22AA" />
            </TouchableOpacity>
          </View>
        )}

        <View style={{ width: 370, flex: 0.85 }}>
          {chatMessages.length > 0 ? (
            <FlatList
              data={chatMessages}
              renderItem={({ item }) => <RenderChatMessages data={item} />}
              extraData={refresh}
              showsVerticalScrollIndicator={false}
              inverted={-1}
              ListFooterComponent={() => (
                <TouchableOpacity
                  onPress={() => {
                    getMoreMessages(quantityMessages + 15);
                  }}
                  style={{
                    marginTop: 16,
                    marginBottom: 16,
                    marginLeft: 9,
                    alignSelf: "center",
                    borderColor: "#1E22AA",
                    borderWidth: 0.5,
                    borderRadius: 6,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "DMSans_400Regular",
                      padding: 8,
                      color: "#1E22AA",
                    }}
                  >
                    Mostrar mais
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text></Text>
          )}
        </View>
        <View style={{ flex: 0.15, justifyContent: "flex-end" }}>
          <View style={{ bottom: 0, position: "absolute" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#fff",
                borderRadius: 6,
              }}
            >
              <TextInput
                value={newMessageContent}
                onChangeText={(text) => setNewMessageContent(text)}
                placeholder="Digite aqui sua mensagem"
                style={{
                  height: 56,
                  width: 316,
                  borderRadius: 6,
                  borderWidth: 0.5,
                  marginBottom: 16,
                  borderColor: "rgba(0, 0, 0, 0.3)",
                  padding: 8,
                }}
              />
              <TouchableOpacity disabled={newMessageContent == null || newMessageContent == "" ? true : false} onPress={handleSendMessage}>
                <MaterialIcons
                  name="send"
                  size={40}
                  color={newMessageContent == null || newMessageContent == "" ? 'rgba(30, 32, 170, 0.7)' : '#1e22aa'}
                  style={{ marginTop: 8, marginLeft: 16 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Modalize ref={modalizeRef1} snapPoint={520}>
        <View
          style={{ flex: 1, marginTop: 0, width: "90%", alignSelf: "center" }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "DMSans_700Bold",
              marginTop: 16,
              alignSelf: "center",
            }}
          >
            Fazer reclamação
          </Text>
          <TextInput
            value={newComplaint}
            onChangeText={(text) => setNewComplaint(text)}
            placeholder="Digite aqui sua reclamação"
            multiline={true}
            style={{
              height: 120,
              borderWidth: 0.5,
              borderRadius: 6,
              borderColor: errorEmptyComplaint ? '#e53935' : 'rgba(0, 0, 0, 0.3)',
              fontSize: 14,
              fontFamily: "DMSans_400Regular",
              padding: 8,
              marginTop: 24,
            }}
          />
          <TouchableOpacity
            onPress={handleSendNewComplaint}
            style={{
              backgroundColor: "#1E22AA",
              borderRadius: 6,
              marginTop: 16,
              height: 56,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontFamily: "DMSans_500Medium",
                fontSize: 18,
              }}
            >
              Enviar
            </Text>
          </TouchableOpacity>
          {
            errorEmptyComplaint ? <Text style={{fontSize: 16, color: '#e53935', fontFamily: 'DMSans_400Regular', marginTop: 16}}>Preencha o campo de reclamação</Text> : <View></View>
          }
        </View>
      </Modalize>
      <Modalize ref={modalizeRef2} snapPoint={580}>
        <View
          style={{ flex: 1, marginTop: 0, width: "90%", alignSelf: "center" }}
        >
          {clientRating ? (
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "DMSans_700Bold",
                  marginTop: 16,
                  alignSelf: "center",
                }}
              >
                Editar avaliação
              </Text>
              <View style={{ width: "100%", marginTop: 32 }}>
                <Text style={{ fontSize: 18, fontFamily: "DMSans_500Medium" }}>
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
                  value={ratingDescription}
                  onChangeText={(text) => setRatingDescription(text)}
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
            </View>
          ) : (
            <View style={{ flex: 1, marginTop: 0, width: "100%", alignSelf: "center" }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "DMSans_700Bold",
                  marginTop: 20,
                  alignSelf: "center",
                  
                }}
              >
                Fazer avaliação
              </Text>
              <View style={{ width: "100%", marginTop: 24 }}>
                <Text style={{ fontSize: 18, fontFamily: "DMSans_500Medium" }}>
                  O serviço foi:{" "}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "DMSans_500Medium",
                    alignSelf: "center",
                    marginTop: 16,
                  }}
                >
                  {labelScoreRating ? labelScoreRating : "-"}
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
                  Digite uma descrição:{" "}
                </Text>
                <TextInput
                  placeholder="Uma curta descrição"
                  value={ratingDescription}
                  onChangeText={(text) => setRatingDescription(text)}
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
                  onPress={handleAddNewRating}
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
                    Fazer avaliação
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modalize>
    </View>
  );
}

export default RenderMessagesClient;
