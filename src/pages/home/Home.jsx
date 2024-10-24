import { Typography, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate
import SearchAppBar from '../../components/search-bar/SearchBar';
import CardMaterial from '../../components/card/CardMaterial';
import getDataFunction from '../../api/api';

function Home() {
  const [offeredServices, setOfferedServiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceProviders, setServiceProviders] = useState({});
  const navigate = useNavigate(); // Para navegação

  async function fetchOfferedService() {
    try {
<<<<<<< HEAD
      const offeredServiceData = await getDataFunction('offered-service');
=======
<<<<<<< Updated upstream
      const offeredServiceData = await getDataFunction('offered-services');
>>>>>>> 87435ca (feat: page service)
      console.log('Dados retornados pela API:', offeredServiceData);
=======
      const offeredServiceData = await getDataFunction('offered-service');
>>>>>>> Stashed changes
      setOfferedServiceData(offeredServiceData);

      const providerDataPromises = offeredServiceData.map(async (service) => {
        if (service.serviceProviderId) {
          const providerData = await getDataFunction(`service-provider/${service.serviceProviderId}`);
          return { [service.serviceProviderId]: providerData };
        }
        return null;
      });

      const providers = await Promise.all(providerDataPromises);
      const providerMap = Object.assign({}, ...providers.filter(Boolean));
      setServiceProviders(providerMap);
    } catch (error) {
      console.error('Erro ao buscar dados do prestador de serviço:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOfferedService();
  }, []);

  const handleCardClick = (id) => {
    // Navega para a página de detalhes passando o ID do prestador de serviço
    navigate(`/service/${id}`);
  };

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  if (offeredServices.length === 0) {
    return <Typography>Erro: Nenhum prestador de serviço encontrado.</Typography>;
  }

  return (
    <div>
      <SearchAppBar />
<<<<<<< HEAD
      {/* Espaço para compensar a altura da AppBar */}
      <div style={{ height: '60px' }} />
      <Typography variant="h3" component="h2" style={{marginBottom: '10px'}}>
        Procure seu prestador de serviço!
=======
<<<<<<< Updated upstream
      <Typography variant="h1" component="h2">
        Tela inicial
=======
      <div style={{ height: '60px' }} />
      <Typography variant="h3" component="h2" style={{ marginBottom: '10px' }}>
        Procure seu prestador de serviço!
>>>>>>> Stashed changes
>>>>>>> 87435ca (feat: page service)
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {offeredServices.map((offeredService) => (
          <Grid
            item
            key={offeredService.id}
            onClick={() => handleCardClick(offeredService.serviceProviderId)} // Adiciona o clique no card
          >
            <div style={{ minWidth: '280px', maxWidth: '300px', cursor: 'pointer' }}>
              <CardMaterial
                title={offeredService.name}
                avatarLetter={
                  serviceProviders[offeredService.serviceProviderId]
                    ? serviceProviders[offeredService.serviceProviderId].name[0]
                    : offeredService.name[0] || 'N'
                }
                image={serviceProviders[offeredService.serviceProviderId]?.image || ''}
                experience={serviceProviders[offeredService.serviceProviderId]?.experience}
                nameProvider={
<<<<<<< Updated upstream
                  serviceProviders[offeredService.serviceProviderId]
                    ? serviceProviders[offeredService.serviceProviderId].name
<<<<<<< HEAD
                    : 'Prestador não encontrado'
=======
                    : 'Prestador não encontrado' // Valor padrão se não encontrar o prestador
=======
                  serviceProviders[offeredService.serviceProviderId]?.name || 'Prestador não encontrado'
>>>>>>> Stashed changes
>>>>>>> 87435ca (feat: page service)
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
