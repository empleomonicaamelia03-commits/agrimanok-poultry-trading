import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  green: '#1B7F3B',
  greenDark: '#14632D',
  greenSoft: '#E7F5EC',
  blue: '#1E6FE0',
  blueSoft: '#EAF2FF',
  bg: '#F4F6F5',
  card: '#FFFFFF',
  border: '#DADFDC',
  text: '#16211A',
  muted: '#6B766F',
  amberSoft: '#FFF7E0',
  amber: '#8A6A00',
};

type Mode = 'otp' | 'email';

const formatPhone = (digits: string) => {
  const d = digits.slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
};

export default function LoginScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('otp');
  const [phone, setPhone] = useState(''); // raw digits only
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const phoneValid = phone.length === 10 && phone.startsWith('9');
  const emailValid = /\S+@\S+\.\S+/.test(email) && password.length >= 6;

  const handleSendCode = () => {
  if (!phoneValid) {
    Alert.alert('Check your number', 'Enter a 10-digit mobile number starting with 9.');
    return;
  }
  // TODO: call your OTP endpoint, then go to the verify screen
  router.replace('/dashboard' as any);
};

  const handleEmailLogin = () => {
  if (!emailValid) {
    Alert.alert('Check your details', 'Enter a valid email and a password of 6+ characters.');
    return;
  }
  // TODO: call your email/password sign-in
  router.replace('/dashboard' as any);
};

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            {/* Region pill */}
            <View style={styles.regionPill}>
              <View style={styles.regionDot} />
              <Text style={styles.regionText}>MINDANAO BI-REGIONAL CORRIDOR</Text>
            </View>

            {/* Brand */}
            <View style={styles.brand}>
              <View style={styles.logo}>
                <MaterialCommunityIcons name="chicken" size={34} color="#fff" />
              </View>
              <View style={styles.brandRow}>
                <Text style={styles.brandName}>
                  Agri<Text style={styles.brandAccent}>Manok</Text>
                </Text>
                <View style={styles.phBadge}>
                  <Text style={styles.phBadgeText}>PH</Text>
                </View>
              </View>
              <Text style={styles.tagline}>Mindanao Hyperlocal Poultry Marketplace</Text>
              <Text style={styles.cities}>Davao • Bukidnon • Gensan • Cotabato</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
              <Pressable
                onPress={() => setMode('otp')}
                style={[styles.tab, mode === 'otp' && styles.tabActive]}>
                <Text style={[styles.tabTitle, mode === 'otp' && styles.tabTitleActive]}>
                  Mobile OTP
                </Text>
                <Text style={styles.tabSub}>Recommended / GCash</Text>
              </Pressable>
              <Pressable
                onPress={() => setMode('email')}
                style={[styles.tab, mode === 'email' && styles.tabActive]}>
                <Text style={[styles.tabTitle, mode === 'email' && styles.tabTitleActive]}>
                  Email & Password
                </Text>
                <Text style={styles.tabSub}>Registered Farm</Text>
              </Pressable>
            </View>

            {mode === 'otp' ? (
              <View>
                <Text style={styles.label}>Philippine Mobile Number</Text>
                <View style={styles.inputRow}>
                  <View style={styles.prefix}>
                    <Text style={styles.flag}>PH</Text>
                    <Text style={styles.prefixText}>+63</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    value={formatPhone(phone)}
                    onChangeText={(t) => setPhone(t.replace(/\D/g, '').slice(0, 10))}
                    placeholder="912 345 6789"
                    placeholderTextColor="#A3ACA6"
                    keyboardType="number-pad"
                    maxLength={12}
                    returnKeyType="done"
                  />
                  <Ionicons name="phone-portrait-outline" size={20} color={COLORS.muted} />
                </View>
                <View style={styles.hintRow}>
                  <Ionicons name="checkmark-circle-outline" size={14} color={COLORS.green} />
                  <Text style={styles.hint}>Compatible with GCash, Globe, Smart, TNT & DITO</Text>
                </View>

                <Pressable
                  onPress={handleSendCode}
                  style={({ pressed }) => [
                    styles.primaryBtn,
                    pressed && { backgroundColor: COLORS.greenDark },
                  ]}>
                  <Ionicons name="chatbubble-ellipses-outline" size={18} color="#fff" />
                  <Text style={styles.primaryBtnText}>Send Login Code (SMS)</Text>
                </Pressable>
              </View>
            ) : (
              <View>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="farm@example.com"
                    placeholderTextColor="#A3ACA6"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Ionicons name="mail-outline" size={20} color={COLORS.muted} />
                </View>

                <Text style={[styles.label, { marginTop: 12 }]}>Password</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#A3ACA6"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <Pressable onPress={() => setShowPassword((s) => !s)} hitSlop={10}>
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={COLORS.muted}
                    />
                  </Pressable>
                </View>

                <Pressable
                  onPress={() => router.push('/forgot-password' as any)}
                  style={styles.forgot}>
                  <Text style={styles.link}>Forgot password?</Text>
                </Pressable>

                <Pressable
                  onPress={handleEmailLogin}
                  style={({ pressed }) => [
                    styles.primaryBtn,
                    pressed && { backgroundColor: COLORS.greenDark },
                  ]}>
                  <Ionicons name="log-in-outline" size={18} color="#fff" />
                  <Text style={styles.primaryBtnText}>Log In</Text>
                </Pressable>
              </View>
            )}

            {/* Divider */}
            <View style={styles.dividerWrap}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR QUICK CONNECT</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social */}
            <View style={styles.socialRow}>
              <Pressable
                style={[styles.socialBtn, { backgroundColor: COLORS.blueSoft, borderColor: '#BBD5F8' }]}
                onPress={() => Alert.alert('GCash', 'GCash sign-in coming soon.')}>
                <View style={styles.gcashDot}>
                  <Text style={styles.gcashG}>G</Text>
                </View>
                <Text style={[styles.socialText, { color: COLORS.blue }]}>GCash</Text>
              </Pressable>
              <Pressable
                style={styles.socialBtn}
                onPress={() => Alert.alert('Google', 'Google sign-in coming soon.')}>
                <Ionicons name="logo-google" size={18} color="#DB4437" />
                <Text style={styles.socialText}>Google</Text>
              </Pressable>
            </View>

            {/* BAI banner */}
            <View style={styles.bai}>
              <Ionicons name="shield-checkmark" size={20} color={COLORS.green} />
              <View style={{ flex: 1 }}>
                <View style={styles.baiTitleRow}>
                  <Text style={styles.baiTitle}>BAI Biosecurity & Avian Flu Protocol</Text>
                  <View style={styles.verified}>
                    <Text style={styles.verifiedText}>VERIFIED</Text>
                  </View>
                </View>
                <Text style={styles.baiBody}>
                  By logging in, you pledge strict adherence to Bureau of Animal Industry (BAI)
                  health clearances & AI-free poultry transport guidelines in Mindanao.
                </Text>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              New poultry raiser or breeder?{' '}
              <Text style={styles.link} onPress={() => router.push('/register' as any)}>
                Register Farm →
              </Text>
            </Text>
            <View style={styles.freePill}>
              <Ionicons name="checkmark-circle" size={14} color={COLORS.green} />
              <Text style={styles.freeText}>Free BAI Registration Assistance Included</Text>
            </View>
            <Text style={styles.version}>AgriManok Mindanao v2.4 • Davao Agri-Tech Hub</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: 16, paddingBottom: 32 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  regionPill: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.greenSoft,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  regionDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.green },
  regionText: { fontSize: 10, fontWeight: '700', color: COLORS.green, letterSpacing: 0.4 },

  brand: { alignItems: 'center', marginTop: 16, marginBottom: 18 },
  logo: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  brandName: { fontSize: 26, fontWeight: '800', color: COLORS.text },
  brandAccent: { color: COLORS.green },
  phBadge: {
    backgroundColor: COLORS.greenSoft,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  phBadgeText: { fontSize: 10, fontWeight: '800', color: COLORS.green },
  tagline: { marginTop: 4, fontSize: 13, fontWeight: '600', color: COLORS.text },
  cities: { marginTop: 2, fontSize: 11, color: COLORS.muted },

  tabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.bg,
    borderRadius: 12,
    padding: 4,
    gap: 4,
    marginBottom: 16,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 9 },
  tabActive: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabTitle: { fontSize: 13, fontWeight: '600', color: COLORS.muted },
  tabTitleActive: { color: COLORS.text, fontWeight: '700' },
  tabSub: { fontSize: 10, color: COLORS.muted, marginTop: 1 },

  label: { fontSize: 12, fontWeight: '600', color: COLORS.text, marginBottom: 6 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#fff',
  },
  prefix: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  flag: { fontSize: 10, fontWeight: '800', color: COLORS.muted },
  prefixText: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  input: { flex: 1, fontSize: 15, color: COLORS.text, paddingVertical: 0 },
  hintRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 8, marginBottom: 14 },
  hint: { fontSize: 11, color: COLORS.muted },

  forgot: { alignSelf: 'flex-end', marginTop: 8, marginBottom: 14 },
  link: { color: COLORS.green, fontWeight: '700' },

  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.green,
    height: 50,
    borderRadius: 12,
  },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  dividerWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { fontSize: 10, fontWeight: '700', color: COLORS.muted, letterSpacing: 0.6 },

  socialRow: { flexDirection: 'row', gap: 10 },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#fff',
  },
  socialText: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  gcashDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gcashG: { color: '#fff', fontSize: 12, fontWeight: '800' },

  bai: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.greenSoft,
    borderWidth: 1,
    borderColor: '#BFE3CB',
  },
  baiTitleRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6 },
  baiTitle: { fontSize: 12, fontWeight: '800', color: COLORS.text },
  verified: {
    backgroundColor: COLORS.green,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  verifiedText: { color: '#fff', fontSize: 8, fontWeight: '800', letterSpacing: 0.4 },
  baiBody: { fontSize: 11, lineHeight: 16, color: COLORS.muted, marginTop: 4 },

  footer: { alignItems: 'center', marginTop: 20, gap: 10 },
  footerText: { fontSize: 13, color: COLORS.text },
  freePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.greenSoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  freeText: { fontSize: 11, fontWeight: '600', color: COLORS.green },
  version: { fontSize: 10, color: COLORS.muted },
});
