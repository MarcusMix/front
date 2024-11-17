import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

function OfferedServiceCard({ service }) {
    const { name, description, price, image } = service;

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
            <Button variant="contained" fullWidth>
                Contratar Serviço
            </Button>
        </Card>
    );
}

export default OfferedServiceCard;