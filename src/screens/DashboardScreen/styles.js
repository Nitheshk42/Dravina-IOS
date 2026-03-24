import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1628',
  },
  scrollContent: {
    paddingBottom: 100,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '500',
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 4,
  },
  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(78,205,196,0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(78,205,196,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4ecdc4',
  },
  profileDropdown: {
    backgroundColor: '#1a2a44',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },

  // ── Section Title ──
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 2,
    marginBottom: 12,
    paddingHorizontal: 20,
  },

  // ── Exchange Rates ──
  ratesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
  },
  ratesUpdated: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.25)',
  },
  ratesList: {
    marginBottom: 4,
  },
  ratesContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  rateCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 14,
    width: 120,
    alignItems: 'center',
  },
  rateCardActive: {
    borderColor: 'rgba(78,205,196,0.3)',
    backgroundColor: 'rgba(78,205,196,0.08)',
  },
  flagImage: {
    borderRadius: 6,
    marginBottom: 8,
  },
  rateCode: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  rateName: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.35)',
    marginBottom: 8,
    textAlign: 'center',
  },
  rateValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4ecdc4',
  },
  rateDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginBottom: 20,
    marginTop: 8,
  },
  rateDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  rateDotActive: {
    backgroundColor: '#4ecdc4',
    width: 16,
    shadowColor: '#4ecdc4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },

  // ── Mini Calculator ──
  calcCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 24,
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
  },
  calcSendRow: {
    marginBottom: 4,
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
  calcReceiveRow: {
    marginBottom: 12,
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
    marginBottom: 16,
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
  calcSendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#4ecdc4',
    paddingVertical: 16,
  },
  calcSendBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0a1628',
  },

  // ── Promo Banners ──
  bannerList: {
    marginBottom: 8,
  },
  bannerContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  bannerCard: {
    width: width - 52,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerBg: {
    padding: 18,
    borderRadius: 16,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 100,
    justifyContent: 'flex-end',
  },
  bannerBgInner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '60%',
    height: '100%',
    borderTopLeftRadius: 60,
    opacity: 0.5,
  },
  bannerIconBg: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  bannerTag: {
    alignSelf: 'flex-start',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 8,
  },
  bannerTagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  bannerDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 24,
    marginTop: 8,
  },
  bannerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  bannerDotActive: {
    backgroundColor: '#4ecdc4',
    width: 20,
    shadowColor: '#4ecdc4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },

  // ── Transfer Limits ──
  limitsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  limitCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 14,
  },
  limitInfo: {},
  limitLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
  },
  limitAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 2,
  },
  limitTotal: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.3)',
    marginTop: 2,
  },

  // ── Monthly Summary ──
  summaryCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 20,
    marginBottom: 24,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryStat: {
    flex: 1,
    alignItems: 'center',
  },
  summaryStatValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 4,
  },
  summaryStatLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
    fontWeight: '500',
  },
  summaryDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  summarySavedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(78,205,196,0.08)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.15)',
  },
  summarySavedText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    flex: 1,
  },

  // ── Footer ──
  footer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: 'center',
  },
  footerDivider: {
    width: 60,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 24,
  },
  footerBrand: {
    fontSize: 22,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 4,
  },
  footerTagline: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.2)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  footerSocials: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  socialBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  footerLink: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.35)',
    fontWeight: '500',
  },
  footerLinkDot: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.15)',
  },
  footerCopyright: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.15)',
  },

  // ── Success Modal ──
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  modalCard: {
    backgroundColor: '#1a2a44',
    borderRadius: 28,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.2)',
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(78,205,196,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  modalAmountCard: {
    backgroundColor: 'rgba(78,205,196,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.2)',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  modalAmountLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  modalAmount: {
    fontSize: 28,
    fontWeight: '900',
    color: '#4ecdc4',
  },
  modalBtn: {
    backgroundColor: '#4ecdc4',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 48,
    marginBottom: 12,
  },
  modalBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0a1628',
  },
  modalDismissHint: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.25)',
  },
});

export default styles;







// import { StyleSheet, Dimensions } from 'react-native';

