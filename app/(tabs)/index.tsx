import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  // Estado para armazenar o tempo restante
  const [timeLeft, setTimeLeft] = useState(7 * 24 * 60 * 60); // 7 dias em segundos

  // Função para formatar o tempo (em segundos) para o formato "dd/hh:mm:ss"
  const formatTime = (timeInSeconds: number) => {
    const days = Math.floor(timeInSeconds / (24 * 60 * 60));
    const hours = Math.floor((timeInSeconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${String(days).padStart(2, '0')}/${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Efeito para atualizar o contador a cada segundo
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(timer);
  }, [timeLeft]);

 return (
    <LinearGradient
      colors={['#eee', '#4EC5F1']} // Gradiente de fundo
      style={styles.container} // Aplica o estilo no gradiente
    >
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>🗓</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Contador</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
      </View>
    </LinearGradient>
  );
}

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