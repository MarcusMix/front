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
        console.log("service", data)
      } catch (error) {
        console.error('Erro ao buscar os detalhes do prestador de serviço:', error);
      }
    }

    async function fetchOfferedService() {
      try {
        const data = await getDataFunction(`offered-service/${id}`);
        setOfferedService(data);
        console.log("ofered", data)
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
          src={serviceProvider.image ? `data:image/jpeg;base64,${serviceProvider.image}` : '/default-avatar.png'}
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
        {/* <ServiceInfo variant="h5">Serviço Oferecido</ServiceInfo> */}
        <Typography
          variant="h4"
          align="center"
          color="black"
          sx={{ fontWeight: 'bold', marginBottom: 2 }}
        >
          {offeredService.name}
        </Typography>

        <Typography variant="body1" align="center" color="textSecondary" paragraph>
          {offeredService.description}
        </Typography>
        
        <img
          src={offeredService.image ? `data:image/jpeg;base64,${offeredService.image}` : '/default-avatar.png'}
          alt=""
          style={{
            display: 'block', // Centraliza horizontalmente
            margin: '0 auto', // Centraliza horizontalmente
            width: '250px', // Define a largura fixa
            height: '250px', // Define a altura fixa
            objectFit: 'cover', // Mantém a proporção da imagem, cortando o excesso
            borderRadius: '8px', // Opcional: bordas arredondadas
          }}
        />
          <Typography variant="h6" align="center" color="grey">
            Preço: R$ {offeredService.price.toFixed(2)}
          </Typography>

        <Box display="flex" justifyContent="center" marginTop={2}>
        <Button type="submit" label="Contratar serviço" />
        </Box>
      </StyledCard>
    </Container>
  );
}

export default ServiceDetails;
