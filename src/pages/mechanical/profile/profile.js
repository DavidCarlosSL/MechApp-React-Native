import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { EvilIcons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import RenderCategories from "../../../components/mechanical/renderCategories/index.renderCategories";
import RenderAddresses from "../../../components/mechanical/renderAddresses/index.renderAddresses";
import RenderRatings from "../../../components/mechanical/renderRatings/index.renderRatings";

import { Container } from "../../../components/index.components";
import { ImageView, ImageMechanical, Background } from "./styles";

import { MechanicalContext } from "../../../contexts/mechanical.context";

function MechanicalProfile() {
  const navigation = useNavigation();

  const {
    getMechanicalOwnProfile,
    mechanicalOwnProfile,
    mechanicalOwnRatings,
    handleResetMechanicalOwnRatings,
    newMechanicalImageUri,
    handleResetMechanicalOwnProfile
  } = useContext(MechanicalContext);

  const [refreshing, setRefreshing] = useState(false);
  const [quantityRatings, setQuantityRatings] = useState(10);

  useEffect(() => {
    getMechanicalOwnProfile(quantityRatings);

    return () => {
      handleResetMechanicalOwnRatings();
      handleResetMechanicalOwnProfile();
    };
  }, [newMechanicalImageUri]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      setQuantityRatings(10);
      getMechanicalOwnProfile(quantityRatings);
      setRefreshing(false);
    } catch (error) {
      return error;
    }
  }, [refreshing]);

  function renderMoreRatings(quantityRatings) {
    getMechanicalOwnProfile(quantityRatings);
    setQuantityRatings(quantityRatings + 5);
  }

  return (
    <Background
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Container>
        {mechanicalOwnProfile ? (
          <View style={{ width: 370, marginTop: 30 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditMechanicalProfile");
                }}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <MaterialIcons name="edit" size={28} color="#1E22AA" />
                <Text
                  style={{
                    color: "#1E22AA",
                    fontSize: 18,
                    marginLeft: 5,
                    fontFamily: "DMSans_500Medium",
                  }}
                >
                  Editar Perfil
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("OptionsMechanicalProfile")}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <EvilIcons name="gear" size={28} color="#1E22AA" />
                <Text
                  style={{
                    color: "#1E22AA",
                    fontSize: 18,
                    marginLeft: 5,
                    fontFamily: "DMSans_500Medium",
                  }}
                >
                  Opções
                </Text>
              </TouchableOpacity>
            </View>
            <ImageView>
              {mechanicalOwnProfile.imageMechanical == null ? (
                <ImageMechanical
                  source={require("../../../../assets/img/ImageNotFound.png")}
                />
              ) : (
                <ImageMechanical
                  source={{ uri: mechanicalOwnProfile.imageMechanical }}
                />
              )}
            </ImageView>
            <View style={{ marginTop: 16 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "DMSans_700Bold",
                    alignSelf: "flex-start",
                  }}
                >
                  {mechanicalOwnProfile.nameMechanical}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {mechanicalOwnProfile.averageScore ? (
                    <Text
                      style={{
                        marginRight: 5,
                        fontSize: 18,
                        fontFamily: "DMSans_500Medium",
                        color: "#1E22AA",
                      }}
                    >
                      {mechanicalOwnProfile.averageScore}
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
              {mechanicalOwnProfile.descriptionMechanical}{" "}
            </Text>
            <FlatList
              data={mechanicalOwnProfile.categories}
              keyExtractor={(item) => item.id_category.toString()}
              renderItem={({ item }) => <RenderCategories data={item} />}
              horizontal={true}
              style={{ marginLeft: -5, marginTop: 16 }}
            />
            <Text
              style={{
                marginTop: 16,
                fontSize: 18,
                fontFamily: "DMSans_500Medium",
              }}
            >
              Endereços:{" "}
            </Text>
            <FlatList
              data={mechanicalOwnProfile.addresses}
              keyExtractor={(item) => item.id_address.toString()}
              renderItem={({ item }) => <RenderAddresses data={item} />}
              style={{ marginLeft: -5, marginTop: 8 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
            <Text
              style={{
                marginTop: 16,
                fontSize: 18,
                fontFamily: "DMSans_500Medium",
              }}
            >
              Avaliações:{" "}
            </Text>
            {mechanicalOwnRatings.length > 0 ? (
              <View style={{ marginTop: 6 }}>
                <FlatList
                  data={mechanicalOwnRatings}
                  keyExtractor={(item) => item.id_rating.toString()}
                  renderItem={({ item }) => <RenderRatings data={item} />}
                />
                <TouchableOpacity
                  onPress={() => {
                    renderMoreRatings(quantityRatings + 5);
                  }}
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
        ) : (
          <Text></Text>
        )}
      </Container>
    </Background>
  );
}

export default MechanicalProfile;
