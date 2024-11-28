import React from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ConfettiEffect: React.FC = () => (
  <ConfettiCannon
    count={15}
    origin={{ x: width / 2, y: 0 }}
    fallSpeed={2500}
    fadeOut={true}
  />
);

export default ConfettiEffect;
