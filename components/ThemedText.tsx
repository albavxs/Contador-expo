import { Text, StyleSheet, type TextProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

// Estilos centralizados
const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 16,
    lineHeight: 30,
    color: '#0a7ea4',
  },
});

// Mapeamento de estilos por tipo
const typeStyles: Record<Required<ThemedTextProps>['type'], object> = {
  default: styles.default,
  defaultSemiBold: styles.defaultSemiBold,
  title: styles.title,
  subtitle: styles.subtitle,
  link: styles.link,
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  // Obtém a cor do tema atual
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  // Seleciona o estilo apropriado com base no tipo
  const textStyle = typeStyles[type];

  return (
    <Text
      style={[{ color }, textStyle, style]} // Combina as cores e estilos personalizados
      {...rest} // Propaga as propriedades restantes
    />
  );
}


