  import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
  FlatList,
  Modal,
  Share,
  Alert,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CountryFlag from 'react-native-country-flag';
import {
  getBalance,
  getLimits,
  getRates,
  getHistory,
  getReferralStats,
  generateReferralCode,
  logoutUser,
  clearAccessToken,
  clearUser,
} from '../../services/api';
import styles from './styles';
import { AppState } from 'react-native';

const { width } = Dimensions.get('window');
const FLAT_FEE = 0.99;

// ─── PROMO BANNERS ──────────────────────────────────────────────
const STATIC_BANNERS = [
  {
    id: '1', tag: 'STUDENT SPECIAL', tagColor: '#4ecdc4', tagBg: 'rgba(78,205,196,0.2)',
    title: 'First 3 transfers free!', subtitle: 'No fees for new students',
    bgColor: '#0f4c81', bgColorInner: '#1a7a6e', icon: 'school-outline',
  },
  {
    id: '2', tag: 'NRI SPECIAL', tagColor: '#60a5fa', tagBg: 'rgba(96,165,250,0.2)',
    title: 'Best rates to India', subtitle: 'Send INR at zero markup rates',
    bgColor: '#1a3a5c', bgColorInner: '#0f4c81', icon: 'globe-outline',
  },
  {
    id: '3', tag: 'REFER & EARN', tagColor: '#a78bfa', tagBg: 'rgba(167,139,250,0.2)',
    title: 'Invite classmates, get $25', subtitle: 'Both you and your friend earn $25',
    bgColor: '#2d1a4e', bgColorInner: '#4a2d7a', icon: 'gift-outline',
  },
  {
    id: '5', tag: 'FESTIVE OFFER', tagColor: '#f472b6', tagBg: 'rgba(244,114,182,0.2)',
    title: 'Diwali special: 0% fee', subtitle: 'Send to India for free this Diwali',
    bgColor: '#831843', bgColorInner: '#be185d', icon: 'sparkles-outline',
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
    {percentage > 0 && (
      <View style={{
        position: 'absolute', width: size, height: size,
        borderRadius: size / 2, borderWidth: 4,
        borderColor: color,
        borderRightColor: percentage > 25 ? color : 'transparent',
        borderBottomColor: percentage > 50 ? color : 'transparent',
        borderLeftColor: percentage > 75 ? color : 'transparent',
        transform: [{ rotate: `${(percentage / 100) * 360 - 90}deg` }],
      }} />
    )}
  </View>
);

const handleShare = async () => {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      const userData = await AsyncStorage.getItem('user');
      let code = 'DRAVINA';
      
      // Try to get referral code from API
      try {
        const refRes = await getReferralStats();
        code = refRes.data.referralCode || code;
      } catch {}

      await Share.share({
        message: `Join Dravina and we both get $25! Use my referral code: ${code}\n\nSend money internationally with just $0.99 fee.\nDownload now: https://dravina.com/download?ref=${code}`,
      });
    } catch (err) {
      Alert.alert('Share', 'Unable to share right now. Please try again.');
    }
  };

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
  const [calcAmount, setCalcAmount] = useState('500');
  const [calcCurrency, setCalcCurrency] = useState(CURRENCIES[2]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successTransaction, setSuccessTransaction] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState({
    totalSent: 0, feesSaved: 0, transferCount: 0,
  });
  const [referral, setReferral] = useState({
    referralCode: '',
    totalEarned: 0,
    totalReferrals: 0,
    bonusPerReferral: 25,
  });
  const [recentTransactions, setRecentTransactions] = useState([]);

  const bannerRef = useRef(null);
  const rateRef = useRef(null);
  const rateFlash = useRef(new Animated.Value(0)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadUserData();
    fetchRates();
    checkRecentTransactionSuccess();
    const rateInterval = setInterval(fetchRates, 30000);
    return () => clearInterval(rateInterval);
  }, []);

  // ── Auto-scroll banners ──
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner(prev => {
        const next = (prev + 1) % PROMO_BANNERS.length;
        try { bannerRef.current?.scrollToIndex({ index: next, animated: true }); } catch {}
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ── Auto-scroll rates ──
   useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner(prev => {
        const next = (prev + 1) % PROMO_BANNERS.length;
        try { bannerRef.current?.scrollTo({ x: next * (width - 52), animated: true }); } catch {}
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ── Auto-dismiss success modal after 60 seconds ──
  useEffect(() => {
    if (showSuccessModal) {
      Animated.timing(modalOpacity, {
        toValue: 1, duration: 300, useNativeDriver: true,
      }).start();
      const timer = setTimeout(() => dismissSuccessModal(), 60000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);

  // ── Session timeout: 10 minutes of inactivity ──
  useEffect(() => {
    let inactivityTimer;
    
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(async () => {
        await clearAccessToken();
        await clearUser();
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
       // await AsyncStorage.removeItem('userPasscode');
        navigation.reset({ index: 0, routes: [{ name: 'Passcode', params: { mode: 'verify' } }] });
      }, 5 * 60 * 1000); // 10 minutes
    };

    resetTimer();

    // Reset timer when app comes back to foreground
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        resetTimer();
      }
    });

    return () => {
      clearTimeout(inactivityTimer);
      subscription?.remove();
    };
  }, []);

  const dismissSuccessModal = () => {
    Animated.timing(modalOpacity, {
      toValue: 0, duration: 300, useNativeDriver: true,
    }).start(() => {
      setShowSuccessModal(false);
      setSuccessTransaction(null);
    });
  };

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
       try {
      const historyRes = await getHistory();
setRecentTransactions(history.filter(tx => tx.recipientName || tx.toCurrency !== tx.fromCurrency).slice(0, 3));
    } catch {}

    // Fetch monthly stats from history
    try {
      const historyRes = await getHistory();
      const history = historyRes.data.history || [];
      const now = new Date();
      const thisMonth = history.filter(h => {
        const d = new Date(h.createdAt);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });
      const transfers = thisMonth.filter(h => h.type === 'transfer' && h.status === 'Completed');
      const totalSent = transfers.reduce((sum, h) => sum + (h.amountSent || 0), 0);
      const transferCount = transfers.length;
      const feesSaved = transferCount * 24.01; // $25 bank fee - $0.99 our fee = $24.01 saved per transfer
      setMonthlyStats({ totalSent, feesSaved: parseFloat(feesSaved.toFixed(2)), transferCount });
    } catch {}

    // Fetch referral stats
    try {
      const refRes = await getReferralStats();
      if (!refRes.data.referralCode) {
        const genRes = await generateReferralCode();
        setReferral({ ...refRes.data, referralCode: genRes.data.referralCode });
      } else {
        setReferral(refRes.data);
      }
    } catch {}
  };

  

  const fetchRates = async () => {
    try {
      const response = await getRates();
      setRates(response.data.rates);
    } catch {
      setRates({ GBP: 0.79, EUR: 0.92, INR: 83.12, AUD: 1.53, CAD: 1.36, SGD: 1.34, AED: 3.67 });
    }
    setRatesLoading(false);
    setLastUpdated(new Date().toLocaleTimeString());
    Animated.sequence([
      Animated.timing(rateFlash, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(rateFlash, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  };

  const checkRecentTransactionSuccess = async () => {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      const lastCheck = await AsyncStorage.getItem('lastTransactionCheck');
      const response = await getHistory();
      const history = response.data.history || [];

      if (history.length > 0) {
        const latest = history[0];
        if (latest.status === 'Completed' && latest.id !== lastCheck) {
          setSuccessTransaction(latest);
          setShowSuccessModal(true);
          await AsyncStorage.setItem('lastTransactionCheck', latest.id);
        }
      }
    } catch {}
  };

  const handleLogout = async () => {
    try { await logoutUser(); } catch {}
    await clearAccessToken();
    await clearUser();
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
   // await AsyncStorage.removeItem('userPasscode');
    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const userName = user?.name || user?.fullName || 'User';
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  // ── Dynamic promo banners with live rate ──
  const inrRate = rates['INR'] || 0;
  const PROMO_BANNERS = [
    ...STATIC_BANNERS.slice(0, 3),
    {
      id: '4', tag: 'RATE ALERT', tagColor: '#f59e0b', tagBg: 'rgba(245,158,11,0.2)',
      title: `INR at ${inrRate.toFixed(2)} — ${inrRate > 83 ? 'Best time!' : 'Check rates'}`,
      subtitle: inrRate > 83 ? 'Rate is higher than usual' : 'Send to India at live rates',
      bgColor: '#7c3a12', bgColorInner: '#b45309', icon: 'trending-up-outline',
    },
    ...STATIC_BANNERS.slice(3),
  ];
  const calcAmountNum = parseFloat(calcAmount) || 0;
  const calcRate = rates[calcCurrency.code] || 0;
  const calcResult = calcAmountNum > FLAT_FEE
    ? ((calcAmountNum - FLAT_FEE) * calcRate).toFixed(2) : '0.00';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── HEADER ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn} onPress={() => setShowProfile(!showProfile)} activeOpacity={0.7}>
            <Text style={styles.profileInitials}>{initials}</Text>
          </TouchableOpacity>
        </View>

        {showProfile && (
          <View style={styles.profileDropdown}>
            <TouchableOpacity style={styles.dropdownItem} activeOpacity={0.7} onPress={() => { setShowProfile(false); navigation.navigate('MyAccounts'); }}>
            <Icon name="card-outline" size={18} color="#4ecdc4" />
            <Text style={styles.dropdownText}>My Accounts</Text>
          </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} activeOpacity={0.7} onPress={() => { setShowProfile(false); navigation.navigate('AddMoney'); }}>
            <Icon name="wallet-outline" size={18} color="#4ecdc4" />
            <Text style={styles.dropdownText}>Add Money</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem} activeOpacity={0.7} onPress={() => { setShowProfile(false); navigation.navigate('FAQ'); }}>
            <Icon name="help-circle-outline" size={18} color="#4ecdc4" />
            <Text style={styles.dropdownText}>FAQ</Text>
          </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout} activeOpacity={0.7}>
              <Icon name="log-out-outline" size={18} color="#e74c3c" />
              <Text style={[styles.dropdownText, { color: '#e74c3c' }]}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── 1. LIVE EXCHANGE RATES ── */}
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
         {/* ── 3. PROMO BANNERS ── */}
      <Text style={styles.sectionTitle}>OFFERS FOR YOU</Text>
      <ScrollView
        ref={bannerRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.bannerList}
        contentContainerStyle={styles.bannerContent}
        onMomentumScrollEnd={e => {
          const index = Math.round(e.nativeEvent.contentOffset.x / (width - 52));
          setActiveBanner(index);
        }}>
        {PROMO_BANNERS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.bannerCard}
            activeOpacity={0.8}
               onPress={() => {
              if (item.id === '3') handleShare();
              else navigation.navigate('Send');
            }}>

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
        ))}
      </ScrollView>
      <View style={styles.bannerDots}>
        {PROMO_BANNERS.map((_, i) => (
          <View key={i} style={[styles.bannerDot, activeBanner === i && styles.bannerDotActive]} />
        ))}
      </View>

        {/* ── 4. TRANSFER LIMITS ── */}
        <Text style={styles.sectionTitle}>TRANSFER LIMITS</Text>
        <View style={styles.limitsRow}>
          <View style={styles.limitCard}>
            <CircleProgress percentage={limits.daily?.percentage || 0} color="#4ecdc4" />
            <View style={styles.limitInfo}>
              <Text style={styles.limitLabel}>Daily</Text>
              <Text style={styles.limitAmount}>${(limits.daily?.used || 0).toLocaleString()}</Text>
              <Text style={styles.limitTotal}>of ${(limits.daily?.limit || 5000).toLocaleString()}</Text>
            </View>
          </View>
          <View style={styles.limitCard}>
            <CircleProgress percentage={limits.weekly?.percentage || 0} color="#0f4c81" />
            <View style={styles.limitInfo}>
              <Text style={styles.limitLabel}>Weekly</Text>
              <Text style={styles.limitAmount}>${(limits.weekly?.used || 0).toLocaleString()}</Text>
              <Text style={styles.limitTotal}>of ${(limits.weekly?.limit || 20000).toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* ── 2. MINI CALCULATOR ── */}
        <View style={styles.calcCard}>
          <View style={styles.calcHeader}>
            <Icon name="calculator-outline" size={18} color="#4ecdc4" />
            <Text style={styles.calcTitle}>Quick Calculator</Text>
          </View>
          <View style={styles.calcBody}>
            <View style={styles.calcSendRow}>
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
            </View>
            <View style={styles.calcDivider}>
              <View style={styles.calcDividerLine} />
              <View style={styles.calcArrow}>
                <Icon name="arrow-down" size={14} color="#4ecdc4" />
              </View>
              <View style={styles.calcDividerLine} />
            </View>
            <View style={styles.calcReceiveRow}>
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
            </View>
            <View style={styles.calcFeeRow}>
              <Text style={styles.calcFeeText}>Fee: $0.99 flat</Text>
              <Text style={styles.calcRateText}>1 USD = {calcRate.toFixed(calcCurrency.code === 'INR' ? 2 : 4)} {calcCurrency.code}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.calcSendBtn} activeOpacity={0.8} onPress={() => navigation.navigate('Send')}>
            <Text style={styles.calcSendBtnText}>Send Now</Text>
            <Icon name="arrow-forward" size={16} color="#0a1628" />
          </TouchableOpacity>
        </View>

       {/* ── RECENT TRANSACTIONS ── */}
      <Text style={styles.sectionTitle}>RECENT TRANSACTIONS</Text>
      <View style={styles.transactionsList}>
        {recentTransactions.length > 0 ? (
          <>
            {recentTransactions.map((tx, i) => (
              <View key={tx.id} style={[styles.transactionItem, i < recentTransactions.length - 1 && styles.transactionBorder]}>
                <View style={[styles.transactionIcon, { backgroundColor: tx.status === 'Completed' ? 'rgba(78,205,196,0.1)' : tx.status === 'Pending' ? 'rgba(245,158,11,0.1)' : 'rgba(231,76,60,0.1)' }]}>
                  <Icon
                    name="arrow-up-outline"
                    size={18}
                    color={tx.status === 'Completed' ? '#4ecdc4' : tx.status === 'Pending' ? '#f59e0b' : '#e74c3c'}
                  />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>
                    Sent to {tx.recipientName || tx.recipient_name || 'Recipient'}
                  </Text>

                  <Text style={styles.transactionDate}>{new Date(tx.createdAt || tx.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Text>
                </View>
                <View style={styles.transactionRight}>
                  <Text style={styles.transactionAmount}>-${tx.amount || tx.amountSent}</Text>

                  <View style={styles.transactionStatusRow}>
                    <View style={[styles.transactionStatusDot, { backgroundColor: (tx.status === 'Completed' || tx.status === 'COMPLETED') ? '#4ecdc4' : tx.status === 'Pending' ? '#f59e0b' : '#e74c3c' }]} />
                    <Text style={[styles.transactionStatus, { color: (tx.status === 'Completed' || tx.status === 'COMPLETED') ? '#4ecdc4' : tx.status === 'Pending' ? '#f59e0b' : '#e74c3c' }]}>{tx.status}</Text>
                  </View>
                </View>
              </View>
            ))}
            <TouchableOpacity style={styles.viewAllBtn} activeOpacity={0.7} onPress={() => navigation.navigate('History')}>
              <Text style={styles.viewAllText}>View all transactions</Text>
              <Icon name="arrow-forward" size={14} color="#4ecdc4" />
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.emptyTransactions}>
            <Icon name="receipt-outline" size={24} color="rgba(255,255,255,0.2)" />
            <Text style={styles.emptyTransactionsText}>No recent transactions</Text>
          </View>
        )}
      </View>

        

        {/* ── 5. MONTHLY SUMMARY ──
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Icon name="analytics-outline" size={18} color="#4ecdc4" />
            <Text style={styles.summaryTitle}>This Month</Text>
          </View>
          <View style={styles.summaryStats}>
            <View style={styles.summaryStat}>
              <Text style={styles.summaryStatValue}>${monthlyStats.totalSent.toLocaleString()}</Text>
              <Text style={styles.summaryStatLabel}>Sent</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryStat}>
              <Text style={[styles.summaryStatValue, { color: '#4ecdc4' }]}>${monthlyStats.feesSaved.toFixed(2)}</Text>
              <Text style={styles.summaryStatLabel}>Fees saved</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryStat}>
              <Text style={styles.summaryStatValue}>{monthlyStats.transferCount}</Text>
              <Text style={styles.summaryStatLabel}>Transfers</Text>
            </View>
          </View>
          <View style={styles.summarySavedBanner}>
            <Icon name="checkmark-circle" size={16} color="#4ecdc4" />
            <Text style={styles.summarySavedText}>
              You saved <Text style={{ fontWeight: '800', color: '#4ecdc4' }}>${monthlyStats.feesSaved.toFixed(2)}</Text> compared to banks!
            </Text>
          </View>
        </View> */}

        {/* ── 6. FOOTER ── */}
        <View style={styles.footer}>
          <View style={styles.footerDivider} />
          <Text style={styles.footerBrand}>Draviṇa</Text>
          <Text style={styles.footerTagline}>Transfer Money, Across Worlds</Text>

          <View style={styles.footerSocials}>
            <TouchableOpacity style={styles.socialBtn} onPress={() => Linking.openURL('https://twitter.com/dravina')} activeOpacity={0.7}>
              <Icon name="logo-twitter" size={20} color="rgba(255,255,255,0.5)" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} onPress={() => Linking.openURL('https://instagram.com/dravina')} activeOpacity={0.7}>
              <Icon name="logo-instagram" size={20} color="rgba(255,255,255,0.5)" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} onPress={() => Linking.openURL('mailto:support@dravina.com')} activeOpacity={0.7}>
              <Icon name="mail-outline" size={20} color="rgba(255,255,255,0.5)" />
            </TouchableOpacity>
          </View>

          <View style={styles.footerLinks}>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>FAQ</Text>
            </TouchableOpacity>
            <Text style={styles.footerLinkDot}>·</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={styles.footerLinkDot}>·</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>Terms of Service</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerCopyright}>© 2025 Draviṇa. All rights reserved.</Text>
        </View>

      </ScrollView>

      {/* ── TRANSACTION SUCCESS MODAL ── */}
      <Modal visible={showSuccessModal} transparent animationType="none">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={dismissSuccessModal}>
          <Animated.View style={[styles.modalCard, { opacity: modalOpacity }]}>
            <View style={styles.modalIconContainer}>
              <Icon name="checkmark-circle" size={48} color="#4ecdc4" />
            </View>
            <Text style={styles.modalTitle}>Transfer Successful!</Text>
            <Text style={styles.modalSubtitle}>
              {successTransaction
                ? `Your transfer of $${successTransaction.amountSent} to ${successTransaction.country} has been completed.`
                : 'Your recent transfer has been completed successfully.'}
            </Text>
            <View style={styles.modalAmountCard}>
              <Text style={styles.modalAmountLabel}>Amount received</Text>
              <Text style={styles.modalAmount}>
                {successTransaction
                  ? `${successTransaction.amountReceived} ${successTransaction.currency}`
                  : '—'}
              </Text>
            </View>
            <TouchableOpacity style={styles.modalBtn} onPress={dismissSuccessModal} activeOpacity={0.8}>
              <Text style={styles.modalBtnText}>Great!</Text>
            </TouchableOpacity>
            <Text style={styles.modalDismissHint}>Tap anywhere to dismiss</Text>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

    </View>
  );
};

