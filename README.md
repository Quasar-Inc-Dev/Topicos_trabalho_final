# 📱 1. Título do Projeto: Clima Tempo

Esse projeto foi desenvolvido como trabalho final da disciplina de Tópicos Especiais. 

---

## 🚀 2. Proposta e Escopo

O aplicativo propõe ser uma plataforma mobile intuitiva para consultar a previsão do tempo com base na sua região (com foco inicial na cidade de Indaiatuba). 

O principal problema que o app resolve é a **dificuldade de encontrar informações climáticas detalhadas e precisas em uma interface limpa**, centralizando dados como sensação térmica, índice UV, umidade e gráficos de variação de temperatura de maneira rápida e acessível. O público-alvo do aplicativo são **moradores locais, estudantes, trabalhadores e entusiastas da meteorologia** que buscam uma ferramenta prática, fluida e na palma da mão para o planejamento do dia a dia.

---

## ✨ 3. Funcionalidades Principais

* **Consumo Dinâmico de Dados:** Integração e requisições em tempo real à API pública Open-Meteo.
* **Interface Responsiva e Animada:** Layout mobile amigável e otimizado usando React Native, com efeitos de *glassmorphism* (BlurView) e animações interativas.
* **Previsão Estendida:** Listagem em cards da previsão do tempo para os próximos 7 dias.
* **Previsão Horária:** Acompanhamento da variação de temperatura ao longo do dia (manhã, tarde e noite) em formato de gráfico e linha do tempo.
* **Métricas Detalhadas:** Tela de detalhes exibindo informações avançadas do clima, como precipitação, velocidade máxima do vento, umidade e Índice UV com alertas de cuidado.

---

## 🔌 4. API Utilizada

O aplicativo consome dados diretamente da seguinte API pública:

* **Nome da API:** Open-Meteo API
* **Link da Documentação:** [https://open-meteo.com/en/docs](https://open-meteo.com/en/docs)

---

## 🛠️ 5. Instruções de Execução

Siga o passo a passo detalhado abaixo para clonar o repositório e executar o projeto localmente em sua máquina.

### Pré-requisitos
Certifique-se de ter o **[Node.js](https://nodejs.org/)** instalado. Recomenda-se também ter o aplicativo **Expo Go** instalado no seu celular (Android ou iOS) para testar o aplicativo fisicamente.

### Passo a Passo

1. **Clone o repositório:**
   Abra o seu terminal e execute o comando:
   ```bash
   git clone [https://github.com/Quasar-Inc-Dev/Topicos_trabalho_final.git](https://github.com/Quasar-Inc-Dev/Topicos_trabalho_final.git)

```

2. **Acesse a pasta do projeto:**
```bash
cd Topicos_trabalho_final

```


3. **Instale as dependências:**
Rode o comando abaixo para instalar todos os pacotes necessários contidos no `package.json`:
```bash
npm install

```


4. **Execute o projeto:**
Inicie o servidor do Expo rodando:
```bash
npx expo start

```


5. **Visualize o App:**
* **No Celular:** Abra o aplicativo **Expo Go** e escaneie o QR Code que apareceu no terminal (ou no navegador).
* **No Emulador:** Pressione a tecla `a` no terminal para abrir no Android Emulator, ou `i` para abrir no iOS Simulator (é preciso ter os emuladores configurados previamente).



---

## 👥 Equipe de Desenvolvimento

Projeto desenvolvido com dedicação pelos alunos:

* **Ana Carolina** - GitHub: [@anapwc](https://www.google.com/search?q=https://github.com/anapwc)
* **Felipe Nascimento** - GitHub: [@felipe-SN](https://www.google.com/search?q=https://github.com/felipe-SN)
* **Heber Meireles** - GitHub: [@HeberMartins](https://www.google.com/search?q=https://github.com/HeberMartins)

```

```
