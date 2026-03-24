import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CountryFlag from 'react-native-country-flag';
import styles from './styles';

const COUNTRY_ISO = {
  'India': 'IN', 'INR': 'IN', 'United Kingdom': 'GB', 'GBP': 'GB',
  'Europe': 'EU', 'EUR': 'EU', 'Australia': 'AU', 'AUD': 'AU',
  'Canada': 'CA', 'CAD': 'CA', 'Singapore': 'SG', 'SGD': 'SG',
  'UAE': 'AE', 'AED': 'AE',
};

const STATUS_CONFIG = {
  Completed: { color: '#4ecdc4', bg: 'rgba(78,205,196,0.1)', icon: 'checkmark-circle', title: 'Transfer Completed' },
  Pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: 'time', title: 'Transfer Pending' },
  Failed: { color: '#e74c3c', bg: 'rgba(231,76,60,0.1)', icon: 'close-circle', title: 'Transfer Failed' },
};

const TransactionDetailScreen = ({ navigation, route }) => {
  const tx = route?.params?.transaction;
  if (!tx) return null;

  const isTransfer = tx.type === 'transfer';
  const status = STATUS_CONFIG[tx.status] || STATUS_CONFIG.Pending;
  const isoCode = COUNTRY_ISO[tx.currency] || COUNTRY_ISO[tx.country] || 'US';

  const formatDate = (d) => {
    return new Date(d).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });
  };

  const formatTime = (d) => {
    return new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const handleShare = async () => {
    const message = isTransfer
      ? `Dravina Transfer Receipt\nSent: $${tx.amountSent}\nReceived: ${tx.amountReceived} ${tx.currency}\nTo: ${tx.country}\nStatus: ${tx.status}\nDate: ${formatDate(tx.createdAt)}`
      : `Dravina Deposit Receipt\nAmount: $${tx.amount}\nStatus: ${tx.status}\nDate: ${formatDate(tx.createdAt)}`;
    try {
      await Share.share({ message });
    } catch {}
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="arrow-back" size={20} color="#ffffff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Transaction Details</Text>
            <Text style={styles.headerSubtitle}>#{tx.id}</Text>
          </View>
        </View>
      </View>

      {/* ── STATUS CARD ── */}
      <View style={[styles.statusCard, { backgroundColor: status.bg }]}>
        <View style={[styles.statusIconCircle, { backgroundColor: `${status.color}20` }]}>
          <Icon name={status.icon} size={36} color={status.color} />
        </View>
        <Text style={styles.statusTitle}>{isTransfer ? status.title : 'Deposit ' + tx.status}</Text>
        <Text style={styles.statusDate}>{formatDate(tx.createdAt)} at {formatTime(tx.createdAt)}</Text>
      </View>

      {/* ── AMOUNT DETAILS ── */}
      <View style={styles.amountCard}>
        {isTransfer ? (
          <>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Amount Sent</Text>
              <Text style={styles.amountValue}>${tx.amountSent?.toLocaleString()}</Text>
            </View>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Transfer Fee</Text>
              <Text style={styles.amountValueRed}>- $0.99</Text>
            </View>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Exchange Rate</Text>
              <Text style={styles.amountValue}>1 USD = {tx.exchangeRate} {tx.currency}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Recipient Got</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <CountryFlag isoCode={isoCode} size={18} style={{ borderRadius: 3 }} />
                <Text style={styles.totalValue}>{tx.amountReceived?.toLocaleString()} {tx.currency}</Text>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Deposit Amount</Text>
              <Text style={styles.amountValueTeal}>+${tx.amount?.toLocaleString()}</Text>
            </View>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Method</Text>
              <Text style={styles.amountValue}>Bank Transfer</Text>
            </View>
          </>
        )}
      </View>

      {/* ── RECIPIENT (transfers only) ── */}
      {isTransfer && (
        <View style={styles.recipientCard}>
          <Text style={styles.cardTitle}>SENT TO</Text>
          <View style={styles.recipientRow}>
            <View style={[styles.recipientAvatar, { backgroundColor: '#0f4c81' }]}>
              <CountryFlag isoCode={isoCode} size={22} style={{ borderRadius: 4 }} />
            </View>
            <View>
              <Text style={styles.recipientName}>{tx.country}</Text>
              <Text style={styles.recipientDetails}>{tx.currency} · {tx.status}</Text>
            </View>
          </View>
        </View>
      )}

      {/* ── SHARE BUTTON ── */}
      <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.7}>
        <Icon name="share-outline" size={18} color="#ffffff" />
        <Text style={styles.shareBtnText}>Share Receipt</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default TransactionDetailScreen;