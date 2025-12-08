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
import { FaSpotify, FaYoutube, FaInstagram } from "react-icons/fa";

const API_BASE = "http://localhost:5000";

type Episode = {
  _id: string;
  title: string;
  image?: string;
  pubDate?: string;
  duration?: string;
  episodeNumber?: number;
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
      // pegar os 3 mais recentes
      setEpisodes(data.slice(0, 3));
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
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 2,
          py: 8,
          overflow: "hidden",
        }}
      >
        {/* Background com blur */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("/home/bg.jpeg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(4px)",
            transform: "scale(1.06)",
            zIndex: 0,
          }}
        />

        {/* Overlay escuro */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.36)",
            zIndex: 1,
          }}
        />

        {/* Conteúdo visível */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            maxWidth: 800,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            color: "white",
          }}
        >
          {/* Logo principal */}
          <Box
            component="img"
            src="/logos/FinalVersion.png"
            alt="Café na Taverna"
            sx={{
              maxWidth: 420,
              width: "80%",
              height: "auto",
            }}
          />

          <Button
            variant="outlined"
            size="large"
            component={RouterLink}
            to="/player"
            sx={{
              mt: 2,
              borderColor: "#fff",
              color: "#fff",
              textTransform: "none",
              px: 4,
              py: 1.2,
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: 999,
              "&:hover": {
                borderColor: "#fff",
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            Ouvir episódios
          </Button>
        </Box>
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

            {episodes.map((ep) => (
              <Grid item xs={12} sm={6} md={4} key={ep._id}>
                <Paper
                  component={RouterLink}
                  to={
                    ep.episodeNumber
                      ? `/episodio/${ep.episodeNumber}`
                      : "/episodios"
                  }
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    borderRadius: 3,
                    overflow: "hidden",
                    transition: "0.25s",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
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
                      {ep.duration ? ` • ${formatDuration(ep.duration)}` : ""}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/episodios"
              sx={{
                mt: 2,
                borderColor: "#202020",
                color: "#202020",
                textTransform: "none",
                px: 4,
                py: 1.2,
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 999,
                "&:hover": {
                  borderColor: "#202020",
                  backgroundColor: "rgba(32,32,32,0.1)",
                },
              }}
            >
              Ver todos os episódios
            </Button>
          </Box>
        </Container>
      </Box>

      {/* REDES SOCIAIS */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{ textAlign: "center", mb: 4, fontWeight: "bold" }}
          >
            Redes Sociais
          </Typography>

          <Typography variant="h6" sx={{ textAlign: "center", mb: 6 }}>
            Acompanhe o Café na Taverna também em:
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
              startIcon={<FaSpotify />}
              sx={{
                mt: 2,
                borderColor: "#202020",
                color: "#202020",
                textTransform: "none",
                px: 4,
                py: 1.2,
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 999,
                "&:hover": {
                  borderColor: "#202020",
                  backgroundColor: "rgba(32,32,32,0.1)",
                },
              }}
            >
              Spotify
            </Button>

            <Button
              variant="outlined"
              size="large"
              href="https://www.instagram.com/cafenataverna"
              target="_blank"
              startIcon={<FaInstagram />}
              sx={{
                mt: 2,
                borderColor: "#202020",
                color: "#202020",
                textTransform: "none",
                px: 4,
                py: 1.2,
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 999,
                "&:hover": {
                  borderColor: "#202020",
                  backgroundColor: "rgba(32,32,32,0.1)",
                },
              }}
            >
              Instagram
            </Button>

            <Button
              variant="outlined"
              size="large"
              href="https://www.youtube.com/@cafenataverna"
              target="_blank"
              startIcon={<FaYoutube />}
              sx={{
                mt: 2,
                borderColor: "#202020",
                color: "#202020",
                textTransform: "none",
                px: 4,
                py: 1.2,
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 999,
                "&:hover": {
                  borderColor: "#202020",
                  backgroundColor: "rgba(32,32,32,0.1)",
                },
              }}
            >
              YouTube
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;