export default DashboardScreen;
  
  
  
  
  
  
  // import React, { useState, useEffect, useRef } from 'react';
  // import {
  //   View,
  //   Text,
  //   ScrollView,
  //   TouchableOpacity,
  //   Image,
  //   Animated,
  //   Dimensions,
  //   FlatList,
  // } from 'react-native';
  // import Icon from 'react-native-vector-icons/Ionicons';
  // import CountryFlag from 'react-native-country-flag';
  // import {
  //   getBalance,
  //   getLimits,
  //   getRates,
  //   logoutUser,
  //   clearAccessToken,
  //   clearUser,  
  // } from '../../services/api';
  // import styles from './styles';

  // const { width } = Dimensions.get('window');

  // // ─── PROMO BANNERS DATA ────────────────────────────────────────
  // const PROMO_BANNERS = [
  //   {
  //     id: '1',
  //     tag: 'NRI SPECIAL',
  //     tagColor: '#4ecdc4',
  //     tagBg: 'rgba(78,205,196,0.2)',
  //     title: 'Best rates to India',
  //     subtitle: 'Send INR at zero markup rates',
  //     bgColor: '#0f4c81',
  //     bgColorInner: '#1a7a6e',
  //     icon: 'globe-outline',
  //   },
  //   {
  //     id: '2',
  //     tag: 'REFER & EARN',
  //     tagColor: '#a78bfa',
  //     tagBg: 'rgba(167,139,250,0.2)',
  //     title: 'Invite friends, get $25',
  //     subtitle: 'Both you and your friend earn $25',
  //     bgColor: '#2d1a4e',
  //     bgColorInner: '#4a2d7a',
  //     icon: 'gift-outline',
  //   },
  //   {
  //     id: '3',
  //     tag: 'NEW',
  //     tagColor: '#f59e0b',
  //     tagBg: 'rgba(245,158,11,0.2)',
  //     title: 'First transfer free!',
  //     subtitle: 'Zero fees on your first international transfer',
  //     bgColor: '#7c3a12',
  //     bgColorInner: '#b45309',
  //     icon: 'flash-outline',
  //   },
  //   {
  //     id: '4',
  //     tag: 'FESTIVE OFFER',
  //     tagColor: '#f472b6',
  //     tagBg: 'rgba(244,114,182,0.2)',
  //     title: 'Diwali special rates',
  //     subtitle: '0% fee to India this festive season',
  //     bgColor: '#831843',
  //     bgColorInner: '#be185d',
  //     icon: 'sparkles-outline',
  //   },
  // ];

  // // ─── CURRENCIES ─────────────────────────────────────────────────
  // const CURRENCIES = [
  //   { code: 'GBP', name: 'British Pound', isoCode: 'GB' },
  //   { code: 'EUR', name: 'Euro', isoCode: 'EU' },
  //   { code: 'INR', name: 'Indian Rupee', isoCode: 'IN' },
  //   { code: 'AUD', name: 'Australian Dollar', isoCode: 'AU' },
  //   { code: 'CAD', name: 'Canadian Dollar', isoCode: 'CA' },
  //   { code: 'SGD', name: 'Singapore Dollar', isoCode: 'SG' },
  //   { code: 'AED', name: 'UAE Dirham', isoCode: 'AE' },
  // ];

  // // ─── CIRCLE PROGRESS ────────────────────────────────────────────
  // const CircleProgress = ({ percentage, color, size = 52 }) => (
  //   <View style={{ width: size, height: size }}>
  //     <View style={{
  //       position: 'absolute', width: size, height: size,
  //       borderRadius: size / 2, borderWidth: 4,
  //       borderColor: 'rgba(255,255,255,0.08)',
  //     }} />
  //     <View style={{
  //       position: 'absolute', width: size, height: size,
  //       borderRadius: size / 2, borderWidth: 4,
  //       borderColor: color,
  //       borderRightColor: 'transparent',
  //       borderBottomColor: percentage > 50 ? color : 'transparent',
  //       transform: [{ rotate: `${(percentage / 100) * 360 - 90}deg` }],
  //     }} />
  //   </View>
  // );

  // const DashboardScreen = ({ navigation }) => {
  //   const [user, setUser] = useState(null);
  //   const [balance, setBalance] = useState(0);
  //   const [rates, setRates] = useState({});
  //   const [ratesLoading, setRatesLoading] = useState(true);
  //   const [lastUpdated, setLastUpdated] = useState('');
  //   const [limits, setLimits] = useState({
  //     daily: { used: 0, limit: 5000, percentage: 0 },
  //     weekly: { used: 0, limit: 20000, percentage: 0 },
  //   });
  //   const [showProfile, setShowProfile] = useState(false);
  //   const [activeBanner, setActiveBanner] = useState(0);
  //   const [activeRate, setActiveRate] = useState(0);
  //   const bannerRef = useRef(null);
  //   const rateRef = useRef(null);
  //   const rateFlash = useRef(new Animated.Value(0)).current;

  //   useEffect(() => {
  //     loadUserData();
  //     fetchRates();
  //     const rateInterval = setInterval(fetchRates, 30000);
  //     return () => clearInterval(rateInterval);
  //   }, []);

  //   useEffect(() => {
  //     const bannerInterval = setInterval(() => {
  //       setActiveBanner(prev => {
  //         const next = (prev + 1) % PROMO_BANNERS.length;
  //         try {
  //           bannerRef.current?.scrollToIndex({ index: next, animated: true });
  //         } catch {}
  //         return next;
  //       });
  //     }, 4000);
  //     return () => clearInterval(bannerInterval);
  //   }, []);

  //   // ── Auto-scroll rates ──
  //   useEffect(() => {
  //     const rateInterval = setInterval(() => {
  //       setActiveRate(prev => {
  //         const next = (prev + 1) % CURRENCIES.length;
  //         try {
  //           rateRef.current?.scrollToIndex({ index: next, animated: true });
  //         } catch {}
  //         return next;
  //       });
  //     }, 3000);
  //     return () => clearInterval(rateInterval);
  //   }, []);

  //   const loadUserData = async () => {
  //     try {
  //       const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  //       const userData = await AsyncStorage.getItem('user');
  //       if (userData) setUser(JSON.parse(userData));
  //     } catch {}

  //     try {
  //       const balanceRes = await getBalance();
  //       setUser(balanceRes.data.user);
  //       setBalance(balanceRes.data.user.balance);
  //     } catch {}

  //     try {
  //       const limitsRes = await getLimits();
  //       setLimits(limitsRes.data);
  //     } catch {}
  //   };

  //   const fetchRates = async () => {
  //     try {
  //       const response = await getRates();
  //       setRates(response.data.rates);
  //     } catch {
  //       setRates({
  //         GBP: 0.79, EUR: 0.92, INR: 83.12, AUD: 1.53,
  //         CAD: 1.36, SGD: 1.34, AED: 3.67,
  //       });
  //     }
  //     setRatesLoading(false);
  //     setLastUpdated(new Date().toLocaleTimeString());

  //     Animated.sequence([
  //       Animated.timing(rateFlash, { toValue: 1, duration: 200, useNativeDriver: true }),
  //       Animated.timing(rateFlash, { toValue: 0, duration: 800, useNativeDriver: true }),
  //     ]).start();
  //   };

  //   const handleLogout = async () => {
  //     try { await logoutUser(); } catch {}
  //     await clearAccessToken();
  //     await clearUser();
  //     const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  //     await AsyncStorage.removeItem('userPasscode');
  //     navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  //   };

  //   const getGreeting = () => {
  //     const hour = new Date().getHours();
  //     if (hour < 12) return 'Good morning';
  //     if (hour < 17) return 'Good afternoon';
  //     return 'Good evening';
  //   };

  //   const userName = user?.name || user?.fullName || 'User';
  //   const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  //   return (
  //     <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

  //       {/* ── HEADER ── */}
  //       <View style={styles.header}>
  //         <View>
  //           <Text style={styles.greeting}>{getGreeting()}</Text>
  //           <Text style={styles.userName}>{userName}</Text>
  //         </View>
  //         <TouchableOpacity
  //           style={styles.profileBtn}
  //           onPress={() => setShowProfile(!showProfile)}
  //           activeOpacity={0.7}>
  //           <Text style={styles.profileInitials}>{initials}</Text>
  //         </TouchableOpacity>
  //       </View>

  //       {showProfile && (
  //         <View style={styles.profileDropdown}>
  //           <TouchableOpacity style={styles.dropdownItem} activeOpacity={0.7}>
  //             <Icon name="card-outline" size={18} color="#4ecdc4" />
  //             <Text style={styles.dropdownText}>My Accounts</Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity style={styles.dropdownItem} activeOpacity={0.7}>
  //             <Icon name="help-circle-outline" size={18} color="#4ecdc4" />
  //             <Text style={styles.dropdownText}>FAQ</Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout} activeOpacity={0.7}>
  //             <Icon name="log-out-outline" size={18} color="#e74c3c" />
  //             <Text style={[styles.dropdownText, { color: '#e74c3c' }]}>Logout</Text>
  //           </TouchableOpacity>
  //         </View>
  //       )}

  //       {/* ── LIVE EXCHANGE RATES (TOP) ── */}
  //       <View style={styles.ratesHeader}>
  //         <Text style={styles.sectionTitle}>LIVE EXCHANGE RATES</Text>
  //         <Text style={styles.ratesUpdated}>Updated {lastUpdated}</Text>
  //       </View>
  //       <Animated.View style={{ opacity: rateFlash.interpolate({ inputRange: [0, 1], outputRange: [1, 0.6] }) }}>
  //         <FlatList
  //           ref={rateRef}
  //           data={CURRENCIES}
  //           horizontal
  //           showsHorizontalScrollIndicator={false}
  //           keyExtractor={item => item.code}
  //           style={styles.ratesList}
  //           contentContainerStyle={styles.ratesContent}
  //           onMomentumScrollEnd={e => {
  //             const index = Math.round(e.nativeEvent.contentOffset.x / 130);
  //             setActiveRate(index);
  //           }}
  //           renderItem={({ item, index }) => (
  //             <View style={[styles.rateCard, activeRate === index && styles.rateCardActive]}>
  //               <CountryFlag isoCode={item.isoCode} size={28} style={styles.flagImage} />
  //               <Text style={styles.rateCode}>{item.code}</Text>
  //               <Text style={styles.rateName}>{item.name}</Text>
  //               <Text style={styles.rateValue}>
  //                 {ratesLoading ? '...' : (rates[item.code] || 0).toFixed(item.code === 'INR' ? 2 : 4)}
  //               </Text>
  //             </View>
  //           )}
  //         />
  //       </Animated.View>
  //       <View style={styles.rateDots}>
  //         {CURRENCIES.map((_, i) => (
  //           <View key={i} style={[styles.rateDot, activeRate === i && styles.rateDotActive]} />
  //         ))}
  //       </View>

  //       {/* ── BALANCE CARD ── */}
  //       <View style={styles.balanceCard}>
  //         <View style={styles.balanceDecor1} />
  //         <View style={styles.balanceDecor2} />
  //         <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
  //         <Text style={styles.balanceAmount}>${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
  //         <Text style={styles.balanceSub}>Available for transfer</Text>
  //         <View style={styles.balanceBtns}>
  //           <TouchableOpacity style={styles.addMoneyBtn} activeOpacity={0.8}>
  //             <Icon name="add" size={18} color="#fff" />
  //             <Text style={styles.addMoneyText}>Add Money</Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             style={styles.sendMoneyBtn}
  //             activeOpacity={0.8}
  //             onPress={() => navigation.navigate('Send')}>
  //             <Icon name="send" size={16} color="#0a1628" />
  //             <Text style={styles.sendMoneyText}>Send Money</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>

  //       {/* ── PROMO BANNERS ── */}
  //       <FlatList
  //         ref={bannerRef}
  //         data={PROMO_BANNERS}
  //         horizontal
  //         pagingEnabled
  //         showsHorizontalScrollIndicator={false}
  //         keyExtractor={item => item.id}
  //         style={styles.bannerList}
  //         contentContainerStyle={styles.bannerContent}
  //         onMomentumScrollEnd={e => {
  //           const index = Math.round(e.nativeEvent.contentOffset.x / (width - 40));
  //           setActiveBanner(index);
  //         }}
  //         renderItem={({ item }) => (
  //           <TouchableOpacity style={styles.bannerCard} activeOpacity={0.9}>
  //             <View style={[styles.bannerBg, { backgroundColor: item.bgColor }]}>
  //               <View style={[styles.bannerBgInner, { backgroundColor: item.bgColorInner }]} />
  //               <View style={styles.bannerIconBg}>
  //                 <Icon name={item.icon} size={32} color="rgba(255,255,255,0.15)" />
  //               </View>
  //               <View style={[styles.bannerTag, { backgroundColor: item.tagBg }]}>
  //                 <Text style={[styles.bannerTagText, { color: item.tagColor }]}>{item.tag}</Text>
  //               </View>
  //               <Text style={styles.bannerTitle}>{item.title}</Text>
  //               <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
  //             </View>
  //           </TouchableOpacity>
  //         )}
  //       />
  //       <View style={styles.bannerDots}>
  //         {PROMO_BANNERS.map((_, i) => (
  //           <View key={i} style={[styles.bannerDot, activeBanner === i && styles.bannerDotActive]} />
  //         ))}
  //       </View>

  //       {/* ── TRANSFER LIMITS ── */}
  //       <Text style={styles.sectionTitle}>TRANSFER LIMITS</Text>
  //       <View style={styles.limitsRow}>
  //         <View style={styles.limitCard}>
  //           <CircleProgress percentage={limits.daily?.percentage || 30} color="#4ecdc4" />
  //           <View style={styles.limitInfo}>
  //             <Text style={styles.limitLabel}>Daily</Text>
  //             <Text style={styles.limitAmount}>${(limits.daily?.used || 1500).toLocaleString()}</Text>
  //             <Text style={styles.limitTotal}>of ${(limits.daily?.limit || 5000).toLocaleString()}</Text>
  //           </View>
  //         </View>
  //         <View style={styles.limitCard}>
  //           <CircleProgress percentage={limits.weekly?.percentage || 50} color="#0f4c81" />
  //           <View style={styles.limitInfo}>
  //             <Text style={styles.limitLabel}>Weekly</Text>
  //             <Text style={styles.limitAmount}>${(limits.weekly?.used || 10000).toLocaleString()}</Text>
  //             <Text style={styles.limitTotal}>of ${(limits.weekly?.limit || 20000).toLocaleString()}</Text>
  //           </View>
  //         </View>
  //       </View>

  //       {/* ── REFERRAL BANNER ──
  //       <View style={styles.referralCard}>
  //         <View style={styles.referralContent}>
  //           <Icon name="gift" size={28} color="#4ecdc4" />
  //           <View style={styles.referralTextContainer}>
  //             <Text style={styles.referralTitle}>Refer & Earn $25!</Text>
  //             <Text style={styles.referralSubtitle}>Share with friends and both earn $25</Text>
  //           </View>
  //         </View>
  //         <TouchableOpacity style={styles.referralBtn} activeOpacity={0.8}>
  //           <Icon name="share-outline" size={16} color="#0f4c81" />
  //           <Text style={styles.referralBtnText}>Invite Friend</Text>
  //         </TouchableOpacity>
  //       </View> */}

  //     </ScrollView>
  //   );
  // };

  // export default DashboardScreen;