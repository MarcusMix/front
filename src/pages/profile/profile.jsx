import React, { useEffect, useState } from 'react';
import Button from '../../components/button/button';
import { Box, Container, CircularProgress, Typography, Card, CardContent } from '@mui/material';
import TitleNew from '../../components/title/Title';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [serviceOrders, setServiceOrders] = useState([]); // Armazena as service orders
  const [serviceProviders, setServiceProviders] = useState({}); // Armazena os prestadores de serviço
  const [loadingOrders, setLoadingOrders] = useState(true); // Controla o carregamento
  const token = localStorage.getItem('token');

  let loggedInUsername = null;

  // Decodifica o token
  if (token) {
    try {
      const decoded = jwtDecode(token);
      loggedInUsername = decoded.sub;
    } catch (error) {
      console.error('Token inválido:', error);
    }
  }

  useEffect(() => {
    // Busca as informações do usuário
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/user/by-email?email=${loggedInUsername}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`, // Token no cabeçalho
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
      }
    };

    fetchUserInfo();
  }, [loggedInUsername, token]);

  useEffect(() => {
    // Busca as ordens de serviço
    const fetchServiceOrders = async () => {
      if (!userInfo || !userInfo.id) return;

      try {
        const response = await fetch(
          `http://localhost:8080/service-order/user/${userInfo.id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        setServiceOrders(data);
      } catch (error) {
        console.error('Erro ao buscar as ordens de serviço:', error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchServiceOrders();
  }, [userInfo, token]);

  useEffect(() => {
    // Busca os detalhes dos prestadores de serviço
    const fetchServiceProviders = async () => {
      const uniqueProviderIds = [...new Set(serviceOrders.map((order) => order.serviceProviderId))];

      for (const providerId of uniqueProviderIds) {
        if (!serviceProviders[providerId]) {
          try {
            const response = await fetch(
              `http://localhost:8080/service-provider/${providerId}`,
              {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (!response.ok) {
              throw new Error(`Erro ao buscar o prestador de serviço: ${response.status}`);
            }

            const data = await response.json();
            setServiceProviders((prev) => ({ ...prev, [providerId]: data }));
          } catch (error) {
            console.error('Erro ao buscar o prestador de serviço:', error);
          }
        }
      }
    };

    if (serviceOrders.length > 0) {
      fetchServiceProviders();
    }
  }, [serviceOrders, token]);

  if (!userInfo) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
        <TitleNew>Bem-vindo {userInfo.name}, ao seu perfil!</TitleNew>
        <p>E-mail da conta: {userInfo.email}</p>
        <p>Cidade: {userInfo.addressDTO.city}</p>
        <p>Estado: {userInfo.addressDTO.state}</p>
        <Link to="/signup-service">
          <Button label="Criar Perfil de Prestador" />
        </Link>

        {/* Exibe as service orders */}
        <Box>
          <TitleNew>Serviços Contratados</TitleNew>
          {loadingOrders ? (
            <CircularProgress />
          ) : serviceOrders.length > 0 ? (
            serviceOrders.map((order) => {
              const serviceProvider = serviceProviders[order.serviceProviderId];
              return (
                <Card key={order.id} sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Typography variant="h6">
                      Serviço: {order.offeredServiceId ? `Serviço ID ${order.offeredServiceId}` : 'Serviço não especificado'}
                    </Typography>
                    <Typography>
                      Prestador:{' '}
                      {serviceProvider ? (
                        <Link to={`/service-provider/${order.serviceProviderId}`}>
                          {serviceProvider.name}
                        </Link>
                      ) : (
                        'Carregando...'
                      )}
                    </Typography>
                    <Typography>Status: {order.status}</Typography>
                    <Typography>Avaliação: {order.rating || 'Não avaliado'}</Typography>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Typography>Nenhum serviço contratado encontrado.</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
