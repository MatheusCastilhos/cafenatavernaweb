import { Typography, Paper, Box } from '@mui/material'

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Área de Dashboard
        </Typography>
        <Typography variant="body1">
          Adicione aqui o conteúdo do seu dashboard futuramente.
        </Typography>
      </Paper>
    </Box>
  )
}

export default Dashboard
