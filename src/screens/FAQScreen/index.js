import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FAQS = [
  {
    question: 'How much does it cost to send money?',
    answer: 'We charge a flat fee of $0.99 per transfer. No hidden charges, no percentage-based fees. What you see is what you pay.',
  },
  {
    question: 'How long does a transfer take?',
    answer: 'Most transfers are completed within minutes. India and UAE transfers are instant. UK and Europe take 1-2 hours. Australia and Canada take 2-3 hours.',
  },
  {
    question: 'What exchange rate do you use?',
    answer: 'We use the real mid-market exchange rate with zero markup. This is the same rate you see on Google or Reuters. Banks typically add 3-5% markup on top.',
  },
  {
    question: 'Is my money safe?',
    answer: 'Yes. We use 256-bit encryption and are regulated by financial authorities. Your funds are held in segregated accounts and are never mixed with company funds.',
  },
  {
    question: 'Which countries can I send to?',
    answer: 'Currently we support: India, United Kingdom, Europe, Australia, Canada, Singapore, and UAE. We are adding more countries soon.',
  },
  {
    question: 'How do I add a recipient?',
    answer: 'Go to the People tab, tap the + button, fill in their name, country, and bank details. You can then send money to them anytime with just one tap.',
  },
  {
    question: 'Can I cancel a transfer?',
    answer: 'Once a transfer is confirmed, it cannot be cancelled. Please review all details carefully on the confirmation screen before sending.',
  },
  {
    question: 'What is the referral program?',
    answer: 'Invite friends to Dravina and both of you get $25! Share your referral link from the dashboard. There is no limit to how many friends you can refer.',
  },
];

const FAQItem = ({ faq }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      style={[s.faqItem, expanded && s.faqItemExpanded]}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.7}>
      <View style={s.faqHeader}>
        <Text style={s.faqQuestion}>{faq.question}</Text>
        <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={expanded ? '#4ecdc4' : 'rgba(255,255,255,0.3)'}
        />
      </View>
      {expanded && (
        <Text style={s.faqAnswer}>{faq.answer}</Text>
      )}
    </TouchableOpacity>
  );
};

const FAQScreen = ({ navigation }) => {
  return (
    <ScrollView style={s.container} contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <View style={s.headerRow}>
          <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="arrow-back" size={20} color="#ffffff" />
          </TouchableOpacity>
          <View>
            <Text style={s.headerTitle}>FAQ</Text>
            <Text style={s.headerSubtitle}>Frequently asked questions</Text>
          </View>
        </View>
      </View>

      <View style={s.faqList}>
        {FAQS.map((faq, i) => (
          <FAQItem key={i} faq={faq} />
        ))}
      </View>

      <View style={s.contactCard}>
        <Icon name="chatbubble-ellipses-outline" size={28} color="#4ecdc4" />
        <Text style={s.contactTitle}>Still have questions?</Text>
        <Text style={s.contactSubtitle}>Contact us at support@dravina.com</Text>
      </View>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a1628' },
  scrollContent: { paddingBottom: 40 },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  backBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.08)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#ffffff' },
  headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 2 },
  faqList: { marginHorizontal: 20, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', overflow: 'hidden', marginBottom: 20 },
  faqItem: { paddingHorizontal: 18, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  faqItemExpanded: { backgroundColor: 'rgba(78,205,196,0.04)' },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  faqQuestion: { fontSize: 14, fontWeight: '600', color: '#ffffff', flex: 1 },
  faqAnswer: { fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 20, marginTop: 12 },
  contactCard: { marginHorizontal: 20, borderRadius: 20, backgroundColor: 'rgba(78,205,196,0.08)', borderWidth: 1, borderColor: 'rgba(78,205,196,0.2)', padding: 24, alignItems: 'center' },
  contactTitle: { fontSize: 16, fontWeight: '700', color: '#ffffff', marginTop: 12, marginBottom: 4 },
  contactSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.4)' },
});

export default FAQScreen;