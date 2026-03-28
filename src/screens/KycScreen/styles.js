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
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 4,
  },

  // ── Progress Steps ──
  stepsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 8,
  },
  stepBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  stepBarActive: {
    backgroundColor: '#4ecdc4',
  },
  stepBarDone: {
    backgroundColor: '#4ecdc4',
  },
  stepLabels: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  stepLabel: {
    flex: 1,
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.25)',
    textAlign: 'center',
  },
  stepLabelActive: {
    color: '#4ecdc4',
  },

  // ── Card ──
  card: {
    marginHorizontal: 20,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 24,
    marginBottom: 20,
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'rgba(78,205,196,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
  },

  // ── SSN Input ──
  ssnInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  ssnInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 3,
    textAlign: 'center',
  },
  secureNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 20,
  },
  secureText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.3)',
  },

  // ── Upload Buttons ──
  uploadRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  uploadBtn: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    borderStyle: 'dashed',
    paddingVertical: 30,
    alignItems: 'center',
    gap: 8,
  },
  uploadBtnDone: {
    borderColor: 'rgba(78,205,196,0.3)',
    backgroundColor: 'rgba(78,205,196,0.05)',
    borderStyle: 'solid',
  },
  uploadBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.4)',
  },
  uploadBtnTextDone: {
    color: '#4ecdc4',
  },
  uploadPreview: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },

  // ── Selfie ──
  selfieBtn: {
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    borderStyle: 'dashed',
    paddingVertical: 40,
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  selfieBtnDone: {
    borderColor: 'rgba(78,205,196,0.3)',
    backgroundColor: 'rgba(78,205,196,0.05)',
    borderStyle: 'solid',
  },
  selfieCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selfiePreview: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  selfieText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.4)',
  },

  // ── Verification Result ──
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  resultSuccess: {
    backgroundColor: 'rgba(78,205,196,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.2)',
  },
  resultFail: {
    backgroundColor: 'rgba(231,76,60,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(231,76,60,0.2)',
  },
  resultText: {
    fontSize: 13,
    flex: 1,
  },

  // ── Buttons ──
  nextBtn: {
    marginHorizontal: 20,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    backgroundColor: '#4ecdc4',
    shadowColor: '#4ecdc4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  nextBtnDisabled: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    shadowOpacity: 0,
  },
  nextBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0a1628',
  },
  nextBtnTextDisabled: {
    color: 'rgba(255,255,255,0.25)',
  },

  // ── Error ──
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 20,
    backgroundColor: 'rgba(231,76,60,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(231,76,60,0.2)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 13,
    flex: 1,
  },
});

export default styles;