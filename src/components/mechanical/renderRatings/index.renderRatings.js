import React from 'react';
import { View, Image, Text } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

function RenderRatings({data}) {
    return(
        <View style={{flexDirection: "row", height: 82, marginTop: 5, marginBottom: 5, borderWidth: 0.5, borderColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 6}}>
            {
                data.client.imageClient ? 
                    <Image source={{uri: data.client.imageClient}} style={{height: 81, width: 81, borderRadius: 6, alignSelf: 'flex-start'}}/>
                : <Image source={require('../../../../assets/img/ImageNotFound.png')} style={{height: 81, width: 81, borderRadius: 6, alignSelf: 'flex-start'}}/>
            }
            <View style={{flexDirection: 'column', width: 275, marginLeft: 10, justifyContent: "center"}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 14, fontFamily: 'DMSans_500Medium'}}>{data.client.nameClient}</Text>
                    <View style={{flexDirection: 'row', marginRight: 10}}>
                        <Text style={{fontSize: 14, fontFamily: 'DMSans_400Regular', color: '#1E22AA', marginRight: 5}}>{data.scoreRating}</Text>
                        <AntDesign name="star" size={20} color="#1E22AA"/>
                    </View>
                </View>
                <Text style={{fontSize: 14, fontFamily: 'DMSans_400Regular'}}>{data.descriptionRating}</Text>
            </View>
        </View>
    )
}

export default RenderRatings;