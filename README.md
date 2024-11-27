
## Pré-requisitos para rodar localmente

1. **Clone o Repositório**:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>
   ```

2. **Node.js**: Certifique-se de que o [Node.js](https://nodejs.org/) está instalado no seu sistema.
   
3. **Expo CLI**: Caso não esteja instalado, instale globalmente:
   ```bash
   npm install -g expo-cli
   ```

4. **Dependências do Projeto**: Instale as dependências do projeto com:
   ```bash
   npm install
   ```

5. **Instale o `expo-linear-gradient`**:
   ```bash
   expo install expo-linear-gradient
   ```

6. **Instale o pacote para confetes** (exemplo com `react-native-confetti-cannon`):
   ```bash
   npm install react-native-confetti-cannon
   ```

7. ** Possuir um Android Studio instalado 
   ```device da sua escolha ativo

   ```

8. **Inicie o Servidor de Desenvolvimento**:
   ```bash
    expo start
   ```

---

   


# HomeScreen - Contador com Fundo Gradiente

Este projeto apresenta um contador regressivo com design moderno, utilizando **React Native Expo** e um fundo com gradiente. O contador exibe o tempo restante no formato `dd/hh:mm:ss` e conta regressivamente. Além disso, ao clicar em um emoji, a tela é invadida por um efeito de "chuva de confete", adicionando diversão à experiência.

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

### Componente Principal: `HomeScreen.js`

- **Estado do contador**:
  O estado `timeLeft` armazena o tempo restante em segundos (7 dias por padrão).
  ```javascript
  const [timeLeft, setTimeLeft] = useState(7 * 24 * 60 * 60); // 7 dias em segundos
  ```

- **Efeito para atualização do contador**:
  Atualiza o contador a cada segundo até o tempo acabar.
  ```javascript
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);
  ```

- **Gradiente com `LinearGradient`**:
  Utiliza `expo-linear-gradient` para o fundo com gradiente.
  ```javascript
  <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
    {/* Conteúdo */}
  </LinearGradient>
  ```

- **Função de formatação de tempo**:
  A função `formatTime` converte o tempo restante de segundos para o formato `dd/hh:mm:ss`.
  ```javascript
  const formatTime = (timeInSeconds) => {
    const days = Math.floor(timeInSeconds / (24 * 60 * 60));
    const hours = Math.floor((timeInSeconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${String(days).padStart(2, '0')}/${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  ```

- **Efeito de Confetes**:
  Ao clicar no emoji, os confetes são disparados utilizando o pacote `react-native-confetti-cannon`.
  ```javascript
  const [showConfetti, setShowConfetti] = useState(false);

  const handleEmojiClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000); // Exibe confetes por 2 segundos
  };
  ```

---

## Estilos

O estilo é definido no arquivo `StyleSheet`:

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  emoji: {
    fontSize: 48,
    marginTop: 20,
  },
});
```

---

## Como Usar

1. Certifique-se de que o ambiente foi configurado corretamente.
2. Inicie o projeto com `expo start`.
3. Use um emulador ou conecte um dispositivo físico para visualizar o aplicativo.
4. O contador iniciará automaticamente a partir de 7 dias (em segundos) e atualizará em tempo real.
5. Clique no emoji para ver o efeito de confete!

---

## Personalização

- **Altere o gradiente**: Atualize os valores da propriedade `colors` no `LinearGradient` para personalizar o visual:
  ```javascript
  colors={['#ff7e5f', '#feb47b']}
  ```

- **Mude o tempo inicial**: Altere o valor do estado inicial de `timeLeft` para outro intervalo:
  ```javascript
  const [timeLeft, setTimeLeft] = useState(3 * 24 * 60 * 60); // 3 dias em segundos
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

- **Email**: [paulogui5433@outlook.com](mailto:seu-email@example.com)
- **GitHub**: [albavxs](https://github.com/albavxs)

---

**Divirta-se usando este projeto!** 🚀

---