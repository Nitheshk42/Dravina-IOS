import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CountryFlag from 'react-native-country-flag';
import { getHistory } from '../../services/api';
import styles from './styles';

const COUNTRY_ISO = {
  'India': 'IN', 'INR': 'IN', 'United Kingdom': 'GB', 'GBP': 'GB',
  'Europe': 'EU', 'EUR': 'EU', 'Australia': 'AU', 'AUD': 'AU',
  'Canada': 'CA', 'CAD': 'CA', 'Singapore': 'SG', 'SGD': 'SG',
  'UAE': 'AE', 'AED': 'AE',
};

const STATUS_CONFIG = {
  Completed: { color: '#4ecdc4', bg: 'rgba(78,205,196,0.1)', icon: 'checkmark-circle' },
  Pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: 'time' },
  Failed: { color: '#e74c3c', bg: 'rgba(231,76,60,0.1)', icon: 'close-circle' },
};

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'deposit', label: 'Deposits' },
  { key: 'transfer', label: 'Transfers' },
];

const HistoryScreen = ({ navigation }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await getHistory();
      setHistory(response.data.history || []);
    } catch {
      // Mock data
      setHistory([
        { id: '1', type: 'transfer', amountSent: 500, amountReceived: 41560, currency: 'INR', country: 'India', status: 'Completed', exchangeRate: 83.12, createdAt: new Date().toISOString() },
        { id: '2', type: 'deposit', amount: 1000, status: 'Completed', createdAt: new Date(Date.now() - 86400000).toISOString() },
        { id: '3', type: 'transfer', amountSent: 200, amountReceived: 158, currency: 'GBP', country: 'United Kingdom', status: 'Completed', exchangeRate: 0.79, createdAt: new Date(Date.now() - 172800000).toISOString() },
        { id: '4', type: 'transfer', amountSent: 300, amountReceived: 276, currency: 'EUR', country: 'Europe', status: 'Pending', exchangeRate: 0.92, createdAt: new Date(Date.now() - 259200000).toISOString() },
        { id: '5', type: 'deposit', amount: 500, status: 'Completed', createdAt: new Date(Date.now() - 345600000).toISOString() },
        { id: '6', type: 'transfer', amountSent: 150, amountReceived: 204.75, currency: 'CAD', country: 'Canada', status: 'Failed', exchangeRate: 1.36, createdAt: new Date(Date.now() - 432000000).toISOString() },
        { id: '7', type: 'transfer', amountSent: 800, amountReceived: 66496, currency: 'INR', country: 'India', status: 'Completed', exchangeRate: 83.12, createdAt: new Date(Date.now() - 518400000).toISOString() },
        { id: '8', type: 'deposit', amount: 2000, status: 'Completed', createdAt: new Date(Date.now() - 604800000).toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchHistory();
    setRefreshing(false);
  };

  const filteredHistory = history.filter(item =>
    filter === 'all' || item.type === filter
  );

  const totalSent = history
    .filter(h => h.type === 'transfer' && h.status === 'Completed')
    .reduce((sum, h) => sum + (h.amountSent || 0), 0);

  const totalDeposited = history
    .filter(h => h.type === 'deposit')
    .reduce((sum, h) => sum + (h.amount || 0), 0);

  const formatDate = (d) => {
    const date = new Date(d);
    const now = new Date();
    const diff = Math.floor((now - date) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (d) => {
    return new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#4ecdc4" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#4ecdc4"
        />
      }>

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
        <Text style={styles.headerSubtitle}>All your transactions</Text>
      </View>

      {/* ── SUMMARY CARDS ── */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Icon name="arrow-down-circle-outline" size={20} color="#4ecdc4" />
          <Text style={styles.summaryValue}>+${totalDeposited.toLocaleString()}</Text>
          <Text style={styles.summaryLabel}>Deposited</Text>
        </View>
        <View style={styles.summaryCard}>
          <Icon name="arrow-up-circle-outline" size={20} color="#0f4c81" />
          <Text style={[styles.summaryValue, { color: '#60a5fa' }]}>-${totalSent.toLocaleString()}</Text>
          <Text style={styles.summaryLabel}>Sent</Text>
        </View>
        <View style={styles.summaryCard}>
          <Icon name="receipt-outline" size={20} color="#a78bfa" />
          <Text style={[styles.summaryValue, { color: '#a78bfa' }]}>{history.length}</Text>
          <Text style={styles.summaryLabel}>Total</Text>
        </View>
      </View>

      {/* ── FILTER TABS ── */}
      <View style={styles.filterRow}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterTab, filter === f.key && styles.filterTabActive]}
            onPress={() => setFilter(f.key)}
            activeOpacity={0.7}>
            <Text style={[styles.filterText, filter === f.key && styles.filterTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── TRANSACTION LIST ── */}
      {filteredHistory.length > 0 ? (
        <View style={styles.transactionList}>
          {filteredHistory.map((tx, i) => {
            const status = STATUS_CONFIG[tx.status] || STATUS_CONFIG.Pending;
            const isTransfer = tx.type === 'transfer';
            const isoCode = COUNTRY_ISO[tx.currency] || COUNTRY_ISO[tx.country] || 'US';

            return (
              <TouchableOpacity
                key={tx.id}
                style={[styles.transactionItem, i < filteredHistory.length - 1 && styles.transactionBorder]}
                onPress={() => navigation.navigate('TransactionDetail', { transaction: tx })}
                activeOpacity={0.7}>

                {/* Icon */}
                <View style={[styles.txIcon, { backgroundColor: status.bg }]}>
                  {isTransfer ? (
                    <Icon name="arrow-up-outline" size={18} color={status.color} />
                  ) : (
                    <Icon name="arrow-down-outline" size={18} color="#4ecdc4" />
                  )}
                </View>

                {/* Details */}
                <View style={styles.txInfo}>
                  <View style={styles.txTopRow}>
                    <Text style={styles.txTitle}>
                      {isTransfer ? `Sent to ${tx.country}` : 'Deposit'}
                    </Text>
                    <Text style={[styles.txAmount, isTransfer ? styles.txAmountSent : styles.txAmountDeposit]}>
                      {isTransfer ? `-$${tx.amountSent}` : `+$${tx.amount}`}
                    </Text>
                  </View>
                  <View style={styles.txBottomRow}>
                    <View style={styles.txDateRow}>
                      {isTransfer && (
                        <CountryFlag isoCode={isoCode} size={12} style={{ borderRadius: 2 }} />
                      )}
                      <Text style={styles.txDate}>{formatDate(tx.createdAt)}</Text>
                      <Text style={styles.txTime}>{formatTime(tx.createdAt)}</Text>
                    </View>
                    <View style={styles.txStatusRow}>
                      <View style={[styles.txStatusDot, { backgroundColor: status.color }]} />
                      <Text style={[styles.txStatus, { color: status.color }]}>{tx.status}</Text>
                    </View>
                  </View>
                  {isTransfer && tx.amountReceived && (
                    <Text style={styles.txReceived}>
                      Recipient got {tx.amountReceived.toLocaleString()} {tx.currency}
                    </Text>
                  )}
                </View>

                <Icon name="chevron-forward" size={16} color="rgba(255,255,255,0.15)" />
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Icon name="receipt-outline" size={36} color="#4ecdc4" />
          </View>
          <Text style={styles.emptyTitle}>No transactions</Text>
          <Text style={styles.emptySubtitle}>
            {filter === 'all'
              ? 'Your transaction history will appear here'
              : `No ${filter === 'deposit' ? 'deposits' : 'transfers'} found`}
          </Text>
        </View>
      )}

    </ScrollView>
  );
};

export default HistoryScreen;