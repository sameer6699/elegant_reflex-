import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Wallet } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import BalanceCard from '@/components/ui/BalanceCard';
import TransactionCard from '@/components/ui/TransactionCard';

export default function WalletScreen() {
  const router = useRouter();

  // Mock data
  const walletData = {
    availableBalance: 1250,
    bonusBalance: 100,
    lockedBalance: 50,
    totalDeposited: 5000,
    totalWithdrawn: 3000,
    totalWinnings: 2000,
  };

  const recentTransactions = [
    {
      id: 'TXN001',
      type: 'deposit' as const,
      amount: 100,
      date: '2024-01-15T10:30:00Z',
      status: 'completed' as const,
      description: 'Deposit via Credit Card',
      method: 'Card ending in 1234',
    },
    {
      id: 'TXN002',
      type: 'win' as const,
      amount: 250,
      date: '2024-01-14T15:20:00Z',
      status: 'completed' as const,
      description: 'Game Win - Lucky Slots',
      method: 'Game Winnings',
    },
    {
      id: 'TXN003',
      type: 'bet' as const,
      amount: 50,
      date: '2024-01-14T14:10:00Z',
      status: 'completed' as const,
      description: 'Bet placed - Poker',
      method: 'Game Bet',
    },
    {
      id: 'TXN004',
      type: 'withdrawal' as const,
      amount: 200,
      date: '2024-01-13T09:00:00Z',
      status: 'processing' as const,
      description: 'Withdrawal to Bank Account',
      method: 'Bank ending in 5678',
    },
  ];

  const handleCopyId = (id: string) => {
    // Static UI - just show alert
    console.log('Copy transaction ID:', id);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <Wallet size={24} color={theme.colors.primary} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>My Wallet</Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Total Balance */}
          <BalanceCard
            title="Total Balance"
            amount={walletData.availableBalance + walletData.bonusBalance}
            currency="USD"
            showActions={false}
            subtitle="Available + Bonus"
          />


          {/* Statistics */}
          <View style={styles.statisticsSection}>
            <Text style={styles.sectionTitle}>Statistics</Text>
            <View style={styles.statisticsGrid}>
              <View style={styles.statisticCard}>
                <Text style={styles.statisticLabel}>Total Deposited</Text>
                <Text style={styles.statisticValue}>
                  ${walletData.totalDeposited.toLocaleString()}
                </Text>
              </View>
              <View style={styles.statisticCard}>
                <Text style={styles.statisticLabel}>Total Withdrawn</Text>
                <Text style={styles.statisticValue}>
                  ${walletData.totalWithdrawn.toLocaleString()}
                </Text>
              </View>
              <View style={styles.statisticCard}>
                <Text style={styles.statisticLabel}>Total Winnings</Text>
                <Text style={[styles.statisticValue, styles.winningValue]}>
                  ${walletData.totalWinnings.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>

          {/* Recent Transactions */}
          <View style={styles.transactionsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <TouchableOpacity onPress={() => router.push('/transactions')}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            {recentTransactions.slice(0, 3).map((transaction) => (
              <TransactionCard
                key={transaction.id}
                id={transaction.id}
                type={transaction.type}
                amount={transaction.amount}
                date={transaction.date}
                status={transaction.status}
                description={transaction.description}
                method={transaction.method}
                onCopy={handleCopyId}
              />
            ))}
          </View>
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
  scrollContent: {
    paddingBottom: 40,
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
  content: {
    padding: 20,
  },
  statisticsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.primary,
    marginBottom: 16,
  },
  statisticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statisticCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.surface,
  },
  statisticLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  statisticValue: {
    fontSize: 18,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.textPrimary,
  },
  winningValue: {
    color: theme.colors.success,
  },
  transactionsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.primary,
  },
});

