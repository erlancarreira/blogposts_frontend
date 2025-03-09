# Blog App

Blog App é um aplicativo móvel desenvolvido em React Native que permite visualizar, criar e interagir com posts de um blog. O aplicativo inclui recursos de busca, favoritos e gerenciamento de posts.

## Começando

### Pré-requisitos

- Node.js 16 ou superior
- npm ou yarn
- Expo CLI instalado globalmente:
```bash
npm install -g expo-cli
```

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/erlancarreira/blogposts_frontend.git
cd blogposts_frontend
```

2. Instale as dependências
```bash
npm install
```

3. Inicie o projeto
```bash
npm start
```

## Estrutura do Projeto

```
blog-app/
├── app/              # Rotas e telas do aplicativo
│   ├── (auth)/       # Rotas autenticadas
│   │   ├── (tabs)/   # Navegação por tabs
│   │   └── post/     # Rotas de posts
│   └── (public)/     # Rotas públicas
├── components/       # Componentes reutilizáveis
├── context/          # Contextos do React
├── hooks/            # Hooks personalizados
├── services/         # Serviços e API
├── store/            # Configuração do Redux
└── utils/            # Funções utilitárias
```

## Configuração de Desenvolvimento

### Variáveis de Ambiente
O projeto usa as seguintes variáveis de ambiente:

- `API_URL`: URL base da API

### Scripts Disponíveis

```bash
npm start # Inicia o servidor de desenvolvimento
```

## Solução de Problemas

### Erros Comuns

1. **Erro de Metro bundler**
   ```
   Solução: Execute `npm start --reset-cache`
   ```

2. **Problemas com dependências**
   ```
   Solução: Remova node_modules e reinstale as dependências
   ```

### Cache e Dados

Para limpar todos os dados do aplicativo:

1. Desinstale o app do dispositivo/emulador
2. Limpe o cache do Metro:
   ```bash
   npm start --reset-cache
   ```

## Build e Deploy

### Android
1. Configure o arquivo `app.json`
2. Execute:
   ```bash
   expo build:android
   ```

### iOS
1. Configure o arquivo `app.json`
2. Execute:
   ```bash
   expo build:ios
   ```

## Arquitetura e Hooks

### Redux e Context
- **Redux**: Gerenciamento centralizado do estado
  - Posts, comentários e favoritos
  - Cache e persistência de dados
- **Context**: Gerenciamento de tema e autenticação
  - ThemeContext: Customização visual
  - SessionContext: Estado de autenticação

### Hooks Personalizados
- **usePosts**: Gerenciamento de posts e busca genérica com debounce
  ```typescript
  const { posts, loadPosts, loadMorePosts, searchQuery, handleSearch } = usePosts();
  ```
- **useFavorites**: Gerenciamento de favoritos
  ```typescript
  const { favoritePosts, toggleFavorite } = useFavorites();
  ```

### Serviços
- **Axios**       : Requisições HTTP configuradas
- **AsyncStorage**: Persistência local de dados
- **API Service** : Abstração das chamadas à API
