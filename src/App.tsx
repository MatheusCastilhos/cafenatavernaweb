import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Páginas públicas
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Episodes from "./pages/Episodes";
import EpisodePage from "./pages/EpisodePage";
import Player from "./pages/Player";
import NotFound from "./pages/NotFound";

// Admin
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminEpisodes from "./admin/AdminEpisodes";
import AdminEpisodeEdit from "./admin/AdminEpisodeEdit";

function App() {
  return (
    <Routes>
      {/* SITE PÚBLICO */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sobre" element={<Sobre />} />

        {/* Lista de episódios (blog) */}
        <Route path="episodios" element={<Episodes />} />

        {/* Página de episódio individual — /episodio/58 */}
        <Route path="episodio/:episodeNumber" element={<EpisodePage />} />

        <Route path="player" element={<Player />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* ÁREA ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="episodios" element={<AdminEpisodes />} />
        {/* edição por ObjectId */}
        <Route path="episodios/:id" element={<AdminEpisodeEdit />} />
      </Route>
    </Routes>
  );
}

export default App;