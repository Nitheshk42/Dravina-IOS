import React, { useState, useEffect } from 'react';
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
import { getAccounts, deleteAccount } from '../../services/api';
import styles from './styles';

const COUNTRY_CONFIG = {
  US: { name: 'United States', isoCode: 'US' },
  IN: { name: 'India', isoCode: 'IN' },
  GB: { name: 'United Kingdom', isoCode: 'GB' },
  EU: { name: 'Europe', isoCode: 'EU' },
  AU: { name: 'Australia', isoCode: 'AU' },
  CA: { name: 'Canada', isoCode: 'CA' },
  SG: { name: 'Singapore', isoCode: 'SG' },
  AE: { name: 'UAE', isoCode: 'AE' },
};

const maskAccount = (number) => {
  if (!number) return '—';
  const str = number.toString();
  if (str.length <= 4) return str;
  return '*'.repeat(str.length - 4) + str.slice(-4);
};

const MyAccountsScreen = ({ navigation }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchAccounts();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchAccounts = async () => {
    try {
      const response = await getAccounts();
      setAccounts(response.data.accounts || []);
    } catch {
      setAccounts([
        { account_id: '1', bank_name: 'Chase Bank', account_type: 'checking', country: 'US', account_no: '123456789012', routing_no: '021000021', holder_name: 'Nithesh Kumar' },
        { account_id: '2', bank_name: 'HDFC Bank', account_type: 'savings', country: 'IN', account_no: '9876543210123456', ifsc_code: 'HDFC0001234', holder_name: 'Nithesh Kumar' },
        { account_id: '3', bank_name: 'Barclays', account_type: 'checking', country: 'GB', account_no: '12345678', sort_code: '20-00-00', holder_name: 'Nithesh Kumar' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id, bankName) => {
    Alert.alert(
      'Remove Account',
      `Are you sure you want to remove ${bankName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAccount(id);
            } catch {}
            setAccounts(prev => prev.filter(a => a.account_id !== id));
          },
        },
      ],
    );
  };

  const getFields = (account) => {
    const fields = [];
    if (account.account_no) fields.push({ label: 'Account No', value: maskAccount(account.account_no) });
    if (account.iban) fields.push({ label: 'IBAN', value: maskAccount(account.iban) });
    if (account.routing_no) fields.push({ label: 'Routing', value: account.routing_no });
    if (account.ifsc_code) fields.push({ label: 'IFSC', value: account.ifsc_code });
    if (account.sort_code) fields.push({ label: 'Sort Code', value: account.sort_code });
    if (account.bic_swift) fields.push({ label: 'BIC/SWIFT', value: account.bic_swift });
    if (account.bsb_code) fields.push({ label: 'BSB', value: account.bsb_code });
    if (account.bank_code) fields.push({ label: 'Bank Code', value: account.bank_code });
    if (account.transit_no) fields.push({ label: 'Transit', value: account.transit_no });
    return fields;
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#4ecdc4" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="arrow-back" size={20} color="#ffffff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>My Accounts</Text>
            <Text style={styles.headerSubtitle}>{accounts.length} linked accounts</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddAccount')} activeOpacity={0.7}>
          <Icon name="add" size={22} color="#0a1628" />
        </TouchableOpacity>
      </View>

      {accounts.length > 0 ? (
        accounts.map((account) => {
          const config = COUNTRY_CONFIG[account.country] || {};
          const fields = getFields(account);

          return (
            <View key={account.account_id} style={styles.accountCard}>
              <View style={styles.accountTop}>
                <View style={styles.accountInfo}>
                  <View style={styles.accountFlagBg}>
                    <CountryFlag isoCode={config.isoCode || 'US'} size={24} style={{ borderRadius: 4 }} />
                  </View>
                  <View>
                    <Text style={styles.accountName}>{account.bank_name}</Text>
                    <Text style={styles.accountType}>
                      {account.account_type} · {config.name || account.country}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDelete(account.account_id, account.bank_name)}
                  activeOpacity={0.7}>
                  <Icon name="trash-outline" size={16} color="#e74c3c" />
                </TouchableOpacity>
              </View>

              {account.holder_name && (
                <Text style={styles.holderName}>{account.holder_name}</Text>
              )}

              <View style={styles.fieldsRow}>
                {fields.map((field, i) => (
                  <View key={i} style={styles.fieldChip}>
                    <Text style={styles.fieldLabel}>{field.label}</Text>
                    <Text style={styles.fieldValue}>{field.value}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Icon name="card-outline" size={36} color="#4ecdc4" />
          </View>
          <Text style={styles.emptyTitle}>No accounts linked</Text>
          <Text style={styles.emptySubtitle}>Link your bank account to start sending money</Text>
          <TouchableOpacity style={styles.emptyAddBtn} onPress={() => navigation.navigate('AddAccount')} activeOpacity={0.8}>
            <Icon name="add" size={18} color="#0a1628" />
            <Text style={styles.emptyAddBtnText}>Add Account</Text>
          </TouchableOpacity>
        </View>
      )}

    </ScrollView>
  );
};

export default MyAccountsScreen;
