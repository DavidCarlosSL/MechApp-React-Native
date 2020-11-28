import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ValidateMechanical from '../../pages/mechanical/validate/index.validate';
import MechanicalIndex from '../../pages/mechanical/index';
import EditMechanicalProfile from '../../pages/mechanical/profile/index.editProfile';
import OptionsMechanicalProfile from '../../pages/mechanical/profile/optionsProfile';
import PersonalDataMechanical from '../../pages/mechanical/personalData/index.personalData';
import ChangePasswordMechanical from '../../pages/mechanical/changePassword/index.changePassword';
import RenderMessagesMechanical from '../../pages/mechanical/chat/index.messages';

import CodeProvider from '../../contexts/code.context';
import CategoryProvider from '../../contexts/category.context';
import AddressProvider from '../../contexts/address.context';
import RatingProvider from '../../contexts/rating.context';
import PositionOnMapMechanical from '../../components/mechanical/positionOnMap/index.positionOnMap';
import ChatProvider from '../../contexts/chat.contex';
import SchedulingProvider from '../../contexts/scheduling.context';

const ValidateStack = createStackNavigator();

function ValidateMechanicalRoute() {

    function headersOptions(headerDisplay) {
        return {
            headerTitle: headerDisplay,
            headerTintColor: "#1e22aa",
            headerStyle: { elevation: 0, shadowOpacity: 0 }
        }
    }

    return(
        <CodeProvider>
            <CategoryProvider>
                <AddressProvider>
                    <RatingProvider>
                        <ChatProvider>
                            <SchedulingProvider>
                                <ValidateStack.Navigator initialRouteName="ValidateMechanical">
                                    <ValidateStack.Screen name="ValidateMechanical" component={ValidateMechanical} options={headersOptions('Cadastro')}/>
                                    <ValidateStack.Screen name="MechanicalIndex" component={MechanicalIndex} options={{headerShown: false}} />
                                    <ValidateStack.Screen name="EditMechanicalProfile" component={EditMechanicalProfile} options={headersOptions('Editar Perfil')}/>
                                    <ValidateStack.Screen name="OptionsMechanicalProfile" component={OptionsMechanicalProfile} options={headersOptions('Opções')}/>
                                    <ValidateStack.Screen name="PersonalDataMechanical" component={PersonalDataMechanical} options={headersOptions('Dados Pessoais')}/>
                                    <ValidateStack.Screen name="ChangePasswordMechanical" component={ChangePasswordMechanical} options={headersOptions('Alterar Senha')}/>
                                    <ValidateStack.Screen name="PositionOnMapMechanical" component={PositionOnMapMechanical} options={headersOptions('Voltar')}/>
                                    <ValidateStack.Screen name="RenderMessagesMechanical" component={RenderMessagesMechanical} options={headersOptions('Voltar')}/>
                                </ValidateStack.Navigator>
                            </SchedulingProvider>
                        </ChatProvider>
                    </RatingProvider>
                </AddressProvider>
            </CategoryProvider>
        </CodeProvider>
    )
}

export default ValidateMechanicalRoute;