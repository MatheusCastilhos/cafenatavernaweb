import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type Episode = {
  _id?: string;
  title: string;
  pubDate?: string;
  published?: boolean;
};

const API_BASE = "http://localhost:5000";

const AdminEpisodes = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchEpisodes = async () => {
    try {
      setLoadingList(true);
      setError(null);
      const res = await fetch(`${API_BASE}/episodes`);
      if (!res.ok) throw new Error("Erro ao buscar episódios");
      const data = await res.json();
      setEpisodes(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar episódios");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const handleSync = async () => {
    try {
      setSyncing(true);
      setError(null);
      setInfo(null);

      const res = await fetch(`${API_BASE}/episodes/sync`, {
        method: "POST",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Erro ao sincronizar com o feed");
      }

      const data = await res.json().catch(() => null);

      if (data) {
        setInfo(
          `Sincronização concluída. Importados: ${data.imported}, Atualizados: ${data.updated}, Total no feed: ${data.totalFeed}`
        );
      } else {
        setInfo("Sincronização concluída.");
      }

      await fetchEpisodes();
    } catch (err: any) {
      setError(err.message || "Erro ao sincronizar com o feed");
    } finally {
      setSyncing(false);
    }
  };

  // ⭐ NOVOS HANDLERS
  const publishAll = async () => {
    try {
      setError(null);
      const res = await fetch(`${API_BASE}/episodes/publish-all`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Erro ao publicar tudo");
      setInfo("Todos os episódios foram publicados!");
      fetchEpisodes();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const unpublishAll = async () => {
    try {
      setError(null);
      const res = await fetch(`${API_BASE}/episodes/unpublish-all`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Erro ao despublicar tudo");
      setInfo("Todos os episódios foram despublicados!");
      fetchEpisodes();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ px: 0 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Episódios — lista geral
      </Typography>

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

      <Paper sx={{ p: 2 }}>
        {/* ⭐ BARRA DE AÇÕES SUPERIOR */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Todos os episódios</Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            {/* Botões novos */}
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={publishAll}
            >
              Publicar todos
            </Button>

            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={unpublishAll}
            >
              Despublicar todos
            </Button>

            {/* Botão de sync já existente */}
            <Button
              variant="outlined"
              size="small"
              onClick={handleSync}
              disabled={syncing}
            >
              {syncing ? "Sincronizando..." : "Sincronizar com feed"}
            </Button>
          </Stack>
        </Box>

        {/* TABELA */}
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Publicado</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {episodes.map((ep) => (
              <TableRow key={ep._id}>
                <TableCell>{ep.title}</TableCell>
                <TableCell>
                  {ep.pubDate
                    ? new Date(ep.pubDate).toLocaleDateString("pt-BR")
                    : "-"}
                </TableCell>
                <TableCell>{ep.published ? "Sim" : "Não"}</TableCell>

                <TableCell align="right">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/admin/episodios/${ep._id}`)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {episodes.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography align="center">
                    Nenhum episódio encontrado.  
                    Clique em &quot;Sincronizar com feed&quot; para importar.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default AdminEpisodes;