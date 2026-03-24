import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1628',
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // ── Header ──
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 2,
  },

  // ── Recipient Card ──
  recipientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 18,
  },
  recipientAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipientAvatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  recipientDetails: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.35)',
    marginTop: 2,
  },
  changeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(78,205,196,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.2)',
  },
  changeBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4ecdc4',
  },

  // ── You Send ──
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 2,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  sendCard: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: 18,
    marginBottom: 10,
  },
  sendLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  sendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyFlag: {
    borderRadius: 4,
    marginRight: 10,
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4ecdc4',
    marginRight: 8,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: 10,
  },
  amountInput: {
    flex: 1,
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    padding: 0,
  },

  // ── Swap ──
  swapContainer: {
    alignItems: 'center',
    marginVertical: 4,
  },
  swapBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(78,205,196,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── They Receive ──
  receiveCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.15)',
    backgroundColor: 'rgba(26,122,110,0.12)',
  },
  receiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  receiveAmount: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -0.5,
    flex: 1,
  },
  receiveCurrency: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  receiveCurrencyCode: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
  },

  // ── Fee Breakdown ──
  feeCard: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  feeLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
  },
  feeValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
  feeValueTeal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4ecdc4',
  },
  feeValueRed: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e74c3c',
  },

  // ── From Account ──
  accountCard: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
  },
  accountLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  accountSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  accountLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  accountIconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(78,205,196,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  accountType: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
    marginTop: 2,
  },

  // ── Continue Button ──
  continueBtn: {
    marginHorizontal: 20,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    backgroundColor: '#4ecdc4',
    shadowColor: '#4ecdc4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    marginBottom: 20,
  },
  continueBtnDisabled: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    shadowOpacity: 0,
  },
  continueBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  continueBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0a1628',
  },
  continueBtnTextDisabled: {
    color: 'rgba(255,255,255,0.25)',
  },
});

export default styles;