import React from 'react';
import { ListItem, ListItemText, Button, Typography } from '@mui/material';

const statusTraducoes = {
    PENDING: 'Pendente',
    ACCEPTED: 'Aceito',
    FINISHED: 'Finalizado',
};

function ServiceOrderItem({ order, onStatusChange }) {
    const { userName, offeredServiceName, status } = order;

    const statusTraduzido = statusTraducoes[status] || status; // Traduz o status ou mantém o original se não houver tradução

    return (
        <ListItem divider>
            <ListItemText
                primary={offeredServiceName ? offeredServiceName : 'Serviço não encontrado'}
                secondary={`Cliente: ${userName ? userName : 'Usuário não encontrado'} - Status: ${statusTraduzido}`}
            />
            {status === 'PENDING' && (
                <Button variant="contained" color="primary" onClick={() => onStatusChange(order.id, 'ACCEPTED')}>
                    Aceitar
                </Button>
            )}
            {status === 'ACCEPTED' && (
                <Button variant="contained" color="error" onClick={() => onStatusChange(order.id, 'FINISHED')}>
                    Finalizar
                </Button>
            )}
        </ListItem>
    );
}

export default ServiceOrderItem;