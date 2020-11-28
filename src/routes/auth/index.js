import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../../pages/signIn/signIn';
import SignUpIndex from '../../pages/signUp';
import SignUpClient from '../../pages/signUp/client/signUp.client';
import SignUpMechanicalCNPJ from '../../pages/signUp/mechanical/signUp.mechanicalCNPJ';
import SignUpMechanical from '../../pages/signUp/mechanical/signUp.mechanical';
import ChooseForgotPassword from '../../pages/forgotPassword/chooseForgotPassword/index';
import ForgotPasswordClient from '../../pages/forgotPassword/forgotPasswordClient/index';
import ForgotPasswordMechanical from '../../pages/forgotPassword/forgotPasswordMechanical/index';

const AuthStack = createStackNavigator();

function Auth() {
    function headersOptions(headerDisplay) {
        return {
            headerTitle: headerDisplay,
            headerTintColor: "#1e22aa",
            headerStyle: { elevation: 0, shadowOpacity: 0 }
        }
    }

    return(
        <AuthStack.Navigator initialRouteName="SignIn">
            <AuthStack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
            <AuthStack.Screen name="SignUp" component={SignUpIndex} options={headersOptions('Cadastro')} />
            <AuthStack.Screen name="SignUpClient" component={SignUpClient} options={headersOptions('Cadastro')} />
            <AuthStack.Screen name="SignUpMechanicalCNPJ" component={SignUpMechanicalCNPJ} options={headersOptions('Cadastro')} />
            <AuthStack.Screen name="SignUpMechanical" component={SignUpMechanical} options={headersOptions('Cadastro')} />
            <AuthStack.Screen name="ChooseForgotPassword" component={ChooseForgotPassword} options={headersOptions('Esqueci minha senha')} />
            <AuthStack.Screen name="ForgotPasswordClient" component={ForgotPasswordClient} options={headersOptions('Esqueci minha senha')} />
            <AuthStack.Screen name="ForgotPasswordMechanical" component={ForgotPasswordMechanical} options={headersOptions('Esqueci minha senha')}/>
        </AuthStack.Navigator>
    )
}

export default Auth;