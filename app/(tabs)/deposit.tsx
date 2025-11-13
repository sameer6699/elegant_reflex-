import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Wallet, CreditCard, Building2, Wallet as EWallet, Bitcoin, Check } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import AmountInput from '@/components/ui/AmountInput';
import PaymentMethodCard from '@/components/ui/PaymentMethodCard';
import BalanceCard from '@/components/ui/BalanceCard';

export default function DepositScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'bank' | 'ewallet' | 'crypto' | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Mock data
  const currentBalance = 1250;
  const paymentMethods = [
    { type: 'card' as const, last4: '1234', expiry: '12/25', isDefault: true },
    { type: 'bank' as const, last4: '5678', isDefault: false },
    { type: 'ewallet' as const, name: 'PayPal', isDefault: false },
  ];

  const handleDeposit = () => {
    if (!amount || parseFloat(amount) < 10) {
      Alert.alert('Error', 'Please enter a valid amount (minimum $10)');
      return;
    }
    if (!selectedMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }
    if (!agreedToTerms) {
      Alert.alert('Error', 'Please agree to terms and conditions');
      return;
    }

    // Static UI - just show success
    Alert.alert('Success', `Deposit of $${amount} initiated successfully!`, [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 16) return cardNumber;
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
  };

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 4) return cardExpiry;
    if (cleaned.length > 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    return cleaned;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Wallet size={24} color={theme.colors.primary} />
            <Text style={styles.headerTitle}>Add Money</Text>
          </View>
        </View>

        {/* Current Balance */}
        <View style={styles.content}>
          <BalanceCard
            title="Current Balance"
            amount={currentBalance}
            currency="USD"
            showActions={false}
          />

          {/* Amount Input */}
          <AmountInput
            value={amount}
            onChange={setAmount}
            currency="USD"
            min={10}
            max={10000}
            quickAmounts={[10, 25, 50, 100, 250, 500]}
            placeholder="Enter deposit amount"
          />

          {/* Payment Methods */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Payment Method</Text>
            {paymentMethods.map((method, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedMethod(method.type)}>
                <PaymentMethodCard
                  type={method.type}
                  last4={method.last4}
                  expiry={method.expiry}
                  name={method.name}
                  isDefault={method.isDefault}
                  onSelect={() => setSelectedMethod(method.type)}
                  showActions={false}
                />
              </TouchableOpacity>
            ))}

            {/* Add New Method */}
            <TouchableOpacity style={styles.addMethodButton}>
              <Text style={styles.addMethodText}>+ Add New Payment Method</Text>
            </TouchableOpacity>
          </View>

          {/* Payment Details Form */}
          {selectedMethod === 'card' && (
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Card Details</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Card Number</Text>
                <View style={styles.inputWrapper}>
                  <CreditCard size={20} color={theme.colors.textSecondary} style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="1234 5678 9012 3456"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={cardNumber}
                    onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                    keyboardType="number-pad"
                    maxLength={19}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Cardholder Name</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="John Doe"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={cardName}
                    onChangeText={setCardName}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.inputLabel}>Expiry Date</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="MM/YY"
                      placeholderTextColor={theme.colors.textSecondary}
                      value={cardExpiry}
                      onChangeText={(text) => setCardExpiry(formatExpiry(text))}
                      keyboardType="number-pad"
                      maxLength={5}
                    />
                  </View>
                </View>

                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.inputLabel}>CVV</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="123"
                      placeholderTextColor={theme.colors.textSecondary}
                      value={cardCVV}
                      onChangeText={(text) => setCardCVV(text.replace(/\D/g, '').slice(0, 3))}
                      keyboardType="number-pad"
                      maxLength={3}
                      secureTextEntry
                    />
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Terms and Conditions */}
          <TouchableOpacity
            style={styles.termsContainer}
            onPress={() => setAgreedToTerms(!agreedToTerms)}>
            <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
              {agreedToTerms && <Check size={16} color={theme.colors.white} />}
            </View>
            <Text style={styles.termsText}>
              I agree to the Terms and Conditions and Privacy Policy
            </Text>
          </TouchableOpacity>

          {/* Transaction Fee Info */}
          <View style={styles.feeInfo}>
            <Text style={styles.feeText}>Transaction Fee: $0.00</Text>
            <Text style={styles.feeText}>Processing Time: Instant</Text>
          </View>

          {/* Deposit Button */}
          <TouchableOpacity style={styles.depositButton} onPress={handleDeposit}>
            <Text style={styles.depositButtonText}>Deposit ${amount || '0'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.primary,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.textPrimary,
    marginBottom: 16,
  },
  addMethodButton: {
    padding: 16,
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: theme.radius.card,
    borderWidth: 2,
    borderColor: theme.colors.surface,
    borderStyle: 'dashed',
    alignItems: 'center',
    marginTop: 12,
  },
  addMethodText: {
    fontSize: 16,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.primary,
  },
  formSection: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.textPrimary,
    marginBottom: 8,
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
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: theme.fonts.body,
    color: theme.colors.textPrimary,
    paddingVertical: 0,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  feeInfo: {
    backgroundColor: theme.colors.backgroundLight,
    padding: 12,
    borderRadius: theme.radius.input,
    marginBottom: 20,
  },
  feeText: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  depositButton: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: theme.radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  depositButtonText: {
    fontSize: 18,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.white,
  },
});

