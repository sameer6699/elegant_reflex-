import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { User, ArrowRight, History, Bell, Wallet } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import GameHistoryCard from '@/components/ui/GameHistoryCard';
import GameOverviewCard from '@/components/ui/GameOverviewCard';
import GameStatsCard from '@/components/ui/GameStatsCard';
import NotificationPanel from '@/components/ui/NotificationPanel';

export default function HomeScreen() {
  const router = useRouter();
  const [notificationVisible, setNotificationVisible] = useState(false);

  // Mock user data (in real app, this would come from state/context)
  const userName = 'John Doe';
  const walletBalance = 1250;

  // Mock game statistics
  const gameStats = {
    gamesPlayed: 45,
    totalWins: 28,
    winRate: 62.2,
    totalWinnings: 2500,
    totalBets: 1800,
    netProfit: 700,
  };

  // Mock game history
  const gameHistory = [
    {
      id: '1',
      gameName: 'Karnataka Day',
      gameType: 'Lottery',
      betAmount: 50,
      winAmount: 250,
      result: 'win' as const,
      date: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      gameName: 'Sunday',
      gameType: 'Lottery',
      betAmount: 100,
      winAmount: 0,
      result: 'loss' as const,
      date: '2024-01-14T15:20:00Z',
    },
    {
      id: '3',
      gameName: 'Time Bazar',
      gameType: 'Lottery',
      betAmount: 75,
      winAmount: 150,
      result: 'win' as const,
      date: '2024-01-14T14:10:00Z',
    },
    {
      id: '4',
      gameName: 'Madhur Day',
      gameType: 'Lottery',
      betAmount: 25,
      winAmount: 0,
      result: 'loss' as const,
      date: '2024-01-13T09:00:00Z',
    },
    {
      id: '5',
      gameName: 'Milan Day',
      gameType: 'Lottery',
      betAmount: 60,
      winAmount: 300,
      result: 'win' as const,
      date: '2024-01-13T11:00:00Z',
    },
    {
      id: '6',
      gameName: 'Rajdhani Day',
      gameType: 'Lottery',
      betAmount: 80,
      winAmount: 0,
      result: 'loss' as const,
      date: '2024-01-12T16:30:00Z',
    },
  ];

  // Featured lottery games
  const featuredGames = [
    {
      id: '1',
      name: 'Karnataka Day',
      provider: 'Karnataka Lottery',
      category: 'lottery',
      minBet: 10,
      maxWin: '9000x',
      rtp: 98.5,
      players: 2150,
      isPopular: true,
      isFeatured: true,
    },
    {
      id: '3',
      name: 'Time Bazar',
      provider: 'Time Bazar Lottery',
      category: 'lottery',
      minBet: 1,
      maxWin: '8000x',
      rtp: 98.2,
      players: 1890,
      isPopular: true,
      isFeatured: false,
    },
    {
      id: '5',
      name: 'Milan Day',
      provider: 'Milan Lottery',
      category: 'lottery',
      minBet: 3,
      maxWin: '8500x',
      rtp: 98.0,
      players: 2100,
      isPopular: false,
      isFeatured: true,
    },
  ];


  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Enhanced Header Section with User Info and Wallet */}
        <View style={styles.header}>
          {/* Top Row: User Info and Notification */}
          <View style={styles.headerTopRow}>
            <View style={styles.userInfoSection}>
              <View style={styles.userIconContainer}>
                <User size={22} color={theme.colors.white} />
              </View>
              <View style={styles.userTextContainer}>
                <Text style={styles.greeting}>Hello,</Text>
                <Text style={styles.userName}>{userName}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => setNotificationVisible(true)}>
              <Bell size={22} color={theme.colors.textPrimary} />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>3</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Wallet Cards Section */}
          <View style={styles.walletCardsContainer}>
            <View style={[styles.walletCard, styles.balanceCard]}>
              <View style={styles.walletCardHeader}>
                <View style={[styles.walletCardIcon, styles.balanceIcon]}>
                  <Wallet size={20} color={theme.colors.primary} />
                </View>
                <Text style={styles.walletCardLabel}>Balance</Text>
              </View>
              <Text style={styles.walletCardValue}>
                ₹{walletBalance.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Game Statistics Overview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Game Statistics</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.statsScrollContainer}
              style={styles.statsScrollView}>
              <GameStatsCard
                title="Games Played"
                value={gameStats.gamesPlayed}
                icon="game"
                trend="up"
                trendValue="12%"
                subtitle="This month"
              />
              <GameStatsCard
                title="Total Wins"
                value={gameStats.totalWins}
                icon="trophy"
                trend="up"
                trendValue="8%"
                subtitle={`${gameStats.winRate}% win rate`}
                color={theme.colors.success}
              />
              <GameStatsCard
                title="Total Winnings"
                value={`₹${gameStats.totalWinnings.toLocaleString()}`}
                icon="coins"
                trend="up"
                trendValue="15%"
                subtitle="All time"
                color={theme.colors.success}
              />
              <GameStatsCard
                title="Net Profit"
                value={`₹${gameStats.netProfit.toLocaleString()}`}
                icon="trending"
                trend="up"
                trendValue="22%"
                subtitle="This month"
                color={theme.colors.success}
              />
            </ScrollView>
          </View>

          {/* Game History Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <History size={20} color={theme.colors.primary} />
                <Text style={styles.sectionTitle}>Recent Played Games</Text>
              </View>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => router.push('/transactions')}>
                <Text style={styles.viewAllText}>View All</Text>
                <ArrowRight size={16} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.historyContainer}>
              {gameHistory.map((game) => (
                <GameHistoryCard
                  key={game.id}
                  gameName={game.gameName}
                  gameType={game.gameType}
                  betAmount={game.betAmount}
                  winAmount={game.winAmount}
                  result={game.result}
                  date={game.date}
                  onPress={() => console.log('View game details:', game.id)}
                />
              ))}
            </View>
          </View>

          {/* Featured Games Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Games</Text>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => router.push('/games')}>
                <Text style={styles.viewAllText}>View All</Text>
                <ArrowRight size={16} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.gamesContainer}>
              {featuredGames.map((game) => (
                <GameOverviewCard
                  key={game.id}
                  id={game.id}
                  name={game.name}
                  provider={game.provider}
                  category={game.category}
                  minBet={game.minBet}
                  maxWin={game.maxWin}
                  rtp={game.rtp}
                  players={game.players}
                  isPopular={game.isPopular}
                  isFeatured={game.isFeatured}
                  onPlay={() => router.push('/games')}
                />
              ))}
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Notification Panel */}
      <NotificationPanel
        visible={notificationVisible}
        onClose={() => setNotificationVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: theme.colors.white,
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
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
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  userTextContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.primary,
    letterSpacing: 0.5,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: theme.colors.surface,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: theme.colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  notificationCount: {
    fontSize: 10,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.white,
  },
  walletCardsContainer: {
    flexDirection: 'row',
  },
  walletCard: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: theme.radius.card,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.surface,
    minHeight: 120,
  },
  balanceCard: {
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
  },
  walletCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  walletCardIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  balanceIcon: {
    backgroundColor: theme.colors.white,
  },
  walletCardLabel: {
    fontSize: 13,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  walletCardValue: {
    fontSize: 24,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.primary,
    letterSpacing: 0.5,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.primary,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.primary,
  },
  statsScrollView: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  statsScrollContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  historyContainer: {
    gap: 12,
  },
  gamesContainer: {
    gap: 16,
  },
});
