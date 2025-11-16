import { Typography, Paper, Box, Grid, Card, CardContent } from '@mui/material'

const About = () => {
  const technologies = [
    { name: 'React', description: 'Biblioteca JavaScript para UI' },
    { name: 'TypeScript', description: 'JavaScript com tipagem estática' },
    { name: 'Material UI', description: 'Componentes React de design' },
    { name: 'Node.js', description: 'Runtime JavaScript no servidor' },
    { name: 'Express', description: 'Framework web minimalista' },
    { name: 'MongoDB', description: 'Banco de dados NoSQL' },
  ]

  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom>
        Sobre o Projeto
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Tecnologias Utilizadas
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {technologies.map((tech) => (
            <Grid item xs={12} sm={6} md={4} key={tech.name}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {tech.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tech.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  )
}

export default About
