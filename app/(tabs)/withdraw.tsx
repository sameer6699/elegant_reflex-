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
import { ArrowLeft, ArrowDownCircle, Building2, Wallet, Bitcoin, Clock, Check } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import AmountInput from '@/components/ui/AmountInput';
import PaymentMethodCard from '@/components/ui/PaymentMethodCard';
import BalanceCard from '@/components/ui/BalanceCard';

export default function WithdrawScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'bank' | 'ewallet' | 'crypto' | null>(null);
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [ewalletAddress, setEwalletAddress] = useState('');

  // Mock data
  const availableBalance = 1250;
  const minWithdrawal = 25;
  const withdrawalFee = 2.5;
  const withdrawalMethods = [
    { type: 'bank' as const, last4: '5678', isDefault: true },
    { type: 'ewallet' as const, name: 'PayPal', isDefault: false },
    { type: 'crypto' as const, name: 'Bitcoin Wallet', isDefault: false },
  ];

  const handleWithdrawAll = () => {
    const withdrawable = availableBalance - withdrawalFee;
    setAmount(withdrawable.toString());
  };

  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) < minWithdrawal) {
      Alert.alert('Error', `Minimum withdrawal amount is $${minWithdrawal}`);
      return;
    }
    if (parseFloat(amount) > availableBalance) {
      Alert.alert('Error', 'Insufficient balance');
      return;
    }
    if (!selectedMethod) {
      Alert.alert('Error', 'Please select a withdrawal method');
      return;
    }

    // Static UI - just show success
    Alert.alert('Success', `Withdrawal request of $${amount} submitted successfully!`, [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  const getProcessingTime = () => {
    switch (selectedMethod) {
      case 'bank':
        return '2-3 business days';
      case 'ewallet':
        return 'Instant';
      case 'crypto':
        return '1-2 hours';
      default:
        return 'N/A';
    }
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
            <ArrowDownCircle size={24} color={theme.colors.primary} />
            <Text style={styles.headerTitle}>Withdraw Money</Text>
          </View>
        </View>

        {/* Available Balance */}
        <View style={styles.content}>
          <BalanceCard
            title="Available Balance"
            amount={availableBalance}
            currency="USD"
            showActions={false}
            subtitle="Ready to withdraw"
          />

          {/* Amount Input */}
          <View style={styles.amountSection}>
            <AmountInput
              value={amount}
              onChange={setAmount}
              currency="USD"
              min={minWithdrawal}
              max={availableBalance}
              quickAmounts={[25, 50, 100, 250, 500]}
              placeholder="Enter withdrawal amount"
            />
            <TouchableOpacity style={styles.withdrawAllButton} onPress={handleWithdrawAll}>
              <Text style={styles.withdrawAllText}>Withdraw All</Text>
            </TouchableOpacity>
          </View>

          {/* Withdrawal Info */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Minimum Withdrawal</Text>
              <Text style={styles.infoValue}>${minWithdrawal}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Withdrawal Fee</Text>
              <Text style={styles.infoValue}>${withdrawalFee}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>You Will Receive</Text>
              <Text style={[styles.infoValue, styles.receiveValue]}>
                ${amount ? (parseFloat(amount) - withdrawalFee).toFixed(2) : '0.00'}
              </Text>
            </View>
          </View>

          {/* Withdrawal Methods */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Withdrawal Method</Text>
            {withdrawalMethods.map((method, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedMethod(method.type)}>
                <PaymentMethodCard
                  type={method.type}
                  last4={method.last4}
                  name={method.name}
                  isDefault={method.isDefault}
                  onSelect={() => setSelectedMethod(method.type)}
                  showActions={false}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Processing Time */}
          {selectedMethod && (
            <View style={styles.processingCard}>
              <Clock size={20} color={theme.colors.primary} />
              <View style={styles.processingInfo}>
                <Text style={styles.processingLabel}>Processing Time</Text>
                <Text style={styles.processingValue}>{getProcessingTime()}</Text>
              </View>
            </View>
          )}

          {/* Withdrawal Details Form */}
          {selectedMethod === 'bank' && (
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Bank Account Details</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Account Holder Name</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="John Doe"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={accountName}
                    onChangeText={setAccountName}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Account Number</Text>
                <View style={styles.inputWrapper}>
                  <Building2 size={20} color={theme.colors.textSecondary} style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="1234567890"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={accountNumber}
                    onChangeText={(text) => setAccountNumber(text.replace(/\D/g, ''))}
                    keyboardType="number-pad"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>IFSC / SWIFT Code</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="IFSC0001234"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={ifscCode}
                    onChangeText={(text) => setIfscCode(text.toUpperCase())}
                    autoCapitalize="characters"
                  />
                </View>
              </View>
            </View>
          )}

          {selectedMethod === 'ewallet' && (
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>E-Wallet Details</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>E-Wallet Address / Email</Text>
                <View style={styles.inputWrapper}>
                  <Wallet size={20} color={theme.colors.textSecondary} style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="your@email.com"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={ewalletAddress}
                    onChangeText={setEwalletAddress}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
          )}

          {selectedMethod === 'crypto' && (
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Cryptocurrency Wallet</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Wallet Address</Text>
                <View style={styles.inputWrapper}>
                  <Bitcoin size={20} color={theme.colors.textSecondary} style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={ewalletAddress}
                    onChangeText={setEwalletAddress}
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
          )}

          {/* Withdraw Button */}
          <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
            <Text style={styles.withdrawButtonText}>Request Withdrawal</Text>
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
  amountSection: {
    marginBottom: 20,
  },
  withdrawAllButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  withdrawAllText: {
    fontSize: 14,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.primary,
  },
  infoCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: theme.colors.surface,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.textPrimary,
  },
  receiveValue: {
    fontSize: 18,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.success,
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
  processingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundLight,
    padding: 16,
    borderRadius: theme.radius.card,
    marginBottom: 24,
    gap: 12,
  },
  processingInfo: {
    flex: 1,
  },
  processingLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  processingValue: {
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
  withdrawButton: {
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
  withdrawButtonText: {
    fontSize: 18,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.white,
  },
});

