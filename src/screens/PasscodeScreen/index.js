import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const NUM_PAD = [
  [{ num: '1', letters: '' }, { num: '2', letters: 'ABC' }, { num: '3', letters: 'DEF' }],
  [{ num: '4', letters: 'GHI' }, { num: '5', letters: 'JKL' }, { num: '6', letters: 'MNO' }],
  [{ num: '7', letters: 'PQRS' }, { num: '8', letters: 'TUV' }, { num: '9', letters: 'WXYZ' }],
  [{ num: '', letters: '' }, { num: '0', letters: '' }, { num: 'delete', letters: '' }],
];

const PasscodeScreen = ({ navigation, route }) => {
  const mode = route?.params?.mode || 'verify'; // 'create', 'confirm', 'verify'
  const [passcode, setPasscode] = useState('');
  const [firstPasscode, setFirstPasscode] = useState(route?.params?.firstPasscode || '');
  const [error, setError] = useState('');
  const [isConfirmStep, setIsConfirmStep] = useState(mode === 'confirm');
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const title = mode === 'create'
    ? 'Create passcode'
    : mode === 'confirm'
      ? 'Confirm passcode'
      : 'Enter passcode';

  const subtitle = mode === 'create'
    ? 'Set a 4-digit passcode to secure your account'
    : mode === 'confirm'
      ? 'Re-enter your passcode to confirm'
      : 'Enter your 4-digit passcode';

  useEffect(() => {
    if (passcode.length === 4) {
      handleComplete();
    }
  }, [passcode]);

  const handleComplete = async () => {
    if (mode === 'create') {
      // Go to confirm step
      navigation.replace('Passcode', {
        mode: 'confirm',
        firstPasscode: passcode,
      });
    } else if (mode === 'confirm') {
      // Check if matches first entry
      if (passcode === firstPasscode) {
        await AsyncStorage.setItem('userPasscode', passcode);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
      } else {
        triggerError("Passcodes don't match. Try again.");
      }
    } else {
      // Verify mode
      const savedPasscode = await AsyncStorage.getItem('userPasscode');
      if (passcode === savedPasscode) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
      } else {
        triggerError('Wrong passcode. Try again.');
      }
    }
  };

  const triggerError = (message) => {
    setError(message);
    setPasscode('');

    // Shake animation
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 15, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -15, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 5, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();

    setTimeout(() => setError(''), 2000);
  };

  const handlePress = (num) => {
    if (num === 'delete') {
      setPasscode(prev => prev.slice(0, -1));
      setError('');
    } else if (num !== '' && passcode.length < 4) {
      setPasscode(prev => prev + num);
      setError('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        {/* ── Logo ── */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="cover"
          />
        </View>

        {/* ── Title ── */}
        <Text style={styles.title}>{title}</Text>
        <Text style={mode === 'confirm' ? styles.confirmSubtitle : styles.subtitle}>
          {subtitle}
        </Text>

        {/* ── Dots ── */}
        <Animated.View
          style={[
            styles.dotsRow,
            { transform: [{ translateX: shakeAnim }] },
          ]}>
          {[0, 1, 2, 3].map(i => (
            <View
              key={i}
              style={[
                styles.dot,
                passcode.length > i && styles.dotFilled,
                error && styles.dotError,
              ]}
            />
          ))}
        </Animated.View>

        {/* ── Number Pad ── */}
        <View style={styles.numPad}>
          {NUM_PAD.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.numRow}>
              {row.map((item, colIndex) => {
                if (item.num === '') {
                  return <View key={colIndex} style={[styles.numBtn, styles.emptyBtn]} />;
                }
                if (item.num === 'delete') {
                  return (
                    <TouchableOpacity
                      key={colIndex}
                      style={styles.deleteBtn}
                      onPress={() => handlePress('delete')}
                      activeOpacity={0.6}>
                      <Icon name="backspace-outline" size={26} color="rgba(255,255,255,0.5)" />
                    </TouchableOpacity>
                  );
                }
                return (
                  <TouchableOpacity
                    key={colIndex}
                    style={styles.numBtn}
                    onPress={() => handlePress(item.num)}
                    activeOpacity={0.6}>
                    <Text style={styles.numText}>{item.num}</Text>
                    {item.letters ? (
                      <Text style={styles.numSubText}>{item.letters}</Text>
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* ── Error Message ── */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* ── Face ID Button (verify mode only) ── */}
        {mode === 'verify' && (
          <TouchableOpacity style={styles.biometricBtn} activeOpacity={0.7}>
            <Icon name="scan-outline" size={20} color="#4ecdc4" />
            <Text style={styles.biometricText}>Use Face ID</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PasscodeScreen;