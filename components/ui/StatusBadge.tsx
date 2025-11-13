import { View, Text, StyleSheet } from 'react-native';
import { CheckCircle, Clock, Loader, XCircle } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface StatusBadgeProps {
  status: 'completed' | 'pending' | 'processing' | 'failed';
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
}

export default function StatusBadge({
  status,
  size = 'medium',
  showIcon = true,
}: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return {
          color: theme.colors.success,
          icon: CheckCircle,
          label: 'Completed',
        };
      case 'pending':
        return {
          color: '#F59E0B',
          icon: Clock,
          label: 'Pending',
        };
      case 'processing':
        return {
          color: theme.colors.primary,
          icon: Loader,
          label: 'Processing',
        };
      case 'failed':
        return {
          color: theme.colors.error,
          icon: XCircle,
          label: 'Failed',
        };
      default:
        return {
          color: theme.colors.textSecondary,
          icon: Clock,
          label: 'Unknown',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: 4,
          paddingHorizontal: 8,
          fontSize: 10,
          iconSize: 12,
        };
      case 'large':
        return {
          padding: 8,
          paddingHorizontal: 16,
          fontSize: 14,
          iconSize: 18,
        };
      default:
        return {
          padding: 6,
          paddingHorizontal: 12,
          fontSize: 12,
          iconSize: 14,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: config.color + '20',
          padding: sizeStyles.padding,
          paddingHorizontal: sizeStyles.paddingHorizontal,
        },
      ]}>
      {showIcon && (
        <Icon
          size={sizeStyles.iconSize}
          color={config.color}
          style={styles.icon}
        />
      )}
      <Text
        style={[
          styles.text,
          {
            color: config.color,
            fontSize: sizeStyles.fontSize,
          },
        ]}>
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontFamily: theme.fonts.bodySemiBold,
  },
});

