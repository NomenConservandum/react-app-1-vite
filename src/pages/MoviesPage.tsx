import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { Grid } from "@mui/material";
import { movieService } from '../utils/movieService';
import type { Movie } from '../utils/movieService';

const MoviesPage: React.FC = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    movieService.getMovies()
      .then(res => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress sx={{ display: 'block', m: '50px auto' }} />;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Каталог фильмов</Typography>
      <Grid container spacing={3}>
        {data.map((movie) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={movie.id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography color="text.secondary">Год выпуска: {movie.year}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MoviesPage;