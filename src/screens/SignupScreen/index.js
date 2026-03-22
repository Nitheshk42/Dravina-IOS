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
import { registerUser, googleAuth, setAccessToken, setUser } from '../../services/api';
import { signInWithGoogle } from '../../services/googleAuth';
import styles from './styles';

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleSignup = async () => {
    if (!fullName || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setError('');
      setSuccess('');
      setLoading(true);
      await registerUser({ fullName, email, password });
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setError('');
      setGoogleLoading(true);
      const idToken = await signInWithGoogle();

      const response = await googleAuth({ credential: idToken });
      const { accessToken, user } = response.data;

      await setAccessToken(accessToken);
      await setUser({ ...user, name: user.fullName });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    } catch (err) {
      if (err.code !== '-5') {
        setError('Google signup failed. Please try again!');
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
        </View>

        {/* ── SIGNUP CARD ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Create account</Text>
          <Text style={styles.cardSubtitle}>Start sending money globally</Text>

          {error ? (
            <View style={styles.errorBox}>
              <Icon name="alert-circle" size={16} color="#e74c3c" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {success ? (
            <View style={styles.successBox}>
              <Icon name="checkmark-circle" size={16} color="#1a7a6e" />
              <Text style={styles.successText}>{success}</Text>
            </View>
          ) : null}

          {/* Google Sign-Up Button */}
          <TouchableOpacity
            style={styles.googleBtn}
            onPress={handleGoogleSignup}
            disabled={loading || googleLoading}
            activeOpacity={0.8}>
            {googleLoading ? (
              <ActivityIndicator color="#333" />
            ) : (
              <View style={styles.googleBtnContent}>
                <Text style={styles.googleIcon}>G</Text>
                <Text style={styles.googleBtnText}>Sign up with Google</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Full Name Input */}
          <Text style={styles.label}>FULL NAME</Text>
          <View style={styles.inputContainer}>
            <Icon name="person-outline" size={18} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor="#999"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

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
              placeholder="Min 6 characters"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureText}
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIcon}>
              <Icon name={secureText ? 'eye-off-outline' : 'eye-outline'} size={20} color="#888" />
            </TouchableOpacity>
          </View>

          {/* Signup Button */}
          <TouchableOpacity
            style={[styles.signupBtn, loading && styles.signupBtnDisabled]}
            onPress={handleSignup}
            disabled={loading || googleLoading}
            activeOpacity={0.8}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View style={styles.signupBtnContent}>
                <Text style={styles.signupBtnText}>Create Account</Text>
                <Icon name="arrow-forward" size={18} color="#fff" />
              </View>
            )}
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login →</Text>
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

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;