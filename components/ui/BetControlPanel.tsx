import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Coins, TrendingUp, Minus, Plus } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface BetControlPanelProps {
  balance: number;
  betAmount: number;
  onBetChange: (amount: number) => void;
  onPlaceBet: () => void;
  multipliers?: number[];
  minBet?: number;
  maxBet?: number;
  isPlaying?: boolean;
}

export default function BetControlPanel({
  balance,
  betAmount,
  onBetChange,
  onPlaceBet,
  multipliers = [1, 2, 5, 10],
  minBet = 1,
  maxBet = 1000,
  isPlaying = false,
}: BetControlPanelProps) {
  const [customMultiplier, setCustomMultiplier] = useState(1);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleBetChange = (delta: number) => {
    const newAmount = Math.max(minBet, Math.min(maxBet, betAmount + delta));
    onBetChange(newAmount);
  };

  const handleMultiplier = (multiplier: number) => {
    const newAmount = Math.min(maxBet, betAmount * multiplier);
    onBetChange(newAmount);
    setCustomMultiplier(multiplier);
  };

  const handleCustomBet = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned === '') {
      onBetChange(minBet);
      return;
    }
    const numValue = parseInt(cleaned, 10);
    const clampedValue = Math.max(minBet, Math.min(maxBet, numValue));
    onBetChange(clampedValue);
  };

  const canPlaceBet = betAmount >= minBet && betAmount <= balance && betAmount <= maxBet;

  return (
    <View style={styles.container}>
      {/* Balance Display */}
      <View style={styles.balanceContainer}>
        <View style={styles.balanceInfo}>
          <Coins size={20} color={theme.colors.success} />
          <Text style={styles.balanceLabel}>Balance</Text>
          <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
        </View>
      </View>

      {/* Bet Amount Control */}
      <View style={styles.betContainer}>
        <Text style={styles.label}>Bet Amount</Text>
        <View style={styles.betInputContainer}>
          <TouchableOpacity
            style={styles.betButton}
            onPress={() => handleBetChange(-10)}
            disabled={betAmount <= minBet}>
            <Minus size={20} color={betAmount <= minBet ? theme.colors.inactive : theme.colors.primary} />
          </TouchableOpacity>
          <View style={styles.betInputWrapper}>
            <TextInput
              style={styles.betInput}
              value={betAmount.toString()}
              onChangeText={handleCustomBet}
              keyboardType="number-pad"
              maxLength={6}
            />
            <Text style={styles.currency}>USD</Text>
          </View>
          <TouchableOpacity
            style={styles.betButton}
            onPress={() => handleBetChange(10)}
            disabled={betAmount >= maxBet || betAmount >= balance}>
            <Plus size={20} color={betAmount >= maxBet || betAmount >= balance ? theme.colors.inactive : theme.colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.betLimits}>
          <Text style={styles.limitText}>Min: {formatCurrency(minBet)}</Text>
          <Text style={styles.limitText}>Max: {formatCurrency(maxBet)}</Text>
        </View>
      </View>

      {/* Multipliers */}
      <View style={styles.multiplierContainer}>
        <Text style={styles.label}>Quick Multipliers</Text>
        <View style={styles.multiplierButtons}>
          {multipliers.map((multiplier) => (
            <TouchableOpacity
              key={multiplier}
              style={[
                styles.multiplierButton,
                customMultiplier === multiplier && styles.multiplierButtonActive,
              ]}
              onPress={() => handleMultiplier(multiplier)}>
              <Text
                style={[
                  styles.multiplierText,
                  customMultiplier === multiplier && styles.multiplierTextActive,
                ]}>
                {multiplier}x
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Place Bet Button */}
      <TouchableOpacity
        style={[styles.placeBetButton, !canPlaceBet && styles.placeBetButtonDisabled]}
        onPress={onPlaceBet}
        disabled={!canPlaceBet || isPlaying}>
        <Text style={styles.placeBetText}>
          {isPlaying ? 'Playing...' : 'Place Bet'}
        </Text>
      </TouchableOpacity>

      {!canPlaceBet && betAmount > balance && (
        <Text style={styles.errorText}>Insufficient balance</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.surface,
  },
  balanceContainer: {
    marginBottom: 20,
  },
  balanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundLight,
    padding: 12,
    borderRadius: theme.radius.input,
    gap: 8,
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  balanceAmount: {
    fontSize: 18,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.success,
  },
  betContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.textPrimary,
    marginBottom: 12,
  },
  betInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  betButton: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.button,
    backgroundColor: theme.colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.surface,
  },
  betInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: theme.radius.input,
    borderWidth: 1,
    borderColor: theme.colors.surface,
    paddingHorizontal: 16,
    height: 56,
  },
  betInput: {
    flex: 1,
    fontSize: 20,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.textPrimary,
    paddingVertical: 0,
  },
  currency: {
    fontSize: 14,
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.textSecondary,
    marginLeft: 8,
  },
  betLimits: {
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
  multiplierContainer: {
    marginBottom: 20,
  },
  multiplierButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  multiplierButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: theme.radius.button,
    borderWidth: 2,
    borderColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  multiplierButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  multiplierText: {
    fontSize: 16,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.textPrimary,
  },
  multiplierTextActive: {
    color: theme.colors.white,
  },
  placeBetButton: {
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
  placeBetButtonDisabled: {
    backgroundColor: theme.colors.inactive,
    opacity: 0.6,
  },
  placeBetText: {
    fontSize: 18,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.white,
  },
  errorText: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.error,
    textAlign: 'center',
    marginTop: 8,
  },
});

