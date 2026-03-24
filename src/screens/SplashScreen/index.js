import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { getAccessToken } from '../../services/api';
import styles from './styles';

const SplashScreen = ({ navigation }) => {
  // ── Animations ──
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const glowScale = useRef(new Animated.Value(0.8)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const nameOpacity = useRef(new Animated.Value(0)).current;
  const nameTranslateY = useRef(new Animated.Value(20)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  // ── Dot animation ──
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    startAnimation();
  }, []);

  // Dot cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot(prev => (prev + 1) % 3);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const startAnimation = async () => {
    // Phase 1: Logo appears with scale + glow
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(glowOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(glowScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Phase 2: Name slides up + fades in (after 500ms)
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(nameOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(nameTranslateY, {
          toValue: 0,
          friction: 8,
          tension: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);

    // Phase 3: Tagline fades in (after 800ms)
    setTimeout(() => {
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 800);

  
    // Phase 4: Check auth + navigate (after 2200ms)
    setTimeout(async () => {
      try {
        const token = await getAccessToken();
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        const hasPasscode = await AsyncStorage.getItem('userPasscode');

        let destination = 'Login';
        let params = {mode : 'create'};

        if (token && hasPasscode) {
          destination = 'Passcode';
          params = { mode: 'verify' };
        } else if (token && !hasPasscode) {
          destination = 'Passcode';
          params = { mode: 'create' };
        }

        // Fade out entire screen
        Animated.timing(screenOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          navigation.reset({ index: 0, routes: [{ name: destination, params }] });
        });
      } catch {
        Animated.timing(screenOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        });
      }
    }, 2200);
  }

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <View style={styles.content}>

        {/* ── Glowing Logo ── */}
        <Animated.View
          style={[
            styles.logoGlow,
            {
              opacity: glowOpacity,
              transform: [{ scale: glowScale }],
            },
          ]}>
          <Animated.View
            style={[
              styles.logoInner,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
              },
            ]}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="cover"
            />
          </Animated.View>
        </Animated.View>

        {/* ── App Name ── */}
        <Animated.Text
          style={[
            styles.appName,
            {
              opacity: nameOpacity,
              transform: [{ translateY: nameTranslateY }],
            },
          ]}>
          Draviṇa
        </Animated.Text>

        {/* ── Tagline ── */}
        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          Transfer Money, Across Worlds
        </Animated.Text>
      </View>

      {/* ── Animated Dots ── */}
      <View style={styles.dotsRow}>
        {[0, 1, 2].map(i => (
          <View
            key={i}
            style={[styles.dot, activeDot === i && styles.dotActive]}
          />
        ))}
      </View>
    </Animated.View>
  );
};

export default SplashScreen;