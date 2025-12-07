import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const API_BASE = "http://localhost:5000";

type Episode = {
  _id: string;
  title: string;
  image?: string;
  pubDate?: string;
  duration?: string;
  episodeNumber?: number; // 🔥 número contínuo #58
};

// Formata duração “01:23:45” → “1h 23min”
const formatDuration = (d: string | undefined) => {
  if (!d) return "";
  const parts = d.split(":");
  if (parts.length === 3) {
    const [h, m] = parts;
    return `${parseInt(h)}h ${parseInt(m)}min`;
  }
  if (parts.length === 2) {
    const [m] = parts;
    return `${parseInt(m)}min`;
  }
  return d;
};

const Home = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const fetchEpisodes = async () => {
    try {
      const res = await fetch(`${API_BASE}/episodes/published`);
      const data = await res.json();
      // back já retorna ordenado por episodeNumber desc
      setEpisodes(data.slice(0, 3)); // pega só os 3 mais recentes
    } catch (err) {
      console.error("Erro ao carregar episódios recentes", err);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  return (
    <Box>
      {/* HERO */}
      <Box
        sx={{
          minHeight: "75vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 2,
          py: 8,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          Café na Taverna
        </Typography>

        <Typography variant="h5" sx={{ mb: 4, maxWidth: 700 }}>
          Histórias, risadas e conversas ao pé da lareira.
        </Typography>

        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/episodios"
        >
          Ouvir episódios
        </Button>
      </Box>

      {/* EPISÓDIOS RECENTES */}
      <Box sx={{ backgroundColor: "#f5f5f5", py: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{ textAlign: "center", mb: 6, fontWeight: "bold" }}
          >
            Episódios Recentes
          </Typography>

          <Grid container spacing={4}>
            {/* placeholders enquanto não carrega nada */}
            {episodes.length === 0 &&
              [1, 2, 3].map((i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Paper
                    sx={{
                      p: 3,
                      textAlign: "center",
                      height: 220,
                      opacity: 0.4,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Carregando...
                  </Paper>
                </Grid>
              ))}

            {episodes.map((ep) => {
              const hasEpisodeNumber =
                typeof ep.episodeNumber === "number" &&
                !Number.isNaN(ep.episodeNumber);

              return (
                <Grid item xs={12} sm={6} md={4} key={ep._id}>
                  <Paper
                    component={hasEpisodeNumber ? RouterLink : "div"}
                    to={
                      hasEpisodeNumber
                        ? `/episodio/${ep.episodeNumber}` // 🔥 link correto
                        : undefined
                    }
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      borderRadius: 3,
                      overflow: "hidden",
                      transition: "0.25s",
                      cursor: hasEpisodeNumber ? "pointer" : "default",
                      "&:hover": hasEpisodeNumber
                        ? {
                            transform: "scale(1.03)",
                          }
                        : undefined,
                    }}
                    elevation={4}
                  >
                    {/* Capa 1:1 */}
                    <Box
                      sx={{
                        width: "100%",
                        paddingTop: "100%", // garante 1:1
                        backgroundImage: `url(${ep.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />

                    <Box sx={{ p: 2 }}>
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

                      <Typography variant="body2" color="text.secondary">
                        {ep.pubDate &&
                          new Date(ep.pubDate).toLocaleDateString("pt-BR")}
                        {ep.duration
                          ? ` • ${formatDuration(ep.duration)}`
                          : ""}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              component={RouterLink}
              to="/episodios"
              size="large"
              variant="outlined"
            >
              Ver todos os episódios
            </Button>
          </Box>
        </Container>
      </Box>

      {/* PLATAFORMAS */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{ textAlign: "center", mb: 4, fontWeight: "bold" }}
          >
            Onde ouvir
          </Typography>

          <Typography variant="h6" sx={{ textAlign: "center", mb: 6 }}>
            Acompanhe o Café na Taverna nas principais plataformas:
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              size="large"
              href="https://open.spotify.com/show/47gjD4t6i5DO8ZR1OacR17"
              target="_blank"
            >
              Spotify
            </Button>

            <Button
              variant="outlined"
              size="large"
              href="https://www.youtube.com/@cafenataverna"
              target="_blank"
            >
              YouTube
            </Button>

            <Button
              variant="outlined"
              size="large"
              href="https://www.instagram.com/cafenataverna"
              target="_blank"
            >
              Instagram
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;