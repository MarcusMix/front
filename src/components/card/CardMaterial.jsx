import * as React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';

export default function CardMaterial({ title, subheader, avatarLetter, image, experience }) {
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
          Experiência: {experience} anos {/* Experiência dinâmica */}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
