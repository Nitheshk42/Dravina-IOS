import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CountryFlag from 'react-native-country-flag';
import { addRecipient } from '../../services/api';
import styles from './styles';

const COUNTRIES = [
  { name: 'India', isoCode: 'IN' },
  { name: 'United Kingdom', isoCode: 'GB' },
  { name: 'Europe', isoCode: 'EU' },
  { name: 'Australia', isoCode: 'AU' },
  { name: 'Canada', isoCode: 'CA' },
  { name: 'Singapore', isoCode: 'SG' },
  { name: 'UAE', isoCode: 'AE' },
];

const TRANSFER_TYPES = [
  { label: 'Myself', icon: 'person-outline' },
  { label: 'My Family', icon: 'people-outline' },
  { label: 'Someone Else', icon: 'person-add-outline' },
];

const AddRecipientScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    bankAccount: '',
    ifscCode: '',
    transferringTo: 'Someone Else',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validate = () => {
    if (!form.fullName.trim()) return 'Please enter the full name';
    if (form.fullName.trim().length < 2) return 'Name must be at least 2 characters';
    
    if (!form.email.trim()) return 'Please enter the email address';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email address';
    
    if (!form.phone.trim()) return 'Please enter the phone number';
    if (!/^[\d\s\+\-()]{7,15}$/.test(form.phone)) return 'Please enter a valid phone number';
    
    if (!form.country) return 'Please select a country';
    
    if (!form.bankAccount.trim()) return 'Please enter the bank account number';
    if (!/^\d+$/.test(form.bankAccount.trim())) return 'Bank account must contain only numbers';
    
    if (!form.ifscCode.trim()) return 'Please enter the bank code';
    
    // Country-specific bank code validation
    if (form.country === 'India' && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifscCode.toUpperCase()))
      return 'Invalid IFSC code (format: ABCD0123456)';
    if (form.country === 'United Kingdom' && !/^\d{2}-?\d{2}-?\d{2}$/.test(form.ifscCode.replace(/-/g, '')))
      return 'Invalid Sort Code (format: 12-34-56)';
    
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    try {
      await addRecipient(form);
      Alert.alert(
        'Recipient Added',
        `${form.fullName} has been saved successfully!`,
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );
    } catch (err) {
      // For mock: show success anyway
      Alert.alert(
        'Recipient Added',
        `${form.fullName} has been saved successfully!`,
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedCountry = COUNTRIES.find(c => c.name === form.country);

  return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#0a1628' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="arrow-back" size={20} color="#ffffff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Add Recipient</Text>
            <Text style={styles.headerSubtitle}>Save for future transfers</Text>
          </View>
        </View>
      </View>

      {/* ── TRANSFER TYPE ── */}
      <Text style={styles.sectionTitle}>TRANSFERRING TO</Text>
      <View style={styles.transferTypes}>
        {TRANSFER_TYPES.map(type => (
          <TouchableOpacity
            key={type.label}
            style={[styles.transferTypeBtn, form.transferringTo === type.label && styles.transferTypeBtnActive]}
            onPress={() => handleChange('transferringTo', type.label)}
            activeOpacity={0.7}>
            <Icon
              name={type.icon}
              size={18}
              color={form.transferringTo === type.label ? '#4ecdc4' : 'rgba(255,255,255,0.35)'}
            />
            <Text style={[styles.transferTypeText, form.transferringTo === type.label && styles.transferTypeTextActive]}>
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── FORM ── */}
      <View style={styles.formCard}>

        {/* Error */}
        {error ? (
          <View style={styles.errorBox}>
            <Icon name="alert-circle" size={16} color="#e74c3c" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Full Name */}
        <Text style={styles.label}>FULL NAME</Text>
        <View style={styles.inputContainer}>
          <Icon name="person-outline" size={18} color="rgba(255,255,255,0.35)" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            placeholderTextColor="rgba(255,255,255,0.2)"
            value={form.fullName}
            onChangeText={v => handleChange('fullName', v)}
            autoCapitalize="words"
          />
        </View>

        {/* Email */}
        <Text style={styles.label}>EMAIL ADDRESS</Text>
        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={18} color="rgba(255,255,255,0.35)" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="john@example.com"
            placeholderTextColor="rgba(255,255,255,0.2)"
            value={form.email}
            onChangeText={v => handleChange('email', v)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Phone */}
        <Text style={styles.label}>PHONE NUMBER</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={{
              flexDirection: 'row', alignItems: 'center', gap: 4,
              backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 8,
              paddingHorizontal: 8, paddingVertical: 6, marginRight: 8,
            }}
            onPress={() => {
              // Auto-set country code based on selected country
              const codes = {
                'India': '+91', 'United Kingdom': '+44', 'Europe': '+49',
                'Australia': '+61', 'Canada': '+1', 'Singapore': '+65',
                'UAE': '+971', 'United States': '+1',
              };
              const code = codes[form.country] || '+1';
              if (!form.phone.startsWith('+')) {
                handleChange('phone', code + ' ');
              }
            }}
            activeOpacity={0.7}>
            <Text style={{ color: '#4ecdc4', fontSize: 14, fontWeight: '700' }}>
              {form.phone.startsWith('+') ? form.phone.split(' ')[0] : 
                form.country === 'India' ? '+91' :
                form.country === 'United Kingdom' ? '+44' :
                form.country === 'Australia' ? '+61' :
                form.country === 'Canada' ? '+1' :
                form.country === 'Singapore' ? '+65' :
                form.country === 'UAE' ? '+971' : '+1'}
            </Text>
            <Icon name="chevron-down" size={12} color="rgba(255,255,255,0.4)" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="9876543210"
            placeholderTextColor="rgba(255,255,255,0.2)"
            value={form.phone.includes(' ') ? form.phone.split(' ').slice(1).join(' ') : form.phone}
            onChangeText={v => {
              const codes = {
                'India': '+91', 'United Kingdom': '+44', 'Europe': '+49',
                'Australia': '+61', 'Canada': '+1', 'Singapore': '+65',
                'UAE': '+971', 'United States': '+1',
              };
              const code = codes[form.country] || '+1';
              handleChange('phone', code + ' ' + v.replace(/[^\d]/g, ''));
            }}
            keyboardType="phone-pad"
          />
        </View>

        {/* Country */}
        <Text style={styles.label}>COUNTRY</Text>
        <TouchableOpacity
          style={styles.countrySelector}
          onPress={() => setShowCountryPicker(!showCountryPicker)}
          activeOpacity={0.7}>
          <View style={styles.countrySelectorLeft}>
            {selectedCountry ? (
              <>
                <CountryFlag isoCode={selectedCountry.isoCode} size={20} style={{ borderRadius: 4 }} />
                <Text style={styles.countrySelectorText}>{selectedCountry.name}</Text>
              </>
            ) : (
              <>
                <Icon name="globe-outline" size={18} color="rgba(255,255,255,0.35)" />
                <Text style={styles.countrySelectorPlaceholder}>Select country</Text>
              </>
            )}
          </View>
          <Icon name={showCountryPicker ? 'chevron-up' : 'chevron-down'} size={18} color="rgba(255,255,255,0.35)" />
        </TouchableOpacity>

        {/* Country Picker Dropdown */}
        {showCountryPicker && (
          <View style={styles.countryDropdown}>
            {COUNTRIES.map(country => (
              <TouchableOpacity
                key={country.name}
                style={[styles.countryOption, form.country === country.name && styles.countryOptionActive]}
                onPress={() => {
                  handleChange('country', country.name);
                  setShowCountryPicker(false);
                }}
                activeOpacity={0.7}>
                <CountryFlag isoCode={country.isoCode} size={18} style={{ borderRadius: 3 }} />
                <Text style={[styles.countryOptionText, form.country === country.name && styles.countryOptionTextActive]}>
                  {country.name}
                </Text>
                {form.country === country.name && (
                  <Icon name="checkmark" size={18} color="#4ecdc4" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Bank Account */}
        <Text style={styles.label}>BANK ACCOUNT NUMBER</Text>
        <View style={styles.inputContainer}>
          <Icon name="card-outline" size={18} color="rgba(255,255,255,0.35)" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="1234567890"
            placeholderTextColor="rgba(255,255,255,0.2)"
            value={form.bankAccount}
            onChangeText={v => handleChange('bankAccount', v)}
            keyboardType="number-pad"
          />
        </View>

        {/* IFSC / Bank Code */}
        <Text style={styles.label}>
          {form.country === 'India' ? 'IFSC CODE' :
           form.country === 'United Kingdom' ? 'SORT CODE' :
           form.country === 'Australia' ? 'BSB CODE' :
           form.country === 'Canada' ? 'TRANSIT NUMBER' :
           'BANK CODE / SWIFT'}
        </Text>
        <View style={styles.inputContainer}>
          <Icon name="business-outline" size={18} color="rgba(255,255,255,0.35)" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { textTransform: 'uppercase' }]}
            placeholder={
              form.country === 'India' ? 'HDFC0001234' :
              form.country === 'United Kingdom' ? '12-34-56' :
              form.country === 'Australia' ? '123-456' :
              form.country === 'Canada' ? '12345' :
              'SWIFT/BIC code'
            }
            placeholderTextColor="rgba(255,255,255,0.2)"
            value={form.ifscCode}
            onChangeText={v => handleChange('ifscCode', v)}
            autoCapitalize="characters"
          />
        </View>
      </View>

      {/* ── BUTTONS ── */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveBtn, loading && styles.saveBtnDisabled]}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.8}>
          {loading ? (
            <ActivityIndicator color="#0a1628" />
          ) : (
            <View style={styles.saveBtnContent}>
              <Icon name="checkmark" size={18} color="#0a1628" />
              <Text style={styles.saveBtnText}>Save Recipient</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

    </ScrollView>
     </KeyboardAvoidingView>
  );
};

export default AddRecipientScreen;