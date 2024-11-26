import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60;

const HomeScreen: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(SEVEN_DAYS_IN_SECONDS);

  // Formata o tempo restante no formato "dd/hh:mm:ss"
  const formatTime = (seconds: number): string => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(days).padStart(2, '0')}/${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  // Atualiza o contador a cada segundo
  useEffect(() => {
    if (timeLeft <= 0) return;

    const updateTimer = () => setTimeLeft((prevTime) => prevTime - 1);

    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  return (
    <LinearGradient
      colors={['#eee', '#4EC5F1']}
      style={styles.container}
    >
      <Header />
      <Title text="Contador" />
      <TimeDisplay formattedTime={formatTime(timeLeft)} />
    </LinearGradient>
  );
};

// Componentes para melhorar a separação de responsabilidades

const Header: React.FC = () => (
  <View style={styles.emojiContainer}>
    <Text style={styles.emoji}>🗓</Text>
  </View>
);

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.title}>{text}</Text>
  </View>
);

interface TimeDisplayProps {
  formattedTime: string;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ formattedTime }) => (
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
