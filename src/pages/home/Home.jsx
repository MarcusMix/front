import { Typography, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SearchAppBar from '../../components/search-bar/SearchBar';
import CardMaterial from '../../components/card/CardMaterial';
import getDataFunction from '../../api/api';

function Home() {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchServiceProvider() {
    try {
      const serviceProviderData = await getDataFunction('service-provider');
      console.log('Dados retornados pela API:', serviceProviderData);
      setServiceProviders(serviceProviderData);
    } catch (error) {
      console.error('Erro ao buscar dados do service provider:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchServiceProvider();
  }, []);

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  if (serviceProviders.length === 0) {
    return <Typography>Erro: Nenhum prestador de serviço encontrado.</Typography>;
  }

  return (
    <div>
      <SearchAppBar />
      <Typography variant="h1" component="h2">
        Tela inicial
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {serviceProviders.map((serviceProvider) => (
          <Grid item key={serviceProvider.id}>
            <div style={{ minWidth: '280px', maxWidth: '300px' }}>
              <CardMaterial
                title={serviceProvider.name}
                subheader={serviceProvider.description}
                avatarLetter={serviceProvider.name[0] || 'N'}
                image={serviceProvider.image || 'https://via.placeholder.com/150'}
                experience={serviceProvider.experience}
              />
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
