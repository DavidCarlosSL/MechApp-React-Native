import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

function RenderCategories({data}) {
    return(
        <View>
            <TouchableOpacity disabled={true} style={{backgroundColor: '#fff', borderRadius: 6, marginLeft: 5, borderWidth: 0.5, borderColor: '#1E22AA'}}>
                <Text style={{color: '#1E22AA', fontFamily: 'DMSans_400Regular', padding: 7}}>{data.nameCategory} </Text>
            </TouchableOpacity>
        </View>
    )
}

export default RenderCategories;