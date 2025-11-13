import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { DollarSign } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  currency?: string;
  min?: number;
  max?: number;
  quickAmounts?: number[];
  placeholder?: string;
}

export default function AmountInput({
  value,
  onChange,
  currency = 'USD',
  min = 10,
  max = 10000,
  quickAmounts = [10, 25, 50, 100, 250, 500],
  placeholder = 'Enter amount',
}: AmountInputProps) {
  const [customAmount, setCustomAmount] = useState('');

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleQuickAmount = (amount: number) => {
    onChange(amount.toString());
    setCustomAmount('');
  };

  const handleCustomAmount = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned === '') {
      setCustomAmount('');
      onChange('');
      return;
    }
    const numValue = parseInt(cleaned, 10);
    if (numValue >= min && numValue <= max) {
      setCustomAmount(cleaned);
      onChange(cleaned);
    } else if (numValue < min) {
      setCustomAmount(cleaned);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Amount</Text>
      
      {/* Quick Amount Buttons */}
      <View style={styles.quickAmountsContainer}>
        {quickAmounts.map((amount) => (
          <TouchableOpacity
            key={amount}
            style={[
              styles.quickAmountButton,
              value === amount.toString() && styles.quickAmountButtonActive,
            ]}
            onPress={() => handleQuickAmount(amount)}>
            <Text
              style={[
                styles.quickAmountText,
                value === amount.toString() && styles.quickAmountTextActive,
              ]}>
              {formatCurrency(amount)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom Amount Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <DollarSign size={20} color={theme.colors.textSecondary} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textSecondary}
            value={customAmount}
            onChangeText={handleCustomAmount}
            keyboardType="number-pad"
            maxLength={6}
          />
          <Text style={styles.currency}>{currency}</Text>
        </View>
        <View style={styles.limitsContainer}>
          <Text style={styles.limitText}>Min: {formatCurrency(min)}</Text>
          <Text style={styles.limitText}>Max: {formatCurrency(max)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.textPrimary,
    marginBottom: 12,
  },
  quickAmountsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  quickAmountButton: {
    flex: 1,
    minWidth: '30%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.button,
    borderWidth: 2,
    borderColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickAmountButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  quickAmountText: {
    fontSize: 14,
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.textPrimary,
  },
  quickAmountTextActive: {
    color: theme.colors.white,
    fontFamily: theme.fonts.bodySemiBold,
  },
  inputContainer: {
    marginTop: 8,
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
    fontSize: 18,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.textPrimary,
    paddingVertical: 0,
  },
  currency: {
    fontSize: 14,
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.textSecondary,
    marginLeft: 8,
  },
  limitsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  limitText: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
});

