import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Wallet, ArrowDownCircle, ArrowUpCircle, TrendingUp } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface BalanceCardProps {
  title: string;
  amount: number;
  currency?: string;
  showActions?: boolean;
  onDeposit?: () => void;
  onWithdraw?: () => void;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendAmount?: number;
}

export default function BalanceCard({
  title,
  amount,
  currency = 'USD',
  showActions = false,
  onDeposit,
  onWithdraw,
  subtitle,
  trend,
  trendAmount,
}: BalanceCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTrendColor = () => {
    if (trend === 'up') return theme.colors.success;
    if (trend === 'down') return theme.colors.error;
    return theme.colors.textSecondary;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Wallet size={20} color={theme.colors.primary} />
          <Text style={styles.title}>{title}</Text>
        </View>
        {trend && trendAmount && (
          <View style={[styles.trendContainer, { backgroundColor: getTrendColor() + '20' }]}>
            <TrendingUp
              size={14}
              color={getTrendColor()}
              style={trend === 'down' && { transform: [{ rotate: '180deg' }] }}
            />
            <Text style={[styles.trendText, { color: getTrendColor() }]}>
              {trend === 'up' ? '+' : '-'}
              {formatCurrency(Math.abs(trendAmount))}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{formatCurrency(amount)}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {showActions && (onDeposit || onWithdraw) && (
        <View style={styles.actionsContainer}>
          {onDeposit && (
            <TouchableOpacity style={[styles.actionButton, styles.depositButton]} onPress={onDeposit}>
              <ArrowDownCircle size={18} color={theme.colors.white} />
              <Text style={styles.actionButtonText}>Deposit</Text>
            </TouchableOpacity>
          )}
          {onWithdraw && (
            <TouchableOpacity style={[styles.actionButton, styles.withdrawButton]} onPress={onWithdraw}>
              <ArrowUpCircle size={18} color={theme.colors.primary} />
              <Text style={[styles.actionButtonText, styles.withdrawButtonText]}>Withdraw</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.surface,
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.textPrimary,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontFamily: theme.fonts.bodySemiBold,
  },
  amountContainer: {
    marginBottom: 16,
  },
  amount: {
    fontSize: 32,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: theme.radius.button,
    gap: 8,
  },
  depositButton: {
    backgroundColor: theme.colors.primary,
  },
  withdrawButton: {
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.white,
  },
  withdrawButtonText: {
    color: theme.colors.primary,
  },
});

