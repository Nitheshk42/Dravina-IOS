import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { loginUser, googleAuth, setAccessToken, setUser } from '../../services/api';
import { signInWithGoogle } from '../../services/googleAuth';
import styles from './styles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const response = await loginUser({ email, password });
      const { accessToken, user } = response.data;

      await setAccessToken(accessToken);
      await setUser({ ...user, name: user.fullName });

       const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      const hasPasscode = await AsyncStorage.getItem('userPasscode');
      if (hasPasscode) {
        navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'Passcode', params: { mode: 'create' } }] });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setGoogleLoading(true);
      const idToken = await signInWithGoogle();

      const response = await googleAuth({ credential: idToken });
      const { accessToken, user } = response.data;

      await setAccessToken(accessToken);
      await setUser({ ...user, name: user.fullName });

       const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      const hasPasscode = await AsyncStorage.getItem('userPasscode');
      if (hasPasscode) {
        navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'Passcode', params: { mode: 'create' } }] });
      }
    } catch (err) {
      if (err.code !== '-5') {
        setError('Google login failed. Please try again!');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">

        <View style={styles.bgTop} />

        {/* ── BRANDING ── */}
        <View style={styles.brandSection}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.appName}>Draviṇa</Text>
          <Text style={styles.tagline}>Transfer Money, Across Worlds</Text>
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>LIVE RATES • 7+ COUNTRIES</Text>
          </View>
        </View>

        {/* ── LOGIN CARD ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome back</Text>
          <Text style={styles.cardSubtitle}>Login to send money globally</Text>

          {error ? (
            <View style={styles.errorBox}>
              <Icon name="alert-circle" size={16} color="#e74c3c" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Email Input */}
          <Text style={styles.label}>EMAIL</Text>
          <View style={styles.inputContainer}>
            <Icon name="mail-outline" size={18} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password Input */}
          <Text style={styles.label}>PASSWORD</Text>
          <View style={styles.inputContainer}>
            <Icon name="lock-closed-outline" size={18} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureText}
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIcon}>
              <Icon name={secureText ? 'eye-off-outline' : 'eye-outline'} size={20} color="#888" />
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
            onPress={handleLogin}
            disabled={loading || googleLoading}
            activeOpacity={0.8}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View style={styles.loginBtnContent}>
                <Text style={styles.loginBtnText}>Login</Text>
                <Icon name="arrow-forward" size={18} color="#fff" />
              </View>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Sign-In Button */}
          <TouchableOpacity
            style={styles.googleBtn}
            onPress={handleGoogleLogin}
            disabled={loading || googleLoading}
            activeOpacity={0.8}>
            {googleLoading ? (
              <ActivityIndicator color="#333" />
            ) : (
              <View style={styles.googleBtnContent}>
                <Text style={styles.googleIcon}>G</Text>
                <Text style={styles.googleBtnText}>Continue with Google</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Signup Link */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>New to Draviṇa? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLink}>Create account →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── FEATURES ── */}
        <View style={styles.features}>
          {[
            { icon: 'flash-outline', text: 'Instant transfers' },
            { icon: 'shield-checkmark-outline', text: 'Bank-level security' },
            { icon: 'globe-outline', text: '7+ countries' },
          ].map((feature, index) => (
            <View key={index} style={styles.featurePill}>
              <Icon name={feature.icon} size={14} color="rgba(255,255,255,0.55)" />
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.feeText}>
          Just <Text style={styles.feeBold}>$0.99 flat fee</Text>. No hidden charges. Ever.
        </Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;