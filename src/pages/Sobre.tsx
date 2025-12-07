import { Box, Container, Typography } from "@mui/material";

const Sobre = () => {
  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      
      {/* Título */}
      <Typography
        variant="h3"
        sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}
      >
        Sobre o Podcast
      </Typography>

      {/* Texto principal */}
      <Box sx={{ fontSize: "1.2rem", lineHeight: 1.8 }}>
        <Typography paragraph>
          O Café na Taverna nasceu durante a pandemia como um espaço descontraído
          para conversar sobre jogos, cinema, séries e histórias que mereciam ser
          compartilhadas. Ao longo do tempo, o podcast cresceu, ganhou novos
          ouvintes e se tornou um ponto de encontro para quem gosta de debates
          leves, humor e reflexões sobre o mundo da cultura pop.
        </Typography>

        <Typography paragraph>
          Mais do que episódios, o Café na Taverna sempre foi um projeto de
          amizade, criatividade e vontade de contar boas histórias. Cada conversa,
          cada risada e cada pauta surgiu naturalmente — muitas vezes como uma
          conversa de bar ao pé da lareira, entre amigos que adoram imaginar e
          discutir mundos, filmes e jogos.
        </Typography>

        <Typography paragraph>
          Este site foi desenvolvido como uma plataforma oficial para reunir todos
          os episódios, informações e novidades do podcast, oferecendo uma
          experiência mais completa e independente para os ouvintes.
        </Typography>

        <Typography paragraph sx={{ mt: 4, fontWeight: "bold", textAlign: "center" }}>
          Obrigado por fazer parte dessa taverna — puxe uma cadeira, prepare um café
          e aproveite a jornada.
        </Typography>
      </Box>

    </Container>
  );
};

export default Sobre;
