import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Box, 
  Chip,
  Skeleton 
} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import { movieService } from '../utils/movieService';
import type { Movie } from '../utils/movieService';
import { CustomButton } from '../ui/CustomButton';

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await movieService.getMovies();
        setMovies(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке фильмов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Заглушка во время загрузки
  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Кинотека
        </Typography>
        <Chip label={`Всего: ${movies.length}`} color="primary" variant="outlined" />
      </Box>

      {movies.length === 0 ? (
        <Typography variant="h6" textAlign="center" color="textSecondary">
          Фильмы пока не добавлены.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card 
                elevation={3} 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.02)' }
                }}
              >
                <Box 
                  sx={{ 
                    height: 140, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    bgcolor: 'grey.200' 
                  }}
                >
                  <MovieIcon sx={{ fontSize: 60, color: 'grey.400' }} />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Год выпуска: {movie.year}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <CustomButton 
                    size="small" 
                    fullWidth 
                    tooltipText="Посмотреть подробности о фильме"
                  >
                    Подробнее
                  </CustomButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MoviesPage;