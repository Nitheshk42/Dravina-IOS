import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1628',
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // ── Branding ──
  brandSection: {
    alignItems: 'center',
    paddingTop: 55,
    paddingBottom: 16,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 24,
    backgroundColor: 'rgba(78,205,196,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  logo: {
    width: 114,
    height: 114,
    borderRadius: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -1,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(78,205,196,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.25)',
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 8,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4ecdc4',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4ecdc4',
    letterSpacing: 2,
  },

  // ── Why Dravina ──
  whyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  featureCards: {
    marginBottom: 24,
  },
  featureCardsContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  featureCard: {
    width: 160,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
  },
  featureIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  featureCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },
  featureCardDesc: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    lineHeight: 16,
  },

  // ── Calculator ──
  calcCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 20,
    overflow: 'hidden',
  },
  calcHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
  },
  calcTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  calcBody: {
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  calcLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  calcInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  calcDollar: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    marginRight: 4,
  },
  calcInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    paddingVertical: 10,
  },
  calcUsd: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.4)',
  },
  calcDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    gap: 8,
  },
  calcDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  calcArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(78,205,196,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calcResultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(26,122,110,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.15)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  calcResult: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  calcCurrencyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  calcCurrencyCode: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
  },
  calcFeeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  calcFeeText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.3)',
  },
  calcRateText: {
    fontSize: 11,
    color: '#4ecdc4',
    fontWeight: '600',
  },

  // ── Auth Buttons Card ──
  authCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 24,
    marginBottom: 14,
  },
  authCardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 6,
  },
  authCardSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    marginBottom: 20,
  },
  authButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  loginBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: '#4ecdc4',
  },
  loginBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0a1628',
  },
  signupBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  signupBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },

  // ── Google Card ──
  googleCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 20,
    marginBottom: 20,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 14,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  googleBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333333',
  },

  // ── Footer ──
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.2)',
  },
});

export default styles;