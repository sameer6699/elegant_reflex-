import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Gamepad2, TrendingUp, Star, Play, Users } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface GameOverviewCardProps {
  id: string;
  name: string;
  provider: string;
  thumbnail?: string;
  category: string;
  minBet: number;
  maxWin?: string;
  rtp?: number;
  players?: number;
  isPopular?: boolean;
  isFeatured?: boolean;
  onPlay: () => void;
}

export default function GameOverviewCard({
  id,
  name,
  provider,
  thumbnail,
  category,
  minBet,
  maxWin,
  rtp,
  players,
  isPopular = false,
  isFeatured = false,
  onPlay,
}: GameOverviewCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <TouchableOpacity
      style={[styles.container, isFeatured && styles.featuredContainer]}
      onPress={onPlay}
      activeOpacity={0.9}>
      {/* Game Thumbnail */}
      <View style={styles.thumbnailContainer}>
        {thumbnail ? (
          <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
        ) : (
          <View style={styles.thumbnailPlaceholder}>
            <Gamepad2 size={40} color={theme.colors.textSecondary} />
          </View>
        )}
        {isPopular && (
          <View style={styles.popularBadge}>
            <Star size={12} color={theme.colors.white} fill={theme.colors.white} />
            <Text style={styles.popularText}>Popular</Text>
          </View>
        )}
        {isFeatured && (
          <View style={styles.featuredBadge}>
            <TrendingUp size={12} color={theme.colors.white} />
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
        {maxWin && (
          <View style={styles.maxWinBadge}>
            <Text style={styles.maxWinText}>{maxWin}</Text>
          </View>
        )}
        <View style={styles.playOverlay}>
          <View style={styles.playButton}>
            <Play size={20} color={theme.colors.white} fill={theme.colors.white} />
          </View>
        </View>
      </View>

      {/* Game Info */}
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <View style={styles.gameInfo}>
            <Text style={styles.gameName} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.provider}>{provider}</Text>
          </View>
          {rtp && (
            <View style={styles.rtpBadge}>
              <Text style={styles.rtpText}>{rtp}% RTP</Text>
            </View>
          )}
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Min Bet</Text>
            <Text style={styles.statValue}>{formatCurrency(minBet)}</Text>
          </View>
          {players !== undefined && (
            <View style={styles.statItem}>
              <Users size={14} color={theme.colors.textSecondary} />
              <Text style={styles.playersText}>{players} playing</Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.playButtonCard} onPress={onPlay}>
          <Play size={16} color={theme.colors.white} />
          <Text style={styles.playButtonText}>Play Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.surface,
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featuredContainer: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  thumbnailContainer: {
    width: '100%',
    height: 160,
    position: 'relative',
    backgroundColor: theme.colors.backgroundLight,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  thumbnailPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  popularText: {
    fontSize: 11,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.white,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  featuredText: {
    fontSize: 11,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.white,
  },
  maxWinBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: theme.colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  maxWinText: {
    fontSize: 12,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.white,
  },
  playOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    padding: 16,
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
    fontSize: 18,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  provider: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  rtpBadge: {
    backgroundColor: theme.colors.backgroundLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rtpText: {
    fontSize: 11,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.success,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
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
  playersText: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  playButtonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: theme.radius.button,
    gap: 8,
  },
  playButtonText: {
    fontSize: 16,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.white,
  },
});

