import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href as unknown as "/"} // Aqui você força a string a ser aceita
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          // Impede o comportamento padrão de abrir no navegador nativo
          event.preventDefault();
          // Abre o link em um navegador in-app
          await openBrowserAsync(href);
        }
      }}
    />
  );
}
