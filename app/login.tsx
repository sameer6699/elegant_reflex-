import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Phone } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState('');

  const formatMobileNumber = (text: string) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    
    // Limit to 10 digits (Indian mobile number format)
    if (cleaned.length > 10) {
      return cleaned.slice(0, 10);
    }
    
    // Return as is (Indian numbers are typically 10 digits without formatting)
    return cleaned;
  };

  const handleMobileNumberChange = (text: string) => {
    const formatted = formatMobileNumber(text);
    setMobileNumber(formatted);
  };

  const validateMobileNumber = (number: string): boolean => {
    // Remove formatting characters
    const cleaned = number.replace(/\D/g, '');
    // Check if it's exactly 10 digits
    return cleaned.length === 10;
  };

  const handleVerifyOtp = () => {
    // Mobile number validation
    if (!mobileNumber.trim()) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }

    if (!validateMobileNumber(mobileNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }

    // Navigate to OTP screen with mobile number and login flag
    router.push({
      pathname: '/otp',
      params: {
        mobileNumber: mobileNumber.replace(/\D/g, ''),
        isLogin: 'true',
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in with your mobile number to continue
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.form}>
            {/* Mobile Number Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Phone
                  size={20}
                  color={theme.colors.textSecondary}
                  style={styles.icon}
                />
                <View style={styles.countryCodeContainer}>
                  <Text style={styles.countryCode}>+91</Text>
                </View>
                <TextInput
                  style={styles.mobileInput}
                  placeholder="Enter your mobile number"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={mobileNumber}
                  onChangeText={handleMobileNumberChange}
                  keyboardType="phone-pad"
                  maxLength={10}
                  autoComplete="tel"
                />
              </View>
            </View>

            {/* Verify OTP Button */}
            <TouchableOpacity
              style={styles.verifyOtpButton}
              onPress={handleVerifyOtp}>
              <Text style={styles.verifyOtpButtonText}>Verify OTP</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/signup')}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.input,
    borderWidth: 1,
    borderColor: theme.colors.surface,
    paddingHorizontal: 16,
    height: 56,
  },
  icon: {
    marginRight: 12,
  },
  verifyOtpButton: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: theme.radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  verifyOtpButtonText: {
    fontSize: 18,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.white,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  signUpLink: {
    fontSize: 14,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.primary,
  },
  countryCodeContainer: {
    paddingRight: 8,
    marginRight: 8,
    borderRightWidth: 1,
    borderRightColor: theme.colors.surface,
  },
  countryCode: {
    fontSize: 16,
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.textPrimary,
  },
  mobileInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: theme.fonts.body,
    color: theme.colors.textPrimary,
    paddingVertical: 0,
  },
});

