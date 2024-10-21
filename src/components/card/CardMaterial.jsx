import * as React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

export default function CardMaterial({ title, subheader, avatarLetter, image, experience, nameProvider }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {avatarLetter}
          </Avatar>
        }
        title={title} 
        subheader={subheader} 
      />
      <CardMedia
        component="img"
        height="194"
        image={image} 
        alt={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Experiência: {experience} {/* Experiência dinâmica */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Prestador: {nameProvider} 
        </Typography>
      </CardContent>
    </Card>
  );
}
