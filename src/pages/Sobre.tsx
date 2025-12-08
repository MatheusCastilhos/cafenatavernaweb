import { Box, Container, Typography, Grid, Paper } from "@mui/material";

const founders = [
  { name: "Douglas William", img: "/sobre/founders/doug.jpeg" },
  { name: "Matheus Castilhos", img: "/sobre/founders/cast.jpg" },
  { name: "Gabriel Borges", img: "/sobre/founders/gabs.jpg" },
  { name: "Felipe Vitor", img: "/sobre/founders/felipe.jpeg" },
];

const Sobre = () => {
  return (
    <Box>

      {/* SESSÃO 1 — SOBRE O PROGRAMA */}
      <Box
        sx={{
          position: "relative",
          py: { xs: 8, md: 20 },
          px: 2,
          overflow: "hidden",
        }}
      >
        {/* Fundo */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: 'url("/sobre/bgsobre.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px)",
            transform: "scale(1.03)",
            zIndex: 0,
          }}
        />

        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(20, 20, 20, 0.65), rgba(29, 29, 29, 0.65))",
            zIndex: 1,
          }}
        />

        {/* Conteúdo */}
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 2, color: "#fff" }}>
          <Typography
            variant="h3"
            sx={{
              mb: 4,
              textAlign: "center",
              fontWeight: "bold",
              color: "#d17039",
              textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
            }}
          >
            Sobre o Programa
          </Typography>

          <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 2, textShadow: "1px 1px 3px rgba(0,0,0,0.6)" }}>
            O ano era{" "} 
            <Box component="span" sx={{fontWeight: "bold", color: "#d17039"}}>
             2018
            </Box>
            , quando um grupo de pessoas nos mais diferentes e
            distantes estados do Brasil se conheceram de forma on-line para
            jogar{" "}
            <Box component="span" sx={{fontWeight: "bold", color: "#d17039"}}>
             RPG
            </Box>
            . Passou mais de um ano e de uma amizade fortalecida surgiu
            a ideia de criar um{" "}
            <Box component="span" sx={{fontWeight: "bold", color: "#d17039"}}>
             podcast
            </Box>
            {" "}para gravar e compartilhar as mais diversas
            conversas deste grupo.
          </Typography>

          <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.8, mb: 2, textShadow: "1px 1px 3px rgba(0,0,0,0.6)" }}>
            Eis que no fim de{" "}
            <Box component="span" sx={{fontWeight: "bold", color: "#d17039"}}>
             2019
            </Box>
            , depois de muita discussão, surge o{" "}
            <Box component="span" sx={{fontWeight: "bold", color: "#d17039"}}>
             Café na Taverna
            </Box>
            , de forma despretensiosa e com o único{" "}
            <Box component="span" sx={{fontWeight: "bold", color: "#d17039"}}>
             objetivo de divertir e se divertir.
            </Box>
          </Typography>

          <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.8, textShadow: "1px 1px 3px rgba(0,0,0,0.6)" }}>
            Nós somos um grupo de amigos que gosta de conversar e dar risadas
            sobre os diferentes assuntos da cultura pop. Desde filmes, séries,
            jogos, animes e, obviamente, a razão de tudo isso existir: RPG.
          </Typography>
        </Container>
      </Box>

      {/* SESSÃO 2 — TAVERNEIROS */}
      <Box
        sx={{
          position: "relative",
          py: { xs: 8, md: 20 },
          px: 2,
          overflow: "hidden",
        }}
      >
        {/* Fundo */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: 'url("/sobre/bgfounders.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px)",
            transform: "scale(1.03)",
            zIndex: 0,
          }}
        />

        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.18)",
            zIndex: 1,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, color: "#fff" }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              mb: 6,
              fontWeight: "bold",
              color: "#d17039",
              textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
            }}
          >
            Taverneiros
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {founders.map((f) => (
              <Grid item xs={12} sm={6} md={3} key={f.name}>
                <Paper
                  sx={{
                    backgroundColor: "rgba(0,0,0,0.6)",
                    borderRadius: 3,
                    p: 2,
                    textAlign: "center",
                    color: "#fff",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                  }}
                  elevation={6}
                >
                  {/* Foto 1:1 */}
                  <Box
                    sx={{
                      width: "100%",
                      paddingTop: "100%",
                      position: "relative",
                      borderRadius: 2,
                      overflow: "hidden",
                      border: "4px solid #fff",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.6)",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${f.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </Box>

                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold" }}
                  >
                    {f.name}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

    </Box>
  );
};

export default Sobre;