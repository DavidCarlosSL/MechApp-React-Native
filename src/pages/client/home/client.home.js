import React, { useContext, useEffect, useRef, useState } from 'react';
import { Text, View, TextInput, FlatList, ScrollView, Image, TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import { PersonContext } from "../../../contexts/person.context";
import { CategoryContext } from '../../../contexts/category.context';
import { MechanicalContext } from '../../../contexts/mechanical.context';

import RenderMechanicals from '../../../components/mechanical/renderMechanicals/index.renderMechanicals';
import { Modalize } from 'react-native-modalize';

function RenderCategories({data}){
    const navigation = useNavigation();

    const [image, setImage] = useState(null);

    useEffect(() => {
        if(data.nameCategory == 'Pintura')
            setImage(<Image source={require('../../../../assets/img/painting.png')} style={{height: 65, width: 65, marginBottom: 10}}/>);
        if(data.nameCategory == 'Manutenção')
            setImage(<Image source={require('../../../../assets/img/maintenance.png')} style={{height: 65, width: 75, marginBottom: 10}}/>);
        if(data.nameCategory == 'Funilaria')
            setImage(<Image source={require('../../../../assets/img/garage.png')} style={{height: 65, width: 65, marginBottom: 10}}/>);
        if(data.nameCategory == 'Tunagem')
            setImage(<Image source={require('../../../../assets/img/improvments.png')} style={{height: 65, width: 75, marginBottom: 10}}/>);
    }, [])
    return(
        <View style={{height: 128, width: 112, borderWidth: 0.5, borderColor: 'rgba(0, 0, 0, 0.2)', borderRadius: 6, backgroundColor: "#fff", marginRight: 10, justifyContent: 'flex-end'}}>
            <TouchableOpacity onPress={() => navigation.navigate('ClientListMechanicals', {categoryId: data.id_category})} style={{alignItems: 'center'}}>
                {image}
                <Text style={{marginBottom: 15, fontSize: 14, fontFamily: 'DMSans_500Medium'}}>{data.nameCategory}</Text>
            </TouchableOpacity>
        </View>
    )
}

function ClientHome () {
    const navigation = useNavigation();
    const modalizeRef1 = useRef(Modalize);

    const { person } = useContext(PersonContext);
    const { getCategories, categories } = useContext(CategoryContext);
    const { getMechanicalsHome, mechanicalsHome, sortMechanicalsHome } = useContext(MechanicalContext);
    
    const [quantityMechanicals, setQuantityMechanicals] = useState(10);
    const [search, setSearch] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    function onClose1() {
        modalizeRef1.current?.close();
      }
    
    function onOpen1() {
    modalizeRef1.current?.open();
    }

    const simbol = '>';

    useEffect(() => {
        getCategories();
        getMechanicalsHome(quantityMechanicals);
    }, [])

    function handleGetMoreMechanicalsHome(){
        getMechanicalsHome(quantityMechanicals + 10);
        setQuantityMechanicals(quantityMechanicals + 10);
    }

    async function handleSortMechanicalsBy(){
        if(selectedOption == "Nome")
            sortMechanicalsHome("nameMechanical");

        if(selectedOption == "Nota")
            sortMechanicalsHome("averageScore");

        setRefresh(!refresh);
        onClose1();
    }

    return(
        <View style={{flex: 1, backgroundColor: "#fff"}}>
            {
                categories.length > 0 ? 
                <View>
                    <ScrollView style={{width: 370, alignSelf: "center", marginTop: 48}}>
                    {person ? 
                        <View>
                            <Text style={{color: '#1E22AA', fontSize: 20, fontWeight: 'bold', fontFamily: 'DMSans_700Bold'}}>Olá, {person.clientData.nameClient}!</Text>
                            <Text style={{color: '#000', fontSize: 18, fontFamily: 'DMSans_500Medium'}}>De qual serviço seu veículo precisa? </Text>
                            <View style={{flexDirection: "row"}}>
                                <View style={{borderWidth: 0.5, borderRadius: 6 ,borderColor: 'rgba(0, 0, 0, 0.3)', marginTop: 15, width: 310, height: 53}}>
                                    <TextInput value={search} onChangeText={(text) => setSearch(text)}
                                    style={{fontFamily: 'DMSans_400Regular', padding: 16}} placeholder="Pesquise por oficinas" />
                                </View>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('ListMechanicalsBySearch', {nameMechanical: search}); setSearch(null)}} 
                                    style={{height: 53, borderWidth: 0.5, borderRadius: 6, borderLeftWidth: 0, borderColor: 'rgba(0, 0, 0, 0.3)', marginTop: 15, width: 60, alignItems: 'center', justifyContent: "center"}}>
                                    <AntDesign name="search1" size={28} color="#1E22AA"/>
                                </TouchableOpacity>
                            </View>
                            <Text style={{marginTop: 25, fontSize: 18, fontFamily: 'DMSans_700Bold'}}>Categorias</Text>
                            <FlatList
                            data={categories}
                            keyExtractor={(item) => item.id_category.toString()}
                            renderItem={({item}) => (<RenderCategories data={item}/>)}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{marginTop: 20}}/>
                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <Text style={{marginTop: 25, fontSize: 18, fontFamily: 'DMSans_700Bold'}}>Oficinas</Text>
                                <TouchableOpacity onPress={onOpen1} style={{marginTop: 26, flexDirection: 'row'}}>
                                    <Text style={{fontSize: 17, fontFamily: 'DMSans_400Regular', color: '#1E22AA'}}>{selectedOption ? selectedOption : "Ordernar "} </Text>
                                    <Text style={{fontSize: 18, color: '#1E22AA', fontFamily: 'DMSans_400Regular'}}>{simbol}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop: 5}}>
                                {
                                    mechanicalsHome.length > 0 ? 
                                    <View> 
                                        <FlatList 
                                        data={mechanicalsHome}
                                        keyExtractor={(item) => item.id_mechanical.toString()}
                                        renderItem={({item}) => (<RenderMechanicals data={item}/>)}
                                        extraData={refresh}
                                        />
                                        <TouchableOpacity
                                        onPress={handleGetMoreMechanicalsHome}
                                        style={{alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 10, borderColor: '#1E22AA', borderWidth: 0.5, borderRadius: 6, width: 120, height: 40, marginBottom: 15}}>
                                            <Text style={{fontFamily: 'DMSans_400Regular', color: '#1E22AA'}}>Mostrar mais</Text>
                                        </TouchableOpacity> 
                                    </View> : <Text></Text>
                                }
                            </View>
                        </View> 
                        : <Text></Text>
                    }
                    </ScrollView>
                    <Modalize ref={modalizeRef1} snapPoint={280}>
                        <View style={{ flex: 1, marginTop: 0, width: "90%", alignSelf: "center"}}>
                            <Text
                                style={{
                                fontSize: 20,
                                fontFamily: "DMSans_700Bold",
                                marginTop: 16,
                                alignSelf: "center",
                                }}
                            >
                            Ordenar por:
                            </Text>
                            <View style={{alignSelf: "center", flexDirection: "row", marginTop: 24, width: "90%", justifyContent: 'center'}}>
                                <TouchableOpacity onPress={() => setSelectedOption("Nome")} style={{height: 48, width: 144, backgroundColor: selectedOption == "Nome" ? "#1E22AA" : "#FFF", borderWidth: 0.5, borderColor: "#1E22AA", borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginRight: 8}}>
                                    <Text style={{color: selectedOption == "Nome" ? "#FFF" : "#1E22AA", fontSize: 16, fontFamily: 'DMSans_400Regular'}}>Nome</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSelectedOption("Nota")} style={{height: 48, width: 144, backgroundColor: selectedOption == "Nota" ? "#1E22AA" : "#FFF", borderWidth: 0.5, borderColor: "#1E22AA", borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginLeft: 8}}>
                                    <Text style={{color: selectedOption == "Nota" ? "#FFF" : "#1E22AA", fontSize: 16, fontFamily: 'DMSans_400Regular'}}>Nota</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={handleSortMechanicalsBy} style={{marginTop: 24, height: 56, width: 302, backgroundColor: '#1E22AA', alignItems: "center", justifyContent: "center", borderRadius: 6, alignSelf: 'center'}}>
                                <Text style={{color: '#FFF', fontFamily: "DMSans_400Regular", fontSize: 18}}>Ordenar</Text>
                            </TouchableOpacity>
                        </View>
                    </Modalize>
                </View>
                : <Text></Text>
            }
        </View>
    )
}

export default ClientHome;