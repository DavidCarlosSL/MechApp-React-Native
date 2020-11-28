import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import { PersonContext } from '../../../contexts/person.context';
import { ClientContext } from '../../../contexts/client.context';

function ChangeImageClient(){
    const navigation = useNavigation();

    const [image, setImage] = useState(null);

    const {person, handleChangeClientImage} = useContext(PersonContext);
    const {sendImageClient, newClientImageUri} = useContext(ClientContext);
    
    async function pickImage(){
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 0.5,
            base64: true
          });
    
        if (!result.cancelled) {
          setImage(`data:image/png;base64,${result.base64}`);
        }
    };

    async function handleSendImage(){
        await sendImageClient(image, person.clientToken);
        setImage(null);
        navigation.navigate('ClientProfile');
    }

    useEffect(() => {
        handleChangeClientImage(newClientImageUri);
        
    }, [newClientImageUri])

    return(
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={{width: 370, alignSelf: "center", marginTop: 24}}>
                <Text style={{fontSize: 18, fontFamily: 'DMSans_500Medium'}}>Selecione uma imagem: </Text>
                <TouchableOpacity style={{marginTop: 16}} onPress={pickImage}>
                    {
                        image ? <Image source={{uri: image}} style={{width: 370, height: 230, borderRadius: 6}}/> 
                        : <Image source={require('../../../../assets/img/ImageNotFound.png')} style={{width: 370, height: 230, borderRadius: 6}}/>
                    }
                </TouchableOpacity>
                
                <TouchableOpacity onPress={handleSendImage} 
                style={{backgroundColor: '#1E22AA', width: 370, height: 56, borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginTop: 24}}>
                    <Text style={{fontSize: 18, fontFamily: 'DMSans_500Medium', color: '#FFF'}}>Alterar foto</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChangeImageClient;