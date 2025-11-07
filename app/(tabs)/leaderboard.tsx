import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Trophy, Medal } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Alex', score: 320 },
  { rank: 2, name: 'Jordan', score: 290 },
  { rank: 3, name: 'Taylor', score: 250 },
  { rank: 4, name: 'Morgan', score: 220 },
  { rank: 5, name: 'Casey', score: 190 },
];

export default function LeaderboardScreen() {
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    loadBestScore();
  }, []);

  const loadBestScore = async () => {
    try {
      const saved = await AsyncStorage.getItem('bestScore');
      if (saved) {
        setBestScore(parseInt(saved, 10));
      }
    } catch (error) {
      console.error('Error loading best score:', error);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) {
      return <Trophy size={24} color="#FFD700" />;
    } else if (rank === 2) {
      return <Medal size={24} color="#C0C0C0" />;
    } else if (rank === 3) {
      return <Medal size={24} color="#CD7F32" />;
    }
    return <Text style={styles.rankNumber}>{rank}</Text>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Leaderboard</Text>
      </View>

      <View style={styles.yourScoreCard}>
        <Text style={styles.yourScoreLabel}>Your Best Score</Text>
        <Text style={styles.yourScore}>{bestScore}</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Top Players</Text>
        {MOCK_LEADERBOARD.map((entry) => (
          <View key={entry.rank} style={styles.leaderboardItem}>
            <View style={styles.rankContainer}>{getRankIcon(entry.rank)}</View>
            <Text style={styles.playerName}>{entry.name}</Text>
            <Text style={styles.playerScore}>{entry.score}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: theme.fonts.heading,
    color: theme.colors.primary,
  },
  yourScoreCard: {
    backgroundColor: theme.colors.primary,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: theme.radius.card,
    alignItems: 'center',
  },
  yourScoreLabel: {
    fontSize: 14,
    fontFamily: theme.fonts.body,
    color: theme.colors.white,
    opacity: 0.9,
    marginBottom: 4,
  },
  yourScore: {
    fontSize: 36,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.white,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.heading,
    color: theme.colors.primary,
    marginBottom: 16,
    marginLeft: 4,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.button,
    padding: 16,
    marginBottom: 12,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankNumber: {
    fontSize: 18,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.textSecondary,
  },
  playerName: {
    flex: 1,
    fontSize: 16,
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.primary,
    marginLeft: 12,
  },
  playerScore: {
    fontSize: 18,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.success,
  },
});
