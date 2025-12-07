import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const drawerWidth = 240;

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // TODO: mais tarde trocar isso pra limpar token e redirecionar
  const handleLogout = () => {
    // localStorage.removeItem("token");
    navigate("/");
  };

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Café na Taverna
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Painel administrativo
        </Typography>
      </Box>
      <Divider />

      {/* MENU LATERAL */}
      <List>
        <ListItemButton component={RouterLink} to="/admin">
          <ListItemText primary="Visão geral" />
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/admin/episodios">
          <ListItemText primary="Episódios / Blog" />
        </ListItemButton>
        {/* espaços pra futuras seções */}
        {/* <ListItemButton component={RouterLink} to="/admin/usuarios">
          <ListItemText primary="Usuários" />
        </ListItemButton> */}
      </List>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          v0.1 — protótipo
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* TOPBAR */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin — Café na Taverna
          </Typography>

          <Button color="inherit" onClick={handleLogout}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      {/* DRAWER ESQUERDO */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="menu admin"
      >
        {/* Mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* CONTEÚDO INTERNO */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8, // espaço pro AppBar
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;