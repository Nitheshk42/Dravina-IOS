import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import PasscodeScreen from '../screens/PasscodeScreen';
import TabNavigator from './TabNavigator';
import SendAmountScreen from '../screens/SendAmountScreen';
import ConfirmTransferScreen from '../screens/ConfirmTransferScreen';
import TransferSuccessScreen from '../screens/TransferSuccessScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, animation: 'none' }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Passcode" component={PasscodeScreen} />
        <Stack.Screen name="Dashboard" component={TabNavigator} />
        <Stack.Screen name="SendAmount" component={SendAmountScreen} />
        <Stack.Screen name="ConfirmTransfer" component={ConfirmTransferScreen} />
        <Stack.Screen name="TransferSuccess" component={TransferSuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;