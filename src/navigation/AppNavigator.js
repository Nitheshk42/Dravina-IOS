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
import AddRecipientScreen from '../screens/AddRecipientScreen';
import EditRecipientScreen from '../screens/EditRecipientScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import MyAccountsScreen from '../screens/MyAccountsScreen';
import AddAccountScreen from '../screens/AddAccountScreen';
import FAQScreen from '../screens/FAQScreen';
import AddMoneyScreen from '../screens/AddMoneyScreen';

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
        <Stack.Screen name="AddRecipient" component={AddRecipientScreen} />
        <Stack.Screen name="EditRecipient" component={EditRecipientScreen} />
        <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
        <Stack.Screen name="MyAccounts" component={MyAccountsScreen} />
        <Stack.Screen name="AddAccount" component={AddAccountScreen} />
        <Stack.Screen name="FAQ" component={FAQScreen} />
        <Stack.Screen name="AddMoney" component={AddMoneyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;