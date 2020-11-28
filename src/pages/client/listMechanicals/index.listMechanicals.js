import React, { useContext, useEffect, useRef, useState } from 'react';
import { ScrollView, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';
import RenderMechanicals from '../../../components/mechanical/renderMechanicals/index.renderMechanicals';

import { MechanicalContext } from '../../../contexts/mechanical.context';

function ClientListMechanicals({route}){
    const { getMechanicalsByCategory, mechanicalsCategory, sortMechanicalsCategory } = useContext(MechanicalContext);
    const [quantityMechanicals, setQuantityMechanicals] = useState(10);
    const [refresh, setRefresh] = useState(false);

    const simbol = '>';

    const modalizeRef1 = useRef(Modalize);
    const [selectedOption, setSelectedOption] = useState(null);
    
    function onClose1() {
        modalizeRef1.current?.close();
      }
    
    function onOpen1() {
    modalizeRef1.current?.open();
    }

    async function handleSortMechanicalsBy(){
        if(selectedOption == "Nome")
            sortMechanicalsCategory("nameMechanical");

        if(selectedOption == "Nota")
            sortMechanicalsCategory("averageScore");

        setRefresh(!refresh);
        onClose1();
    }

    function handleGetMoreMechanicalsByCategory(){
        getMechanicalsByCategory(route.params.categoryId, quantityMechanicals + 10);
        setQuantityMechanicals(quantityMechanicals + 10);
    }

    useEffect(() => {
        getMechanicalsByCategory(route.params.categoryId, quantityMechanicals);
    }, [])

    return(
        <View style={{backgroundColor: '#fff', flex: 1}}>
            <ScrollView style={{width: 370, alignSelf: 'center'}}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{marginTop: 25, fontSize: 18, fontFamily: 'DMSans_700Bold'}}>Oficinas</Text>
                    <TouchableOpacity onPress={onOpen1} style={{marginTop: 26, flexDirection: 'row'}}>
                        <Text style={{fontSize: 17, fontFamily: 'DMSans_400Regular', color: '#1E22AA'}}>{selectedOption ? selectedOption : "Ordernar"} </Text>
                        <Text style={{fontSize: 18, color: '#1E22AA', fontFamily: 'DMSans_400Regular'}}>{simbol}</Text>
                    </TouchableOpacity>
                </View>
                {
                    mechanicalsCategory.length > 0 ?
                    <View>
                        <FlatList 
                        data={mechanicalsCategory}
                        keyExtractor={(item) => item.id_mechanical.toString()}
                        renderItem={({item}) => (<RenderMechanicals data={item}/>)}
                        />
                        <TouchableOpacity
                        onPress={handleGetMoreMechanicalsByCategory}
                        style={{alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 10, borderColor: '#1E22AA', borderWidth: 0.5, borderRadius: 6, width: 120, height: 40, marginBottom: 15}}>
                            <Text style={{fontFamily: 'DMSans_400Regular', color: '#1E22AA'}}>Mostrar mais</Text>
                        </TouchableOpacity>
                    </View> : <Text></Text>
                }
            </ScrollView>
            <Modalize ref={modalizeRef1} snapPoint={250}>
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
    )
}

export default ClientListMechanicals;