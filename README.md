

# Contador com Fundo Gradiente

Este projeto apresenta um contador regressivo com design moderno, utilizando **React Native Expo** 
e um fundo com gradiente. O contador exibe o tempo restante no formato `dd/hh:mm:ss` e conta regressivamente. 
Além disso, ao clicar em um emoji, a tela é invadida por um efeito de "chuva de confete", 
adicionando diversão à experiência.

---

## Pré-requisitos para rodar localmente

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/albavxs/Contador-expo
   cd contador-expo
   ```

2. **Node.js**:  Certifique-se de que o [Node.js](https://nodejs.org/) está instalado no seu sistema.
   
3. **Android Studio**: Certifique-se de que o [Android Studio](https://developer.android.com/) está instalado no seu sistema.
   
   Passos para rodar no Android Studio (emulador):
   1. Abra o Android Studio.
   2. Vá até **Tools > AVD Manager** (Android Virtual Device Manager).
   3. Clique em **Create Virtual Device**.
   4. Escolha o tipo de dispositivo (por exemplo, Pixel 4, versao 34 recomendada) e clique em **Next**.
   5. Inicie o dispositivo.

4. **Xcode (somente macOS)**:
   Certifique-se de que o Xcode está instalado no seu sistema.
   1. Abra o Xcode e vá até **Xcode > Preferences > Locations** para garantir que a linha de comando do Xcode está configurada corretamente.
   2. Simulador iOS: Abra o Xcode, clique em **Xcode > Open Developer Tool > Simulator**. Isso abrirá o simulador de dispositivos iOS, onde você pode rodar seu app em um dispositivo   simulado. 

5. **Expo CLI**: Instale globalmente :
   ```bash
   npm install -g expo-cli
   ```

6. **Dependências do Projeto**: Instale as dependências do projeto com:
   ```bash
   npm install
   ```

7. **Instale o `expo-splash-screen`**:
   ```bash
   npm install expo-splash-screen

   ```

8. **Instale o `react-native-reanimated`**:
   ```bash
   npm install react-native-reanimated


   ```


9. **Instale o `expo-linear-gradient`**:
   ```bash
   npm install expo-linear-gradient 
   ```

10. **Instale o `react-native-confetti-cannon`**:
   ```bash
   npm install react-native-confetti-cannon
   ```



11. **Inicie o Servidor de Desenvolvimento**:
   ```caso no terminal seja sugerido atualizar o expo go: y
   bash 
   npx expo start
   ```



12. **Build Android**: Com o Android Studio instalado, um dispositivo rodando e as variáveis de ambiente bem configuradas, use o comando para rodar diretamente sem precisar de outras instruções ou gerar a build eas manualmente:

   ```bash
   para apk
   eas build -p android --profile preview 
   instala a build locall
   adb install ./build/app-release.apk
   caso queria rodar via terminal após
   adb shell monkey -p com.pegui.expoapx -c android.intent.category.LAUNCHER 1
   ```

13. **Gerar Build iOS**: Para gerar uma build para iOS e gerar o arquivo .ipa, use o seguinte comando para rodar sem precisar das outras instruções:
```
   
### Gerar Build iOS

Para gerar uma build para iOS usando o **Expo EAS Build**, o comando correto é:

```bash
eas build --platform ios
```

Este comando vai gerar uma build para a plataforma iOS. Após a build ser concluída, você encontrará o arquivo `.ipa` gerado na pasta de saída, geralmente dentro da pasta `./build/` (ou o diretório onde o projeto foi configurado para salvar as builds).

### Instalar o `.ipa` no Simulador iOS

1. Com o **Simulador iOS** já aberto, use o **Terminal** no seu Mac para instalar o `.ipa` no simulador.

2. Use o seguinte comando, alterando o caminho do `.ipa` gerado para o correto:

```bash
xcrun simctl install booted ./build/nomeDoSeuApp.ipa
```

Certifique-se de substituir `nomeDoSeuApp` pelo nome real do arquivo `.ipa` que foi gerado.

3. Após a instalação, você pode **lançar** o aplicativo no simulador com o comando:

```bash
xcrun simctl launch booted com.seu.app.bundleId
```

Substitua `com.seu.app.bundleId` pelo **Bundle Identifier** do seu aplicativo, que você pode encontrar no arquivo `app.json` ou `app.config.js` na chave `expo.ios.bundleIdentifier`.

### Considerações Finais

