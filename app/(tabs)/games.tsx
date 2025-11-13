import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Gamepad2, Search, Star, TrendingUp, Filter } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import GameCard from '@/components/ui/GameCard';

export default function GamesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Lottery Games Data
  const games = [
    {
      id: '1',
      name: 'Karnataka Day',
      provider: 'Karnataka Lottery',
      category: 'lottery',
      minBet: 10,
      maxWin: '9000x',
      rtp: 98.5,
      isFavorite: true,
      description: 'Daily lottery game with multiple draws',
      drawTime: '3:00 PM',
    },
    {
      id: '2',
      name: 'Sunday',
      provider: 'Sunday Lottery',
      category: 'lottery',
      minBet: 5,
      maxWin: '10000x',
      rtp: 97.8,
      isFavorite: false,
      description: 'Weekly Sunday special lottery',
      drawTime: '8:00 PM',
    },
    {
      id: '3',
      name: 'Time Bazar',
      provider: 'Time Bazar Lottery',
      category: 'lottery',
      minBet: 1,
      maxWin: '8000x',
      rtp: 98.2,
      isFavorite: true,
      description: 'Multiple daily draws with quick results',
      drawTime: '11:00 AM, 4:00 PM, 9:00 PM',
    },
    {
      id: '4',
      name: 'Madhur Day',
      provider: 'Madhur Lottery',
      category: 'lottery',
      minBet: 2,
      maxWin: '7500x',
      rtp: 97.5,
      isFavorite: false,
      description: 'Day time lottery with high winning chances',
      drawTime: '2:00 PM',
    },
    {
      id: '5',
      name: 'Milan Day',
      provider: 'Milan Lottery',
      category: 'lottery',
      minBet: 3,
      maxWin: '8500x',
      rtp: 98.0,
      isFavorite: true,
      description: 'Popular daily lottery with great prizes',
      drawTime: '5:00 PM',
    },
    {
      id: '6',
      name: 'Rajdhani Day',
      provider: 'Rajdhani Lottery',
      category: 'lottery',
      minBet: 4,
      maxWin: '9500x',
      rtp: 98.3,
      isFavorite: false,
      description: 'Premium day lottery with maximum rewards',
      drawTime: '6:00 PM',
    },
    {
      id: '7',
      name: 'Kalyan Day',
      provider: 'Kalyan Lottery',
      category: 'lottery',
      minBet: 5,
      maxWin: '10000x',
      rtp: 98.1,
      isFavorite: true,
      description: 'Classic lottery game with trusted results',
      drawTime: '3:30 PM',
    },
    {
      id: '8',
      name: 'Main Bazar',
      provider: 'Main Bazar Lottery',
      category: 'lottery',
      minBet: 2,
      maxWin: '7000x',
      rtp: 97.9,
      isFavorite: false,
      description: 'Main market lottery with regular draws',
      drawTime: '1:00 PM, 6:00 PM',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Games' },
    { id: 'lottery', label: 'Lottery' },
    { id: 'day', label: 'Day Games' },
    { id: 'night', label: 'Night Games' },
    { id: 'special', label: 'Special' },
    { id: 'weekly', label: 'Weekly' },
  ];

  const sortOptions = [
    { id: 'popular', label: 'Popular' },
    { id: 'new', label: 'New' },
    { id: 'rtp', label: 'High RTP' },
    { id: 'minbet', label: 'Min Bet' },
  ];

  const filteredGames = games.filter((game) => {
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (game.description && game.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handlePlay = (gameId: string) => {
    router.push(`/game/${gameId}`);
  };

  const handleFavorite = (gameId: string) => {
    console.log('Toggle favorite:', gameId);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <Gamepad2 size={24} color={theme.colors.primary} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Lottery Games</Text>
            <Text style={styles.headerSubtitle}>Select your favorite lottery game to play</Text>
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
                placeholder="Search lottery games..."
                placeholderTextColor={theme.colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Category Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category.id)}>
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.categoryTextActive,
                  ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Sort Options */}
          <View style={styles.sortContainer}>
            <Filter size={16} color={theme.colors.textSecondary} />
            <Text style={styles.sortLabel}>Sort by:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sortOptionsContainer}>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.sortButton,
                    sortBy === option.id && styles.sortButtonActive,
                  ]}
                  onPress={() => setSortBy(option.id)}>
                  <Text
                    style={[
                      styles.sortText,
                      sortBy === option.id && styles.sortTextActive,
                    ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Games Grid */}
          <View style={styles.gamesGrid}>
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  id={game.id}
                  name={game.name}
                  provider={game.provider}
                  thumbnail={undefined}
                  minBet={game.minBet}
                  maxWin={game.maxWin}
                  rtp={game.rtp}
                  category={game.category}
                  isFavorite={game.isFavorite}
                  onPlay={() => handlePlay(game.id)}
                  onFavorite={() => handleFavorite(game.id)}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Gamepad2 size={48} color={theme.colors.textSecondary} />
                <Text style={styles.emptyStateText}>No games found</Text>
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
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
  categoriesContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
    paddingRight: 20,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.button,
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  categoryButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.textPrimary,
  },
  categoryTextActive: {
    color: theme.colors.white,
    fontFamily: theme.fonts.bodySemiBold,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  sortLabel: {
    fontSize: 14,
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.textSecondary,
  },
  sortOptionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: theme.radius.button,
    borderWidth: 1,
    borderColor: theme.colors.surface,
  },
  sortButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  sortText: {
    fontSize: 12,
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.textPrimary,
  },
  sortTextActive: {
    color: theme.colors.white,
    fontFamily: theme.fonts.bodySemiBold,
  },
  gamesGrid: {
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
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

