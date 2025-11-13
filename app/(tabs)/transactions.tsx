import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Filter, Search, History } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import TransactionCard from '@/components/ui/TransactionCard';

export default function TransactionsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const transactions = [
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
    {
      id: 'TXN005',
      type: 'deposit' as const,
      amount: 500,
      date: '2024-01-12T16:45:00Z',
      status: 'completed' as const,
      description: 'Deposit via Bank Transfer',
      method: 'Bank Transfer',
    },
    {
      id: 'TXN006',
      type: 'win' as const,
      amount: 150,
      date: '2024-01-11T11:20:00Z',
      status: 'completed' as const,
      description: 'Game Win - Blackjack',
      method: 'Game Winnings',
    },
    {
      id: 'TXN007',
      type: 'bet' as const,
      amount: 75,
      date: '2024-01-10T13:30:00Z',
      status: 'completed' as const,
      description: 'Bet placed - Roulette',
      method: 'Game Bet',
    },
    {
      id: 'TXN008',
      type: 'withdrawal' as const,
      amount: 300,
      date: '2024-01-09T08:15:00Z',
      status: 'failed' as const,
      description: 'Withdrawal to E-Wallet',
      method: 'E-Wallet',
    },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'deposit', label: 'Deposits' },
    { id: 'withdrawal', label: 'Withdrawals' },
    { id: 'win', label: 'Winnings' },
    { id: 'bet', label: 'Bets' },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter = selectedFilter === 'all' || transaction.type === selectedFilter;
    const matchesSearch =
      searchQuery === '' ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCopyId = (id: string) => {
    console.log('Copy transaction ID:', id);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <History size={24} color={theme.colors.primary} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Transaction History</Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <Search size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search transactions..."
                placeholderTextColor={theme.colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Filter Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterButton,
                  selectedFilter === filter.id && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedFilter(filter.id)}>
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter.id && styles.filterTextActive,
                  ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Transactions List */}
          <View style={styles.transactionsList}>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
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
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No transactions found</Text>
                <Text style={styles.emptyStateSubtext}>
                  Try adjusting your filters or search query
                </Text>
              </View>
            )}
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
    paddingBottom: 40,
  },
  content: {
    padding: 20,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.input,
    borderWidth: 1,
    borderColor: theme.colors.surface,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: theme.fonts.body,
    color: theme.colors.textPrimary,
    paddingVertical: 0,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    paddingRight: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.button,
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.textPrimary,
  },
  filterTextActive: {
    color: theme.colors.white,
    fontFamily: theme.fonts.bodySemiBold,
  },
  transactionsList: {
    marginBottom: 24,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

