import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Paper,
  Avatar,
} from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

type Episode = {
  guid: string;
  title: string;
  description?: string;
  audioUrl?: string;
  pubDate?: string;
  image?: string;
};

export default function Player() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Busca do feed RSS via backend
  useEffect(() => {
    const loadFeed = async () => {
      try {
        const res = await fetch("http://localhost:5000/rss");
        if (!res.ok) throw new Error("Erro ao carregar RSS");

        const data: Episode[] = await res.json();
        setEpisodes(data);

        if (data.length > 0) {
          setCurrentEpisode(data[0]);
        }
      } catch (err: any) {
        setError(err.message || "Erro ao carregar feed.");
      } finally {
        setLoading(false);
      }
    };

    loadFeed();
  }, []);

  const stripHtml = (html?: string) =>
    html ? html.replace(/<[^>]+>/g, "") : "";

  if (loading) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography align="center">Carregando episódios...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography align="center" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!currentEpisode) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography align="center">Nenhum episódio disponível.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "flex-start",
        }}
      >
        {/* ===== COLUNA ESQUERDA — EPISÓDIO ATUAL ===== */}
        <Box sx={{ flex: 2 }}>
          <Paper
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* Cabeçalho: capa + título + data */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
                alignItems: { xs: "flex-start", md: "center" },
              }}
            >
              {currentEpisode.image && (
                <Avatar
                  src={currentEpisode.image}
                  variant="rounded"
                  sx={{
                    width: { xs: 180, md: 220 },
                    height: { xs: 180, md: 220 },
                    boxShadow: 4,
                    flexShrink: 0,
                  }}
                />
              )}

              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 1.5,
                    fontWeight: "bold",
                    lineHeight: 1.2,
                  }}
                >
                  {currentEpisode.title}
                </Typography>

                {currentEpisode.pubDate && (
                  <Typography variant="subtitle1" sx={{ color: "gray" }}>
                    Publicado em{" "}
                    {new Date(currentEpisode.pubDate).toLocaleDateString(
                      "pt-BR"
                    )}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Player de áudio estilizado */}
            <Box sx={{ width: "100%", maxWidth: "900px", mx: "auto" }}>
              <AudioPlayer
                key={currentEpisode.guid || currentEpisode.audioUrl}
                src={currentEpisode.audioUrl}
                showSkipControls={false}
                showJumpControls={true}
                customAdditionalControls={[]}
                layout="horizontal"
                style={{
                  width: "100%",
                  borderRadius: 12,
                  boxShadow: "none",
                }}
              />
            </Box>
          </Paper>

          {/* Descrição completa */}
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 1.5 }}>
              Descrição
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{
                __html: currentEpisode.description || "",
              }}
            />
          </Paper>
        </Box>

        {/* ===== COLUNA DIREITA — LISTA DE EPISÓDIOS ===== */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Todos os episódios
          </Typography>

          <Paper
            sx={{
              maxHeight: "100vh",
              overflowY: "auto",
              borderRadius: 3,
            }}
          >
            <List disablePadding>
              {episodes.map((ep, index) => {
                const isSelected =
                  ep.guid === currentEpisode.guid ||
                  ep.audioUrl === currentEpisode.audioUrl;

                return (
                  <Box
                    key={ep.guid || ep.audioUrl || index}
                    sx={{
                      backgroundColor: isSelected ? "#f0f7ff" : "transparent",
                    }}
                  >
                    <ListItemButton
                      selected={isSelected}
                      onClick={() => setCurrentEpisode(ep)}
                      sx={{ display: "flex", gap: 2, py: 2 }}
                    >
                      <Avatar
                        src={ep.image}
                        variant="rounded"
                        sx={{ width: 60, height: 60, flexShrink: 0 }}
                      />

                      <ListItemText
                        primary={ep.title}
                        primaryTypographyProps={{
                          variant: "subtitle1",
                          fontWeight: isSelected ? "bold" : "normal",
                        }}
                        secondary={
                          stripHtml(ep.description).length > 0
                            ? stripHtml(ep.description).slice(0, 70) + "..."
                            : "Sem descrição."
                        }
                      />
                    </ListItemButton>

                    {index < episodes.length - 1 && <Divider />}
                  </Box>
                );
              })}
            </List>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}