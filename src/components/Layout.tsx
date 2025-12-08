import { Outlet, Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

const Layout = () => {
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const isActive = (path: string) => location.pathname === path;
  const isPodcastSection =
    location.pathname.startsWith("/episodio") ||
    location.pathname.startsWith("/episodios") ||
    location.pathname.startsWith("/player");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#222120",
          boxShadow: "none",
          borderBottom: "1px solid #000",
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          {/* ESQUERDA — LOGO */}
          <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                src="/logos/Text.png"
                alt="Café na Taverna"
                sx={{
                  height: 36,
                  width: "auto",
                  display: "block",
                }}
              />
            </Box>
          </Box>

          {/* CENTRO — MENU */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Button
              component={RouterLink}
              to="/sobre"
              sx={{
                textTransform: "none",
                color: isActive("/sobre") ? "#ce713b" : "#ffffff",
              }}
            >
              Sobre
            </Button>

            <Button
              component={RouterLink}
              to="/"
              sx={{
                textTransform: "none",
                color: isActive("/") ? "#ce713b" : "#ffffff",
              }}
            >
              Início
            </Button>

            <Button
              onClick={handleOpenMenu}
              sx={{
                textTransform: "none",
                color: isPodcastSection ? "#ce713b" : "#ffffff",
              }}
            >
              Podcast
            </Button>

            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
              <MenuItem
                component={RouterLink}
                to="/episodios"
                onClick={handleCloseMenu}
              >
                Episódios
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/player"
                onClick={handleCloseMenu}
              >
                Player Único
              </MenuItem>
            </Menu>
          </Box>

          {/* DIREITA — “peso” pra centralizar o menu */}
          <Box sx={{ flex: 1 }} />
        </Toolbar>
      </AppBar>

      {/* CONTEÚDO DAS PÁGINAS — sem padding aqui */}
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      {/* FOOTER */}
      <Box
        component="footer"
        sx={{
          py: 2,
          backgroundColor: "#222120",
          mt: "auto",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" align="center" color="#d4d4d4ff">
            © {new Date().getFullYear()} Café na Taverna | by Castilhos, Kologeski e Porto
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;