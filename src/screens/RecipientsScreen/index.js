import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecipientsScreen = () => (
  <View style={s.container}>
    <Text style={s.text}>Recipients</Text>
  </View>
);

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a1628' },
  text: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
});

export default RecipientsScreen;
