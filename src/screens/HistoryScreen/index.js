import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HistoryScreen = () => (
  <View style={s.container}>
    <Text style={s.text}>Transaction History</Text>
  </View>
);

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a1628' },
  text: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
});

export default HistoryScreen;