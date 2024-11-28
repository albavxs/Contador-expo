import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Title: React.FC<{ text: string }> = ({ text }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'opensans', // Aplica a fonte personalizada
  },
});

export default Title;
