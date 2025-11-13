import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Trophy,
  Gamepad2,
  Copy,
  CheckCircle,
  Clock,
  XCircle,
  Loader,
} from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface TransactionCardProps {
  id: string;
  type: 'deposit' | 'withdrawal' | 'win' | 'bet';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'processing' | 'failed';
  description?: string;
  method?: string;
  onCopy?: (id: string) => void;
}

export default function TransactionCard({
  id,
  type,
  amount,
  date,
  status,
  description,
  method,
  onCopy,
}: TransactionCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'deposit':
        return <ArrowDownCircle size={24} color={theme.colors.success} />;
      case 'withdrawal':
        return <ArrowUpCircle size={24} color={theme.colors.error} />;
      case 'win':
        return <Trophy size={24} color={theme.colors.success} />;
      case 'bet':
        return <Gamepad2 size={24} color={theme.colors.primary} />;
      default:
        return <ArrowDownCircle size={24} color={theme.colors.primary} />;
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} color={theme.colors.success} />;
      case 'pending':
        return <Clock size={16} color={theme.colors.warning || '#F59E0B'} />;
      case 'processing':
        return <Loader size={16} color={theme.colors.primary} />;
      case 'failed':
        return <XCircle size={16} color={theme.colors.error} />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return theme.colors.success;
      case 'pending':
        return '#F59E0B';
      case 'processing':
        return theme.colors.primary;
      case 'failed':
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  };

  const getAmountColor = () => {
    if (type === 'deposit' || type === 'win') {
      return theme.colors.success;
    }
    return theme.colors.error;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'deposit':
        return 'Deposit';
      case 'withdrawal':
        return 'Withdrawal';
      case 'win':
        return 'Win';
      case 'bet':
        return 'Bet';
      default:
        return 'Transaction';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>{getIcon()}</View>
        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.typeLabel}>{getTypeLabel()}</Text>
            <Text style={[styles.amount, { color: getAmountColor() }]}>
              {type === 'deposit' || type === 'win' ? '+' : '-'}
              {formatCurrency(amount)}
            </Text>
          </View>
          {description && (
            <Text style={styles.description}>{description}</Text>
          )}
          {method && (
            <Text style={styles.method}>{method}</Text>
          )}
          <View style={styles.footerRow}>
            <Text style={styles.date}>{formatDate(date)}</Text>
            <View style={styles.statusContainer}>
              {getStatusIcon()}
              <Text style={[styles.status, { color: getStatusColor() }]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {onCopy && (
        <TouchableOpacity
          style={styles.copyButton}
          onPress={() => onCopy(id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Copy size={16} color={theme.colors.textSecondary} />
          <Text style={styles.copyText}>Copy ID</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.surface,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  typeLabel: {
    fontSize: 16,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.textPrimary,
  },
  amount: {
    fontSize: 18,
    fontFamily: theme.fonts.headingBold,
  },
  description: {
    fontSize: 14,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  method: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  status: {
    fontSize: 12,
    fontFamily: theme.fonts.bodyMedium,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surface,
    gap: 4,
  },
  copyText: {
    fontSize: 12,
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.textSecondary,
  },
});

