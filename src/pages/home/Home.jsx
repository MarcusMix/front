import { Typography, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchAppBar from '../../components/search-bar/SearchBar';
import CardMaterial from '../../components/card/CardMaterial';
import getDataFunction from '../../api/api';

function Home() {
  const [offeredServices, setOfferedServiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceProviders, setServiceProviders] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  async function fetchOfferedService() {
    try {
      const offeredServiceData = await getDataFunction('offered-service');
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

  const handleCardClick = (offeredServiceId) => {
    navigate(`/service/${offeredServiceId}`);
  };

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <div>
      <SearchAppBar onSearch={handleSearch} />
      <div style={{ height: '80px' }} />
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{
          padding: '16px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {(searchResults.length > 0 ? searchResults : offeredServices).map((offeredService) => (
          <Grid
            item
            key={offeredService.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            onClick={() => handleCardClick(offeredService.id)}
            sx={{ cursor: 'pointer' }} // Torna o cartão clicável
          >
            <CardMaterial
              title={offeredService.name}
              serviceProviderId={offeredService.serviceProviderId}
              avatarImage={`data:image/jpeg;base64,${serviceProviders[offeredService.serviceProviderId]?.image}`}
              image={`data:image/jpeg;base64,${offeredService.image}`}
              experience={serviceProviders[offeredService.serviceProviderId]?.experience}
              nameProvider={
                serviceProviders[offeredService.serviceProviderId]?.name || 'Prestador não encontrado'
              }
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
