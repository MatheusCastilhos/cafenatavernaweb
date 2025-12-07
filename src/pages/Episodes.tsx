import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Divider,
  Pagination,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type Episode = {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  pubDate?: string;
  duration?: string;
  season?: number;         // temporada original do feed
  episode?: number;        // número dentro da temporada
  episodeNumber?: number;  // número contínuo extraído do título (#58)
};

const API_BASE = "http://localhost:5000";

// Remove tags HTML da descrição
const stripHTML = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "");
};

// Formatar duração "01:54:38" → "1h 54min"
const formatDuration = (d: string | undefined) => {
  if (!d) return "";
  const parts = d.split(":");

  if (parts.length === 3) {
    const [h, m] = parts;
    const hh = parseInt(h);
    const mm = parseInt(m);
    return `${hh}h ${mm}min`;
  }

  if (parts.length === 2) {
    const [m] = parts;
    const mm = parseInt(m);
    return `${mm}min`;
  }

  return d;
};

const Episodes = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [seasonFilter, setSeasonFilter] = useState<string>("all");

  // paginação simples
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;

  const fetchEpisodes = async () => {
    try {
      const res = await fetch(`${API_BASE}/episodes/published`);
      const data = await res.json();
      setEpisodes(data);
    } catch (err) {
      console.error("Erro ao carregar episódios publicados", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  // temporadas disponíveis
  const seasons = useMemo(() => {
    const set = new Set<number>();
    episodes.forEach((ep) => {
      if (typeof ep.season === "number") {
        set.add(ep.season);
      }
    });
    return Array.from(set).sort((a, b) => a - b);
  }, [episodes]);

  // filtros
  const filteredEpisodes = useMemo(() => {
    const term = search.trim().toLowerCase();

    return episodes.filter((ep) => {
      if (seasonFilter !== "all") {
        const seasonNumber = parseInt(seasonFilter, 10);
        if (ep.season !== seasonNumber) return false;
      }

      if (!term) return true;

      const text = (
        (ep.title || "") + " " + stripHTML(ep.description || "")
      ).toLowerCase();

      return text.includes(term);
    });
  }, [episodes, search, seasonFilter]);

  // paginação aplicada sobre filtrados
  const totalPages = Math.max(
    1,
    Math.ceil(filteredEpisodes.length / PAGE_SIZE)
  );

  const paginatedEpisodes = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredEpisodes.slice(start, start + PAGE_SIZE);
  }, [filteredEpisodes, page]);

  useEffect(() => {
    // se trocar filtros/busca, volta pra primeira página
    setPage(1);
  }, [search, seasonFilter]);

  if (loading) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Carregando episódios...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      {/* Cabeçalho + filtros */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", textAlign: "left" }}
        >
          Episódios
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ width: { xs: "100%", md: "auto" } }}
        >
          <TextField
            size="small"
            label="Buscar"
            placeholder="Título, tema, convidado..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ minWidth: { xs: "100%", md: 260 } }}
          />

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Temporada</InputLabel>
            <Select
              label="Temporada"
              value={seasonFilter}
              onChange={(e) => setSeasonFilter(e.target.value)}
            >
              <MenuItem value="all">Todas</MenuItem>
              {seasons.map((s) => (
                <MenuItem key={s} value={String(s)}>
                  Temporada {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Box>

      {/* linha separando filtros da grade */}
      <Divider sx={{ mb: 4 }} />

      {filteredEpisodes.length === 0 && (
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mt: 4 }}
        >
          Nenhum episódio encontrado com os filtros atuais.
        </Typography>
      )}

      {/* Grid de Cards */}
      <Grid container spacing={4}>
        {paginatedEpisodes.map((ep) => {
          const preview = stripHTML(ep.description || "").slice(0, 110);

          const hasEpisodeNumber =
            typeof ep.episodeNumber === "number" &&
            !Number.isNaN(ep.episodeNumber);

          return (
            <Grid item xs={12} sm={6} md={4} key={ep._id}>
              <Paper
                component={hasEpisodeNumber ? RouterLink : "div"}
                to={
                  hasEpisodeNumber
                    ? `/episodio/${ep.episodeNumber}` // 🔥 agora bate com App.tsx
                    : undefined
                }
                elevation={4}
                sx={{
                  height: "100%",
                  textDecoration: "none",
                  color: "inherit",
                  borderRadius: 3,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.2s",
                  cursor: hasEpisodeNumber ? "pointer" : "default",
                  "&:hover": hasEpisodeNumber
                    ? {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                      }
                    : undefined,
                }}
              >
                {/* Capa 1:1 */}
                <Box
                  sx={{
                    width: "100%",
                    paddingTop: "100%", // 1:1
                    backgroundImage: `url(${ep.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <Box sx={{ p: 2, flexGrow: 1 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    {ep.season && ep.episode
                      ? `T${ep.season} · Ep. ${ep.episode}`
                      : ""}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {ep.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {ep.pubDate &&
                      new Date(ep.pubDate).toLocaleDateString("pt-BR")}
                    {ep.duration ? ` • ${formatDuration(ep.duration)}` : ""}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {preview}...
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* Paginação */}
      {filteredEpisodes.length > PAGE_SIZE && (
        <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            shape="rounded"
          />
        </Box>
      )}
    </Container>
  );
};

export default Episodes;