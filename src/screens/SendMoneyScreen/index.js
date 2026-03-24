import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getRecipients } from '../../services/api';
import styles from './styles';

const AVATAR_COLORS = ['#0f4c81', '#1a7a6e', '#7c3a12', '#831843', '#2d1a4e', '#b45309', '#1a3a5c'];

const SendMoneyScreen = ({ navigation }) => {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchRecipients();
  }, []);

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

  const filteredRecipients = recipients.filter(r =>
    r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favorites = recipients.slice(0, 5); // Top 5 as favorites

  const handleSelectRecipient = (recipient) => {
    navigation.navigate('SendAmount', { recipient });
  };

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
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="arrow-back" size={20} color="#ffffff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Send Money</Text>
            <Text style={styles.headerSubtitle}>Choose who to send to</Text>
          </View>
        </View>
      </View>

      {/* ── SEND AGAIN (FAVORITES) ── */}
      {favorites.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>SEND AGAIN</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.favoritesList}
            contentContainerStyle={styles.favoritesContent}>
            {/* Add New */}
            <TouchableOpacity style={styles.favoriteItem} activeOpacity={0.7}>
              <View style={styles.favoriteAddBtn}>
                <Icon name="add" size={24} color="#4ecdc4" />
              </View>
              <Text style={styles.favoriteName}>Add New</Text>
            </TouchableOpacity>
            {/* Favorites */}
            {favorites.map((person, i) => (
              <TouchableOpacity
                key={person.id}
                style={styles.favoriteItem}
                activeOpacity={0.7}
                onPress={() => handleSelectRecipient(person)}>
                <View style={[styles.favoriteAvatar, { backgroundColor: getColor(i) }]}>
                  <Text style={styles.favoriteAvatarText}>{getInitial(person.fullName)}</Text>
                </View>
                <Text style={styles.favoriteName} numberOfLines={1}>
                  {person.fullName.split(' ')[0]}
                </Text>
                <Text style={styles.favoriteCountry} numberOfLines={1}>
                  {person.country}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      {/* ── SEARCH ── */}
      <Text style={styles.sectionTitle}>ALL RECIPIENTS</Text>
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

      {/* ── RECIPIENT LIST ── */}
      {filteredRecipients.length > 0 ? (
        <View style={styles.recipientsList}>
          {filteredRecipients.map((recipient, i) => (
            <TouchableOpacity
              key={recipient.id}
              style={[styles.recipientItem, i < filteredRecipients.length - 1 && styles.recipientBorder]}
              activeOpacity={0.7}
              onPress={() => handleSelectRecipient(recipient)}>
              <View style={styles.recipientLeft}>
                <View style={[styles.recipientAvatar, { backgroundColor: getColor(i) }]}>
                  <Text style={styles.recipientAvatarText}>{getInitial(recipient.fullName)}</Text>
                </View>
                <View style={styles.recipientInfo}>
                  <Text style={styles.recipientName}>{recipient.fullName}</Text>
                  <Text style={styles.recipientDetails}>
                    {recipient.country} · {recipient.bankAccount}
                  </Text>
                </View>
              </View>
              <View style={styles.recipientArrow}>
                <Icon name="chevron-forward" size={18} color="rgba(255,255,255,0.25)" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Icon name="people-outline" size={32} color="#4ecdc4" />
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
            <TouchableOpacity style={styles.addRecipientBtn} activeOpacity={0.8}>
              <Icon name="add" size={18} color="#0a1628" />
              <Text style={styles.addRecipientBtnText}>Add Recipient</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

    </ScrollView>
  );
};

export default SendMoneyScreen;