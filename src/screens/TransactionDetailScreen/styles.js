import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1628',
  },
  scrollContent: {
    paddingBottom: 40,
  },

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

  // ── Status Card ──
  statusCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    marginBottom: 20,
  },
  statusIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 4,
  },
  statusDate: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
  },

  // ── Amount Card ──
  amountCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 20,
    marginBottom: 16,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  amountLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
  },
  amountValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  amountValueTeal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4ecdc4',
  },
  amountValueRed: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e74c3c',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '900',
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
  cardTitle: {
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

  // ── Share Button ──
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  shareBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
});

export default styles;