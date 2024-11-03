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
      // Aqui vamos manter 'offered-service' como o endpoint correto, de acordo com o que foi solicitado
      const offeredServiceData = await getDataFunction('offered-service');
      console.log('Dados retornados pela API:', offeredServiceData);
      setOfferedServiceData(offeredServiceData);

      // Para cada serviceProviderId, faça uma requisição para buscar os dados do prestador de serviço
      const providerDataPromises = offeredServiceData.map(async (service) => {
        if (service.serviceProviderId) {
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
      {/* Espaço para compensar a altura da AppBar */}
      <div style={{ height: '60px' }} />
      <Typography variant="h3" component="h2" style={{ marginBottom: '10px' }}>
        Procure seu prestador de serviço!
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
                image={`data:image/jpeg;base64,${serviceProviders[offeredService.serviceProviderId]?.image}`}
                experience={serviceProviders[offeredService.serviceProviderId]?.experience}
                nameProvider={
                  serviceProviders[offeredService.serviceProviderId]?.name || 'Prestador não encontrado'
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
