# **Frontend – Café na Taverna**

Aplicação frontend desenvolvida em **React + TypeScript + Vite**, usando **Material UI** para a interface.
Consome a API Node.js que gerencia episódios do podcast *Café na Taverna*.

---

## 🎧 Tecnologias Utilizadas

* **React 18**
* **TypeScript**
* **Vite**
* **Material UI (MUI)**
* **React Router DOM v6**
* **React H5 Audio Player**
* **React Quill (Admin)**
* **CSS-in-JS (Emotion)**

---

## 🚀 Instalação

```bash
npm install
```

---

## 🧪 Ambiente de Desenvolvimento

```bash
npm run dev
```

Acesse em: **[http://localhost:3000](http://localhost:3000)**

---

## 📦 Build para Produção

```bash
npm run build
```

---

## 🔍 Preview da Build

```bash
npm run preview
```

---

## 🗂️ Estrutura de Pastas

```
src/
├── admin/                 # Área administrativa (dashboard, lista, edição)
│   ├── AdminDashboard.tsx
│   ├── AdminEpisodes.tsx
│   └── AdminEpisodeEdit.tsx
│
├── components/
│   └── Layout.tsx         # Header + Footer
│
├── pages/
│   ├── Home.tsx
│   ├── Episodes.tsx       # Lista pública de episódios
│   ├── EpisodePage.tsx    # Página de episódio individual
│   ├── Sobre.tsx
│   ├── Player.tsx
│   └── NotFound.tsx
│
├── App.tsx                # Definição das rotas
└── main.tsx               # Entry point
```

---

## 🌐 Rotas Públicas

| Rota                       | Descrição                                 |
| -------------------------- | ----------------------------------------- |
| `/`                        | Página inicial (hero + últimos episódios) |
| `/sobre`                   | Sobre o podcast                           |
| `/episodios`               | Lista completa de episódios publicados    |
| `/episodio/:episodeNumber` | Página individual do episódio             |
| `*`                        | Página 404                                |

---

## 🔐 Rotas do Admin

| Rota                   | Descrição                                  |
| ---------------------- | ------------------------------------------ |
| `/admin`               | Dashboard (estatísticas gerais)            |
| `/admin/episodios`     | Lista administrativa dos episódios         |
| `/admin/episodios/:id` | Página de edição (por ObjectId do MongoDB) |

> **Atenção:**
> A área administrativa ainda não possui autenticação, mas está preparada para receber middleware futuramente.

---

## 🎨 Customização do Tema (Material UI)

O tema principal pode ser alterado em `main.tsx`:

```ts
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#c37b39" },
    secondary: { main: "#8e44ad" },
  },
});
```

---

## 🔌 Comunicação com a API

As requisições usam:

```
http://localhost:5000
```

Rotas consumidas:

* `GET /episodes/published`
* `GET /episodes/by-number/:num`
* `GET /episodes/download/:id`
* Admin:

  * `GET /episodes`
  * `PUT /episodes/id/:id`
  * `PUT /episodes/publish-all`
  * `PUT /episodes/unpublish-all`
  * `POST /episodes/sync`

---

## ☕ Sobre o Projeto

Esse frontend foi criado para oferecer uma experiência moderna e responsiva para os ouvintes do podcast **Café na Taverna**, integrando-se ao backend para exibir, tocar e gerenciar episódios.

---