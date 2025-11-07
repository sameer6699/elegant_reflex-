import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Target, Timer, Trophy } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export default function InstructionsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>How to Play</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.instructionCard}>
          <View style={styles.iconCircle}>
            <Target size={32} color={theme.colors.primary} />
          </View>
          <Text style={styles.instructionTitle}>Tap the Circles</Text>
          <Text style={styles.instructionText}>
            Tap the highlighted circles as they appear on the grid. Each correct tap earns you points.
          </Text>
        </View>

        <View style={styles.instructionCard}>
          <View style={styles.iconCircle}>
            <Timer size={32} color={theme.colors.primary} />
          </View>
          <Text style={styles.instructionTitle}>Beat the Clock</Text>
          <Text style={styles.instructionText}>
            You have 30 seconds to score as many points as possible. The faster you tap, the higher your score.
          </Text>
        </View>

        <View style={styles.instructionCard}>
          <View style={styles.iconCircle}>
            <Trophy size={32} color={theme.colors.success} />
          </View>
          <Text style={styles.instructionTitle}>Set High Scores</Text>
          <Text style={styles.instructionText}>
            Your best score is saved automatically. Compete with yourself and improve your reflexes.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push('/game')}>
          <Text style={styles.startButtonText}>Start Playing</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.heading,
    color: theme.colors.primary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  instructionCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  instructionTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.heading,
    color: theme.colors.primary,
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 15,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  startButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: theme.radius.button,
    alignItems: 'center',
    marginTop: 16,
  },
  startButtonText: {
    fontSize: 18,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.white,
  },
});
