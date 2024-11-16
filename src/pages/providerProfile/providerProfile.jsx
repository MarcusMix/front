import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SearchAppBar from '../../components/search-bar/SearchBar';
import getDataFunction from '../../api/api';
import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

function ServiceProviderProfile() {
    const { id } = useParams();
    const [providerData, setProviderData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProviderData = async () => {
            try {
                const data = await getDataFunction(`service-provider/${id}`);
                setProviderData(data);
            } catch (error) {
                console.error('Erro ao buscar dados do prestador:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProviderData();
    }, [id]);

    const handleSearch = (results) => {
        // Lógica para lidar com os resultados da busca
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!providerData) {
        return <div>Prestador não encontrado.</div>;
    }

    return (
        <div>
            <SearchAppBar onSearch={handleSearch} />
            <div style={{ height: '80px' }} />

            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            avatar={
                                providerData.image ? (
                                    <Avatar alt={providerData.name} src={`data:image/jpeg;base64,${providerData.image}`} />
                                ) : (
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {providerData.name[0]}
                                    </Avatar>
                                )
                            }
                            title={providerData.name}
                            subheader={providerData.description}
                        />
                        {/* <CardMedia
              component="img"
              height="194"
              image={`data:image/jpeg;base64,${providerData.image}`} // Se tiver uma imagem de capa
              alt={providerData.name}
            /> */}
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Experiência: {providerData.experience}
                            </Typography>

                            {/* Aqui entrará o componente de serviços posteriormente */}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default ServiceProviderProfile;