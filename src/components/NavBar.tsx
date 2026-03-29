import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ColorModeContext } from '../App';
import { useTheme } from '@mui/material/styles';

const NavBar: React.FC = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          React Project
        </Typography>
        
        {/* Переключатель темы */}
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleTheme} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Button color="inherit" onClick={() => navigate('/movies')}>Фильмы</Button>
        <Button color="inherit" onClick={() => navigate('/genres')}>Жанры</Button>
        <Button color="inherit" onClick={() => navigate('/directors')}>Режиссеры</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;