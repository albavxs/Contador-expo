import React, { useEffect, useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ConfettiCannon from 'react-native-confetti-cannon';

const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60;
const { width } = Dimensions.get('window');

// Função para formatar o tempo
const formatTime = (seconds: number): string => {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(days).padStart(2, '0')}/${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const HomeScreen: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(SEVEN_DAYS_IN_SECONDS);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startTime = Date.now();
    const updateTimer = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remainingTime = Math.max(SEVEN_DAYS_IN_SECONDS - elapsed, 0);
      setTimeLeft(remainingTime);
      if (remainingTime <= 0 && intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    intervalRef.current = setInterval(updateTimer, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleEmojiClick = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000); // Duração do confete
  }, []);

  return (
    <LinearGradient colors={['#eee', '#4EC5F1']} style={styles.container}>
      <Header onEmojiClick={handleEmojiClick} />
      <Title text="Contador" />
      <TimeDisplay formattedTime={formatTime(timeLeft)} />
      {showConfetti && (
        <ConfettiCannon
          count={40} // Número de confetes
          origin={{ x: width / 2, y: 0 }} // Posição de origem dos confetes
          fallSpeed={4500} // Velocidade da queda dos confetes
          fadeOut={true} // FadeOut quando desaparece
        />
      )}
    </LinearGradient>
  );
};

// Componente Header
const Header: React.FC<{ onEmojiClick: () => void }> = ({ onEmojiClick }) => (
  <View style={styles.emojiContainer}>
    <Text style={styles.emoji} onPress={onEmojiClick}>
      🥳
    </Text>
  </View>
);

// Componente Title
const Title: React.FC<{ text: string }> = ({ text }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.title}>{text}</Text>
  </View>
);

// Componente TimeDisplay
const TimeDisplay: React.FC<{ formattedTime: string }> = ({ formattedTime }) => (
  <View style={styles.timeContainer}>
    <Text style={styles.timeText}>{formattedTime}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiContainer: {
    marginBottom: 16,
  },
  emoji: {
    fontSize: 48,
    textAlign: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  timeContainer: {
    marginTop: 20,
  },
  timeText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
