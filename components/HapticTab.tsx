import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

// Função para fornecer feedback tátil, dependendo da plataforma
const triggerHapticFeedback = () => {
  if (Platform.OS === 'ios') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {
      // Evita que erros não tratados do Haptics interrompam o fluxo
      console.warn('Haptic feedback not supported.');
    });
  }
};

// Componente personalizado para botões da barra inferior com feedback tátil
export function HapticTab({ onPressIn, ...props }: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(event) => {
        triggerHapticFeedback(); // Dispara o feedback tátil
        onPressIn?.(event); // Chama a função original, se definida
      }}
    />
  );
}
