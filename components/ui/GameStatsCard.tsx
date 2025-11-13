import { View, Text, StyleSheet } from 'react-native';
import { Trophy, TrendingUp, TrendingDown, Gamepad2, Coins } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface GameStatsCardProps {
  title: string;
  value: string | number;
  icon?: 'trophy' | 'trending' | 'game' | 'coins';
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string | number;
  subtitle?: string;
  color?: string;
}

export default function GameStatsCard({
  title,
  value,
  icon = 'game',
  trend,
  trendValue,
  subtitle,
  color,
}: GameStatsCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'trophy':
        return <Trophy size={24} color={color || theme.colors.success} />;
      case 'trending':
        return <TrendingUp size={24} color={color || theme.colors.primary} />;
      case 'coins':
        return <Coins size={24} color={color || theme.colors.success} />;
      default:
        return <Gamepad2 size={24} color={color || theme.colors.primary} />;
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') {
      return <TrendingUp size={14} color={theme.colors.success} />;
    }
    if (trend === 'down') {
      return <TrendingDown size={14} color={theme.colors.error} />;
    }
    return null;
  };

  const getTrendColor = () => {
    if (trend === 'up') return theme.colors.success;
    if (trend === 'down') return theme.colors.error;
    return theme.colors.textSecondary;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>{getIcon()}</View>
        {trend && trendValue && (
          <View style={[styles.trendContainer, { backgroundColor: getTrendColor() + '20' }]}>
            {getTrendIcon()}
            <Text style={[styles.trendText, { color: getTrendColor() }]}>
              {trend === 'up' ? '+' : ''}
              {trendValue}
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, color && { color }]}>{value}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.surface,
    width: 160,
    minHeight: 140,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
  },
  trendText: {
    fontSize: 10,
    fontFamily: theme.fonts.bodySemiBold,
  },
  title: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
});

