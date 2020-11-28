import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MechanicalIndex from '../../pages/mechanical/index';
import EditMechanicalProfile from '../../pages/mechanical/profile/index.editProfile';
import OptionsMechanicalProfile from '../../pages/mechanical/profile/optionsProfile';
import PersonalDataMechanical from '../../pages/mechanical/personalData/index.personalData';
import ChangePasswordMechanical from '../../pages/mechanical/changePassword/index.changePassword';
import RenderMessagesMechanical from '../../pages/mechanical/chat/index.messages';

import CategoryProvider from '../../contexts/category.context';
import AddressProvider from '../../contexts/address.context';
import RatingProvider from '../../contexts/rating.context';
import PositionOnMapMechanical from '../../components/mechanical/positionOnMap/index.positionOnMap';
import ChatProvider from '../../contexts/chat.contex';
import SchedulingProvider from '../../contexts/scheduling.context';

const MechanicalStack = createStackNavigator();

function Mechanical() {
    function headersOptions(headerDisplay) {
        return {
            headerTitle: headerDisplay,
            headerTintColor: "#1e22aa",
            headerStyle: { elevation: 0, shadowOpacity: 0 }
        }
    }

    return(
        <CategoryProvider>
            <AddressProvider>
                <RatingProvider>
                    <ChatProvider>
                        <SchedulingProvider>
                            <MechanicalStack.Navigator initialRouteName="MechanicalIndex">
                                <MechanicalStack.Screen name="MechanicalIndex" component={MechanicalIndex} options={{headerShown: false}} />
                                <MechanicalStack.Screen name="EditMechanicalProfile" component={EditMechanicalProfile} options={headersOptions('Editar Perfil')}/>
                                <MechanicalStack.Screen name="OptionsMechanicalProfile" component={OptionsMechanicalProfile} options={headersOptions('Opções')} />
                                <MechanicalStack.Screen name="PersonalDataMechanical" component={PersonalDataMechanical} options={headersOptions('Dados Pessoais')} />
                                <MechanicalStack.Screen name="ChangePasswordMechanical" component={ChangePasswordMechanical} options={headersOptions('Alterar Senha')}/>
                                <MechanicalStack.Screen name="PositionOnMapMechanical" component={PositionOnMapMechanical} options={headersOptions('Voltar')}/>
                                <MechanicalStack.Screen name="RenderMessagesMechanical" component={RenderMessagesMechanical} options={headersOptions('Voltar')}/>
                            </MechanicalStack.Navigator>
                        </SchedulingProvider>
                    </ChatProvider>
                </RatingProvider>
            </AddressProvider>
        </CategoryProvider>
    )
}

export default Mechanical;