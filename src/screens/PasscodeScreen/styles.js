import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1628',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },

  // ── Logo ──
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: 'rgba(78,205,196,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },

  // ── Title ──
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 36,
  },

  // ── Dots ──
  dotsRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 48,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
  },
  dotFilled: {
    backgroundColor: '#4ecdc4',
    borderColor: '#4ecdc4',
    shadowColor: '#4ecdc4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  dotError: {
    backgroundColor: '#e74c3c',
    borderColor: '#e74c3c',
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },

  // ── Number Pad ──
  numPad: {
    width: '100%',
    maxWidth: 280,
  },
  numRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  numBtn: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numBtnPressed: {
    backgroundColor: 'rgba(78,205,196,0.15)',
    borderColor: 'rgba(78,205,196,0.3)',
  },
  numText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#ffffff',
  },
  numSubText: {
    fontSize: 9,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.25)',
    letterSpacing: 2,
    marginTop: 2,
  },
  emptyBtn: {
    width: 75,
    height: 75,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  deleteBtn: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── Error Message ──
  errorText: {
    color: '#e74c3c',
    fontSize: 13,
    fontWeight: '600',
    position: 'absolute',
    bottom: 120,
  },

  // ── Biometric ──
  biometricBtn: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(78,205,196,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.25)',
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  biometricText: {
    color: '#4ecdc4',
    fontSize: 13,
    fontWeight: '600',
  },

  // ── Confirm Title (for create mode) ──
  confirmSubtitle: {
    fontSize: 14,
    color: '#4ecdc4',
    marginBottom: 36,
    fontWeight: '600',
  },
});

export default styles;