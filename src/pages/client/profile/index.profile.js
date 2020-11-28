import React, { useContext } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { PersonContext } from '../../../contexts/person.context';

function ClientProfile(){
    const navigation = useNavigation();

    const { person, signOut } = useContext(PersonContext);
    const simbol = '>';

    function handleSignOut(){
        signOut();
    }

    return(
        <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
            {
            person ?
                <View style={{width: 370, marginTop: 44}}>
                <Text style={{alignSelf: 'center', fontSize: 20, fontFamily: 'DMSans_700Bold'}}>Perfil</Text>
                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                    {
                        person.clientData.imageClient ? <Image source={{uri: `${person.clientData.imageClient}`}} style={{height: 95, width: 95, borderRadius: 6}}/> 
                        : <Image source={require('../../../../assets/img/clientImageNotFound.png')} style={{height: 95, width: 95}}/> 
                    }
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{marginLeft: 15, fontSize: 16, fontFamily: 'DMSans_500Medium'}}>{person.clientData.nameClient}</Text>
                        <Text style={{marginLeft: 15, fontSize: 16, fontFamily: 'DMSans_400Regular'}}>{person.clientData.emailClient}</Text>
                    </View>
                </View>
                <Text style={{marginTop: 25, fontSize: 18, fontFamily: 'DMSans_700Bold'}}>Opções</Text>
                <View style={{marginTop: 20, borderWidth: 0.5, borderColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 6, width: 370}}>
                    <TouchableOpacity onPress={() => {navigation.navigate('ClientChangeImage')}} style={{width: 370, flexDirection: 'row', justifyContent: 'space-between', padding: 15}}>
                        <Text style={{fontSize: 16, fontFamily: 'DMSans_400Regular'}}>Alterar Foto</Text>
                        <Text style={{fontSize: 18, color: '#1E22AA', fontFamily: 'DMSans_400Regular'}}>{simbol}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('ClientChangePassword')}} style={{width: 370, flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 0.5, borderColor: 'rgba(0, 0, 0, 0.3)', padding: 15}}>
                        <Text style={{fontSize: 16, fontFamily: 'DMSans_400Regular'}}>Alterar Senha</Text>
                        <Text style={{fontSize: 18, color: '#1E22AA', fontFamily: 'DMSans_400Regular'}}>{simbol}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{marginTop: 25, fontSize: 18, fontFamily: 'DMSans_700Bold'}}>Outros</Text>
                <View style={{marginTop: 20, borderWidth: 0.5, borderColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 6, width: 370}}>
                    <TouchableOpacity style={{width: 370, flexDirection: 'row', justifyContent: 'space-between', padding: 15}}>
                        <Text style={{fontSize: 16, fontFamily: 'DMSans_400Regular'}}>Ir para o site</Text>
                        <Text style={{fontSize: 18, color: '#1E22AA', fontFamily: 'DMSans_400Regular'}}>{simbol}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handleSignOut()}} style={{width: 370, flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 0.5, borderColor: 'rgba(0, 0, 0, 0.3)', padding: 15}}>
                        <Text style={{fontSize: 16, fontFamily: 'DMSans_400Regular'}}>Sair</Text>
                        <Text style={{fontSize: 18, color: '#1E22AA', fontFamily: 'DMSans_400Regular'}}>{simbol}</Text>
                    </TouchableOpacity>
                </View>
            </View> : <Text></Text>
            }
        </View>
    )
}

export default ClientProfile;