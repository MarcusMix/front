// Login.js
import React from 'react';
import Button from '../../components/button/button';
import { Box, Container } from '@mui/material';
import TitleNew from '../../components/title/Title';
import { Link } from 'react-router-dom';


const Profile = () => {
  return (
    <Container maxWidth="sm" >
          <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', // Alinha os itens em coluna
          gap: 2, // Espaço entre os itens
          padding: 2 // Espaço interno do container
        }}
      >


        <TitleNew>Bem-vindo ao seu perfil!</TitleNew>
        <Link to="/signup-service"> <Button label="Criar Perfil de Prestador" /> </Link> 
      </Box>
    </Container>

  );
};

export default Profile;
