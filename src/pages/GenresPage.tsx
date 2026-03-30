import React, { useEffect, useState } from 'react';
import { Container, Typography, Chip, Stack, Paper } from '@mui/material';
import { movieService } from "../utils/movieService";
import type { Genre } from "../utils/movieService";

const GenresPage: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    movieService.getGenres().then(res => setGenres(res.data));
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Жанры</Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {genres.map((genre) => (
            <Chip 
              key={genre.id} 
              label={genre.name} 
              color="primary" 
              variant="outlined" 
              clickable 
            />
          ))}
        </Stack>
      </Paper>
    </Container>
  );
};

export default GenresPage;