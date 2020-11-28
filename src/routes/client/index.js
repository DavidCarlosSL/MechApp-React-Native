import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ClientIndex from '../../pages/client';
import ChangeImageClient from '../../pages/client/changeImage/index.clientImage';
import ChangePasswordClient from '../../pages/client/changePassword/index.changePassword';
import ClientMechanicalProfile from '../../pages/client/profile/mechanical.profile';
import ClientListMechanicals from '../../pages/client/listMechanicals/index.listMechanicals';
import MessagesClient from '../../pages/client/chat/index.messages';

import RatingProvider from '../../contexts/rating.context';
import PositionOnMapMechanical from '../../components/mechanical/positionOnMap/index.positionOnMap';
import ChatProvider from '../../contexts/chat.contex';
import SchedulingProvider from '../../contexts/scheduling.context';
import ListMechanicalsBySearch from '../../pages/client/listMechanicals/searchMechanicals';

const ClientStack = createStackNavigator();

function Client() {
    function headersOptions(headerDisplay) {
        return {
            headerTitle: headerDisplay,
            headerTintColor: "#1e22aa",
            headerStyle: { elevation: 0, shadowOpacity: 0 }
        }
    }
    return(
        <RatingProvider>
            <ChatProvider>
                <SchedulingProvider>
                    <ClientStack.Navigator initialRouteName="ClientIndex">
                        <ClientStack.Screen name="ClientIndex" component={ClientIndex} options={{headerShown: false}} />
                        <ClientStack.Screen name="ClientChangeImage" component={ChangeImageClient} options={headersOptions('Alterar Foto')}/>
                        <ClientStack.Screen name="ClientChangePassword" component={ChangePasswordClient} options={headersOptions('Alterar Senha')}/>
                        <ClientStack.Screen name="ClientMechanicalProfile" component={ClientMechanicalProfile} options={headersOptions('Voltar')}/>
                        <ClientStack.Screen name="ClientListMechanicals" component={ClientListMechanicals} options={headersOptions('Voltar')}/>
                        <ClientStack.Screen name="ListMechanicalsBySearch" component={ListMechanicalsBySearch} options={headersOptions('Voltar')}/>
                        <ClientStack.Screen name="PositionOnMapMechanical" component={PositionOnMapMechanical} options={headersOptions('Voltar')}/>
                        <ClientStack.Screen name="RenderMessagesClient" component={MessagesClient} options={headersOptions('Voltar')}/>
                    </ClientStack.Navigator>
                </SchedulingProvider>
            </ChatProvider>
        </RatingProvider>
    )
}

export default Client;