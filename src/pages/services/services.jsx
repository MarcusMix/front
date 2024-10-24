import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, Grid, Avatar, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import getDataFunction from '../../api/api';
import Button from '../../components/button/button';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: '600px',
  margin: 'auto',
  marginTop: theme.spacing(8),
  padding: theme.spacing(3),
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}));

const ServiceProviderName = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

const ServiceInfo = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: 'center',
}));

function ServiceDetails() {
  const { id } = useParams();
  const [serviceProvider, setServiceProvider] = useState(null);
  const [offeredService, setOfferedService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServiceProvider() {
      try {
        const data = await getDataFunction(`service-provider/${id}`);
        setServiceProvider(data);
      } catch (error) {
        console.error('Erro ao buscar os detalhes do prestador de serviço:', error);
      }
    }

    async function fetchOfferedService() {
      try {
        const data = await getDataFunction(`offered-service/${id}`);
        setOfferedService(data);
      } catch (error) {
        console.error('Erro ao buscar os detalhes do serviço oferecido:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchServiceProvider();
    fetchOfferedService();
  }, [id]);

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (!serviceProvider || !offeredService) {
    return (
      <Typography variant="h6" align="center" color="error">
        Prestador ou serviço oferecido não encontrado.
      </Typography>
    );
  }

  return (
    <Container>
      <StyledCard>
        <AvatarContainer>
          <Avatar
            sx={{ width: 80, height: 80 }}
            src={serviceProvider.image || '/default-avatar.png'}
            alt={serviceProvider.name}
          />
        </AvatarContainer>
        <ServiceProviderName variant="h4">{serviceProvider.name}</ServiceProviderName>
        <Typography variant="body1" align="center" color="textSecondary" paragraph>
          Experiência: {serviceProvider.experience} anos
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" paragraph>
          Descrição: {serviceProvider.description || 'Nenhuma descrição disponível.'}
        </Typography>
        
        {/* Informações do serviço oferecido */}
        <ServiceInfo variant="h5">Serviço Oferecido</ServiceInfo>
        <Typography variant="body1" align="center" paragraph>
          {offeredService.name}
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" paragraph>
          {offeredService.description}
        </Typography>
        <Typography variant="h6" align="center" color="primary">
          Preço: R$ {offeredService.price.toFixed(2)}
        </Typography>
        
        {/* Centraliza o botão */}
        <Box display="flex" justifyContent="center" marginTop={2}>
        <Button type="submit" label="Contratar serviço" />
        </Box>
      </StyledCard>
    </Container>
  );
}

export default ServiceDetails;
