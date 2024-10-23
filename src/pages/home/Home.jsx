import { Typography, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SearchAppBar from '../../components/search-bar/SearchBar';
import CardMaterial from '../../components/card/CardMaterial';
import getDataFunction from '../../api/api';

function Home() {
  const [offeredServices, setOfferedServiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceProviders, setServiceProviders] = useState({}); // Armazena prestadores de serviço

  async function fetchOfferedService() {
    try {
      const offeredServiceData = await getDataFunction('offered-service');
      console.log('Dados retornados pela API:', offeredServiceData);
      setOfferedServiceData(offeredServiceData);

      // Para cada serviceProviderId, faça uma requisição para buscar os dados do prestador de serviço
      const providerDataPromises = offeredServiceData.map(async (service) => {
        if (service.serviceProviderId) { // Verifica se o serviceProviderId existe
          const providerData = await getDataFunction(`service-provider/${service.serviceProviderId}`);
          return { [service.serviceProviderId]: providerData };
        }
        return null; // Se não houver serviceProviderId, retorna null
      });

      const providers = await Promise.all(providerDataPromises);
      const providerMap = Object.assign({}, ...providers.filter(Boolean)); // Filtra valores nulos
      setServiceProviders(providerMap);  // Armazena os dados dos prestadores por ID
    } catch (error) {
      console.error('Erro ao buscar dados do prestador de serviço:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOfferedService();
  }, []);

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  if (offeredServices.length === 0) {
    return <Typography>Erro: Nenhum prestador de serviço encontrado.</Typography>;
  }

  return (
    <div>
      <SearchAppBar />
      {/* Espaço para compensar a altura da AppBar */}
      <div style={{ height: '60px' }} />
      <Typography variant="h3" component="h2" style={{marginBottom: '10px'}}>
        Procure seu prestador de serviço!
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {offeredServices.map((offeredService) => (
          <Grid item key={offeredService.id}>
            <div style={{ minWidth: '280px', maxWidth: '300px' }}>
              <CardMaterial
                title={offeredService.name}
                avatarLetter={
                  serviceProviders[offeredService.serviceProviderId]
                    ? serviceProviders[offeredService.serviceProviderId].name[0]
                    : offeredService.name[0] || 'N'
                }
                image={serviceProviders[offeredService.serviceProviderId].image || ''}
                experience={serviceProviders[offeredService.serviceProviderId].experience}
                nameProvider={
                  serviceProviders[offeredService.serviceProviderId]
                    ? serviceProviders[offeredService.serviceProviderId].name
                    : 'Prestador não encontrado'
                }
              />
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );  
}

export default Home;
