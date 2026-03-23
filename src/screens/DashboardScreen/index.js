import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CountryFlag from 'react-native-country-flag';
import {
  getBalance,
  getLimits,
  getRates,
  logoutUser,
  clearAccessToken,
  clearUser,
} from '../../services/api';
import styles from './styles';

const { width } = Dimensions.get('window');

// ─── PROMO BANNERS DATA ────────────────────────────────────────
const PROMO_BANNERS = [
  {
    id: '1',
    tag: 'NRI SPECIAL',
    tagColor: '#4ecdc4',
    tagBg: 'rgba(78,205,196,0.2)',
    title: 'Best rates to India',
    subtitle: 'Send INR at zero markup rates',
    bgColor: '#0f4c81',
    bgColorInner: '#1a7a6e',
    icon: 'globe-outline',
  },
  {
    id: '2',
    tag: 'REFER & EARN',
    tagColor: '#a78bfa',
    tagBg: 'rgba(167,139,250,0.2)',
    title: 'Invite friends, get $25',
    subtitle: 'Both you and your friend earn $25',
    bgColor: '#2d1a4e',
    bgColorInner: '#4a2d7a',
    icon: 'gift-outline',
  },
  {
    id: '3',
    tag: 'NEW',
    tagColor: '#f59e0b',
    tagBg: 'rgba(245,158,11,0.2)',
    title: 'First transfer free!',
    subtitle: 'Zero fees on your first international transfer',
    bgColor: '#7c3a12',
    bgColorInner: '#b45309',
    icon: 'flash-outline',
  },
  {
    id: '4',
    tag: 'FESTIVE OFFER',
    tagColor: '#f472b6',
    tagBg: 'rgba(244,114,182,0.2)',
    title: 'Diwali special rates',
    subtitle: '0% fee to India this festive season',
    bgColor: '#831843',
    bgColorInner: '#be185d',
    icon: 'sparkles-outline',
  },
];

// ─── CURRENCIES ─────────────────────────────────────────────────
const CURRENCIES = [
  { code: 'GBP', name: 'British Pound', isoCode: 'GB' },
  { code: 'EUR', name: 'Euro', isoCode: 'EU' },
  { code: 'INR', name: 'Indian Rupee', isoCode: 'IN' },
  { code: 'AUD', name: 'Australian Dollar', isoCode: 'AU' },
  { code: 'CAD', name: 'Canadian Dollar', isoCode: 'CA' },
  { code: 'SGD', name: 'Singapore Dollar', isoCode: 'SG' },
  { code: 'AED', name: 'UAE Dirham', isoCode: 'AE' },
];

// ─── CIRCLE PROGRESS ────────────────────────────────────────────
const CircleProgress = ({ percentage, color, size = 52 }) => (
  <View style={{ width: size, height: size }}>
    <View style={{
      position: 'absolute', width: size, height: size,
      borderRadius: size / 2, borderWidth: 4,
      borderColor: 'rgba(255,255,255,0.08)',
    }} />
    <View style={{
      position: 'absolute', width: size, height: size,
      borderRadius: size / 2, borderWidth: 4,
      borderColor: color,
      borderRightColor: 'transparent',
      borderBottomColor: percentage > 50 ? color : 'transparent',
      transform: [{ rotate: `${(percentage / 100) * 360 - 90}deg` }],
    }} />
  </View>
);

const DashboardScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [rates, setRates] = useState({});
  const [ratesLoading, setRatesLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');
  const [limits, setLimits] = useState({
    daily: { used: 0, limit: 5000, percentage: 0 },
    weekly: { used: 0, limit: 20000, percentage: 0 },
  });
  const [showProfile, setShowProfile] = useState(false);
  const [activeBanner, setActiveBanner] = useState(0);
  const [activeRate, setActiveRate] = useState(0);
  const bannerRef = useRef(null);
  const rateRef = useRef(null);
  const rateFlash = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadUserData();
    fetchRates();
    const rateInterval = setInterval(fetchRates, 30000);
    return () => clearInterval(rateInterval);
  }, []);

  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setActiveBanner(prev => {
        const next = (prev + 1) % PROMO_BANNERS.length;
        try {
          bannerRef.current?.scrollToIndex({ index: next, animated: true });
        } catch {}
        return next;
      });
    }, 4000);
    return () => clearInterval(bannerInterval);
  }, []);

   // ── Auto-scroll rates ──
  useEffect(() => {
    const rateInterval = setInterval(() => {
      setActiveRate(prev => {
        const next = (prev + 1) % CURRENCIES.length;
        try {
          rateRef.current?.scrollToIndex({ index: next, animated: true });
        } catch {}
        return next;
      });
    }, 3000);
    return () => clearInterval(rateInterval);
  }, []);

  const loadUserData = async () => {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      const userData = await AsyncStorage.getItem('user');
      if (userData) setUser(JSON.parse(userData));
    } catch {}

    try {
      const balanceRes = await getBalance();
      setUser(balanceRes.data.user);
      setBalance(balanceRes.data.user.balance);
    } catch {}

    try {
      const limitsRes = await getLimits();
      setLimits(limitsRes.data);
    } catch {}
  };

  const fetchRates = async () => {
    try {
      const response = await getRates();
      setRates(response.data.rates);
    } catch {
      setRates({
        GBP: 0.79, EUR: 0.92, INR: 83.12, AUD: 1.53,
        CAD: 1.36, SGD: 1.34, AED: 3.67,
      });
    }
    setRatesLoading(false);
    setLastUpdated(new Date().toLocaleTimeString());

    Animated.sequence([
      Animated.timing(rateFlash, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(rateFlash, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  };

  const handleLogout = async () => {
    try { await logoutUser(); } catch {}
    await clearAccessToken();
    await clearUser();
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.removeItem('userPasscode');
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const userName = user?.name || user?.fullName || 'User';
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => setShowProfile(!showProfile)}
          activeOpacity={0.7}>
          <Text style={styles.profileInitials}>{initials}</Text>
        </TouchableOpacity>
      </View>

      {showProfile && (
        <View style={styles.profileDropdown}>
          <TouchableOpacity style={styles.dropdownItem} activeOpacity={0.7}>
            <Icon name="card-outline" size={18} color="#4ecdc4" />
            <Text style={styles.dropdownText}>My Accounts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem} activeOpacity={0.7}>
            <Icon name="help-circle-outline" size={18} color="#4ecdc4" />
            <Text style={styles.dropdownText}>FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout} activeOpacity={0.7}>
            <Icon name="log-out-outline" size={18} color="#e74c3c" />
            <Text style={[styles.dropdownText, { color: '#e74c3c' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ── LIVE EXCHANGE RATES (TOP) ── */}
      <View style={styles.ratesHeader}>
        <Text style={styles.sectionTitle}>LIVE EXCHANGE RATES</Text>
        <Text style={styles.ratesUpdated}>Updated {lastUpdated}</Text>
      </View>
      <Animated.View style={{ opacity: rateFlash.interpolate({ inputRange: [0, 1], outputRange: [1, 0.6] }) }}>
        <FlatList
          ref={rateRef}
          data={CURRENCIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.code}
          style={styles.ratesList}
          contentContainerStyle={styles.ratesContent}
          onMomentumScrollEnd={e => {
            const index = Math.round(e.nativeEvent.contentOffset.x / 130);
            setActiveRate(index);
          }}
          renderItem={({ item, index }) => (
            <View style={[styles.rateCard, activeRate === index && styles.rateCardActive]}>
              <CountryFlag isoCode={item.isoCode} size={28} style={styles.flagImage} />
              <Text style={styles.rateCode}>{item.code}</Text>
              <Text style={styles.rateName}>{item.name}</Text>
              <Text style={styles.rateValue}>
                {ratesLoading ? '...' : (rates[item.code] || 0).toFixed(item.code === 'INR' ? 2 : 4)}
              </Text>
            </View>
          )}
        />
      </Animated.View>
      <View style={styles.rateDots}>
        {CURRENCIES.map((_, i) => (
          <View key={i} style={[styles.rateDot, activeRate === i && styles.rateDotActive]} />
        ))}
      </View>

      {/* ── BALANCE CARD ── */}
      <View style={styles.balanceCard}>
        <View style={styles.balanceDecor1} />
        <View style={styles.balanceDecor2} />
        <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
        <Text style={styles.balanceAmount}>${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
        <Text style={styles.balanceSub}>Available for transfer</Text>
        <View style={styles.balanceBtns}>
          <TouchableOpacity style={styles.addMoneyBtn} activeOpacity={0.8}>
            <Icon name="add" size={18} color="#fff" />
            <Text style={styles.addMoneyText}>Add Money</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sendMoneyBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Send')}>
            <Icon name="send" size={16} color="#0a1628" />
            <Text style={styles.sendMoneyText}>Send Money</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── PROMO BANNERS ── */}
      <FlatList
        ref={bannerRef}
        data={PROMO_BANNERS}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        style={styles.bannerList}
        contentContainerStyle={styles.bannerContent}
        onMomentumScrollEnd={e => {
          const index = Math.round(e.nativeEvent.contentOffset.x / (width - 40));
          setActiveBanner(index);
        }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.bannerCard} activeOpacity={0.9}>
            <View style={[styles.bannerBg, { backgroundColor: item.bgColor }]}>
              <View style={[styles.bannerBgInner, { backgroundColor: item.bgColorInner }]} />
              <View style={styles.bannerIconBg}>
                <Icon name={item.icon} size={32} color="rgba(255,255,255,0.15)" />
              </View>
              <View style={[styles.bannerTag, { backgroundColor: item.tagBg }]}>
                <Text style={[styles.bannerTagText, { color: item.tagColor }]}>{item.tag}</Text>
              </View>
              <Text style={styles.bannerTitle}>{item.title}</Text>
              <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.bannerDots}>
        {PROMO_BANNERS.map((_, i) => (
          <View key={i} style={[styles.bannerDot, activeBanner === i && styles.bannerDotActive]} />
        ))}
      </View>

      {/* ── TRANSFER LIMITS ── */}
      <Text style={styles.sectionTitle}>TRANSFER LIMITS</Text>
      <View style={styles.limitsRow}>
        <View style={styles.limitCard}>
          <CircleProgress percentage={limits.daily?.percentage || 30} color="#4ecdc4" />
          <View style={styles.limitInfo}>
            <Text style={styles.limitLabel}>Daily</Text>
            <Text style={styles.limitAmount}>${(limits.daily?.used || 1500).toLocaleString()}</Text>
            <Text style={styles.limitTotal}>of ${(limits.daily?.limit || 5000).toLocaleString()}</Text>
          </View>
        </View>
        <View style={styles.limitCard}>
          <CircleProgress percentage={limits.weekly?.percentage || 50} color="#0f4c81" />
          <View style={styles.limitInfo}>
            <Text style={styles.limitLabel}>Weekly</Text>
            <Text style={styles.limitAmount}>${(limits.weekly?.used || 10000).toLocaleString()}</Text>
            <Text style={styles.limitTotal}>of ${(limits.weekly?.limit || 20000).toLocaleString()}</Text>
          </View>
        </View>
      </View>

      {/* ── REFERRAL BANNER ──
      <View style={styles.referralCard}>
        <View style={styles.referralContent}>
          <Icon name="gift" size={28} color="#4ecdc4" />
          <View style={styles.referralTextContainer}>
            <Text style={styles.referralTitle}>Refer & Earn $25!</Text>
            <Text style={styles.referralSubtitle}>Share with friends and both earn $25</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.referralBtn} activeOpacity={0.8}>
          <Icon name="share-outline" size={16} color="#0f4c81" />
          <Text style={styles.referralBtnText}>Invite Friend</Text>
        </TouchableOpacity>
      </View> */}

    </ScrollView>
  );
};

export default DashboardScreen;