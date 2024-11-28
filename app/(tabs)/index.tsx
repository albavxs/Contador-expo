import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useCountdown } from '../../hooks/useCountdown.web';
import { useConfetti } from '../../hooks/useConfetti.web';
import Title from '../../components/Title';
import ConfettiEffect from '../../components/ConfettiEffect';

const HomeScreen: React.FC = () => {
  // 7 dias em segundos: 7 * 24 * 60 * 60
  const { timeLeft, formattedTime } = useCountdown(7 * 24 * 60 * 60); // Inicia com 7 dias
  const { isConfettiVisible, triggerConfetti } = useConfetti();

  useEffect(() => {
    if (timeLeft <= 0) {
      console.log('Contagem regressiva concluída!');
    }
  }, [timeLeft]);


  
  return (
    <LinearGradient colors={['#eee', '#4EC5F1']} style={styles.container}>
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
    color: '#fff',
    fontFamily: 'opensans',
  },
});

export default HomeScreen;
