import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Trophy, Medal, Crown, Calendar } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import LeaderboardCard from './LeaderboardCard';

interface LeaderboardEntry {
  rank: number;
  playerName: string;
  score: number;
  avatar?: string;
  change?: number;
  isCurrentUser?: boolean;
  gamesPlayed?: number;
  winRate?: number;
  totalWinnings?: number;
}

interface LeaderboardSectionProps {
  entries: LeaderboardEntry[];
  currentUserRank?: number;
  timePeriod?: 'daily' | 'weekly' | 'monthly' | 'alltime';
  onTimePeriodChange?: (period: 'daily' | 'weekly' | 'monthly' | 'alltime') => void;
  onViewAll?: () => void;
  maxVisible?: number;
}

export default function LeaderboardSection({
  entries,
  currentUserRank,
  timePeriod = 'weekly',
  onTimePeriodChange,
  onViewAll,
  maxVisible = 5,
}: LeaderboardSectionProps) {
  const [selectedPeriod, setSelectedPeriod] = useState(timePeriod);

  const timePeriods: Array<{ key: 'daily' | 'weekly' | 'monthly' | 'alltime'; label: string }> = [
    { key: 'daily', label: 'Today' },
    { key: 'weekly', label: 'Week' },
    { key: 'monthly', label: 'Month' },
    { key: 'alltime', label: 'All Time' },
  ];

  const handlePeriodChange = (period: 'daily' | 'weekly' | 'monthly' | 'alltime') => {
    setSelectedPeriod(period);
    onTimePeriodChange?.(period);
  };

  const visibleEntries = entries.slice(0, maxVisible);
  const topThree = entries.slice(0, 3);

  const getTopPlayer = () => {
    if (entries.length === 0) return null;
    return entries[0];
  };

  const topPlayer = getTopPlayer();

  return (
    <View style={styles.container}>
      {/* Time Period Filter */}
      {onTimePeriodChange && (
        <View style={styles.filterWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContainer}>
            {timePeriods.map((period) => (
              <TouchableOpacity
                key={period.key}
                style={[
                  styles.filterButton,
                  selectedPeriod === period.key && styles.filterButtonActive,
                ]}
                onPress={() => handlePeriodChange(period.key)}>
                <Calendar
                  size={14}
                  color={selectedPeriod === period.key ? theme.colors.white : theme.colors.textSecondary}
                />
                <Text
                  style={[
                    styles.filterText,
                    selectedPeriod === period.key && styles.filterTextActive,
                  ]}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Top Player Highlight Card */}
      {topPlayer && (
        <View style={styles.topPlayerCard}>
          <View style={styles.topPlayerContent}>
            <View style={styles.topPlayerLeft}>
              <View style={styles.topPlayerCrown}>
                <Crown size={32} color="#FFD700" />
              </View>
              <View style={styles.topPlayerInfo}>
                <Text style={styles.topPlayerLabel}>Top Player</Text>
                <Text style={styles.topPlayerName} numberOfLines={1}>
                  {topPlayer.playerName}
                </Text>
                <View style={styles.topPlayerStats}>
                  <View style={styles.topPlayerStatItem}>
                    <Trophy size={14} color="#FFD700" />
                    <Text style={styles.topPlayerStatText}>{topPlayer.score.toLocaleString()}</Text>
                  </View>
                  {topPlayer.gamesPlayed && (
                    <View style={styles.topPlayerStatItem}>
                      <Text style={styles.topPlayerStatLabel}>Games: </Text>
                      <Text style={styles.topPlayerStatText}>{topPlayer.gamesPlayed}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.topPlayerScore}>
              <Text style={styles.topPlayerScoreLabel}>Score</Text>
              <Text style={styles.topPlayerScoreValue}>{topPlayer.score.toLocaleString()}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Top 3 Podium */}
      {topThree.length >= 3 && (
        <View style={styles.podiumContainer}>
          <View style={styles.podiumHeader}>
            <Medal size={18} color={theme.colors.primary} />
            <Text style={styles.podiumTitle}>Top 3 Champions</Text>
          </View>
          <View style={styles.podium}>
            {/* 2nd Place */}
            <View style={[styles.podiumItem, styles.podiumSecond]}>
              <View style={[styles.podiumAvatar, styles.podiumSilver]}>
                <Text style={styles.podiumAvatarText}>
                  {topThree[1].playerName.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.podiumMedal}>
                <Text style={styles.podiumEmoji}>🥈</Text>
              </View>
              <Text style={styles.podiumName} numberOfLines={1}>
                {topThree[1].playerName}
              </Text>
              <Text style={styles.podiumScore}>{topThree[1].score.toLocaleString()}</Text>
            </View>

            {/* 1st Place */}
            <View style={[styles.podiumItem, styles.podiumFirst]}>
              <View style={[styles.podiumAvatar, styles.podiumGold]}>
                <Text style={styles.podiumAvatarText}>
                  {topThree[0].playerName.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.podiumCrown}>
                <Crown size={24} color="#FFD700" />
              </View>
              <Text style={styles.podiumName} numberOfLines={1}>
                {topThree[0].playerName}
              </Text>
              <Text style={styles.podiumScore}>{topThree[0].score.toLocaleString()}</Text>
            </View>

            {/* 3rd Place */}
            <View style={[styles.podiumItem, styles.podiumThird]}>
              <View style={[styles.podiumAvatar, styles.podiumBronze]}>
                <Text style={styles.podiumAvatarText}>
                  {topThree[2].playerName.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.podiumMedal}>
                <Text style={styles.podiumEmoji}>🥉</Text>
              </View>
              <Text style={styles.podiumName} numberOfLines={1}>
                {topThree[2].playerName}
              </Text>
              <Text style={styles.podiumScore}>{topThree[2].score.toLocaleString()}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Leaderboard List */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Rankings</Text>
          {currentUserRank && (
            <View style={styles.userRankBadge}>
              <Text style={styles.userRankText}>Your Rank: #{currentUserRank}</Text>
            </View>
          )}
        </View>
        <View style={styles.list}>
          {visibleEntries.map((entry, index) => (
            <LeaderboardCard
              key={entry.rank}
              rank={entry.rank}
              playerName={entry.playerName}
              score={entry.score}
              avatar={entry.avatar}
              change={entry.change}
              isCurrentUser={entry.isCurrentUser}
              gamesPlayed={entry.gamesPlayed}
              winRate={entry.winRate}
              totalWinnings={entry.totalWinnings}
            />
          ))}
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  filterWrapper: {
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.surface,
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.textSecondary,
  },
  filterTextActive: {
    color: theme.colors.white,
  },
  topPlayerCard: {
    backgroundColor: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    backgroundColor: '#FFF9E6',
    borderRadius: theme.radius.card,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  topPlayerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topPlayerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  topPlayerCrown: {
    marginRight: 16,
  },
  topPlayerInfo: {
    flex: 1,
  },
  topPlayerLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  topPlayerName: {
    fontSize: 20,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.primary,
    marginBottom: 8,
  },
  topPlayerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  topPlayerStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  topPlayerStatLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  topPlayerStatText: {
    fontSize: 13,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.textPrimary,
  },
  topPlayerScore: {
    alignItems: 'flex-end',
    marginLeft: 16,
  },
  topPlayerScoreLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  topPlayerScoreValue: {
    fontSize: 28,
    fontFamily: theme.fonts.headingBold,
    color: '#FFD700',
  },
  podiumContainer: {
    marginBottom: 24,
  },
  podiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  podiumTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.primary,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 8,
    paddingHorizontal: 8,
  },
  podiumItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.surface,
    minHeight: 140,
    justifyContent: 'flex-end',
  },
  podiumFirst: {
    borderWidth: 2,
    borderColor: '#FFD700',
    backgroundColor: '#FFF9E6',
    minHeight: 160,
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  podiumSecond: {
    borderWidth: 2,
    borderColor: '#C0C0C0',
    backgroundColor: '#F5F5F5',
    minHeight: 150,
  },
  podiumThird: {
    borderWidth: 2,
    borderColor: '#CD7F32',
    backgroundColor: '#FFF4E6',
    minHeight: 130,
  },
  podiumAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  podiumGold: {
    backgroundColor: '#FFD700',
  },
  podiumSilver: {
    backgroundColor: '#C0C0C0',
  },
  podiumBronze: {
    backgroundColor: '#CD7F32',
  },
  podiumAvatarText: {
    fontSize: 24,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.white,
  },
  podiumCrown: {
    marginBottom: 8,
  },
  podiumMedal: {
    marginBottom: 8,
  },
  podiumEmoji: {
    fontSize: 24,
  },
  podiumName: {
    fontSize: 13,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  podiumScore: {
    fontSize: 16,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.primary,
  },
  listContainer: {
    marginBottom: 20,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.primary,
  },
  userRankBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: theme.colors.primary + '15',
    borderWidth: 1,
    borderColor: theme.colors.primary + '30',
  },
  userRankText: {
    fontSize: 12,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.primary,
  },
  list: {
    gap: 0,
  },
});

