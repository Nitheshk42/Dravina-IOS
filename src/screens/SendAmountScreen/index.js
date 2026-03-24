import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CountryFlag from 'react-native-country-flag';
import { getRates, getAccounts } from '../../services/api';
import { detectUserCurrency, getCurrencyForCountry } from '../../utils/detectLocation';
import styles from './styles';

const FLAT_FEE = 0.99;

const COUNTRIES = [
  { code: 'GBP', name: 'United Kingdom', isoCode: 'GB', currency: 'British Pound', delivery: '1-2 hours' },
  { code: 'EUR', name: 'Europe', isoCode: 'EU', currency: 'Euro', delivery: '1-2 hours' },
  { code: 'INR', name: 'India', isoCode: 'IN', currency: 'Indian Rupee', delivery: 'Instant' },
  { code: 'AUD', name: 'Australia', isoCode: 'AU', currency: 'Australian Dollar', delivery: '2-3 hours' },
  { code: 'CAD', name: 'Canada', isoCode: 'CA', currency: 'Canadian Dollar', delivery: '2-3 hours' },
  { code: 'SGD', name: 'Singapore', isoCode: 'SG', currency: 'Singapore Dollar', delivery: '1-2 hours' },
  { code: 'AED', name: 'UAE', isoCode: 'AE', currency: 'UAE Dirham', delivery: 'Instant' },
];

