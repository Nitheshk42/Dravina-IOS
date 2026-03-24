import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
//   // ── Container ──
//   container: {
//     flex: 1,
//     backgroundColor: '#060f1e',
//   },
//   scrollContent: {
//     flexGrow: 1,
//     paddingBottom: 40,
//   },
//   bgTop: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 350,
//     backgroundColor: '#0d2240',
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 40,
//   },
// ── Container ──
  container: {
    flex: 1,
    backgroundColor: '#0a1628',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  bgTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0a1628',
  },

  // ── Branding ──
  brandSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
//     logo: {
//     width: 140,
//     height: 140,
//     borderRadius: 70,
//     marginBottom: 16,
//   },
logoContainer: {
    width: 200,
    height: 120,
    //borderRadius: 24,
    backgroundColor: 'rgba(78,205,196,0.08)',
    //borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    //marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#4ecdc4',
   // shadowOffset: { width: 6, height: 6 },
   // shadowOpacity: 0.15,
   // shadowRadius: 50,
  },
  logo: {
    width: 200,
    height: 150,
    borderRadius: 20,
  },
  appName: {
    fontSize: 36,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(78,205,196,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.25)',
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 16,
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

  // ── Card ──
  card: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 28,
    marginHorizontal: 20,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0f1f3a',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 24,
  },

  // ── Error ──
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff0f0',
    borderWidth: 1,
    borderColor: '#fcc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 13,
    flex: 1,
  },

  // ── Inputs ──
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#888',
    letterSpacing: 2,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ebebeb',
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1a1a2e',
  },
  eyeIcon: {
    padding: 4,
  },

  // ── Login Button ──
  loginBtn: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    backgroundColor: '#0f4c81',
    shadowColor: '#0f4c81',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
  },
  loginBtnDisabled: {
    backgroundColor: '#ccc',
  },
  loginBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  // ── Signup Link ──
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#999',
    fontSize: 14,
  },
  signupLink: {
    color: '#0f4c81',
    fontSize: 14,
    fontWeight: '700',
  },

  // ── Feature Highlights ──
  whyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 12,
  },
  featureCards: {
    marginBottom: 16,
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


  // ── Fee ──
  feeText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  feeBold: {
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '700',
  },
  // ── Divider ──
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ebebeb',
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ccc',
  },

  // ── Google Button ──
  googleBtn: {
    borderWidth: 2,
    borderColor: '#ebebeb',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  googleBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4285F4',
  },
  googleBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },

});

export default styles;