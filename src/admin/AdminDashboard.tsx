import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000";

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/episodes/stats`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Typography sx={{ mt: 4 }}>Carregando painel...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Visão Geral
      </Typography>

      {/* Cards de estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center", boxShadow: 3 }}>
            <Typography variant="h6">Total de Episódios</Typography>
            <Typography variant="h3" sx={{ fontWeight: "bold", mt: 1 }}>
              {stats.total}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center", boxShadow: 3 }}>
            <Typography variant="h6">Publicados</Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", mt: 1, color: "green" }}
            >
              {stats.published}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center", boxShadow: 3 }}>
            <Typography variant="h6">Rascunhos</Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", mt: 1, color: "gray" }}
            >
              {stats.draft}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Últimos episódios editados */}
      <Paper sx={{ p: 3, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Últimos episódios editados
        </Typography>

        {stats.lastEdited.length === 0 && (
          <Typography color="text.secondary">
            Nenhuma edição encontrada.
          </Typography>
        )}

        <List>
          {stats.lastEdited.map((ep: any, index: number) => (
            <Box key={ep._id}>
              <ListItem
                button
                onClick={() => navigate(`/admin/episodios/${ep._id}`)}
                sx={{ borderRadius: 1 }}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    src={ep.image}
                    sx={{ width: 56, height: 56 }}
                  />
                </ListItemAvatar>

                <ListItemText
                  primary={ep.title}
                  secondary={
                    <>
                      {ep.published ? "Publicado · " : "Rascunho · "}
                      {ep.updatedAt &&
                        new Date(ep.updatedAt).toLocaleString("pt-BR")}
                    </>
                  }
                />
              </ListItem>

              {index < stats.lastEdited.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>

      {/* Atalhos rápidos */}
      <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => navigate("/admin/episodios")}
        >
          Gerenciar Episódios
        </Button>

        <Button
          variant="outlined"
          onClick={async () => {
            await fetch(`${API_BASE}/episodes/sync`, { method: "POST" });
            fetchStats();
          }}
        >
          Sincronizar com feed
        </Button>
      </Box>
    </Container>
  );
};

export default AdminDashboard;