const SendAmountScreen = ({ navigation, route }) => {
  const recipient = route?.params?.recipient;
  const [amount, setAmount] = useState('');
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [accounts, setAccountsList] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showAccountPicker, setShowAccountPicker] = useState(false);

  // Auto-detect country based on recipient
   const receiveCurrencyCode = getCurrencyForCountry(recipient?.country);
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES.find(c => c.code === receiveCurrencyCode) || COUNTRIES[2]
  );
  const [userCurrency, setUserCurrency] = useState({ code: 'USD', isoCode: 'US' });

   useEffect(() => {
    fetchRates();
    fetchAccounts();
    detectUser();
  }, []);

  const detectUser = async () => {
    try {
      const detected = await detectUserCurrency();
      setUserCurrency(detected);
    } catch {}
  };

  const fetchRates = async () => {
    try {
      const response = await getRates();
      setRates(response.data.rates);
    } catch {
      setRates({ GBP: 0.79, EUR: 0.92, INR: 83.12, AUD: 1.53, CAD: 1.36, SGD: 1.34, AED: 3.67 });
    }
    setLoading(false);
  };

  const fetchAccounts = async () => {
    try {
      const response = await getAccounts();
      const accts = response.data.accounts || [];
      setAccountsList(accts);
      if (accts.length > 0) setSelectedAccount(accts[0]);
    } catch {
      const mockAccounts = [
        { account_id: '1', bank_name: 'Chase Bank', account_type: 'Checking', account_no: '****4521' },
        { account_id: '2', bank_name: 'Bank of America', account_type: 'Savings', account_no: '****8832' },
      ];
      setAccountsList(mockAccounts);
      setSelectedAccount(mockAccounts[0]);
    }
  };

  const amountNum = parseFloat(amount) || 0;
  const amountAfterFee = amountNum - FLAT_FEE;

  // Cross-rate calculation: userCurrency → USD → recipientCurrency
  const fromRate = userCurrency.code === 'USD' ? 1 : (rates[userCurrency.code] ? 1 / rates[userCurrency.code] : 1);
  const toRate = selectedCountry.code === 'USD' ? 1 : (rates[selectedCountry.code] || 1);
  const crossRate = fromRate * toRate;
  const exchangeRate = crossRate;
  const recipientGets = amountAfterFee > 0
    ? (amountAfterFee * crossRate).toFixed(2) : '0.00';

  const handleContinue = () => {
    if (!amount || amountNum <= FLAT_FEE) {
      Alert.alert('Invalid Amount', `Amount must be greater than $${FLAT_FEE} to cover the fee.`);
      return;
    }
    navigation.navigate('ConfirmTransfer', {
      amount: amountNum,
      fee: FLAT_FEE,
      amountAfterFee: amountAfterFee.toFixed(2),
      recipientGets,
      exchangeRate: crossRate.toFixed(4),
      country: selectedCountry,
      recipient,
      account: selectedAccount,
      userCurrency,
    });
  };

  const cycleCurrency = () => {
    const currentIndex = COUNTRIES.findIndex(c => c.code === selectedCountry.code);
    setSelectedCountry(COUNTRIES[(currentIndex + 1) % COUNTRIES.length]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="arrow-back" size={20} color="#ffffff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Send Money</Text>
            <Text style={styles.headerSubtitle}>Enter amount to send</Text>
          </View>
        </View>
      </View>

      {/* ── RECIPIENT CARD ── */}
      {recipient && (
        <View style={styles.recipientCard}>
          <View style={[styles.recipientAvatar, { backgroundColor: '#0f4c81' }]}>
            <Text style={styles.recipientAvatarText}>{recipient.fullName.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={styles.recipientInfo}>
            <Text style={styles.recipientName}>{recipient.fullName}</Text>
            <Text style={styles.recipientDetails}>{recipient.country} · {recipient.bankAccount}</Text>
          </View>
          <TouchableOpacity style={styles.changeBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Text style={styles.changeBtnText}>Change</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ── YOU SEND ── */}
     <Text style={styles.sectionTitle}>YOU SEND</Text>
      <View style={styles.sendCard}>
        <View style={styles.sendRow}>
          <CountryFlag isoCode={userCurrency.isoCode} size={24} style={styles.currencyFlag} />
          <Text style={styles.currencyCode}>{userCurrency.code}</Text>
          <View style={styles.divider} />
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor="rgba(255,255,255,0.2)"
          />
        </View>
      </View>

      {/* ── SWAP ── */}
      <View style={styles.swapContainer}>
        <View style={styles.swapBtn}>
          <Icon name="swap-vertical" size={18} color="#4ecdc4" />
        </View>
      </View>

      {/* ── THEY RECEIVE ── */}
      <View style={styles.receiveCard}>
        <Text style={[styles.sendLabel, { marginBottom: 10 }]}>THEY RECEIVE</Text>
        <View style={styles.receiveRow}>
          <Text style={styles.receiveAmount}>
            {loading ? '...' : recipientGets}
          </Text>
          <TouchableOpacity style={styles.receiveCurrency} onPress={cycleCurrency} activeOpacity={0.7}>
            <CountryFlag isoCode={selectedCountry.isoCode} size={18} style={{ borderRadius: 4 }} />
            <Text style={styles.receiveCurrencyCode}>{selectedCountry.code}</Text>
            <Icon name="chevron-down" size={14} color="rgba(255,255,255,0.5)" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── FEE BREAKDOWN ── */}
      <View style={styles.feeCard}>
        <View style={styles.feeRow}>
          <Text style={styles.feeLabel}>Transfer Fee</Text>
          <Text style={styles.feeValueRed}>- ${FLAT_FEE}</Text>
        </View>
        <View style={styles.feeRow}>
          <Text style={styles.feeLabel}>Exchange Rate</Text>
          <Text style={styles.feeValue}>
             1 {userCurrency.code} = {loading ? '...' : crossRate.toFixed(selectedCountry.code === 'INR' ? 2 : 4)} {selectedCountry.code}
          </Text>
        </View>
        <View style={[styles.feeRow, { marginBottom: 0 }]}>
          <Text style={styles.feeLabel}>Estimated Delivery</Text>
          <Text style={styles.feeValueTeal}>{selectedCountry.delivery}</Text>
        </View>
      </View>

      {/* ── FROM ACCOUNT ── */}
      <View style={styles.accountCard}>
        <Text style={styles.accountLabel}>FROM ACCOUNT</Text>
        <TouchableOpacity
          style={styles.accountSelector}
          onPress={() => {
            const currentIndex = accounts.findIndex(a => a.account_id === selectedAccount?.account_id);
            const next = accounts[(currentIndex + 1) % accounts.length];
            setSelectedAccount(next);
          }}
          activeOpacity={0.7}>
          <View style={styles.accountLeft}>
            <View style={styles.accountIconBg}>
              <Icon name="card-outline" size={18} color="#4ecdc4" />
            </View>
            <View>
              <Text style={styles.accountName}>{selectedAccount?.bank_name || 'Select Account'}</Text>
              <Text style={styles.accountType}>
                {selectedAccount ? `${selectedAccount.account_type} · ${selectedAccount.account_no}` : 'Tap to select'}
              </Text>
            </View>
          </View>
          <Icon name="chevron-down" size={18} color="rgba(255,255,255,0.3)" />
        </TouchableOpacity>
      </View>

      {/* ── CONTINUE ── */}
      <TouchableOpacity
        style={[styles.continueBtn, (!amount || amountNum <= FLAT_FEE) && styles.continueBtnDisabled]}
        onPress={handleContinue}
        disabled={!amount || amountNum <= FLAT_FEE}
        activeOpacity={0.8}>
        <View style={styles.continueBtnContent}>
          <Text style={[styles.continueBtnText, (!amount || amountNum <= FLAT_FEE) && styles.continueBtnTextDisabled]}>
            Continue
          </Text>
          <Icon name="arrow-forward" size={18} color={(!amount || amountNum <= FLAT_FEE) ? 'rgba(255,255,255,0.25)' : '#0a1628'} />
        </View>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default SendAmountScreen;
