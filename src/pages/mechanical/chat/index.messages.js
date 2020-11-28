import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import momentTz from "moment-timezone";
import { Modalize } from "react-native-modalize";

import { MaterialIcons, Feather } from "@expo/vector-icons";

import RenderChatMessages from "../../../components/renderChatMessages";

import { ChatContext } from "../../../contexts/chat.contex";
import { PersonContext } from "../../../contexts/person.context";
import { SocketContext } from "../../../contexts/socket.context";
import { SchedulingContext } from "../../../contexts/scheduling.context";
import { MechanicalContext } from "../../../contexts/mechanical.context";

function RenderMessagesMechanical({ route }) {
  const modalizeRef = useRef(Modalize);

  const { person } = useContext(PersonContext);
  const {
    chatMessages,
    getMessagesMechanicalChat,
    handleResetChatMessages,
    addNewMessage,
    sendNewMessage,
  } = useContext(ChatContext);
  const { getMechanicalChats } = useContext(MechanicalContext);
  const { newSocket } = useContext(SocketContext);
  const {
    addNewScheduling,
    getMechanicalSchedulings,
    getSchedulingByMechanicalAndClient,
    handleResetMechanicalScheduling,
    mechanicalScheduling,
    updateInactiveScheduling,
    updateActiveScheduling,
    cancelScheduling,
  } = useContext(SchedulingContext);

  const [quantityMessages, setQuantityMessages] = useState(20);
  const [refresh, setRefresh] = useState(false);
  const [newMessageContent, setNewMessageContent] = useState(null);
  const [descriptionScheduling, setDescriptionScheduling] = useState(null);
  const [dateScheduling, setDateScheduling] = useState(null);
  const [dateOriginalFormat, setDateOriginalFormat] = useState(null);
  const [timeScheduling, setTimeScheduling] = useState(null);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const simbol = ">";

  let newDate;
  useEffect(() => {
    async function handleGetChatData() {
      await getMessagesMechanicalChat(route.params.chatId, quantityMessages);
      await getSchedulingByMechanicalAndClient(route.params.clientId);
    }
    handleGetChatData();
    return () => {
      handleResetChatMessages();
      handleResetMechanicalScheduling();
      setDescriptionScheduling(null);
    };
  }, []);

  function getMoreMessages(newQuantity) {
    getMessagesMechanicalChat(route.params.chatId, newQuantity);
    setQuantityMessages(newQuantity);
  }

  async function handleSendMessage() {
    newDate = momentTz(new Date())
      .tz("America/Sao_Paulo")
      .format("YYYY-MM-DD HH:mm:ss");
    newDate = newDate.split(" ");
    newDate = newDate[0] + "T" + newDate[1] + ".000Z";

    let messageData = {
      content: newMessageContent,
      typeSender: "mechanical",
      emailReceiver: route.params.emailClient,
      emailSender: person.mechanicalData.emailMechanical,
      createdAt: newDate,
    };
    newSocket.send(JSON.stringify(messageData));
    addNewMessage(messageData);
    setRefresh(!refresh);
    setNewMessageContent(null);
    await sendNewMessage(
      route.params.chatId,
      newMessageContent,
      "mechanical",
      person.mechanicalToken
    );
  }

  async function handleAddNewScheduling() {
    await addNewScheduling(
      descriptionScheduling,
      `${dateOriginalFormat} ${timeScheduling}`,
      route.params.clientId,
      route.params.chatId
    );
    onClose();
    getMechanicalSchedulings();
    await getSchedulingByMechanicalAndClient(route.params.clientId);
    await getMechanicalChats();
    resetSchedulings();
  }

  async function handleUpdateInactiveScheduling() {
    await updateInactiveScheduling(
      descriptionScheduling
        ? descriptionScheduling
        : mechanicalScheduling.description_scheduling,
      `${dateOriginalFormat} ${timeScheduling}`,
      mechanicalScheduling.id_scheduling,
      route.params.chatId
    );
    onClose();
    getMechanicalSchedulings();
    handleResetMechanicalScheduling();
    await getSchedulingByMechanicalAndClient(route.params.clientId);
    await getMechanicalChats();
    resetSchedulings();
  }

  async function handleUpdateActiveScheduling() {
    await updateActiveScheduling(
      descriptionScheduling
        ? descriptionScheduling
        : mechanicalScheduling.description_scheduling,
      dateOriginalFormat && timeScheduling
        ? `${dateOriginalFormat} ${timeScheduling}`
        : mechanicalScheduling.date_scheduling,
      mechanicalScheduling.id_scheduling
    );
    onClose();
    await getMechanicalSchedulings();
    handleResetMechanicalScheduling();
    await getSchedulingByMechanicalAndClient(route.params.clientId);
    await getMechanicalChats();
    resetSchedulings();
  }

  async function handleCancelScheduling() {
    await cancelScheduling(
      mechanicalScheduling.id_scheduling,
      route.params.chatId
    );
    onClose();
    handleResetMechanicalScheduling();
    await getMechanicalSchedulings();
    await getMechanicalChats();
    resetSchedulings();
  }

  function resetSchedulings() {
    setDescriptionScheduling(null);
    setDateScheduling(null);
    setDateOriginalFormat(null);
    setTimeScheduling(null);
  }

  function onClose() {
    modalizeRef.current?.close();
  }

  function onOpen() {
    modalizeRef.current?.open();
  }

  newSocket.onmessage = (message) => {
    const messageFromSocket = JSON.parse(message.data);
    if (
      messageFromSocket.emailReceiver == person.mechanicalData.emailMechanical
    ) {
      if (messageFromSocket.emailSender == route.params.emailClient) {
        addNewMessage(messageFromSocket);
        setRefresh(!refresh);
      }
    }
  };

  const onChange = (event, selectedDate) => {
    let newDateFormat = JSON.stringify(selectedDate);
    if (mode == "time") {
      setShow(false);
      newDateFormat = newDateFormat.split("T");
      newDateFormat = newDateFormat[1];
      newDateFormat = newDateFormat.split(".");
      newDateFormat = newDateFormat[0];
      newDateFormat = newDateFormat.split(":");
      let numberTime = parseInt(newDateFormat[0]);
      numberTime = numberTime - 3;
      newDateFormat = numberTime + ":" + newDateFormat[1];
      setTimeScheduling(newDateFormat);
    } else {
      setMode("time");
      newDateFormat = newDateFormat.split("T");
      newDateFormat = newDateFormat[0];
      newDateFormat = newDateFormat.split('"');
      newDateFormat = newDateFormat[1];
      setDateOriginalFormat(newDateFormat);
      newDateFormat = newDateFormat.split("-");
      newDateFormat =
        newDateFormat[2] + "/" + newDateFormat[1] + "/" + newDateFormat[0];
      setDateScheduling(newDateFormat);
    }
  };

  function formatSchedulingDate(schedulingDate, typeFormat) {
    let formatDate = schedulingDate.split("T");
    let formatTime = formatDate[1];
    formatDate = formatDate[0].split("-");
    if (typeFormat == "year")
      formatDate = formatDate[2] + "/" + formatDate[1] + "/" + formatDate[0];
    else formatDate = formatDate[2] + "/" + formatDate[1];

    formatTime = formatTime.split(":");
    formatTime = formatTime[0] + ":" + formatTime[1];
    return `${formatDate} - ${formatTime}`;
  }

  const showDatepicker = () => {
    setShow(true);
    setMode("date");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          width: 370,
          alignSelf: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: '#f5f5f5',
            marginBottom: 8
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 20,
              fontFamily: "DMSans_500Medium",
              marginBottom: 8,
            }}
          >
            {route.params.nameClient}
          </Text>
          <TouchableOpacity onPress={onOpen}>
            <Feather name="calendar" size={28} color="#1E22AA" />
          </TouchableOpacity>
        </View>
        {mechanicalScheduling ? (
          mechanicalScheduling.status_scheduling == "Active" ? (
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
                  marginBottom: 8
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
                  marginBottom: 8
                }}
              >
                <Text
                  style={{
                    fontFamily: "DMSans_400Regular",
                    color: "#FFF",
                    fontSize: 16,
                  }}
                >
                  {formatSchedulingDate(mechanicalScheduling.date_scheduling)}
                </Text>
              </View>
            </View>
          ) : (
            <View></View>
          )
        ) : (
          <View></View>
        )}
        
        <View style={{ flex: 0.85 }}>
          {chatMessages.length > 0 ? (
            <FlatList
              data={chatMessages}
              renderItem={({ item }) => <RenderChatMessages data={item} />}
              showsVerticalScrollIndicator={false}
              inverted={-1}
              extraData={refresh}
              ListFooterComponent={() => (
                <TouchableOpacity
                  onPress={() => {
                    getMoreMessages(quantityMessages + 10);
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
                  marginTop: 16,
                  borderColor: "rgba(0, 0, 0, 0.3)",
                  padding: 8,
                }}
              />
              <TouchableOpacity disabled={newMessageContent == null || newMessageContent == '' ? true : false} onPress={handleSendMessage}>
                <MaterialIcons
                  name="send"
                  size={40}
                  color={newMessageContent == null || newMessageContent == '' ? 'rgba(30, 32, 170, 0.8)' : "#1e22aa"}
                  style={{ marginTop: 24, marginLeft: 16 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <Modalize ref={modalizeRef} snapPoint={550}>
          {mechanicalScheduling ? (
            mechanicalScheduling.status_scheduling == "Active" ? (
              <View
                style={{
                  flex: 1,
                  marginTop: 0,
                  width: '90%',
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "DMSans_700Bold",
                    marginTop: 16,
                    alignSelf: "center",
                  }}
                >
                  Editar agendamento
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "DMSans_500Medium",
                    marginTop: 16,
                  }}
                >
                  Descrição:{" "}
                </Text>
                <TextInput
                  value={
                    descriptionScheduling == null
                      ? mechanicalScheduling.description_scheduling
                      : descriptionScheduling
                  }
                  onChangeText={(text) => setDescriptionScheduling(text)}
                  multiline={true}
                  placeholder="Digite uma curta descrição"
                  style={{
                    height: 80,
                    borderWidth: 0.5,
                    borderRadius: 6,
                    borderColor: "rgba(0, 0, 0, 0.32)",
                    fontSize: 14,
                    fontFamily: "DMSans_400Regular",
                    padding: 8,
                    marginTop: 8,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 32,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontFamily: "DMSans_500Medium" }}
                  >
                    Data e hora:{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={showDatepicker}
                    style={{ flexDirection: "row" }}
                  >
                    <Text
                      style={{
                        color: "#1E22AA",
                        fontFamily: "DMSans_500Medium",
                        fontSize: 16,
                      }}
                    >
                      Selecionar{" "}
                    </Text>
                    <Text
                      style={{
                        color: "#1E22AA",
                        fontFamily: "DMSans_500Medium",
                        fontSize: 18,
                        alignSelf: "center",
                      }}
                    >
                      {simbol}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    marginTop: 8,
                    fontFamily: "DMSans_400Regular",
                    fontSize: 16,
                    color: "#1E22AA",
                  }}
                >
                  {dateScheduling && timeScheduling
                    ? `${dateScheduling} - ${timeScheduling}`
                    : formatSchedulingDate(
                        mechanicalScheduling.date_scheduling,
                        "year"
                      )}
                </Text>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={mode}
                    is24Hour={true}
                    display="spinner"
                    onChange={onChange}
                  />
                )}
                <TouchableOpacity
                  onPress={handleUpdateActiveScheduling}
                  style={{
                    marginTop: 32,
                    backgroundColor: "#1E22AA",
                    borderRadius: 6,
                    height: 56,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "DMSans_500Medium",
                      color: "#fff",
                    }}
                  >
                    Editar agendamento
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCancelScheduling}
                  style={{
                    marginTop: 16,
                    backgroundColor: "#FFF",
                    borderRadius: 6,
                    borderWidth: 0.5,
                    borderColor: "#1E22AA",
                    height: 56,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "DMSans_500Medium",
                      color: "#1E22AA",
                    }}
                  >
                    Cancelar agendamento
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  marginTop: 0,
                  width: '90%',
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "DMSans_700Bold",
                    marginTop: 16,
                    alignSelf: "center",
                  }}
                >
                  Fazer agendamento
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "DMSans_500Medium",
                    marginTop: 16,
                  }}
                >
                  Descrição:{" "}
                </Text>
                <TextInput
                  value={descriptionScheduling}
                  onChangeText={(text) => setDescriptionScheduling(text)}
                  multiline={true}
                  placeholder="Digite uma curta descrição"
                  style={{
                    height: 80,
                    borderWidth: 0.5,
                    borderRadius: 6,
                    borderColor: "rgba(0, 0, 0, 0.32)",
                    fontSize: 14,
                    fontFamily: "DMSans_400Regular",
                    padding: 8,
                    marginTop: 8,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 32,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontFamily: "DMSans_500Medium" }}
                  >
                    Data e hora:{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={showDatepicker}
                    style={{ flexDirection: "row" }}
                  >
                    <Text
                      style={{
                        color: "#1E22AA",
                        fontFamily: "DMSans_500Medium",
                        fontSize: 16,
                      }}
                    >
                      Selecionar{" "}
                    </Text>
                    <Text
                      style={{
                        color: "#1E22AA",
                        fontFamily: "DMSans_500Medium",
                        fontSize: 18,
                        alignSelf: "center",
                      }}
                    >
                      {simbol}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    marginTop: 8,
                    fontFamily: "DMSans_400Regular",
                    fontSize: 16,
                    color: "#1E22AA",
                  }}
                >
                  {dateScheduling} - {timeScheduling}
                </Text>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={mode}
                    is24Hour={true}
                    display="spinner"
                    onChange={onChange}
                  />
                )}
                <TouchableOpacity
                  onPress={handleUpdateInactiveScheduling}
                  style={{
                    marginTop: 32,
                    backgroundColor: "#1E22AA",
                    borderRadius: 6,
                    height: 56,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "DMSans_500Medium",
                      color: "#fff",
                    }}
                  >
                    Agendar
                  </Text>
                </TouchableOpacity>
              </View>
            )
          ) : (
            <View
              style={{
                flex: 1,
                marginTop: 0,
                width: "90%",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "DMSans_700Bold",
                  marginTop: 16,
                  alignSelf: "center",
                }}
              >
                Fazer agendamento
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "DMSans_500Medium",
                  marginTop: 16,
                }}
              >
                Descrição:{" "}
              </Text>
              <TextInput
                value={descriptionScheduling}
                onChangeText={(text) => setDescriptionScheduling(text)}
                multiline={true}
                placeholder="Digite uma curta descrição"
                style={{
                  height: 80,
                  borderWidth: 0.5,
                  borderRadius: 6,
                  borderColor: "rgba(0, 0, 0, 0.32)",
                  fontSize: 14,
                  fontFamily: "DMSans_400Regular",
                  padding: 8,
                  marginTop: 8,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 24,
                }}
              >
                <Text style={{ fontSize: 18, fontFamily: "DMSans_500Medium" }}>
                  Data e hora:{" "}
                </Text>
                <TouchableOpacity
                  onPress={showDatepicker}
                  style={{ flexDirection: "row" }}
                >
                  <Text
                    style={{
                      color: "#1E22AA",
                      fontFamily: "DMSans_500Medium",
                      fontSize: 16,
                    }}
                  >
                    Selecionar{" "}
                  </Text>
                  <Text
                    style={{
                      color: "#1E22AA",
                      fontFamily: "DMSans_500Medium",
                      fontSize: 18,
                      alignSelf: "center",
                    }}
                  >
                    {simbol}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  marginTop: 8,
                  fontFamily: "DMSans_400Regular",
                  fontSize: 16,
                  color: "#1E22AA",
                }}
              >
                {dateScheduling} - {timeScheduling}
              </Text>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode={mode}
                  is24Hour={true}
                  display="spinner"
                  onChange={onChange}
                />
              )}
              <TouchableOpacity
                style={{
                  marginTop: 32,
                  backgroundColor: "#1E22AA",
                  borderRadius: 6,
                  height: 56,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={handleAddNewScheduling}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "DMSans_500Medium",
                    color: "#fff",
                  }}
                >
                  Agendar
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Modalize>

    </View>
    
  );
}

export default RenderMessagesMechanical;
