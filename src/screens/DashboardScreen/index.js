import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { logoutUser, clearAccessToken, clearUser } from '../../services/api';

const DashboardScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      // Even if API call fails, clear local data
    } finally {
      await clearAccessToken();
      await clearUser();
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      await AsyncStorage.removeItem('userPasscode');
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.text}>Dashboard</Text>
      <Text style={s.subtext}>You are logged in!</Text>
      <TouchableOpacity style={s.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
        <Icon name="log-out-outline" size={20} color="#fff" />
        <Text style={s.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a1628',
  },
  text: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 8,
  },
  subtext: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 16,
    marginBottom: 40,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#e74c3c',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default DashboardScreen;