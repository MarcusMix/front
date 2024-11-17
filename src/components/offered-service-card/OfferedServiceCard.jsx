import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import axios from 'axios'; // Importe o axios
import { jwtDecode } from 'jwt-decode'; // Importe a biblioteca

function OfferedServiceCard({ service }) {
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
            <Button variant="contained" fullWidth onClick={handleHireService}> {/* Adicione o onClick */}
                Contratar Serviço
            </Button>
        </Card>
    );
}

export default OfferedServiceCard;