import React, { useEffect, useState } from 'react';
import Button from '../../components/button/button';
import { Box, Container } from '@mui/material';
import TitleNew from '../../components/title/Title';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Remova as chaves para o import funcionar corretamente

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const token = localStorage.getItem('token');

  let loggedInUsername = null;

  // Decodifica o token
  if (token) {
    try {
      const decoded = jwtDecode(token);
      loggedInUsername = decoded.sub;
    } catch (error) {
      console.error("Token inválido:", error);
    }
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/user?email=${loggedInUsername}`, // Email como parâmetro de consulta
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`, // Token no cabeçalho
            },
          }
        );

        // Verifica se a resposta é válida
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
      }
    };

    if (loggedInUsername && token) {
      fetchUserInfo();
    }
  }, [loggedInUsername, token]);

  if (!userInfo) {
    return <div>Carregando...</div>;
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 2,
        }}
      >
        <TitleNew>Bem-vindo ao seu perfil!</TitleNew>
        <p>{userInfo.name}</p>
        <Link to="/signup-service">
          <Button label="Criar Perfil de Prestador" />
        </Link>
      </Box>
    </Container>
  );
};

export default Profile;
