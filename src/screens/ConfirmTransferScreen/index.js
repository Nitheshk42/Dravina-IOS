import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CountryFlag from 'react-native-country-flag';
import { sendMoney } from '../../services/api';
import styles from './styles';

const ConfirmTransferScreen = ({ navigation, route }) => {
  const data = route?.params;
  const [loading, setLoading] = useState(false);

  if (!data) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Icon name="alert-circle-outline" size={48} color="#f59e0b" />
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700', marginTop: 16 }}>No Transfer Data</Text>
        <Text style={{ color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>Please start a transfer first</Text>
        <TouchableOpacity
          style={{ marginTop: 24, backgroundColor: '#4ecdc4', borderRadius: 14, paddingHorizontal: 24, paddingVertical: 12 }}
          onPress={() => navigation.goBack()}>
          <Text style={{ color: '#0a1628', fontWeight: '700' }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await sendMoney({
        amountSent: data.amount,
        amountReceived: parseFloat(data.recipientGets),
        currency: data.country.code,
        country: data.country.name,
        exchangeRate: parseFloat(data.exchangeRate),
      });
      navigation.navigate('TransferSuccess', {
        amount: data.amount,
        recipientGets: data.recipientGets,
        currency: data.country.code,
        country: data.country.name,
        recipient: data.recipient,
        userCurrency: data.userCurrency,
      });
    } catch (error) {
      Alert.alert(
        'Transfer Failed',
        error.response?.data?.message || 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const userCurrency = data.userCurrency || { code: 'USD', isoCode: 'US' };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="arrow-back" size={20} color="#ffffff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Confirm Transfer</Text>
            <Text style={styles.headerSubtitle}>Review before sending</Text>
          </View>
        </View>
      </View>

      {/* ── SUMMARY CARD ── */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Transfer Summary</Text>

        {/* You Send */}
        <View style={styles.amountBox}>
          <Text style={styles.amountLabel}>You Send</Text>
          <View style={styles.amountRow}>
            <View style={styles.amountCurrency}>
              <CountryFlag isoCode={userCurrency.isoCode} size={20} style={{ borderRadius: 4 }} />
              <Text style={styles.amountCurrencyCode}>{userCurrency.code}</Text>
            </View>
            <Text style={styles.amountValue}>${data.amount.toFixed(2)}</Text>
          </View>
        </View>

        {/* Arrow */}
        <View style={styles.arrowContainer}>
          <View style={styles.arrowCircle}>
            <Icon name="arrow-down" size={16} color="#4ecdc4" />
          </View>
        </View>

        {/* They Receive */}
        <View style={styles.receiveBox}>
          <Text style={styles.amountLabel}>Recipient Gets</Text>
          <View style={styles.amountRow}>
            <View style={styles.amountCurrency}>
              <CountryFlag isoCode={data.country.isoCode} size={20} style={{ borderRadius: 4 }} />
              <Text style={styles.amountCurrencyCode}>{data.country.code}</Text>
            </View>
            <Text style={styles.receiveValue}>{data.recipientGets}</Text>
          </View>
        </View>

        {/* Breakdown */}
        <Text style={styles.breakdownTitle}>Breakdown</Text>
        {[
          { label: 'Transfer Amount', value: `$${data.amount.toFixed(2)}`, style: 'normal' },
          { label: 'Transfer Fee', value: `- $${data.fee}`, style: 'red' },
          { label: 'Amount After Fee', value: `$${data.amountAfterFee}`, style: 'normal' },
          { label: 'Exchange Rate', value: `1 ${userCurrency.code} = ${data.exchangeRate} ${data.country.code}`, style: 'normal' },
          { label: 'Estimated Delivery', value: data.country.delivery, style: 'teal' },
        ].map((row, i) => (
          <View key={i} style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>{row.label}</Text>
            <Text style={
              row.style === 'red' ? styles.breakdownValueRed :
              row.style === 'teal' ? styles.breakdownValueTeal :
              styles.breakdownValue
            }>{row.value}</Text>
          </View>
        ))}
      </View>

      {/* ── RECIPIENT CARD ── */}
      <View style={styles.recipientCard}>
        <Text style={styles.recipientTitle}>Sending To</Text>
        <View style={styles.recipientRow}>
          <View style={[styles.recipientAvatar, { backgroundColor: '#0f4c81' }]}>
            <Text style={styles.recipientAvatarText}>
              {data.recipient?.fullName?.charAt(0).toUpperCase() || '?'}
            </Text>
          </View>
          <View style={styles.recipientInfo}>
            <Text style={styles.recipientName}>{data.recipient?.fullName}</Text>
            <Text style={styles.recipientDetails}>
              {data.recipient?.country} · {data.recipient?.bankAccount}
            </Text>
          </View>
          <CountryFlag isoCode={data.country.isoCode} size={24} style={{ borderRadius: 4 }} />
        </View>
      </View>

      {/* ── FROM ACCOUNT ── */}
      {data.account && (
        <View style={styles.accountCard}>
          <Text style={styles.accountTitle}>From Account</Text>
          <View style={styles.accountRow}>
            <View style={styles.accountIconBg}>
              <Icon name="card-outline" size={20} color="#4ecdc4" />
            </View>
            <View>
              <Text style={styles.accountName}>{data.account.bank_name}</Text>
              <Text style={styles.accountType}>
                {data.account.account_type} · {data.account.account_no}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* ── WARNING ── */}
      <View style={styles.warningCard}>
        <Icon name="warning-outline" size={20} color="#f59e0b" />
        <Text style={styles.warningText}>
          Please review all details carefully. Once confirmed, transfers cannot be cancelled.
        </Text>
      </View>

      {/* ── BUTTONS ── */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.editBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <View style={styles.editBtnContent}>
            <Icon name="arrow-back" size={16} color="#ffffff" />
            <Text style={styles.editBtnText}>Edit</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={handleConfirm}
          disabled={loading}
          activeOpacity={0.8}>
          {loading ? (
            <ActivityIndicator color="#0a1628" />
          ) : (
            <View style={styles.confirmBtnContent}>
              <Text style={styles.confirmBtnText}>Confirm & Send</Text>
              <Icon name="send" size={16} color="#0a1628" />
            </View>
          )}
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default ConfirmTransferScreen;
