import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
   KeyboardAvoidingView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  getKycStatus,
  submitKycSsn,
  uploadKycDl,
  uploadKycSelfie,
} from '../../services/api';
import styles from './styles';

const STEPS = ['SSN', 'Driver\'s License', 'Selfie'];

const KycScreen = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // SSN
  const [ssn, setSsn] = useState('');
  const [ssnDone, setSsnDone] = useState(false);

  // DL
  const [dlFront, setDlFront] = useState(null);
  const [dlBack, setDlBack] = useState(null);
  const [idType, setIdType] = useState(null);
  const [dlDone, setDlDone] = useState(false);
  const [dlResult, setDlResult] = useState(null);

  // Selfie
  const [selfie, setSelfie] = useState(null);
  const [selfieDone, setSelfieDone] = useState(false);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const res = await getKycStatus();
      const data = res.data;
      if (data.status === 'verified') {
        navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
        return;
      }
      if (data.ssnCompleted) { setSsnDone(true); setStep(1); }
      if (data.dlCompleted) { setDlDone(true); setStep(2); }
      if (data.selfieCompleted) { setSelfieDone(true); }
    } catch {}
  };

  // ─── SSN FORMATTING ────────────────────────────────────────
  const formatSsn = (value) => {
    const clean = value.replace(/[^\d]/g, '').slice(0, 9);
    if (clean.length <= 3) return clean;
    if (clean.length <= 5) return `${clean.slice(0, 3)}-${clean.slice(3)}`;
    return `${clean.slice(0, 3)}-${clean.slice(3, 5)}-${clean.slice(5)}`;
  };

  const handleSsnChange = (value) => {
    setSsn(formatSsn(value));
    setError('');
  };

  const handleSsnSubmit = async () => {
    const cleanSsn = ssn.replace(/[^\d]/g, '');
    if (cleanSsn.length !== 9) {
      setError('SSN must be exactly 9 digits');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await submitKycSsn({ ssn: cleanSsn });
      setSsnDone(true);
      setStep(1);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save SSN');
    } finally {
      setLoading(false);
    }
  };

  // ─── IMAGE PICKER ──────────────────────────────────────────
  const pickImage = (callback, useCamera = false) => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1200,
      maxHeight: 1200,
    };

    const launcher = useCamera ? launchCamera : launchImageLibrary;
    launcher(options, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        setError(response.errorMessage || 'Failed to pick image');
        return;
      }
      if (response.assets && response.assets[0]) {
        callback(response.assets[0]);
      }
    });
  };

  const showImagePicker = (callback) => {
    Alert.alert('Upload Photo', 'Choose an option', [
      { text: 'Camera', onPress: () => pickImage(callback, true) },
      { text: 'Photo Library', onPress: () => pickImage(callback, false) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  // ─── DL UPLOAD ─────────────────────────────────────────────
  const handleDlSubmit = async () => {
    if (!dlFront || !dlBack) {
      setError('Please upload both front and back of your DL');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('front', {
        uri: dlFront.uri,
        type: dlFront.type || 'image/jpeg',
        name: 'dl_front.jpg',
      });
      formData.append('back', {
        uri: dlBack.uri,
        type: dlBack.type || 'image/jpeg',
        name: 'dl_back.jpg',
      });

      const res = await uploadKycDl(formData);
      setDlResult(res.data);
      setDlDone(res.data.dlVerified);
      if (res.data.dlVerified) {
        setStep(2);
      } else {
        const reason = res.data.rejectionReason || '';
        if (reason.includes('does not match')) {
          setError(`Name mismatch: The name on your DL doesn't match your registered name. Please make sure you signed up with the exact name on your DL, or re-upload a clearer photo.`);
        } else {
          setError('DL verification pending. Please upload clearer photos and try again.');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload DL');
    } finally {
      setLoading(false);
    }
  };

  // ─── SELFIE UPLOAD ─────────────────────────────────────────
  const handleSelfieSubmit = async () => {
    if (!selfie) {
      setError('Please take a selfie');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('selfie', {
        uri: selfie.uri,
        type: selfie.type || 'image/jpeg',
        name: 'selfie.jpg',
      });

      const res = await uploadKycSelfie(formData);
      setSelfieDone(res.data.selfieVerified);
      if (res.data.selfieVerified) {
        Alert.alert(
          'Verification Complete!',
          'Your identity has been verified. You can now send money!',
          [{ text: 'Start Sending', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] }) }],
        );
      } else {
        setError('Face not detected. Please try again with better lighting.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify selfie');
    } finally {
      setLoading(false);
    }
  };

  // ─── RENDER STEPS ──────────────────────────────────────────
  const renderSsnStep = () => (
    <View style={styles.card}>
      <View style={styles.cardIcon}>
        <Icon name="lock-closed" size={28} color="#4ecdc4" />
      </View>
      <Text style={styles.cardTitle}>Social Security Number</Text>
      <Text style={styles.cardSubtitle}>
        Your SSN is required for identity verification. It is encrypted and never stored in plain text.
      </Text>

      <View style={styles.ssnInputRow}>
        <TextInput
          style={styles.ssnInput}
          value={ssn}
          onChangeText={handleSsnChange}
          placeholder="XXX-XX-XXXX"
          placeholderTextColor="rgba(255,255,255,0.2)"
          keyboardType="number-pad"
          maxLength={11}
        />
      </View>

      <View style={styles.secureNotice}>
        <Icon name="shield-checkmark" size={14} color="rgba(255,255,255,0.3)" />
        <Text style={styles.secureText}>256-bit AES encrypted · Never stored as plain text</Text>
      </View>
    </View>
  );

  const renderDlStep = () => (
    <View style={styles.card}>
      <View style={styles.cardIcon}>
        <Icon name="card" size={28} color="#4ecdc4" />
      </View>
      <Text style={styles.cardTitle}>Identity Document</Text>
      <Text style={styles.cardSubtitle}>
        Choose your ID type and upload clear photos of the front and back.
      </Text>

      {/* ID Type Selector */}
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
        <TouchableOpacity
          style={{
            flex: 1, paddingVertical: 14, borderRadius: 14, alignItems: 'center',
            borderWidth: 2,
            borderColor: idType === 'dl' ? 'rgba(78,205,196,0.4)' : 'rgba(255,255,255,0.1)',
            backgroundColor: idType === 'dl' ? 'rgba(78,205,196,0.08)' : 'rgba(255,255,255,0.03)',
          }}
          onPress={() => setIdType('dl')}
          activeOpacity={0.7}>
          <Icon name="car-outline" size={22} color={idType === 'dl' ? '#4ecdc4' : 'rgba(255,255,255,0.35)'} />
          <Text style={{
            fontSize: 13, fontWeight: '700', marginTop: 6,
            color: idType === 'dl' ? '#4ecdc4' : 'rgba(255,255,255,0.35)',
          }}>Driver's License</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1, paddingVertical: 14, borderRadius: 14, alignItems: 'center',
            borderWidth: 2,
            borderColor: idType === 'state_id' ? 'rgba(78,205,196,0.4)' : 'rgba(255,255,255,0.1)',
            backgroundColor: idType === 'state_id' ? 'rgba(78,205,196,0.08)' : 'rgba(255,255,255,0.03)',
          }}
          onPress={() => setIdType('state_id')}
          activeOpacity={0.7}>
          <Icon name="id-card-outline" size={22} color={idType === 'state_id' ? '#4ecdc4' : 'rgba(255,255,255,0.35)'} />
          <Text style={{
            fontSize: 13, fontWeight: '700', marginTop: 6,
            color: idType === 'state_id' ? '#4ecdc4' : 'rgba(255,255,255,0.35)',
          }}>State ID</Text>
        </TouchableOpacity>
      </View>

      {/* Upload buttons — only show after selection */}
      {idType && (
        <>
          <View style={styles.uploadRow}>
            <TouchableOpacity
              style={[styles.uploadBtn, dlFront && styles.uploadBtnDone]}
              onPress={() => showImagePicker(setDlFront)}
              activeOpacity={0.7}>
              {dlFront ? (
                <>
                  <Image source={{ uri: dlFront.uri }} style={styles.uploadPreview} resizeMode="cover" />
                  <Text style={[styles.uploadBtnText, styles.uploadBtnTextDone]}>Front uploaded</Text>
                </>
              ) : (
                <>
                  <Icon name="camera-outline" size={28} color="rgba(255,255,255,0.3)" />
                  <Text style={styles.uploadBtnText}>{idType === 'dl' ? 'DL Front' : 'ID Front'}</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.uploadBtn, dlBack && styles.uploadBtnDone]}
              onPress={() => showImagePicker(setDlBack)}
              activeOpacity={0.7}>
              {dlBack ? (
                <>
                  <Image source={{ uri: dlBack.uri }} style={styles.uploadPreview} resizeMode="cover" />
                  <Text style={[styles.uploadBtnText, styles.uploadBtnTextDone]}>Back uploaded</Text>
                </>
              ) : (
                <>
                  <Icon name="camera-outline" size={28} color="rgba(255,255,255,0.3)" />
                  <Text style={styles.uploadBtnText}>{idType === 'dl' ? 'DL Back' : 'ID Back'}</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {dlResult && (
            <View style={[styles.resultBox, dlResult.dlVerified ? styles.resultSuccess : styles.resultFail]}>
              <Icon
                name={dlResult.dlVerified ? 'checkmark-circle' : 'alert-circle'}
                size={20}
                color={dlResult.dlVerified ? '#4ecdc4' : '#e74c3c'}
              />
              <Text style={[styles.resultText, { color: dlResult.dlVerified ? '#4ecdc4' : '#e74c3c' }]}>
                {dlResult.dlVerified
                  ? `Verified: ${dlResult.dlName || 'Name extracted'}`
                  : dlResult.rejectionReason || 'Verification pending — please ensure photos are clear'}
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );

  const renderSelfieStep = () => (
    <View style={styles.card}>
      <View style={styles.cardIcon}>
        <Icon name="person-circle" size={28} color="#4ecdc4" />
      </View>
      <Text style={styles.cardTitle}>Selfie Verification</Text>
      <Text style={styles.cardSubtitle}>
Take a clear selfie of YOUR face. This must match the person on the ID you uploaded. Using someone else's photo will result in rejection.      </Text>

      <TouchableOpacity
        style={[styles.selfieBtn, selfie && styles.selfieBtnDone]}
        onPress={() => pickImage(setSelfie, true)}
        activeOpacity={0.7}>
        {selfie ? (
          <>
            <Image source={{ uri: selfie.uri }} style={styles.selfiePreview} />
            <Text style={[styles.selfieText, { color: '#4ecdc4' }]}>Selfie captured</Text>
          </>
        ) : (
          <>
            <View style={styles.selfieCircle}>
              <Icon name="camera" size={32} color="rgba(255,255,255,0.3)" />
            </View>
            <Text style={styles.selfieText}>Tap to take selfie</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );

  const canProceed = () => {
    if (step === 0) return ssn.replace(/[^\d]/g, '').length === 9;
    if (step === 1) return idType && dlFront && dlBack;
    if (step === 2) return selfie;
    return false;
  };

  const handleNext = () => {
    if (step === 0) handleSsnSubmit();
    else if (step === 1) handleDlSubmit();
    else if (step === 2) handleSelfieSubmit();
  };

  return (

    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Verify Your Identity</Text>
        <Text style={styles.headerSubtitle}>Complete all steps to start sending money</Text>
      </View>

      {/* ── PROGRESS ── */}
      <View style={styles.stepsRow}>
        {STEPS.map((_, i) => (
          <View key={i} style={[
            styles.stepBar,
            i < step && styles.stepBarDone,
            i === step && styles.stepBarActive,
          ]} />
        ))}
      </View>
      <View style={styles.stepLabels}>
        {STEPS.map((label, i) => (
          <Text key={i} style={[styles.stepLabel, i === step && styles.stepLabelActive]}>
            {label}
          </Text>
        ))}
      </View>

      {/* ── ERROR ── */}
      {error ? (
        <View style={styles.errorBox}>
          <Icon name="alert-circle" size={16} color="#e74c3c" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* ── STEP CONTENT ── */}
      {step === 0 && renderSsnStep()}
      {step === 1 && renderDlStep()}
      {step === 2 && renderSelfieStep()}

      {/* ── NEXT BUTTON ── */}
      <TouchableOpacity
        style={[styles.nextBtn, !canProceed() && styles.nextBtnDisabled]}
        onPress={handleNext}
        disabled={!canProceed() || loading}
        activeOpacity={0.8}>
        {loading ? (
          <ActivityIndicator color="#0a1628" />
        ) : (
          <View style={styles.nextBtnContent}>
            <Text style={[styles.nextBtnText, !canProceed() && styles.nextBtnTextDisabled]}>
              {step === 2 ? 'Complete Verification' : 'Continue'}
            </Text>
            <Icon
              name={step === 2 ? 'checkmark-circle' : 'arrow-forward'}
              size={18}
              color={canProceed() ? '#0a1628' : 'rgba(255,255,255,0.25)'}
            />
          </View>
        )}
      </TouchableOpacity>

    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KycScreen;