import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Stack,
  TextField,
  Switch,
  FormControlLabel,
  Avatar,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
// @ts-ignore
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Episode = {
  _id?: string;
  guid?: string;
  title: string;
  description?: string;
  link?: string;
  pubDate?: string;
  audioUrl?: string;
  image?: string;
  published?: boolean;
};

const API_BASE = "http://localhost:5000";

const AdminEpisodeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [episode, setEpisode] = useState<Episode | null>(null);
  const [title, setTitle] = useState("");
  const [descriptionHtml, setDescriptionHtml] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const loadEpisode = async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);

      // 🔥 ROTA CORRETA DE ADMIN
      const res = await fetch(`${API_BASE}/episodes/id/${id}`);
      if (!res.ok) throw new Error("Erro ao carregar episódio");

      const data: Episode = await res.json();
      setEpisode(data);
      setTitle(data.title || "");
      setDescriptionHtml(data.description || "");
      setPublished(data.published ?? false);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar episódio");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEpisode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = async () => {
    if (!id) return;
    try {
      setSaving(true);
      setError(null);
      setInfo(null);

      const payload = {
        title,
        description: descriptionHtml,
        published,
      };

      // 🔥 ROTA CORRETA DE ADMIN (PUT)
      const res = await fetch(`${API_BASE}/episodes/id/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Erro ao salvar episódio");
      }

      const updated = await res.json().catch(() => null);
      if (updated) {
        setEpisode(updated);
      }
      setInfo("Episódio atualizado com sucesso.");
    } catch (err: any) {
      setError(err.message || "Erro ao salvar episódio");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Typography sx={{ mt: 4 }}>Carregando episódio...</Typography>
      </Container>
    );
  }

  if (!episode) {
    return (
      <Container maxWidth="md">
        <Typography sx={{ mt: 4 }} color="error">
          Episódio não encontrado.
        </Typography>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/admin/episodios")}>
          Voltar para lista
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ pb: 6 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <Button variant="text" onClick={() => navigate("/admin/episodios")}>
          ← Voltar para lista
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Salvando..." : "Salvar alterações"}
        </Button>
      </Stack>

      {error && (
        <Paper sx={{ p: 2, mb: 2, borderLeft: "4px solid #d32f2f" }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      )}

      {info && (
        <Paper sx={{ p: 2, mb: 2, borderLeft: "4px solid #2e7d32" }}>
          <Typography color="success.main">{info}</Typography>
        </Paper>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          {episode.image && (
            <Avatar
              src={episode.image}
              variant="rounded"
              sx={{
                width: { xs: 160, md: 200 },
                height: { xs: 160, md: 200 },
                boxShadow: 4,
                flexShrink: 0,
              }}
            />
          )}

          <Box sx={{ flex: 1 }}>
            <TextField
              label="Título (no site)"
              fullWidth
              sx={{ mb: 2 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {episode.pubDate && (
              <Typography variant="body2" sx={{ mb: 1, color: "gray" }}>
                Publicado em{" "}
                {new Date(episode.pubDate).toLocaleDateString("pt-BR")}
              </Typography>
            )}

            <FormControlLabel
              control={
                <Switch
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
              }
              label="Publicado no site"
            />
          </Box>
        </Stack>
      </Paper>

      {episode.audioUrl && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Player de teste (áudio do feed)
          </Typography>
          <AudioPlayer src={episode.audioUrl} />
        </Paper>
      )}

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Descrição (HTML)
        </Typography>

        <Box sx={{ mb: 2 }}>
          <ReactQuill
            theme="snow"
            value={descriptionHtml}
            onChange={setDescriptionHtml}
            style={{ height: 200, marginBottom: 40 }}
          />
        </Box>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Pré-visualização
        </Typography>
        <Paper
          variant="outlined"
          sx={{ p: 2, maxHeight: 250, overflowY: "auto" }}
        >
          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6 }}
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </Paper>
      </Paper>
    </Container>
  );
};

export default AdminEpisodeEdit;