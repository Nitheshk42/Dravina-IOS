import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CountryFlag from 'react-native-country-flag';
import { getRates } from '../../services/api';
import { signInWithGoogle } from '../../services/googleAuth';
import { googleAuth, setAccessToken, setUser, getKycStatus } from '../../services/api';
import styles from './styles';

const FLAT_FEE = 0.99;

const FEATURES = [
  { icon: 'flash-outline', title: 'Instant Transfers', desc: 'Money reaches your loved ones in minutes, not days', color: '#4ecdc4', bg: 'rgba(78,205,196,0.08)', border: 'rgba(78,205,196,0.2)' },
  { icon: 'cash-outline', title: '$0.99 Flat Fee', desc: 'No hidden charges. No percentage cuts. Just 99 cents', color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.2)' },
  { icon: 'globe-outline', title: '7+ Countries', desc: 'Send to India, UK, Europe, Australia, Canada, Singapore & UAE', color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)' },
  { icon: 'shield-checkmark-outline', title: 'Bank-Level Security', desc: 'Your money is protected with 256-bit encryption', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
  { icon: 'trending-up-outline', title: 'Best Exchange Rates', desc: 'Real mid-market rates. No markup. Save up to 8x vs banks', color: '#4ecdc4', bg: 'rgba(78,205,196,0.08)', border: 'rgba(78,205,196,0.2)' },
  { icon: 'school-outline', title: 'Built for Students', desc: 'Send money home easily. First 3 transfers with zero fees', color: '#f472b6', bg: 'rgba(244,114,182,0.08)', border: 'rgba(244,114,182,0.2)' },
];

const CURRENCIES = [
  { code: 'GBP', name: 'British Pound', isoCode: 'GB' },
  { code: 'EUR', name: 'Euro', isoCode: 'EU' },
  { code: 'INR', name: 'Indian Rupee', isoCode: 'IN' },
  { code: 'AUD', name: 'Australian Dollar', isoCode: 'AU' },
  { code: 'CAD', name: 'Canadian Dollar', isoCode: 'CA' },
  { code: 'SGD', name: 'Singapore Dollar', isoCode: 'SG' },
  { code: 'AED', name: 'UAE Dirham', isoCode: 'AE' },
];

const WelcomeScreen = ({ navigation }) => {
  const [rates, setRates] = useState({});
  const [calcAmount, setCalcAmount] = useState('500');
  const [calcCurrency, setCalcCurrency] = useState(CURRENCIES[2]); // INR default
  const featureRef = useRef(null);

  useEffect(() => {
    fetchRates();
  }, []);

  // Auto-scroll feature cards
  useEffect(() => {
    let scrollPos = 0;
    const interval = setInterval(() => {
      scrollPos += 172; // card width + gap
      if (scrollPos > 172 * FEATURES.length) scrollPos = 0;
      try { featureRef.current?.scrollTo({ x: scrollPos, animated: true }); } catch {}
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchRates = async () => {
    try {
      const response = await getRates();
      setRates(response.data.rates);
    } catch {
      setRates({ GBP: 0.79, EUR: 0.92, INR: 83.12, AUD: 1.53, CAD: 1.36, SGD: 1.34, AED: 3.67 });
    }
  };

  const calcAmountNum = parseFloat(calcAmount) || 0;
  const calcRate = rates[calcCurrency.code] || 0;
  const calcResult = calcAmountNum > FLAT_FEE
    ? ((calcAmountNum - FLAT_FEE) * calcRate).toFixed(2) : '0.00';

  const handleGoogleLogin = async () => {
    try {
      const googleUser = await signInWithGoogle();
      if (!googleUser?.idToken) {
        Alert.alert('Error', 'Google sign-in failed');
        return;
      }
      const response = await googleAuth({ idToken: googleUser.idToken });
      const { accessToken, user } = response.data;
      await setAccessToken(accessToken);
      await setUser({ ...user, name: user.fullName });

      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      const hasPasscode = await AsyncStorage.getItem('userPasscode');
      if (hasPasscode) {
        try {
          const kycRes = await getKycStatus();
          if (kycRes.data.status === 'verified') {
            navigation.reset({ index: 0, routes: [{ name: 'Passcode', params: { mode: 'verify' } }] });
          } else {
            navigation.reset({ index: 0, routes: [{ name: 'Passcode', params: { mode: 'verify', nextScreen: 'KYC' } }] });
          }
        } catch {
          navigation.reset({ index: 0, routes: [{ name: 'Passcode', params: { mode: 'verify' } }] });
        }
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'Passcode', params: { mode: 'create' } }] });
      }
    } catch (err) {
      Alert.alert('Error', err.message || 'Google sign-in failed');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

      {/* ── BRANDING ── */}
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="cover" />
        </View>
        <Text style={styles.appName}>Draviṇa</Text>
        <Text style={styles.tagline}>Transfer Money, Across Worlds</Text>
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>LIVE RATES · 7+ COUNTRIES</Text>
        </View>
      </View>

      {/* ── WHY DRAVINA ── */}
      <Text style={styles.whyTitle}>Why Draviṇa?</Text>
      <ScrollView
        ref={featureRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.featureCards}
        contentContainerStyle={styles.featureCardsContent}>
        {FEATURES.map((feature, index) => (
          <View
            key={index}
            style={[styles.featureCard, { backgroundColor: feature.bg, borderColor: feature.border }]}>
            <View style={[styles.featureIconCircle, { backgroundColor: feature.bg, borderColor: feature.border }]}>
              <Icon name={feature.icon} size={22} color={feature.color} />
            </View>
            <Text style={[styles.featureCardTitle, { color: feature.color }]}>{feature.title}</Text>
            <Text style={styles.featureCardDesc}>{feature.desc}</Text>
          </View>
        ))}
      </ScrollView>

      {/* ── CALCULATOR ── */}
      <View style={styles.calcCard}>
        <View style={styles.calcHeader}>
          <Icon name="calculator-outline" size={18} color="#4ecdc4" />
          <Text style={styles.calcTitle}>Quick Calculator</Text>
        </View>
        <View style={styles.calcBody}>
          <Text style={styles.calcLabel}>You send</Text>
          <View style={styles.calcInputRow}>
            <Text style={styles.calcDollar}>$</Text>
            <TextInput
              style={styles.calcInput}
              value={calcAmount}
              onChangeText={setCalcAmount}
              keyboardType="numeric"
              placeholder="500"
              placeholderTextColor="rgba(255,255,255,0.2)"
            />
            <Text style={styles.calcUsd}>USD</Text>
          </View>

          <View style={styles.calcDivider}>
            <View style={styles.calcDividerLine} />
            <View style={styles.calcArrow}>
              <Icon name="arrow-down" size={14} color="#4ecdc4" />
            </View>
            <View style={styles.calcDividerLine} />
          </View>

          <Text style={styles.calcLabel}>They receive</Text>
          <View style={styles.calcResultRow}>
            <Text style={styles.calcResult}>{calcResult}</Text>
            <TouchableOpacity
              style={styles.calcCurrencyBtn}
              onPress={() => {
                const idx = CURRENCIES.findIndex(c => c.code === calcCurrency.code);
                setCalcCurrency(CURRENCIES[(idx + 1) % CURRENCIES.length]);
              }}>
              <CountryFlag isoCode={calcCurrency.isoCode} size={18} style={{ borderRadius: 4 }} />
              <Text style={styles.calcCurrencyCode}>{calcCurrency.code}</Text>
              <Icon name="chevron-down" size={14} color="rgba(255,255,255,0.5)" />
            </TouchableOpacity>
          </View>

          <View style={styles.calcFeeRow}>
            <Text style={styles.calcFeeText}>Fee: $0.99 flat</Text>
            <Text style={styles.calcRateText}>1 USD = {calcRate.toFixed(calcCurrency.code === 'INR' ? 2 : 4)} {calcCurrency.code}</Text>
          </View>
        </View>
      </View>

      {/* ── LOGIN & SIGNUP BUTTONS ── */}
      <View style={styles.authCard}>
        <Text style={styles.authCardTitle}>Get Started</Text>
        <Text style={styles.authCardSubtitle}>Send money internationally in minutes</Text>
        <View style={styles.authButtonsRow}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}>
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupBtn}
            onPress={() => navigation.navigate('Signup')}
            activeOpacity={0.8}>
            <Text style={styles.signupBtnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── GOOGLE LOGIN ── */}
      <View style={styles.googleCard}>
        <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleLogin} activeOpacity={0.8}>
          <Icon name="logo-google" size={20} color="#4285F4" />
          <Text style={styles.googleBtnText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>

      {/* ── FOOTER ── */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Draviṇa. All rights reserved.</Text>
      </View>

    </ScrollView>
  );
};

export default WelcomeScreen;