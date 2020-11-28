import React, { useContext } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { MechanicalContext } from '../../../contexts/mechanical.context';
import { PersonContext } from '../../../contexts/person.context';

function OptionsMechanicalProfile(){
    const navigation = useNavigation();

    const { person, signOut } = useContext(PersonContext);
    const {handleResetMechanicalOwnProfile} = useContext(MechanicalContext);

    const simbol = '>';

    async function handleSignOut(){
        await handleResetMechanicalOwnProfile();
        await signOut();
    }

    return(
        <View style={{flex: 1, backgroundColor: "#fff", alignItems: "center"}}>
            {
                person ?
                <View style={{width: 370, marginTop: 24}}> 
                    <View style={{flexDirection: 'row'}}>
                        {
                            person.mechanicalData.imageMechanical ? <Image source={{uri: `${person.mechanicalData.imageMechanical}`}} style={{height: 95, width: 95, borderRadius: 6}}/> 
                            : <Image source={require('../../../../assets/img/clientImageNotFound.png')} style={{height: 95, width: 95}}/> 
                        }
                        <View style={{marginLeft: 16, justifyContent: 'center'}}>
                            <Text style={{fontFamily: 'DMSans_500Medium', fontSize: 16}}>{person.mechanicalData.nameMechanical}</Text>
                            <Text style={{fontFamily: 'DMSans_400Regular', fontSize: 16}}>{person.mechanicalData.emailMechanical}</Text>
                        </View>
                    </View>
                    <Text style={{marginTop: 25, fontSize: 18, fontFamily: 'DMSans_700Bold'}}>Opções</Text>
                    <View style={{marginTop: 20, borderWidth: 0.5, borderColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 6, width: 370}}>
                        <TouchableOpacity onPress={() => {navigation.navigate('PersonalDataMechanical')}} style={{width: 370, flexDirection: 'row', justifyContent: 'space-between', padding: 15}}>
                            <Text style={{fontSize: 16, fontFamily: 'DMSans_400Regular'}}>Dados Pessoais</Text>
                            <Text style={{fontSize: 18, color: '#1E22AA', fontFamily: 'DMSans_400Regular'}}>{simbol}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {navigation.navigate('ChangePasswordMechanical')}} style={{width: 370, flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 0.5, borderColor: 'rgba(0, 0, 0, 0.3)', padding: 15}}>
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
                        <TouchableOpacity onPress={handleSignOut} style={{width: 370, flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 0.5, borderColor: 'rgba(0, 0, 0, 0.3)', padding: 15}}>
                            <Text style={{fontSize: 16, fontFamily: 'DMSans_400Regular'}}>Sair</Text>
                            <Text style={{fontSize: 18, color: '#1E22AA', fontFamily: 'DMSans_400Regular'}}>{simbol}</Text>
                        </TouchableOpacity>
                    </View>
                </View> : <Text></Text>
            }
        </View>
    )
}

export default OptionsMechanicalProfile;