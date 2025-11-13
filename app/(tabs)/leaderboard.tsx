import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Trophy } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import LeaderboardSection from '@/components/ui/LeaderboardSection';

// Mock leaderboard data with Indian player names
const leaderboardData = [
  {
    rank: 1,
    playerName: 'Rahul Verma',
    score: 12500,
    change: 0,
    gamesPlayed: 245,
    winRate: 78.5,
    totalWinnings: 12500,
  },
  {
    rank: 2,
    playerName: 'Kavya Reddy',
    score: 11200,
    change: 1,
    gamesPlayed: 198,
    winRate: 72.3,
    totalWinnings: 11200,
  },
  {
    rank: 3,
    playerName: 'Aryan Kapoor',
    score: 9800,
    change: -1,
    gamesPlayed: 189,
    winRate: 68.9,
    totalWinnings: 9800,
  },
  {
    rank: 4,
    playerName: 'Isha Joshi',
    score: 8750,
    change: 2,
    gamesPlayed: 156,
    winRate: 65.4,
    totalWinnings: 8750,
  },
  {
    rank: 5,
    playerName: 'Aditya Malhotra',
    score: 8200,
    change: 0,
    gamesPlayed: 142,
    winRate: 62.2,
    totalWinnings: 8200,
    isCurrentUser: true,
  },
  {
    rank: 6,
    playerName: 'Neha Agarwal',
    score: 7650,
    change: -2,
    gamesPlayed: 134,
    winRate: 59.8,
    totalWinnings: 7650,
  },
  {
    rank: 7,
    playerName: 'Rohan Mehta',
    score: 7200,
    change: 1,
    gamesPlayed: 128,
    winRate: 57.2,
    totalWinnings: 7200,
  },
  {
    rank: 8,
    playerName: 'Priya Sharma',
    score: 6800,
    change: 1,
    gamesPlayed: 120,
    winRate: 55.8,
    totalWinnings: 6800,
  },
  {
    rank: 9,
    playerName: 'Raj Patel',
    score: 6400,
    change: -1,
    gamesPlayed: 115,
    winRate: 53.9,
    totalWinnings: 6400,
  },
  {
    rank: 10,
    playerName: 'Anjali Singh',
    score: 6000,
    change: 2,
    gamesPlayed: 110,
    winRate: 52.1,
    totalWinnings: 6000,
  },
  {
    rank: 11,
    playerName: 'Vikram Kumar',
    score: 5600,
    change: 0,
    gamesPlayed: 105,
    winRate: 50.5,
    totalWinnings: 5600,
  },
  {
    rank: 12,
    playerName: 'Sneha Reddy',
    score: 5200,
    change: -2,
    gamesPlayed: 100,
    winRate: 48.9,
    totalWinnings: 5200,
  },
  {
    rank: 13,
    playerName: 'Arjun Nair',
    score: 4800,
    change: 1,
    gamesPlayed: 95,
    winRate: 47.2,
    totalWinnings: 4800,
  },
  {
    rank: 14,
    playerName: 'Meera Iyer',
    score: 4400,
    change: -1,
    gamesPlayed: 90,
    winRate: 45.6,
    totalWinnings: 4400,
  },
  {
    rank: 15,
    playerName: 'Karan Desai',
    score: 4000,
    change: 0,
    gamesPlayed: 85,
    winRate: 44.1,
    totalWinnings: 4000,
  },
];

export default function LeaderboardScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'alltime'>('weekly');

  const handleTimePeriodChange = (period: 'daily' | 'weekly' | 'monthly' | 'alltime') => {
    setSelectedPeriod(period);
    // In a real app, you would fetch leaderboard data based on the selected period
    console.log('Time period changed to:', period);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <Trophy size={24} color={theme.colors.primary} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Leaderboard</Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <LeaderboardSection
            entries={leaderboardData}
            currentUserRank={5}
            timePeriod={selectedPeriod}
            onTimePeriodChange={handleTimePeriodChange}
            maxVisible={15}
          />
        </View>
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
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.primary,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
});
