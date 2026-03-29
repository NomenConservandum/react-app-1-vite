import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Divider, Paper } from '@mui/material';
import { movieService } from "../utils/movieService";
import type { Director } from "../utils/movieService";

const DirectorsPage: React.FC = () => {
  const [directors, setDirectors] = useState<Director[]>([]);

  useEffect(() => {
    movieService.getDirectors().then(res => setDirectors(res.data));
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Режиссеры</Typography>
      <Paper elevation={2}>
        <List>
          {directors.map((director, index) => (
            <React.Fragment key={director.id}>
              <ListItem>
                <ListItemText 
                  primary={`${director.firstName} ${director.secondName}`} 
                  secondary={`ID: ${director.id}`}
                />
              </ListItem>
              {index < directors.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default DirectorsPage;