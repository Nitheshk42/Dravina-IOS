import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import DashboardScreen from '../screens/DashboardScreen';
import SendMoneyScreen from '../screens/SendMoneyScreen';
import HistoryScreen from '../screens/HistoryScreen';
import RecipientsScreen from '../screens/RecipientsScreen';


const Tab = createBottomTabNavigator();

const TabIcon = ({ name, focused, color }) => (
  <View style={styles.tabIconContainer}>
    <Icon name={name} size={22} color={color} />
    {focused && <View style={styles.activeDot} />}
  </View>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#4ecdc4',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.35)',
        tabBarLabelStyle: styles.tabLabel,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Send"
        component={SendMoneyScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name={focused ? 'send' : 'send-outline'} focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name={focused ? 'time' : 'time-outline'} focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="People"
        component={RecipientsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name={focused ? 'people' : 'people-outline'} focused={focused} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(10,22,40,0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(78,205,196,0.12)',
    paddingTop: 8,
    paddingBottom: 28,
    height: 85,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  tabIconContainer: {
    alignItems: 'center',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4ecdc4',
    marginTop: 4,
  },
});

export default TabNavigator;