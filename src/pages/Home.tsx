import { Typography, Paper, Box } from '@mui/material'

const Home = () => {
  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom>
        Bem-vindo!
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Fullstack Application
        </Typography>
        <Typography variant="body1" paragraph>
          Esta é uma aplicação fullstack com React, TypeScript, Material UI no
          frontend e Node.js, Express e MongoDB no backend.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Navegue pelo menu para explorar as diferentes páginas.
        </Typography>
      </Paper>
    </Box>
  )
}

export default Home
