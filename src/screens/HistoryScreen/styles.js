import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1628',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── Header ──
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 4,
  },

  // ── Summary Cards ──
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    gap: 6,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#4ecdc4',
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.35)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // ── Filter Tabs ──
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  filterTabActive: {
    backgroundColor: 'rgba(78,205,196,0.1)',
    borderColor: 'rgba(78,205,196,0.3)',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.35)',
  },
  filterTextActive: {
    color: '#4ecdc4',
  },

  // ── Transaction List ──
  transactionList: {
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  transactionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },

  // ── Transaction Icon ──
  txIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── Transaction Info ──
  txInfo: {
    flex: 1,
  },
  txTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  txTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  txAmount: {
    fontSize: 15,
    fontWeight: '700',
  },
  txAmountSent: {
    color: '#ffffff',
  },
  txAmountDeposit: {
    color: '#4ecdc4',
  },
  txBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  txDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  txDate: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.3)',
  },
  txTime: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.2)',
  },
  txStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  txStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  txStatus: {
    fontSize: 11,
    fontWeight: '600',
  },
  txReceived: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.25)',
    marginTop: 2,
  },

  // ── Empty State ──
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(78,205,196,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default styles;
