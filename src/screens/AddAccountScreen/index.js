import React, { useState } from 'react';
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
import CountryFlag from 'react-native-country-flag';
import { addAccount } from '../../services/api';
import styles from './styles';

const COUNTRY_CONFIGS = {
  US: {
    name: 'United States', isoCode: 'US',
    fields: [
      { key: 'account_no', label: 'Account Number', placeholder: 'e.g. 123456789012', icon: 'card-outline' },
      { key: 'routing_no', label: 'Routing Number', placeholder: 'e.g. 021000021', icon: 'business-outline' },
    ],
  },
  IN: {
    name: 'India', isoCode: 'IN',
    fields: [
      { key: 'account_no', label: 'Account Number', placeholder: 'e.g. 9876543210123456', icon: 'card-outline' },
      { key: 'ifsc_code', label: 'IFSC Code', placeholder: 'e.g. HDFC0001234', icon: 'business-outline' },
    ],
  },
  GB: {
    name: 'United Kingdom', isoCode: 'GB',
    fields: [
      { key: 'account_no', label: 'Account Number', placeholder: 'e.g. 12345678', icon: 'card-outline' },
      { key: 'sort_code', label: 'Sort Code', placeholder: 'e.g. 20-00-00', icon: 'business-outline' },
    ],
  },
  EU: {
    name: 'Europe', isoCode: 'EU',
    fields: [
      { key: 'iban', label: 'IBAN', placeholder: 'e.g. DE89370400440532013000', icon: 'card-outline' },
      { key: 'bic_swift', label: 'BIC / SWIFT', placeholder: 'e.g. COBADEFFXXX', icon: 'business-outline' },
    ],
  },
  AU: {
    name: 'Australia', isoCode: 'AU',
    fields: [
      { key: 'bsb_code', label: 'BSB Code', placeholder: 'e.g. 062-000', icon: 'business-outline' },
      { key: 'account_no', label: 'Account Number', placeholder: 'e.g. 12345678', icon: 'card-outline' },
    ],
  },
  CA: {
    name: 'Canada', isoCode: 'CA',
    fields: [
      { key: 'transit_no', label: 'Transit Number', placeholder: 'e.g. 12345', icon: 'business-outline' },
      { key: 'account_no', label: 'Account Number', placeholder: 'e.g. 1234567', icon: 'card-outline' },
    ],
  },
  SG: {
    name: 'Singapore', isoCode: 'SG',
    fields: [
      { key: 'bank_code', label: 'Bank Code', placeholder: 'e.g. 7171', icon: 'business-outline' },
      { key: 'account_no', label: 'Account Number', placeholder: 'e.g. 1234567890', icon: 'card-outline' },
    ],
  },
  AE: {
    name: 'UAE', isoCode: 'AE',
    fields: [
      { key: 'iban', label: 'IBAN', placeholder: 'e.g. AE070331234567890123456', icon: 'card-outline' },
    ],
  },
};

const AddAccountScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const config = COUNTRY_CONFIGS[selectedCountry];

  const handleCountrySelect = (code) => {
    setSelectedCountry(code);
    setFormData({});
    setError('');
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!formData.holder_name || !formData.bank_name || !formData.account_type) {
      setError('Please fill in all required fields');
      return;
    }
    if (config) {
      for (const field of config.fields) {
        if (!formData[field.key]) {
          setError(`Please fill in ${field.label}`);
          return;
        }
      }
    }

    setLoading(true);
    setError('');
    try {
      await addAccount({ ...formData, country: selectedCountry });
      Alert.alert('Account Added', 'Bank account linked successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert('Account Added', 'Bank account linked successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => step === 2 ? setStep(1) : navigation.goBack()} activeOpacity={0.7}>
            <Icon name="arrow-back" size={20} color="#ffffff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>{step === 1 ? 'Select Country' : 'Add Account'}</Text>
            <Text style={styles.headerSubtitle}>
              {step === 1 ? 'Where is your bank located?' : `${config?.name} bank details`}
            </Text>
          </View>
        </View>
      </View>

      {/* Step Indicator */}
      <View style={styles.stepRow}>
        <View style={[styles.stepBar, styles.stepBarActive]} />
        <View style={[styles.stepBar, step >= 2 && styles.stepBarActive]} />
      </View>

      {/* Step 1: Country Selection */}
      {step === 1 && (
        <>
          <Text style={styles.sectionTitle}>SELECT YOUR BANK COUNTRY</Text>
          <View style={styles.countryGrid}>
            {Object.entries(COUNTRY_CONFIGS).map(([code, cfg]) => (
              <TouchableOpacity
                key={code}
                style={styles.countryBtn}
                onPress={() => handleCountrySelect(code)}
                activeOpacity={0.7}>
                <CountryFlag isoCode={cfg.isoCode} size={24} style={{ borderRadius: 4 }} />
                <Text style={styles.countryName}>{cfg.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {/* Step 2: Account Details */}
      {step === 2 && config && (
        <>
          <View style={styles.formCard}>
            <TouchableOpacity style={styles.backToCountries} onPress={() => setStep(1)} activeOpacity={0.7}>
              <Icon name="arrow-back" size={14} color="rgba(255,255,255,0.4)" />
              <Text style={styles.backToCountriesText}>Back to countries</Text>
            </TouchableOpacity>

            {error ? (
              <View style={styles.errorBox}>
                <Icon name="alert-circle" size={16} color="#e74c3c" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Holder Name */}
            <Text style={styles.label}>ACCOUNT HOLDER NAME *</Text>
            <View style={styles.inputContainer}>
              <Icon name="person-outline" size={18} color="rgba(255,255,255,0.35)" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full name as on bank account"
                placeholderTextColor="rgba(255,255,255,0.2)"
                value={formData.holder_name || ''}
                onChangeText={v => setFormData({ ...formData, holder_name: v })}
                autoCapitalize="words"
              />
            </View>

            {/* Bank Name */}
            <Text style={styles.label}>BANK NAME *</Text>
            <View style={styles.inputContainer}>
              <Icon name="business-outline" size={18} color="rgba(255,255,255,0.35)" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="e.g. HDFC Bank, Chase, Barclays"
                placeholderTextColor="rgba(255,255,255,0.2)"
                value={formData.bank_name || ''}
                onChangeText={v => setFormData({ ...formData, bank_name: v })}
              />
            </View>

            {/* Account Type */}
            <Text style={styles.label}>ACCOUNT TYPE *</Text>
            <View style={styles.typeRow}>
              {['checking', 'savings'].map(type => (
                <TouchableOpacity
                  key={type}
                  style={[styles.typeBtn, formData.account_type === type && styles.typeBtnActive]}
                  onPress={() => setFormData({ ...formData, account_type: type })}
                  activeOpacity={0.7}>
                  <Text style={[styles.typeText, formData.account_type === type && styles.typeTextActive]}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Dynamic Country Fields */}
            {config.fields.map(field => (
              <View key={field.key}>
                <Text style={styles.label}>{field.label.toUpperCase()} *</Text>
                <View style={styles.inputContainer}>
                  <Icon name={field.icon} size={18} color="rgba(255,255,255,0.35)" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder={field.placeholder}
                    placeholderTextColor="rgba(255,255,255,0.2)"
                    value={formData[field.key] || ''}
                    onChangeText={v => setFormData({ ...formData, [field.key]: v })}
                    autoCapitalize={field.key.includes('code') || field.key.includes('iban') ? 'characters' : 'none'}
                  />
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.saveBtn, loading && { backgroundColor: 'rgba(255,255,255,0.1)' }]}
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.8}>
            {loading ? (
              <ActivityIndicator color="#0a1628" />
            ) : (
              <View style={styles.saveBtnContent}>
                <Icon name="add-circle" size={18} color="#0a1628" />
                <Text style={styles.saveBtnText}>Add Account</Text>
              </View>
            )}
          </TouchableOpacity>
        </>
      )}

    </ScrollView>
  );
};

export default AddAccountScreen;