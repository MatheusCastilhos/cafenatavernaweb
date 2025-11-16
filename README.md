# Frontend - React + TypeScript + Material UI

Aplicação frontend construída com React, TypeScript, Vite e Material UI.

## Tecnologias

- React 18
- TypeScript
- Vite
- Material UI (MUI)
- React Router DOM
- Emotion (CSS-in-JS)

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

## Build para Produção

```bash
npm run build
```

## Preview da Build

```bash
npm run preview
```

## Estrutura

```
src/
├── components/     # Componentes reutilizáveis
│   └── Layout.tsx  # Layout principal com navegação
├── pages/          # Páginas da aplicação
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Dashboard.tsx
│   └── NotFound.tsx
├── App.tsx         # Configuração de rotas
└── main.tsx        # Ponto de entrada
```

## Rotas

- `/` - Home
- `/about` - Sobre
- `/dashboard` - Dashboard
- `*` - 404 Not Found

## Customização do Tema

Edite o tema do Material UI em `src/main.tsx`:

```typescript
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})
```
