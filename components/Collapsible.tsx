import { PropsWithChildren, useState, useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Constantes para valores fixos
const ICON_SIZE = 18;
const ACTIVE_OPACITY = 0.8;

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  // Define estilo rotativo do ícone com memoização para evitar recomputações desnecessárias
  const iconStyle = useMemo(
    () => ({
      transform: [{ rotate: isOpen ? '90deg' : '0deg' }],
    }),
    [isOpen],
  );

  // Cor do ícone com base no tema atual
  const iconColor = theme === 'light' ? Colors.light.icon : Colors.dark.icon;

  // Função para alternar o estado de exibição
  const toggleOpenState = () => setIsOpen((prev) => !prev);

  return (
    <ThemedView>
      <CollapsibleHeader
        title={title}
        iconStyle={iconStyle}
        iconColor={iconColor}
        onPress={toggleOpenState}
      />
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

// Componente para o cabeçalho colapsável
const CollapsibleHeader = ({
  title,
  iconStyle,
  iconColor,
  onPress,
}: {
  title: string;
  iconStyle: object;
  iconColor: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={styles.heading}
    onPress={onPress}
    activeOpacity={ACTIVE_OPACITY}>
    <IconSymbol
      name="chevron.right"
      size={ICON_SIZE}
      weight="medium"
      color={iconColor}
      style={iconStyle}
    />
    <ThemedText type="defaultSemiBold">{title}</ThemedText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
