import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Gamepad2, Star, TrendingUp, Play } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface GameCardProps {
  id: string;
  name: string;
  provider: string;
  thumbnail?: string;
  minBet: number;
  maxWin?: string;
  rtp?: number;
  category?: string;
  isFavorite?: boolean;
  onPlay: () => void;
  onFavorite?: () => void;
}

export default function GameCard({
  id,
  name,
  provider,
  thumbnail,
  minBet,
  maxWin,
  rtp,
  category,
  isFavorite = false,
  onPlay,
  onFavorite,
}: GameCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPlay} activeOpacity={0.9}>
      {/* Game Thumbnail */}
      <View style={styles.thumbnailContainer}>
        {thumbnail ? (
          <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
        ) : (
          <View style={styles.thumbnailPlaceholder}>
            <Gamepad2 size={40} color={theme.colors.textSecondary} />
          </View>
        )}
        {onFavorite && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={(e) => {
              e.stopPropagation();
              onFavorite();
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Star
              size={20}
              color={isFavorite ? '#FBBF24' : theme.colors.white}
              fill={isFavorite ? '#FBBF24' : 'none'}
            />
          </TouchableOpacity>
        )}
        {maxWin && (
          <View style={styles.maxWinBadge}>
            <TrendingUp size={12} color={theme.colors.white} />
            <Text style={styles.maxWinText}>{maxWin}</Text>
          </View>
        )}
        <View style={styles.playOverlay}>
          <View style={styles.playButton}>
            <Play size={24} color={theme.colors.white} fill={theme.colors.white} />
          </View>
        </View>
      </View>

      {/* Game Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.gameName} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.provider}>{provider}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Min Bet</Text>
            <Text style={styles.statValue}>{formatCurrency(minBet)}</Text>
          </View>
          {rtp && (
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>RTP</Text>
              <Text style={[styles.statValue, styles.rtpValue]}>{rtp}%</Text>
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
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.surface,
  },
  thumbnailContainer: {
    width: '100%',
    height: 180,
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
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maxWinBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
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
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    padding: 16,
  },
  gameName: {
    fontSize: 18,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  provider: {
    fontSize: 14,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.textPrimary,
  },
  rtpValue: {
    color: theme.colors.success,
  },
});

