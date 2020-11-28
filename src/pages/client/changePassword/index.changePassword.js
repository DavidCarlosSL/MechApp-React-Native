import React, { useContext, useState } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ClientContext } from '../../../contexts/client.context';
import { PersonContext } from '../../../contexts/person.context';

function ChangePasswordClient(){
    const navigation = useNavigation();

    const {person} = useContext(PersonContext);
    const {changePasswordClient} = useContext(ClientContext);

    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [confirmedPassword, setConfirmedPassword] = useState(null);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [errorSamePassword, setErrorSamePassword] = useState(false);
    const [errorFields, setErrorFields] = useState(false);
    const [errorLabel, setErrorLabel] = useState(null);

    async function handleChangePasswordClient(){
        if(newPassword != '' && newPassword != null && confirmedPassword != '' && confirmedPassword != null && oldPassword != null && oldPassword != ''){
            setErrorFields(false);
            setInvalidPassword(false);
            setErrorSamePassword(false);
            if(newPassword == confirmedPassword){
                setErrorFields(false);
                setInvalidPassword(false);
                setErrorSamePassword(false);
                const response = await changePasswordClient(oldPassword, confirmedPassword, person.clientToken);
                if(response == false){
                    setInvalidPassword(true);
                    setErrorLabel('Senha inválida');
                }
                else{
                    setInvalidPassword(false);
                    setErrorLabel(null);
                    navigation.navigate('ClientProfile');
                }
            }else{
                setInvalidPassword(false);
                setErrorFields(false);
                setErrorSamePassword(true);
                setErrorLabel('Senhas não coincidem');
            }
        }else{
            setInvalidPassword(false);
            setErrorSamePassword(false);
            setErrorFields(true);
            setErrorLabel('Todos os campos devem estar preenchidos!');
        }
    }

    return(
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={{alignSelf: 'center', width: 370, marginTop: 32}}>
                {
                    invalidPassword ? 
                    <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 18, fontFamily: 'DMSans_500Medium'}}>Senha atual: </Text>
                        <Text style={{fontSize: 16, fontFamily: 'DMSans_500Medium', color: '#e53935', alignSelf: 'center'}}>{errorLabel}</Text>
                    </View> 
                    : <Text style={{fontSize: 18, fontFamily: 'DMSans_500Medium'}}>Senha atual: </Text>
                }
                <TextInput
                value={oldPassword}
                onChangeText={(text) => setOldPassword(text)}
                style={{marginTop: 15, borderWidth: 0.5, borderRadius: 6, borderColor: invalidPassword || errorFields ? '#e53935' : 'rgba(0, 0, 0, 0.3)', width: 370, height: 48, fontFamily: 'DMSans_400Regular', padding: 16}} 
                secureTextEntry={true}
                autoCapitalize="none"
                />
                {
                    errorSamePassword ? 
                    <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 18, fontFamily: 'DMSans_500Medium', marginTop: 15}}>Nova senha: </Text>
                        <Text style={{fontSize: 16, fontFamily: 'DMSans_500Medium', color: '#e53935', alignSelf: 'center', marginTop: 15}}>{errorLabel}</Text>
                    </View> 
                    : <Text style={{fontSize: 18, fontFamily: 'DMSans_500Medium', marginTop: 15}}>Nova senha: </Text>
                }
                <TextInput 
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                style={{marginTop: 15, borderWidth: 0.5, borderRadius: 6, borderColor: errorSamePassword || errorFields ? '#e53935' : 'rgba(0, 0, 0, 0.3)', width: 370, height: 48, fontFamily: 'DMSans_400Regular', padding: 16}} 
                secureTextEntry={true}
                autoCapitalize="none"
                />
                <Text style={{fontSize: 18, fontFamily: 'DMSans_500Medium', marginTop: 15}}>Confirme a senha: </Text>
                <TextInput 
                value={confirmedPassword}
                onChangeText={(text) => setConfirmedPassword(text)}
                style={{marginTop: 15, borderWidth: 0.5, borderRadius: 6, borderColor: errorSamePassword || errorFields ? '#e53935' : 'rgba(0, 0, 0, 0.3)', width: 370, height: 48, fontFamily: 'DMSans_400Regular', padding: 16}} 
                secureTextEntry={true}
                autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => {handleChangePasswordClient()}} 
                style={{backgroundColor: '#1E22AA', marginTop: 20, borderRadius: 6, height: 60, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: '#fff', fontSize: 20, fontFamily: 'DMSans_500Medium'}}>Alterar senha</Text>
                </TouchableOpacity>
                {
                    errorFields ? <Text style={{fontSize: 16, fontFamily: 'DMSans_500Medium', color: '#e53935', alignSelf: 'center', marginTop: 16}}>{errorLabel}</Text> : <View></View>
                }
            </View>
        </View>
    )
}

export default ChangePasswordClient;