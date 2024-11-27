import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60;
const { width, height } = Dimensions.get('window');

// Função utilitária para formatar o tempo
const formatTime = (seconds: number): string => {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(days).padStart(2, '0')}/${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const HomeScreen: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(SEVEN_DAYS_IN_SECONDS);
  const [emojis, setEmojis] = useState<Array<{ id: string; x: number; delay: number }>>([]);

  // Atualiza o contador de tempo a cada segundo
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Adiciona emojis à tela com animação
  const handleEmojiClick = useCallback(() => {
    const newEmojis = Array.from({ length: 5 }).map(() => ({
      id: Math.random().toString(),
      x: Math.random() * width, // Posição horizontal aleatória
      delay: Math.random() * 1000, // Atraso na queda
    }));
    setEmojis((prevEmojis) => [...prevEmojis, ...newEmojis]);
  }, []);

  return (
    <LinearGradient colors={['#eee', '#4EC5F1']} style={styles.container}>
      <Header onEmojiClick={handleEmojiClick} />
      <Title text="Contador" />
      <TimeDisplay formattedTime={formatTime(timeLeft)} />
      {emojis.map((emoji) => (
        <FallingEmoji key={emoji.id} x={emoji.x} delay={emoji.delay} />
      ))}
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
interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.title}>{text}</Text>
  </View>
);

// Componente TimeDisplay
interface TimeDisplayProps {
  formattedTime: string;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ formattedTime }) => (
  <View style={styles.timeContainer}>
    <Text style={styles.timeText}>{formattedTime}</Text>
  </View>
);

// Componente para criar o efeito de queda dos emojis
const FallingEmoji: React.FC<{ x: number; delay: number }> = ({ x, delay }) => {
  const translateY = useSharedValue(-100); // Começa bem acima do topo da tela

  // Inicia a animação ao montar o componente
  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withTiming(height + 100, { // Sai abaixo do limite inferior da tela
        duration: 3000,
        easing: Easing.out(Easing.quad),
      })
    );
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    left: x,
  }));

  return <Animated.Text style={[styles.emojiRain, animatedStyle]}>🎉</Animated.Text>;
};

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
  emojiRain: {
    position: 'absolute', // Importante para posicionar fora do fluxo normal
    top: 0, // Garante que a posição seja relativa ao topo da tela
    fontSize: 32,
  },
});

export default HomeScreen;
