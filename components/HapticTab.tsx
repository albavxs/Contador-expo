import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native'; // Importando a plataforma do React Native

// Função separada para o feedback tátil
const handleHapticFeedback = () => {
  if (Platform.OS === 'ios') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
};

export function HapticTab({ onPressIn, ...props }: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        handleHapticFeedback();
        onPressIn?.(ev); // Chama a função original, se definida
      }}
    />
  );
}
