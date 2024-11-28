# HomeScreen - Contador com Fundo Gradiente

Este projeto apresenta um contador regressivo com design moderno, utilizando **React Native Expo** e um fundo com gradiente. O contador exibe o tempo restante no formato `dd/hh:mm:ss` e conta regressivamente. Além disso, ao clicar em um emoji, a tela é invadida por um efeito de "chuva de confete", adicionando diversão à experiência.

---


## Pré-requisitos para rodar localmente

1. **Clone o Repositório**:
   ```bash ou terminal
   git clone <https://github.com/albavxs/Contador-expo>
   cd <expo-apx>
   ```

2. **Node.js**: Certifique-se de que o [Node.js](https://nodejs.org/) está instalado no seu sistema.
   
3. **Android Studio**: Certifique-se de que o [Android.studio](https://developer.android.com/) está instalado no seu sistema.
   ``` Vá em Running Devices
   e ative um device da sua escolha

   ```

4. **Dependências do Projeto**: Instale as dependências do projeto com:
   ```bash ou terminal
   npm install
   ```



5. **Instale o `expo-linear-gradient`**:
   ```bash ou terminal
   npm install expo-linear-gradient 
   ```

6. **Instale o `react-native-confetti-cannon`**:
   ```bash ou terminal
   npm install react-native-confetti-cannon
   ```   

7. **Instale o pacote para confetes** (exemplo com `react-native-confetti-cannon`):
   ```bash ou terminal
   npm install react-native-confetti-cannon
   ```

8. **Inicie o Servidor de Desenvolvimento**:
   ```bash ou terminal
   npx expo start
   ```
   

---

## Como Usar

1. Certifique-se de que o ambiente foi configurado corretamente.
2. Inicie o projeto com `expo start`.
3. Use um emulador ou conecte um dispositivo físico para visualizar o aplicativo.
4. O contador iniciará automaticamente a partir de 7 dias (em segundos) e atualizará em tempo real.
5. Clique no emoji para ver o efeito de confete!

---


---

## Funcionalidades

- **Contador regressivo** com atualização em tempo real.
- **Formatação do tempo** no formato: `dd/hh:mm:ss`.
- **Fundo estilizado com gradiente** usando `expo-linear-gradient`.
- **Efeito de confetes** ao clicar em um emoji.
- Layout **responsivo** e **estilizado**.

---


## Estrutura do Código

### Componente Principal: `Homescreen presente em index.tsx`

- **Estado do contador**:
  O estado `timeLeft` armazena o tempo restante em segundos (7 dias por padrão).
  ```javascript
   const [timeLeft, setTimeLeft] = useState<number>(SEVEN_DAYS_IN_SECONDS);  // 7 dias em segundos

  ```

- **Efeito para atualização do contador**:
  Atualiza o contador a cada segundo até o tempo acabar.
  ```Typescript
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);
  ```

- **Gradiente com `LinearGradient`**:
  Utiliza `expo-linear-gradient` para o fundo com gradiente.
  ```Typescript
  <LinearGradient colors={['#eee', '#4EC5F1']} style={styles.container}>
    {/* Conteúdo */}
  </LinearGradient>
  ```

- **Função de formatação de tempo**:
  A função `formatTime` converte o tempo restante de segundos para o formato `dd/hh:mm:ss`.
  ```Typescript
  const formatTime = (seconds: number): string => {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(days).padStart(2, '0')}/${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

  };
  ```

- **Efeito de Confetes**:
  Ao clicar no emoji, os confetes são disparados utilizando o pacote `react-native-reanimated`.
  ```Typescript
  const FallingEmoji: React.FC<{ x: number; delay: number }> = ({ x, delay }) => {
  const translateY = useSharedValue(-100); // Começa bem acima do topo da tela

  // Inicia a animação ao montar o componente
  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withTiming(height + 100, { // Sai abaixo do limite inferior da tela
        duration: 3000,
        easing: Easing.out(Easing.quad),
      })
    );
  }, [delay]);
  ```

---

## Estilos

O estilo é definido no arquivo `StyleSheet.d.ts`:

```Typescript
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
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  timeContainer: {
    marginTop: 20,
  },
  timeText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  emojiRain: {
    position: 'absolute', // Importante para posicionar fora do fluxo normal
    top: 0, // Garante que a posição seja relativa ao topo da tela
    fontSize: 32,
  },
});
```

---



## Personalização

- **Altere o gradiente**: Atualize os valores da propriedade `colors` no `LinearGradient` para personalizar o visual:
  ```Typescript
   <LinearGradient colors={['#eee', '#4EC5F1']}
  ```

- **Mude o tempo inicial**: Altere o valor do estado inicial de `timeLeft` para outro intervalo:
  ```Typescript
  const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60; //sete dias em segundos
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
- **GitHub**: [albavxs](https://github.com/albavxs)

---

**Divirta-se usando este projeto!** 🥳

---