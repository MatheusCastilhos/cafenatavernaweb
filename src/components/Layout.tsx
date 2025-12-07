import { Outlet, Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  Menu,
  MenuItem
} from "@mui/material";
import { useState } from "react";

const Layout = () => {
  // Controle do menu "Podcast"
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      
      {/* NAVBAR */}
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>

          {/* ESQUERDA — LOGO */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              Café na Taverna
            </Typography>
          </Box>

          {/* CENTRO — MENU */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              gap: 2,
              alignItems: "center"
            }}
          >
            <Button component={RouterLink} to="/sobre" color="inherit">
              Sobre
            </Button>

            <Button component={RouterLink} to="/" color="inherit">
              Início
            </Button>

            {/* MENU PODCAST */}
            <Button color="inherit" onClick={handleOpenMenu}>
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

          {/* DIREITA — VAZIO (balanceamento para centralizar o menu) */}
          <Box sx={{ flex: 1 }} />

        </Toolbar>
      </AppBar>

      {/* CONTEÚDO DAS PÁGINAS */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>

      {/* FOOTER */}
      <Box
        component="footer"
        sx={{
          py: 2,
          backgroundColor: "#e0e0e0",
          mt: "auto"
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Café na Taverna
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;