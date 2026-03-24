import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CountryFlag from 'react-native-country-flag';
import { getRecipients, deleteRecipient } from '../../services/api';
import styles from './styles';

const AVATAR_COLORS = ['#0f4c81', '#1a7a6e', '#7c3a12', '#831843', '#2d1a4e', '#b45309', '#1a3a5c'];

const TRANSFER_ICONS = {
  'Myself': 'person-outline',
  'My Family': 'people-outline',
  'Someone Else': 'person-add-outline',
};

const COUNTRY_ISO = {
  'India': 'IN', 'United Kingdom': 'GB', 'Europe': 'EU', 'Germany': 'DE',
  'France': 'FR', 'Australia': 'AU', 'Canada': 'CA', 'Singapore': 'SG',
  'UAE': 'AE', 'United States': 'US',
};

const RecipientsScreen = ({ navigation }) => {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchRecipients();
  }, []);

  // Refresh when screen comes back into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchRecipients();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchRecipients = async () => {
    try {
      const response = await getRecipients();
      setRecipients(response.data.recipients || []);
    } catch {
      // Mock data for UI preview
      setRecipients([
        { id: '1', fullName: 'Mom', country: 'India', bankAccount: '****4521', transferFor: 'My Family' },
        { id: '2', fullName: 'Dad', country: 'India', bankAccount: '****8832', transferFor: 'My Family' },
        { id: '3', fullName: 'Priya Sharma', country: 'United Kingdom', bankAccount: '****7743', transferFor: 'Someone Else' },
        { id: '4', fullName: 'Rahul Kumar', country: 'Canada', bankAccount: '****2290', transferFor: 'Someone Else' },
        { id: '5', fullName: 'Amit Patel', country: 'India', bankAccount: '****6612', transferFor: 'Myself' },
        { id: '6', fullName: 'Sarah Johnson', country: 'Australia', bankAccount: '****1198', transferFor: 'Someone Else' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id, name) => {
    Alert.alert(
      'Remove Recipient',
      `Are you sure you want to remove ${name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            setDeletingId(id);
            try {
              await deleteRecipient(id);
              setRecipients(prev => prev.filter(r => r.id !== id));
            } catch {
              // For mock data, just remove locally
              setRecipients(prev => prev.filter(r => r.id !== id));
            }
            setDeletingId(null);
          },
        },
      ],
    );
  };

  const handleSend = (recipient) => {
    navigation.navigate('SendAmount', { recipient });
  };

  const handleEdit = (recipient) => {
    navigation.navigate('EditRecipient', { recipient });
  };

  const filteredRecipients = recipients.filter(r =>
    r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitial = (name) => name.charAt(0).toUpperCase();
  const getColor = (index) => AVATAR_COLORS[index % AVATAR_COLORS.length];

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#4ecdc4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── HEADER ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Recipients</Text>
            <Text style={styles.headerSubtitle}>{recipients.length} saved recipients</Text>
          </View>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => navigation.navigate('AddRecipient')}
            activeOpacity={0.7}>
            <Icon name="add" size={22} color="#0a1628" />
          </TouchableOpacity>
        </View>

        {/* ── SEARCH ── */}
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={18} color="rgba(255,255,255,0.4)" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or country..."
            placeholderTextColor="rgba(255,255,255,0.25)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity style={styles.searchClear} onPress={() => setSearchQuery('')}>
              <Icon name="close-circle" size={18} color="rgba(255,255,255,0.3)" />
            </TouchableOpacity>
          )}
        </View>

        {/* ── RECIPIENTS LIST ── */}
        {filteredRecipients.length > 0 ? (
          <View style={styles.recipientsList}>
            {filteredRecipients.map((recipient, i) => (
              <View
                key={recipient.id}
                style={[styles.recipientItem, i < filteredRecipients.length - 1 && styles.recipientBorder]}>
                <TouchableOpacity
                  style={styles.recipientMain}
                  onPress={() => handleSend(recipient)}
                  activeOpacity={0.7}>
                  <View style={[styles.recipientAvatar, { backgroundColor: getColor(i) }]}>
                    <Text style={styles.recipientAvatarText}>{getInitial(recipient.fullName)}</Text>
                  </View>
                  <View style={styles.recipientInfo}>
                    <Text style={styles.recipientName}>{recipient.fullName}</Text>
                    <View style={styles.recipientDetailsRow}>
                      {COUNTRY_ISO[recipient.country] && (
                        <CountryFlag isoCode={COUNTRY_ISO[recipient.country]} size={12} style={{ borderRadius: 2 }} />
                      )}
                      <Text style={styles.recipientDetails}>
                        {recipient.country} · {recipient.bankAccount}
                      </Text>
                    </View>
                    <View style={styles.transferTypeRow}>
                      <Icon
                        name={TRANSFER_ICONS[recipient.transferFor] || 'person-outline'}
                        size={12}
                        color="rgba(255,255,255,0.25)"
                      />
                      <Text style={styles.transferType}>{recipient.transferFor}</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Actions */}
                <View style={styles.recipientActions}>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleSend(recipient)}
                    activeOpacity={0.7}>
                    <Icon name="send-outline" size={16} color="#4ecdc4" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleEdit(recipient)}
                    activeOpacity={0.7}>
                    <Icon name="create-outline" size={16} color="#60a5fa" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleDelete(recipient.id, recipient.fullName)}
                    activeOpacity={0.7}>
                    {deletingId === recipient.id ? (
                      <ActivityIndicator size="small" color="#e74c3c" />
                    ) : (
                      <Icon name="trash-outline" size={16} color="#e74c3c" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Icon name="people-outline" size={36} color="#4ecdc4" />
            </View>
            <Text style={styles.emptyTitle}>
              {searchQuery ? 'No results found' : 'No recipients yet'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery
                ? `No recipients match "${searchQuery}"`
                : 'Add your first recipient to start sending money'}
            </Text>
            {!searchQuery && (
              <TouchableOpacity
                style={styles.emptyAddBtn}
                onPress={() => navigation.navigate('AddRecipient')}
                activeOpacity={0.8}>
                <Icon name="add" size={18} color="#0a1628" />
                <Text style={styles.emptyAddBtnText}>Add Recipient</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

      </ScrollView>
    </View>
  );
};

export default RecipientsScreen;