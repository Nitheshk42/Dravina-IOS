import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CountryFlag from 'react-native-country-flag';
import styles from './styles';

const TransferSuccessScreen = ({ navigation, route }) => {
  const data = route?.params;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Success animation sequence
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 8,
          tension: 50,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I just sent ${data?.recipientGets} ${data?.currency} to ${data?.recipient?.fullName} via Dravina! Fast, secure, and only $0.99 fee. Try it: https://dravina.com/download`,
      });
    } catch {}
  };

  const userCurrency = data?.userCurrency || { code: 'USD', isoCode: 'US' };

  return (
    <View style={styles.container}>

      {/* ── SUCCESS ANIMATION ── */}
      <Animated.View style={[styles.successCircle, { transform: [{ scale: scaleAnim }] }]}>
        <Icon name="checkmark" size={48} color="#4ecdc4" />
      </Animated.View>

      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], alignItems: 'center', width: '100%' }}>
        <Text style={styles.title}>Transfer Successful!</Text>
        <Text style={styles.subtitle}>
          Your money is on its way to {data?.recipient?.fullName || 'the recipient'}
        </Text>

        {/* ── DETAILS CARD ── */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Sent to</Text>
            <Text style={styles.detailValue}>{data?.recipient?.fullName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Country</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              {data?.currency && (
                <CountryFlag
                  isoCode={data.currency === 'INR' ? 'IN' : data.currency === 'GBP' ? 'GB' : data.currency === 'EUR' ? 'EU' : data.currency === 'AUD' ? 'AU' : data.currency === 'CAD' ? 'CA' : data.currency === 'SGD' ? 'SG' : 'AE'}
                  size={16}
                  style={{ borderRadius: 3 }}
                />
              )}
              <Text style={styles.detailValue}>{data?.country}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>You sent</Text>
            <Text style={styles.detailValue}>${data?.amount?.toFixed(2)} {userCurrency.code}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Fee</Text>
            <Text style={styles.detailValue}>$0.99</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.totalLabel}>They received</Text>
            <Text style={styles.totalValue}>{data?.recipientGets} {data?.currency}</Text>
          </View>
        </View>

        {/* ── BUTTONS ── */}
        <TouchableOpacity
          style={styles.sendAnotherBtn}
          onPress={() => navigation.navigate('Dashboard')}
          activeOpacity={0.8}>
          <View style={styles.sendAnotherContent}>
            <Icon name="send" size={16} color="#0a1628" />
            <Text style={styles.sendAnotherText}>Send Another</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })}
          activeOpacity={0.7}>
          <View style={styles.homeBtnContent}>
            <Icon name="home-outline" size={18} color="#ffffff" />
            <Text style={styles.homeBtnText}>Back to Home</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.7}>
          <Icon name="share-outline" size={16} color="rgba(255,255,255,0.35)" />
          <Text style={styles.shareBtnText}>Share receipt</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default TransferSuccessScreen;