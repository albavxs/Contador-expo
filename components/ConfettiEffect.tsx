import React from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Dimensions } from 'react-native';

// Obtém a largura da janela
const SCREEN_WIDTH = Dimensions.get('window').width;

// Configurações do efeito de confete
const CONFETTI_COUNT = 10;
const FALL_SPEED = 3000;

const ConfettiEffect: React.FC = () => (
  <ConfettiCannon
    count={CONFETTI_COUNT}
    origin={{ x: SCREEN_WIDTH / 2, y: 0 }} // Origem centralizada no topo
    fallSpeed={FALL_SPEED}
    fadeOut={true} // Efeito de fade-out ao desaparecer
  />
);

export default ConfettiEffect;
