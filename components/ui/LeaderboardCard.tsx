import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Trophy, Medal, Crown, TrendingUp, TrendingDown, Award, Star } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface LeaderboardCardProps {
  rank: number;
  playerName: string;
  score: number;
  avatar?: string;
  change?: number; // Position change (positive = up, negative = down)
  isCurrentUser?: boolean;
  gamesPlayed?: number;
  winRate?: number;
  totalWinnings?: number;
  onPress?: () => void;
}

export default function LeaderboardCard({
  rank,
  playerName,
  score,
  avatar,
  change,
  isCurrentUser = false,
  gamesPlayed,
  winRate,
  totalWinnings,
  onPress,
}: LeaderboardCardProps) {
  const getRankIcon = () => {
    if (rank === 1) {
      return (
        <View style={[styles.rankIconContainer, styles.goldContainer]}>
          <Crown size={28} color="#FFD700" />
        </View>
      );
    } else if (rank === 2) {
      return (
        <View style={[styles.rankIconContainer, styles.silverContainer]}>
          <Medal size={24} color="#C0C0C0" />
        </View>
      );
    } else if (rank === 3) {
      return (
        <View style={[styles.rankIconContainer, styles.bronzeContainer]}>
          <Medal size={24} color="#CD7F32" />
        </View>
      );
    }
    return (
      <View style={[styles.rankNumberContainer, rank <= 10 && styles.topTenContainer]}>
        <Text style={[styles.rankNumber, rank <= 10 && styles.topTenText]}>{rank}</Text>
      </View>
    );
  };

  const getRankBadge = () => {
    if (rank === 1) {
      return (
        <View style={[styles.badge, styles.goldBadge]}>
          <Star size={12} color="#FFD700" />
          <Text style={styles.badgeText}>#1</Text>
        </View>
      );
    } else if (rank <= 3) {
      return (
        <View style={[styles.badge, rank === 2 ? styles.silverBadge : styles.bronzeBadge]}>
          <Award size={12} color={rank === 2 ? '#C0C0C0' : '#CD7F32'} />
          <Text style={styles.badgeText}>Top 3</Text>
        </View>
      );
    } else if (rank <= 10) {
      return (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Top 10</Text>
        </View>
      );
    }
    return null;
  };

  const getChangeIndicator = () => {
    if (change === undefined || change === 0) return null;
    const isUp = change > 0;
    return (
      <View style={[styles.changeContainer, isUp ? styles.changeUp : styles.changeDown]}>
        {isUp ? (
          <TrendingUp size={12} color={theme.colors.success} />
        ) : (
          <TrendingDown size={12} color={theme.colors.error} />
        )}
        <Text style={[styles.changeText, isUp ? styles.changeTextUp : styles.changeTextDown]}>
          {Math.abs(change)}
        </Text>
      </View>
    );
  };

  const formatScore = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toLocaleString();
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isCurrentUser && styles.currentUserContainer,
        rank <= 3 && styles.topThreeContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.content}>
        {/* Rank Section */}
        <View style={styles.rankSection}>
          {getRankIcon()}
          {getChangeIndicator()}
        </View>

        {/* Avatar Section */}
        <View style={[styles.avatarContainer, isCurrentUser && styles.currentUserAvatar]}>
          {avatar ? (
            <Text style={styles.avatarText}>{avatar}</Text>
          ) : (
            <Text style={styles.avatarText}>{playerName.charAt(0).toUpperCase()}</Text>
          )}
        </View>

        {/* Player Info Section */}
        <View style={styles.playerInfo}>
          <View style={styles.playerHeader}>
            <View style={styles.playerNameContainer}>
              <Text style={[styles.playerName, isCurrentUser && styles.currentUserName]} numberOfLines={1}>
                {playerName}
                {isCurrentUser && (
                  <Text style={styles.youLabel}> (You)</Text>
                )}
              </Text>
              {getRankBadge()}
            </View>
          </View>

          {/* Stats Row */}
          {(gamesPlayed !== undefined || winRate !== undefined || totalWinnings !== undefined) && (
            <View style={styles.statsRow}>
              {gamesPlayed !== undefined && (
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Games</Text>
                  <Text style={styles.statValue}>{gamesPlayed}</Text>
                </View>
              )}
              {winRate !== undefined && (
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Win Rate</Text>
                  <Text style={[styles.statValue, styles.winRateValue]}>
                    {winRate.toFixed(1)}%
                  </Text>
                </View>
              )}
              {totalWinnings !== undefined && (
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Winnings</Text>
                  <Text style={[styles.statValue, styles.winningsValue]}>
                    ₹{formatScore(totalWinnings)}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* Score Section */}
        <View style={styles.scoreSection}>
          <View style={[styles.scoreContainer, rank <= 3 && styles.topThreeScore]}>
            <Trophy
              size={18}
              color={rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : rank === 3 ? '#CD7F32' : theme.colors.success}
            />
            <Text style={[styles.scoreText, rank <= 3 && styles.topThreeScoreText]}>
              {formatScore(score)}
            </Text>
          </View>
          {rank <= 3 && (
            <View style={[styles.podiumIndicator, rank === 1 ? styles.podiumGold : rank === 2 ? styles.podiumSilver : styles.podiumBronze]}>
              <Text style={styles.podiumText}>{rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}</Text>
            </View>
          )}
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
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  currentUserContainer: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.backgroundLight,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  topThreeContainer: {
    borderWidth: 2,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankSection: {
    width: 50,
    alignItems: 'center',
    marginRight: 12,
  },
  rankIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  goldContainer: {
    backgroundColor: '#FFF9E6',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  silverContainer: {
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#C0C0C0',
  },
  bronzeContainer: {
    backgroundColor: '#FFF4E6',
    borderWidth: 2,
    borderColor: '#CD7F32',
  },
  rankNumberContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.surface,
  },
  topTenContainer: {
    backgroundColor: theme.colors.primary + '10',
    borderColor: theme.colors.primary,
  },
  rankNumber: {
    fontSize: 16,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.textSecondary,
  },
  topTenText: {
    color: theme.colors.primary,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 2,
  },
  changeUp: {
    backgroundColor: theme.colors.success + '20',
  },
  changeDown: {
    backgroundColor: theme.colors.error + '20',
  },
  changeText: {
    fontSize: 10,
    fontFamily: theme.fonts.bodySemiBold,
  },
  changeTextUp: {
    color: theme.colors.success,
  },
  changeTextDown: {
    color: theme.colors.error,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: theme.colors.white,
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  currentUserAvatar: {
    borderColor: theme.colors.primary,
    borderWidth: 3,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  avatarText: {
    fontSize: 24,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.white,
  },
  playerInfo: {
    flex: 1,
    marginRight: 12,
  },
  playerHeader: {
    marginBottom: 8,
  },
  playerNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  playerName: {
    fontSize: 16,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.textPrimary,
  },
  currentUserName: {
    color: theme.colors.primary,
    fontSize: 17,
  },
  youLabel: {
    fontSize: 14,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: theme.colors.backgroundLight,
    gap: 4,
    borderWidth: 1,
    borderColor: theme.colors.surface,
  },
  goldBadge: {
    backgroundColor: '#FFF9E6',
    borderColor: '#FFD700',
  },
  silverBadge: {
    backgroundColor: '#F5F5F5',
    borderColor: '#C0C0C0',
  },
  bronzeBadge: {
    backgroundColor: '#FFF4E6',
    borderColor: '#CD7F32',
  },
  badgeText: {
    fontSize: 10,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.textSecondary,
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
    fontSize: 11,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  statValue: {
    fontSize: 12,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.textPrimary,
  },
  winRateValue: {
    color: theme.colors.success,
  },
  winningsValue: {
    color: theme.colors.primary,
  },
  scoreSection: {
    alignItems: 'flex-end',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: theme.colors.success + '15',
    gap: 6,
    borderWidth: 1,
    borderColor: theme.colors.success + '30',
  },
  topThreeScore: {
    backgroundColor: theme.colors.primary + '10',
    borderColor: theme.colors.primary + '30',
  },
  scoreText: {
    fontSize: 18,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.success,
  },
  topThreeScoreText: {
    color: theme.colors.primary,
    fontSize: 20,
  },
  podiumIndicator: {
    marginTop: 4,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  podiumGold: {
    backgroundColor: '#FFF9E6',
  },
  podiumSilver: {
    backgroundColor: '#F5F5F5',
  },
  podiumBronze: {
    backgroundColor: '#FFF4E6',
  },
  podiumText: {
    fontSize: 20,
  },
});

