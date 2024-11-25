import React from 'react';
import { ListItem, ListItemText, Button, Typography } from '@mui/material';

function ServiceOrderItem({ order, onStatusChange }) { // Recebe a ordem e a função para atualizar o status
    const { user, offeredService, status } = order;

    return (
        <ListItem divider>
            <ListItemText
                primary={offeredService ? offeredService.name : 'Serviço não encontrado'} // Verifica se offeredService existe
                secondary={`Cliente: ${user ? user.name : 'Usuário não encontrado'} - Status: ${status}`}
            />
            {status === 'PENDING' && (
                <Button variant="contained" color="primary" onClick={() => onStatusChange(order.id, 'ACCEPTED')}>
                    Aceitar
                </Button>
            )}
            {status === 'ACCEPTED' && (
                <Button variant="contained" color="secondary" onClick={() => onStatusChange(order.id, 'FINISHED')}>
                    Finalizar
                </Button>
            )}
        </ListItem>
    );
}

export default ServiceOrderItem;