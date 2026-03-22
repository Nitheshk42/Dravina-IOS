import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
//     height: 300,
//     backgroundColor: '#0d2240',
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 40,
//   },
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
    paddingBottom: 24,
  },
  logoContainer: {
    width: 200,
    height: 90,
    borderRadius: 16,
    backgroundColor: 'rgba(78,205,196,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    overflow: 'hidden',
  },
  logo: {
    width: 200,
    height: 74,
    borderRadius: 12,
  },
  appName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 4,
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

  // ── Success ──
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f0fff8',
    borderWidth: 1,
    borderColor: '#b2f0d8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  successText: {
    color: '#1a7a6e',
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

  // ── Signup Button ──
  signupBtn: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    backgroundColor: '#1a7a6e',
    shadowColor: '#1a7a6e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
  },
  signupBtnDisabled: {
    backgroundColor: '#ccc',
  },
  signupBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  signupBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  // ── Login Link ──
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#999',
    fontSize: 14,
  },
  loginLink: {
    color: '#0f4c81',
    fontSize: 14,
    fontWeight: '700',
  },

  // ── Features ──
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 28,
    paddingHorizontal: 20,
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  featureText: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 12,
    fontWeight: '600',
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