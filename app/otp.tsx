import { useState, useRef, useEffect } from 'react';
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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Clock } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';

export default function OTPScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const mobileNumber = params.mobileNumber as string;
  const name = params.name as string;
  const isLogin = params.isLogin === 'true';
  const { login } = useAuth();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    // Start timer on mount
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatMobileNumber = (number: string) => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return number;
  };

  const handleOtpChange = (value: string, index: number) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (value && index === 5) {
      const fullOtp = newOtp.join('');
      if (fullOtp.length === 6) {
        handleVerifyOtp(fullOtp);
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (otpValue?: string) => {
    const otpToVerify = otpValue || otp.join('');

    if (otpToVerify.length !== 6) {
      Alert.alert('Error', 'Please enter the complete 6-digit OTP');
      return;
    }

    try {
      // Prepare user data
      const userData = {
        mobileNumber: mobileNumber,
        name: name || 'User',
        isLogin: isLogin,
      };

      // Call login function to save auth state
      await login(userData);

      // Navigate to home page after successful login
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Failed to complete login. Please try again.');
      console.error('Login error:', error);
    }
  };

  const handleResendOtp = () => {
    if (!canResend) {
      return;
    }

    setTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();

    // Simulate resending OTP
    Alert.alert('Success', 'OTP has been resent to your mobile number');
    
    // Restart timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}>
            <ArrowLeft size={24} color={theme.colors.primary} />
          </TouchableOpacity>

          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>
              We've sent a 6-digit code to
            </Text>
            <Text style={styles.mobileNumber}>
              +1 {formatMobileNumber(mobileNumber || '')}
            </Text>
          </View>

          {/* OTP Input Section */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={[
                  styles.otpInput,
                  digit && styles.otpInputFilled,
                ]}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(nativeEvent.key, index)
                }
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                autoFocus={index === 0}
              />
            ))}
          </View>

          {/* Timer and Resend */}
          <View style={styles.timerContainer}>
            {!canResend ? (
              <View style={styles.timerWrapper}>
                <Clock size={16} color={theme.colors.textSecondary} />
                <Text style={styles.timerText}>
                  Resend OTP in {timer}s
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.resendButton}
                onPress={handleResendOtp}>
                <Text style={styles.resendText}>Resend OTP</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={() => handleVerifyOtp()}>
            <Text style={styles.verifyButtonText}>Verify OTP</Text>
          </TouchableOpacity>

          {/* Change Number */}
          <TouchableOpacity
            style={styles.changeNumberButton}
            onPress={() => router.back()}>
            <Text style={styles.changeNumberText}>Change Mobile Number</Text>
          </TouchableOpacity>
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
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 32,
    zIndex: 1,
    padding: 8,
  },
  header: {
    marginBottom: 48,
    alignItems: 'center',
    marginTop: 40,
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
  mobileNumber: {
    fontSize: 18,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.primary,
    textAlign: 'center',
    marginTop: 8,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 12,
  },
  otpInput: {
    flex: 1,
    height: 64,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.input,
    borderWidth: 2,
    borderColor: theme.colors.surface,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.textPrimary,
  },
  otpInputFilled: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.white,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  timerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timerText: {
    fontSize: 14,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  resendButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resendText: {
    fontSize: 14,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.primary,
  },
  verifyButton: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: theme.radius.button,
    alignItems: 'center',
    justifyContent: 'center',
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
  verifyButtonText: {
    fontSize: 18,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.white,
  },
  changeNumberButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  changeNumberText: {
    fontSize: 14,
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.textSecondary,
  },
});

