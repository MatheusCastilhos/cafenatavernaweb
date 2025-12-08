import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const API_BASE = "http://localhost:5000";

type Episode = {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  pubDate?: string;
  duration?: string;
  season?: number;
  episode?: number;        // número dentro da temporada (do feed)
  episodeNumber?: number;  // número contínuo (#58)
  audioUrl?: string;
};

const EpisodePage = () => {
  // URL: /episodio/:episodeNumber  → definido no App.tsx
  const { episodeNumber } = useParams<{ episodeNumber: string }>();

  const [data, setData] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEpisode = async () => {
    if (!episodeNumber) return;

    try {
      setLoading(true);
      setError(null);

      // bate com a rota pública do back: GET /episodes/:episodeNumber
      const res = await fetch(`${API_BASE}/episodes/by-number/${episodeNumber}`);

      if (!res.ok) throw new Error("Episódio não encontrado");

      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar episódio");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episodeNumber]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Carregando episódio...</Typography>
      </Container>
    );
  }

  if (error || !data) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Button
          component={RouterLink}
          to="/episodios"
          variant="outlined"
          sx={{ mb: 3 }}
        >
          Voltar para episódios
        </Button>

        <Typography variant="h5" color="error">
          {error || "Episódio não encontrado."}
        </Typography>
      </Container>
    );
  }

  const formattedDate = data.pubDate
    ? new Date(data.pubDate).toLocaleDateString("pt-BR")
    : "";

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* voltar */}
      <Button
        variant="outlined"
        component={RouterLink}
        to="/episodios"
        size="medium"
        sx={{
          mt: 2,
          mb: 4,
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
            backgroundColor: "rgba(255,255,255,0.15)",
          }
        }}
      >
        Voltar para episódios
      </Button>

      <Grid container spacing={4}>
        {/* capa */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              width: "100%",
              paddingTop: "100%",
              borderRadius: 3,
              overflow: "hidden",
              backgroundImage: `url(${data.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>

        {/* título e infos */}
        <Grid item xs={12} md={8}>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
            {data.season && data.episode
              ? `Temporada ${data.season} · Episódio ${data.episode}`
              : ""}
          </Typography>

          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            {data.title}
          </Typography>

          {formattedDate && (
            <Typography variant="subtitle1" sx={{ color: "gray", mb: 1 }}>
              Publicado em {formattedDate}
            </Typography>
          )}

          {data.duration && (
            <Typography variant="body2" color="text.secondary">
              Duração: {data.duration}
            </Typography>
          )}
        </Grid>
      </Grid>

      {/* Player */}
      <Box sx={{ mt: 5, mb: 4 }}>
        {data.audioUrl ? (
          <AudioPlayer
            src={data.audioUrl}
            layout="horizontal"
            showSkipControls
            showJumpControls
            customAdditionalControls={[]}
            style={{
              width: "100%",
              borderRadius: "16px",
            }}
          />
        ) : (
          <Typography color="text.secondary">Áudio não disponível.</Typography>
        )}
      </Box>

      {/* Descrição */}
      {data.description && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.7 }}
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </Box>
      )}

      {/* Download */}
      {data._id && (
        <Button
          variant="outlined"
          size="large"
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
              backgroundColor: "rgba(255,255,255,0.15)",
            }
          }}
          onClick={() => {
            window.open(
              `${API_BASE}/episodes/download/${data._id}`,
              "_blank"
            );
          }}
        >
          Baixar episódio
        </Button>
      )}
    </Container>
  );
};

export default EpisodePage;