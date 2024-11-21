import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import axios from 'axios'; // Importe o axios
import { jwtDecode } from 'jwt-decode'; // Importe a biblioteca

function OfferedServiceCard({ service, isServiceProvider, onEdit }) {
    const { name, description, price, image } = service;

    const handleHireService = async () => {
        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId; // Obtém o ID do usuário do token

            const serviceOrderDTO = {
                userId: userId,
                serviceProviderId: service.serviceProvider.id,
                offeredServiceId: service.id,
                status: 'PENDING',
            };

            await axios.post('http://localhost:8080/service-order', serviceOrderDTO, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Serviço contratado com sucesso!');
        } catch (error) {
            console.error('Erro ao contratar serviço:', error);
            alert('Erro ao contratar serviço. Por favor, tente novamente.');
        }
    };

    const handleEditService = () => {
        onEdit(service);
    };

    const handleDeleteService = async () => {
        if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8080/offered-service/${service.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Atualizar a lista de serviços ou recarregar a página
                window.location.reload();
            } catch (error) {
                console.error('Erro ao excluir serviço:', error);
                alert('Erro ao excluir serviço. Por favor, tente novamente.');
            }
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" component="div">
                    {name}
                </Typography>
                {image && (
                    <CardMedia
                        component="img"
                        height="140"
                        image={`data:image/jpeg;base64,${image}`}
                        alt={name}
                    />
                )}
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Typography variant="subtitle1" color="text.primary">
                    Preço: R$ {price}
                </Typography>
            </CardContent>
            {isServiceProvider ? (
                <div>
                    <Button variant="outlined" color="primary" onClick={handleEditService}>
                        Editar Serviço
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleDeleteService}>
                        Excluir Serviço
                    </Button>
                </div>
            ) : (
                <Button variant="contained" fullWidth onClick={handleHireService}>
                    Contratar Serviço
                </Button>
            )}
        </Card>
    );
}

export default OfferedServiceCard;