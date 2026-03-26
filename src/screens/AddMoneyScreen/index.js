import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useStripe, CardField } from '@stripe/stripe-react-native';
import { createPaymentIntent, confirmPayment, getBalance } from '../../services/api';
import styles from './styles';

const QUICK_AMOUNTS = [50, 100, 250, 500];

const AddMoneyScreen = ({ navigation }) => {
  const { confirmPayment: stripeConfirm } = useStripe();
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cardComplete, setCardComplete] = useState(false);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const res = await getBalance();
      setBalance(res.data.user.balance || 0);
    } catch {}
  };

  const amountNum = parseFloat(amount) || 0;

  const handleAddMoney = async () => {
    if (amountNum < 5) {
      setError('Minimum amount is $5.00');
      return;
    }
    if (amountNum > 10000) {
      setError('Maximum amount is $10,000.00');
      return;
    }
    if (!cardComplete) {
      setError('Please enter your card details');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Step 1: Create payment intent on backend
      const intentRes = await createPaymentIntent({
        amount: amountNum,
        currency: 'usd',
      });
      const { clientSecret, paymentIntentId } = intentRes.data;

      // Step 2: Confirm payment with Stripe SDK
      const { error: stripeError, paymentIntent } = await stripeConfirm(clientSecret, {
        paymentMethodType: 'Card',
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      // Step 3: Confirm on backend to update balance
      const confirmRes = await confirmPayment({
        paymentIntentId,
        amount: amountNum,
      });

      const newBalance = confirmRes.data.newBalance;

      Alert.alert(
        'Money Added!',
        `$${amountNum.toFixed(2)} has been added to your account.\n\nNew balance: $${newBalance?.toFixed(2) || amountNum.toFixed(2)}`,
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
            <Text style={styles.headerTitle}>Add Money</Text>
            <Text style={styles.headerSubtitle}>Fund your Dravina wallet</Text>
          </View>
        </View>
      </View>

      {/* ── CURRENT BALANCE ── */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
      </View>

      {/* ── ERROR ── */}
      {error ? (
        <View style={styles.errorBox}>
          <Icon name="alert-circle" size={16} color="#e74c3c" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* ── AMOUNT ── */}
      <Text style={styles.sectionTitle}>ENTER AMOUNT</Text>
      <View style={styles.amountCard}>
        <View style={styles.amountInputRow}>
          <Text style={styles.dollarSign}>$</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={(v) => { setAmount(v); setError(''); }}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor="rgba(255,255,255,0.2)"
          />
        </View>
        <Text style={styles.amountHint}>Minimum $5.00 · Maximum $10,000.00</Text>
      </View>

      {/* ── QUICK AMOUNTS ── */}
      <View style={styles.quickAmounts}>
        {QUICK_AMOUNTS.map(qa => (
          <TouchableOpacity
            key={qa}
            style={[styles.quickAmountBtn, amount === String(qa) && styles.quickAmountBtnActive]}
            onPress={() => { setAmount(String(qa)); setError(''); }}
            activeOpacity={0.7}>
            <Text style={[styles.quickAmountText, amount === String(qa) && styles.quickAmountTextActive]}>
              ${qa}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── CARD DETAILS ── */}
      <View style={styles.cardSection}>
        <Text style={styles.cardLabel}>CARD DETAILS</Text>
        <View style={styles.cardInputContainer}>
          <CardField
            postalCodeEnabled={false}
            placeholders={{ number: '4242 4242 4242 4242' }}
            cardStyle={{
              backgroundColor: 'transparent',
              textColor: '#ffffff',
              placeholderColor: 'rgba(255,255,255,0.25)',
              borderWidth: 0,
            }}
            style={{ width: '100%', height: 50 }}
            onCardChange={(details) => {
              setCardComplete(details.complete);
              setError('');
            }}
          />
        </View>
      </View>

      {/* ── PAY BUTTON ── */}
      <TouchableOpacity
        style={[styles.payBtn, (loading || !amountNum || !cardComplete) && styles.payBtnDisabled]}
        onPress={handleAddMoney}
        disabled={loading || !amountNum || !cardComplete}
        activeOpacity={0.8}>
        {loading ? (
          <ActivityIndicator color="#0a1628" />
        ) : (
          <View style={styles.payBtnContent}>
            <Icon name="card" size={18} color={(!amountNum || !cardComplete) ? 'rgba(255,255,255,0.25)' : '#0a1628'} />
            <Text style={[styles.payBtnText, (!amountNum || !cardComplete) && styles.payBtnTextDisabled]}>
              {amountNum > 0 ? `Add $${amountNum.toFixed(2)}` : 'Add Money'}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* ── SECURE NOTICE ── */}
      <View style={styles.secureRow}>
        <Icon name="shield-checkmark" size={14} color="rgba(255,255,255,0.25)" />
        <Text style={styles.secureText}>Secured by Stripe · 256-bit encryption</Text>
      </View>

    </ScrollView>
  );
};

export default AddMoneyScreen;