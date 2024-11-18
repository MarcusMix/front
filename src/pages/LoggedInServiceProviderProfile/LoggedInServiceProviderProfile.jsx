import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate
import SearchAppBar from '../../components/search-bar/SearchBar';
import getDataFunction from '../../api/api';
import { Avatar, Card, CardContent, CardHeader, Grid, Typography, Button, Modal, Box } from '@mui/material';
import { red } from '@mui/material/colors';
import OfferedServiceCard from '../../components/offered-service-card/OfferedServiceCard';
import { jwtDecode } from 'jwt-decode';
import OfferedServiceForm from '../../components/OfferedServiceForm/OfferedServiceForm';

function LoggedInServiceProviderProfile() {
    const navigate = useNavigate(); // Inicialize o useNavigate
    const [providerData, setProviderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    let loggedInUserId = null;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            loggedInUserId = decoded.userId; // Supondo que o ID do usuário esteja na propriedade 'sub' do token
        } catch (error) {
            console.error('Token inválido:', error);
        }
    }

    useEffect(() => {
        const fetchProviderData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/service-provider/user/${loggedInUserId}`, // Endpoint para buscar o prestador pelo ID do usuário
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    if (response.status === 404) {
                        // Redirecionar para a página de criação de perfil se não encontrado
                        navigate('/signup-service');
                    }
                    throw new Error(`Erro na requisição: ${response.status}`);
                }

                const data = await response.json();
                setProviderData(data);
            } catch (error) {
                console.error('Erro ao buscar dados do prestador:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProviderData();
    }, [loggedInUserId, token, navigate]); // Adicione navigate às dependências

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

                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Experiência: {providerData.experience}
                            </Typography>

                            <Grid container spacing={2}>
                                {providerData.offeredServices.map((service) => (
                                    <Grid item xs={12} sm={6} md={4} key={service.id}>
                                        <OfferedServiceCard service={service} />
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>

                        <Button variant="contained" color="primary" onClick={handleOpenModal}>
                            Criar Novo Serviço
                        </Button>

                        <Modal
                            open={openModal}
                            onClose={handleCloseModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                {/* Estilo do modal */}
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Criar Novo Serviço
                                </Typography>
                                <OfferedServiceForm
                                    providerId={providerData.id}
                                    onClose={handleCloseModal}
                                />
                                <Button onClick={handleCloseModal}>Fechar</Button>
                            </Box>
                        </Modal>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default LoggedInServiceProviderProfile;