// const { width } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0a1628',
//   },
//   scrollContent: {
//     paddingBottom: 100,
//   },

//   // ── Header ──
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 60,
//     paddingBottom: 20,
//   },
//   greeting: {
//     fontSize: 13,
//     color: 'rgba(255,255,255,0.4)',
//     fontWeight: '500',
//   },
//   userName: {
//     fontSize: 24,
//     fontWeight: '800',
//     color: '#ffffff',
//     marginTop: 4,
//   },
//   profileBtn: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: 'rgba(78,205,196,0.15)',
//     borderWidth: 1.5,
//     borderColor: 'rgba(78,205,196,0.3)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileInitials: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#4ecdc4',
//   },

//   // ── Profile Dropdown ──
//   profileDropdown: {
//     backgroundColor: '#1a2a44',
//     borderRadius: 16,
//     marginHorizontal: 20,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.1)',
//     overflow: 'hidden',
//   },
//   dropdownItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255,255,255,0.06)',
//   },
//   dropdownText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#ffffff',
//   },

//   // ── Balance Card ──
//   balanceCard: {
//     marginHorizontal: 20,
//     borderRadius: 24,
//     padding: 24,
//     backgroundColor: '#0f4c81',
//     marginBottom: 20,
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   balanceDecor1: {
//     position: 'absolute',
//     top: -20,
//     right: -20,
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: 'rgba(78,205,196,0.1)',
//   },
//   balanceDecor2: {
//     position: 'absolute',
//     bottom: -30,
//     left: -10,
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: 'rgba(255,255,255,0.05)',
//   },
//   balanceLabel: {
//     fontSize: 11,
//     fontWeight: '600',
//     color: 'rgba(255,255,255,0.5)',
//     letterSpacing: 2,
//     marginBottom: 8,
//   },
//   balanceAmount: {
//     fontSize: 38,
//     fontWeight: '900',
//     color: '#ffffff',
//     letterSpacing: -1,
//     marginBottom: 4,
//   },
//   balanceSub: {
//     fontSize: 12,
//     color: 'rgba(255,255,255,0.4)',
//     marginBottom: 20,
//   },
//   balanceBtns: {
//     flexDirection: 'row',
//     gap: 10,
//   },
//   addMoneyBtn: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 6,
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     borderRadius: 14,
//     paddingVertical: 12,
//   },
//   addMoneyText: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#ffffff',
//   },
//   sendMoneyBtn: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 6,
//     backgroundColor: '#4ecdc4',
//     borderRadius: 14,
//     paddingVertical: 12,
//   },
//   sendMoneyText: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#0a1628',
//   },

//   // ── Promo Banners ──
//   bannerList: {
//     marginBottom: 8,
//   },
//   bannerContent: {
//     paddingHorizontal: 20,
//     gap: 12,
//   },
//   bannerCard: {
//     width: width - 52,
//     borderRadius: 16,
//     overflow: 'hidden',
//   },
//   bannerBg: {
//     padding: 18,
//     borderRadius: 16,
//     position: 'relative',
//     overflow: 'hidden',
//     minHeight: 100,
//     justifyContent: 'flex-end',
//   },
//   bannerBgInner: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     width: '60%',
//     height: '100%',
//     borderTopLeftRadius: 60,
//     opacity: 0.5,
//   },
//   bannerIconBg: {
//     position: 'absolute',
//     right: 16,
//     top: 16,
//   },
//   bannerTag: {
//     alignSelf: 'flex-start',
//     borderRadius: 100,
//     paddingHorizontal: 10,
//     paddingVertical: 3,
//     marginBottom: 8,
//   },
//   bannerTagText: {
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1,
//   },
//   bannerTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#ffffff',
//     marginBottom: 4,
//   },
//   bannerSubtitle: {
//     fontSize: 12,
//     color: 'rgba(255,255,255,0.6)',
//   },
//   bannerDots: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 6,
//     marginBottom: 24,
//     marginTop: 8,
//   },
//   bannerDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: 'rgba(255,255,255,0.15)',
//   },
//   bannerDotActive: {
//     backgroundColor: '#4ecdc4',
//     width: 20,
//     shadowColor: '#4ecdc4',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.6,
//     shadowRadius: 6,
//   },

//   // ── Section Title ──
//   sectionTitle: {
//     fontSize: 11,
//     fontWeight: '700',
//     color: 'rgba(255,255,255,0.35)',
//     letterSpacing: 2,
//     marginBottom: 12,
//     paddingHorizontal: 20,
//   },

//   // ── Quick Actions ──
//   quickActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     marginBottom: 24,
//   },
//   quickAction: {
//     alignItems: 'center',
//   },
//   quickActionIcon: {
//     width: 54,
//     height: 54,
//     borderRadius: 18,
//     backgroundColor: 'rgba(78,205,196,0.1)',
//     borderWidth: 1,
//     borderColor: 'rgba(78,205,196,0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   quickActionLabel: {
//     fontSize: 11,
//     color: 'rgba(255,255,255,0.5)',
//     fontWeight: '500',
//   },

//   // ── Transfer Limits ──
//   limitsRow: {
//     flexDirection: 'row',
//     gap: 12,
//     paddingHorizontal: 20,
//     marginBottom: 24,
//   },
//   limitCard: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 16,
//     padding: 14,
//   },
//   limitInfo: {},
//   limitLabel: {
//     fontSize: 11,
//     color: 'rgba(255,255,255,0.4)',
//   },
//   limitAmount: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#ffffff',
//     marginTop: 2,
//   },
//   limitTotal: {
//     fontSize: 10,
//     color: 'rgba(255,255,255,0.3)',
//     marginTop: 2,
//   },

//   // ── Live Exchange Rates ──
//   ratesHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingRight: 20,
//     marginBottom: 0,
//   },
//   ratesUpdated: {
//     fontSize: 10,
//     color: 'rgba(255,255,255,0.25)',
//   },
//   ratesList: {
//     marginBottom: 24,
//   },
//   ratesContent: {
//     paddingHorizontal: 20,
//     gap: 10,
//   },
//   rateCard: {
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 16,
//     padding: 14,
//     width: 120,
//     alignItems: 'center',
//   },
//   flagImage: {
//     borderRadius: 6,
//     marginBottom: 8,
//   },
//   rateCode: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#ffffff',
//     marginBottom: 2,
//   },
//   rateName: {
//     fontSize: 10,
//     color: 'rgba(255,255,255,0.35)',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   rateValue: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: '#4ecdc4',
//   },

//   // ── Referral Banner ──
//   referralCard: {
//     marginHorizontal: 20,
//     borderRadius: 20,
//     padding: 20,
//     backgroundColor: 'rgba(78,205,196,0.08)',
//     borderWidth: 1,
//     borderColor: 'rgba(78,205,196,0.2)',
//     marginBottom: 20,
//   },
//   referralContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 14,
//     marginBottom: 14,
//   },
//   referralTextContainer: {
//     flex: 1,
//   },
//   referralTitle: {
//     fontSize: 16,
//     fontWeight: '800',
//     color: '#ffffff',
//     marginBottom: 4,
//   },
//   referralSubtitle: {
//     fontSize: 12,
//     color: 'rgba(255,255,255,0.5)',
//   },
//   referralBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 8,
//     backgroundColor: '#ffffff',
//     borderRadius: 14,
//     paddingVertical: 12,
//   },
//   referralBtnText: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#0f4c81',
//   },
//   // ── Rate Card Active ──
//   rateCardActive: {
//     borderColor: 'rgba(78,205,196,0.3)',
//     backgroundColor: 'rgba(78,205,196,0.08)',
//   },
//   // ── Rate Dots ──
//   rateDots: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 5,
//     marginBottom: 20,
//     marginTop: 8,
//   },
//   rateDot: {
//     width: 5,
//     height: 5,
//     borderRadius: 3,
//     backgroundColor: 'rgba(255,255,255,0.15)',
//   },
//   rateDotActive: {
//     backgroundColor: '#4ecdc4',
//     width: 16,
//     shadowColor: '#4ecdc4',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.6,
//     shadowRadius: 6,
//   },
// });

// export default styles;