import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { ComponentProps } from 'react';
import { Platform } from 'react-native';

type ExternalLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string; // Tipo string para links externos
};

export function ExternalLink({ href, ...rest }: ExternalLinkProps) {
  const isWebPlatform = Platform.OS === 'web';

  return (
    <Link
      target="_blank"
      {...rest}
      href={href as any} // Coerção para evitar erro de tipagem
      onPress={async (event) => {
        if (!isWebPlatform) {
          // Previne o comportamento padrão no navegador nativo
          event.preventDefault();
          // Abre o link no navegador integrado do app
          await openBrowserAsync(href);
        }
      }}
    />
  );
}