- **Caminho correto**: Não se esqueça de verificar o caminho correto do arquivo `.ipa` gerado após o processo de build.
- **Simulador ligado**: O comando `booted` no `simctl` assume que o simulador está em execução. Certifique-se de que o simulador esteja aberto e rodando antes de executar os comandos.

Esses passos devem ser suficientes para gerar e testar o aplicativo iOS no simulador.
``


---

## Como Usar

1. Certifique-se de que o ambiente foi configurado corretamente.
2. Inicie o projeto com `npx expo start`.
3. Use um emulador ou conecte um dispositivo físico para visualizar o aplicativo.
4. O contador iniciará automaticamente a partir de 7 dias (em segundos) e atualizará em tempo real.
5. Clique no emoji para ver o efeito de confete!

---

## Funcionalidades

- **Contador regressivo** com atualização em tempo real.
- **Formatação do tempo** no formato: `dd/hh:mm:ss`.
- **Fundo estilizado com gradiente** usando `expo-linear-gradient`.
- **Efeito de confetes** ao clicar em um emoji (quantidade de cliques por segundo limitada).
- Layout **responsivo** e **estilizado**.

---

## Estrutura do Código

- **Estado do contador**:
  O estado `timeLeft` armazena o tempo restante em segundos (7 dias por padrão).
  ```javascript
   const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60; // 7 dias em segundos 
  ```

- **Efeito para atualização**:
  Atualiza o contador a cada segundo até o tempo acabar.
  ```typescript
   const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
    }, [timeLeft, formatTime, showConfetti]);
  ```

- **Gradiente com `LinearGradient`**:
  Utiliza `expo-linear-gradient` para o fundo com gradiente.
  ```typescript
  <LinearGradient colors={['#eee', '#4EC5F1']} style={styles.container}>
    {/* Conteúdo */}
  </LinearGradient>
  ```

- **Função de formatação de tempo em hooks**:
  A função `formatTime` converte o tempo restante de segundos para o formato `dd/hh:mm:ss`.
  ```typescript
    const formatTime = useCallback((time: number): string => {
    const days = Math.floor(time / SECONDS_IN_A_DAY);
    const hours = Math.floor((time % SECONDS_IN_A_DAY) / SECONDS_IN_AN_HOUR);
    const minutes = Math.floor((time % SECONDS_IN_AN_HOUR) / SECONDS_IN_A_MINUTE);
    const seconds = time % SECONDS_IN_A_MINUTE;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, []);
  ```

- **Efeito de Confetes em hooks**:
  Ao clicar no emoji, os confetes são disparados utilizando o pacote `react-native-reanimated`.
  ```typescript
  const FallingEmoji: React.FC<{ x: number; delay: number }> = ({ x, delay }) => {
  const translateY = useSharedValue(-100); // Começa bem acima do topo da tela

  // Obtém a largura da janela
  const SCREEN_WIDTH = Dimensions.get('window').width;
 
  // Configurações do efeito de confete
  const CONFETTI_COUNT = 15;
  const FALL_SPEED = 2500;

  const ConfettiEffect: React.FC = () => (
  <ConfettiCannon
    count={CONFETTI_COUNT}
    origin={{ x: SCREEN_WIDTH / 2, y: 0 }} // Origem centralizada no topo
    fallSpeed={FALL_SPEED}
    fadeOut={true} // Efeito de fade-out ao desaparecer
  />
  );
  ```

---

## Estilos

Os estilos são definidos no arquivo `StyleSheet.d.ts` e configurados diretamente no componente `index`:

```typescript
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
    fontFamily: 'opensans', // Aplica a fonte personalizada
  },
});
```

---

## Estilos do Component `Title`

O `Title` em components recebe um texto como propriedade e aplica os estilos definidos:

```typescript
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
```

---

## Personalização

- **Altere o gradiente**: Atualize os valores da propriedade `colors` no `LinearGradient` para personalizar o visual:
  ```typescript
   <LinearGradient colors={['#eee', '#4EC5F1']}>
  ```

- **Mude o tempo inicial**: Altere o valor do estado inicial de `timeLeft` para outro intervalo:
  ```typescript
  const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60; // sete dias em segundos
  ```

---

## Dependências Utilizadas

- `react`
- `react-native`
- `expo`
- `expo-linear-gradient`
- `react-native-confetti-cannon`

---

## Contato

Se tiver dúvidas ou sugestões, entre em contato:

- **Email**: [paulogui5433@outlook.com]
- **GitHub**: [albavxs](https://github.com/albavxs/Contador-expo)

---

**Divirta-se usando este projeto!** 🥳