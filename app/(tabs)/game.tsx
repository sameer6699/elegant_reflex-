import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { Pause, Play, Home as HomeIcon } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GAME_DURATION = 30;
const GRID_SIZE = 9;
const POINTS_PER_TAP = 10;

export default function GameScreen() {
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [activeCircle, setActiveCircle] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadBestScore();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
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

  const saveBestScore = async (newScore: number) => {
    try {
      if (newScore > bestScore) {
        await AsyncStorage.setItem('bestScore', newScore.toString());
        setBestScore(newScore);
      }
    } catch (error) {
      console.error('Error saving best score:', error);
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameStarted(true);
    setIsPaused(false);
    setShowResult(false);
    spawnNewCircle();
    startTimer();
  };

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setGameStarted(false);
    setActiveCircle(null);
    setShowResult(true);
    saveBestScore(score);
  };

  const spawnNewCircle = () => {
    const randomIndex = Math.floor(Math.random() * GRID_SIZE);
    setActiveCircle(randomIndex);
  };

  const handleCircleTap = (index: number) => {
    if (!gameStarted || isPaused) return;

    if (index === activeCircle) {
      setScore((prev) => prev + POINTS_PER_TAP);
      spawnNewCircle();
    }
  };

  const togglePause = () => {
    if (!gameStarted) return;

    if (isPaused) {
      setIsPaused(false);
      startTimer();
    } else {
      setIsPaused(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const renderGrid = () => {
    return Array.from({ length: GRID_SIZE }).map((_, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.gridCircle,
          activeCircle === index && styles.activeCircle,
        ]}
        onPress={() => handleCircleTap(index)}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reflex Challenge</Text>
      </View>

      <View style={styles.scoreBar}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.timerText}>Time: {timeLeft}s</Text>
      </View>

      <View style={styles.gameArea}>
        <View style={styles.grid}>{renderGrid()}</View>
      </View>

      <View style={styles.controls}>
        {!gameStarted && !showResult && (
          <TouchableOpacity style={styles.primaryButton} onPress={startGame}>
            <Text style={styles.primaryButtonText}>Start Game</Text>
          </TouchableOpacity>
        )}

        {gameStarted && (
          <TouchableOpacity style={styles.secondaryButton} onPress={togglePause}>
            <View style={styles.buttonContent}>
              {isPaused ? (
                <>
                  <Play size={20} color={theme.colors.primary} />
                  <Text style={styles.secondaryButtonText}>Resume</Text>
                </>
              ) : (
                <>
                  <Pause size={20} color={theme.colors.primary} />
                  <Text style={styles.secondaryButtonText}>Pause</Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>

      <Modal visible={showResult} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Game Over!</Text>
            <Text style={styles.finalScoreLabel}>Your Score</Text>
            <Text style={styles.finalScore}>{score}</Text>
            <Text style={styles.bestScoreText}>Best Score: {bestScore}</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowResult(false);
                startGame();
              }}>
              <Text style={styles.modalButtonText}>Play Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalSecondaryButton}
              onPress={() => {
                setShowResult(false);
                router.push('/');
              }}>
              <View style={styles.buttonContent}>
                <HomeIcon size={20} color={theme.colors.primary} />
                <Text style={styles.secondaryButtonText}>Home</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: theme.fonts.heading,
    color: theme.colors.primary,
  },
  scoreBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  scoreText: {
    fontSize: 18,
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.textSecondary,
  },
  timerText: {
    fontSize: 18,
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.textSecondary,
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  grid: {
    width: '100%',
    aspectRatio: 1,
    maxWidth: 350,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    padding: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridCircle: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 1000,
    backgroundColor: theme.colors.inactive,
  },
  activeCircle: {
    backgroundColor: theme.colors.primary,
  },
  controls: {
    padding: 24,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: theme.radius.button,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.white,
  },
  secondaryButton: {
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.surface,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: theme.radius.button,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.primary,
    marginLeft: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 32,
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: theme.fonts.heading,
    color: theme.colors.primary,
    marginBottom: 16,
  },
  finalScoreLabel: {
    fontSize: 16,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  finalScore: {
    fontSize: 48,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.success,
    marginBottom: 8,
  },
  bestScoreText: {
    fontSize: 16,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: 32,
  },
  modalButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: theme.radius.button,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalButtonText: {
    fontSize: 16,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.white,
  },
  modalSecondaryButton: {
    backgroundColor: theme.colors.surface,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: theme.radius.button,
    width: '100%',
    alignItems: 'center',
  },
});
