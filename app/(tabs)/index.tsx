import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useCountdown } from '../../hooks/useCountdown.web';
import { useConfetti } from '../../hooks/useConfetti.web';
import Title from '../../components/Title';
import ConfettiEffect from '../../components/ConfettiEffect';

const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60; // 7 dias em segundos

const HomeScreen: React.FC = () => {
  const { timeLeft, formattedTime } = useCountdown(SEVEN_DAYS_IN_SECONDS);
  const { isConfettiVisible, triggerConfetti } = useConfetti();

  // Lida com o término da contagem regressiva
  useEffect(() => {
    if (timeLeft <= 0) handleCountdownEnd();
  }, [timeLeft]);

  // Função separada para o término da contagem
  const handleCountdownEnd = () => {
    console.log('Contagem regressiva concluída!');
  };


  
  return (
    <LinearGradient colors={['#20272F', 'hsl(212, 49%, 27%)']} style={styles.container}>
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji} onPress={triggerConfetti}>
          🥳
        </Text>
      </View>
      <Title text="Contador" />
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {formattedTime}
        </Text>
      </View>
      {isConfettiVisible && <ConfettiEffect />}
    </LinearGradient>
  );
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
  timeContainer: {
    marginTop: 20,
  },
  timeText: {
    fontSize: 28,
    color: '#eee',
    fontFamily: 'opensans',
  },
});

export default HomeScreen;
