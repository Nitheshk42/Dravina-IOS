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

  // ── Summary Card ──
  summaryCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 24,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 20,
  },

  // ── You Send ──
  amountBox: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
  },
  amountLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountCurrency: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  amountCurrencyCode: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  amountValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
  },

  // ── Arrow ──
  arrowContainer: {
    alignItems: 'center',
    marginVertical: 4,
  },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(78,205,196,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── They Receive ──
  receiveBox: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    backgroundColor: 'rgba(26,122,110,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.15)',
  },
  receiveValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
  },

  // ── Breakdown ──
  breakdownTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 14,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  breakdownLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
  },
  breakdownValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
  breakdownValueRed: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e74c3c',
  },
  breakdownValueTeal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4ecdc4',
  },

  // ── Recipient Card ──
  recipientCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 20,
    marginBottom: 16,
  },
  recipientTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  recipientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  recipientAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipientAvatarText: {
    fontSize: 20,
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
    marginBottom: 2,
  },
  recipientDetails: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.35)',
  },

  // ── Account Card ──
  accountCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 20,
    marginBottom: 16,
  },
  accountTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accountIconBg: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(78,205,196,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  accountType: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.35)',
    marginTop: 2,
  },

  // ── Warning ──
  warningCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    backgroundColor: 'rgba(245,158,11,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.2)',
  },
  warningText: {
    fontSize: 13,
    color: 'rgba(245,158,11,0.8)',
    flex: 1,
    lineHeight: 18,
  },

  // ── Buttons ──
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  editBtn: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  editBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  confirmBtn: {
    flex: 2,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#4ecdc4',
    shadowColor: '#4ecdc4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  confirmBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  confirmBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0a1628',
  },
});

export default styles;