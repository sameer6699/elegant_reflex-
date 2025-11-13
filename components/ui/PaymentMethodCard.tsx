import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CreditCard, Building2, Wallet, Bitcoin, Check, Trash2 } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface PaymentMethodCardProps {
  type: 'card' | 'bank' | 'ewallet' | 'crypto';
  name?: string;
  last4?: string;
  expiry?: string;
  isDefault?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export default function PaymentMethodCard({
  type,
  name,
  last4,
  expiry,
  isDefault = false,
  onSelect,
  onDelete,
  showActions = true,
}: PaymentMethodCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'card':
        return <CreditCard size={24} color={theme.colors.primary} />;
      case 'bank':
        return <Building2 size={24} color={theme.colors.primary} />;
      case 'ewallet':
        return <Wallet size={24} color={theme.colors.primary} />;
      case 'crypto':
        return <Bitcoin size={24} color={theme.colors.primary} />;
      default:
        return <CreditCard size={24} color={theme.colors.primary} />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'card':
        return 'Credit/Debit Card';
      case 'bank':
        return 'Bank Account';
      case 'ewallet':
        return 'E-Wallet';
      case 'crypto':
        return 'Cryptocurrency';
      default:
        return 'Payment Method';
    }
  };

  const getDisplayText = () => {
    if (type === 'card' && last4) {
      return `**** **** **** ${last4}`;
    }
    if (type === 'bank' && last4) {
      return `****${last4}`;
    }
    if (name) {
      return name;
    }
    return getTypeLabel();
  };

  return (
    <TouchableOpacity
      style={[styles.container, isDefault && styles.containerDefault]}
      onPress={onSelect}
      activeOpacity={0.7}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>{getIcon()}</View>
        <View style={styles.infoContainer}>
          <Text style={styles.typeLabel}>{getTypeLabel()}</Text>
          <Text style={styles.displayText}>{getDisplayText()}</Text>
          {expiry && type === 'card' && (
            <Text style={styles.expiryText}>Expires {expiry}</Text>
          )}
        </View>
        {isDefault && (
          <View style={styles.defaultBadge}>
            <Check size={14} color={theme.colors.white} />
            <Text style={styles.defaultText}>Default</Text>
          </View>
        )}
      </View>
      {showActions && onDelete && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Trash2 size={18} color={theme.colors.error} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: theme.colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerDefault: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.backgroundLight,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  typeLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  displayText: {
    fontSize: 16,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  expiryText: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
    gap: 4,
  },
  defaultText: {
    fontSize: 10,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.white,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
});

