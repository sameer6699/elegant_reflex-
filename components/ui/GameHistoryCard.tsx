import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Gamepad2, Trophy, TrendingUp, Clock } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface GameHistoryCardProps {
  gameName: string;
  gameType: string;
  betAmount: number;
  winAmount?: number;
  result: 'win' | 'loss' | 'pending';
  date: string;
  onPress?: () => void;
}

export default function GameHistoryCard({
  gameName,
  gameType,
  betAmount,
  winAmount,
  result,
  date,
  onPress,
}: GameHistoryCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getResultColor = () => {
    if (result === 'win') return theme.colors.success;
    if (result === 'loss') return theme.colors.error;
    return theme.colors.textSecondary;
  };

  const getResultIcon = () => {
    if (result === 'win') return <Trophy size={16} color={theme.colors.success} />;
    if (result === 'loss') return <Gamepad2 size={16} color={theme.colors.error} />;
    return <Clock size={16} color={theme.colors.textSecondary} />;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Gamepad2 size={20} color={theme.colors.primary} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <View style={styles.gameInfo}>
              <Text style={styles.gameName} numberOfLines={1}>
                {gameName}
              </Text>
              <Text style={styles.gameType}>{gameType}</Text>
            </View>
            <View style={[styles.resultBadge, { backgroundColor: getResultColor() + '20' }]}>
              {getResultIcon()}
              <Text style={[styles.resultText, { color: getResultColor() }]}>
                {result === 'win' ? 'Win' : result === 'loss' ? 'Loss' : 'Pending'}
              </Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Bet</Text>
              <Text style={styles.statValue}>{formatCurrency(betAmount)}</Text>
            </View>
            {winAmount !== undefined && (
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Win</Text>
                <Text
                  style={[
                    styles.statValue,
                    { color: result === 'win' ? theme.colors.success : theme.colors.textPrimary },
                  ]}>
                  {result === 'win' ? '+' : ''}
                  {formatCurrency(winAmount)}
                </Text>
              </View>
            )}
            <View style={styles.statItem}>
              <Clock size={12} color={theme.colors.textSecondary} />
              <Text style={styles.timeText}>{formatDate(date)}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
    width: 40,
    height: 40,
    borderRadius: 20,
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
    marginBottom: 12,
  },
  gameInfo: {
    flex: 1,
    marginRight: 12,
  },
  gameName: {
    fontSize: 16,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  gameType: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  resultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  resultText: {
    fontSize: 12,
    fontFamily: theme.fonts.bodySemiBold,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginRight: 4,
  },
  statValue: {
    fontSize: 14,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.textPrimary,
  },
  timeText: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
});

