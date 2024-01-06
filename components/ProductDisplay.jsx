import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import CardActions from '@mui/material/CardActions';

function ProductDisplay() {
  return (
    <Grid container spacing={4} sx={{ mx: 'auto', my: 12, width: 1000, height: 500 }}>
      {/* Left side - Product Images */}
      <Grid item xs={4}>
        <Card sx={{ width: '100%', height: '100%', flex: 1}}>
          <CardMedia
            component="div"
            sx={{ width: '100%', height: '100%', paddingTop: '100%' }} // Set the aspect ratio for the image
            image="https://source.unsplash.com/random?wallpapers"
            alt="Product Image"
          />
        </Card>
      </Grid>

      {/* Right side - Product Details */}
      <Grid item xs={8}>
        <Card sx={{ height: '100%', border: 'none', pl: 2}}>
          <CardContent>
            <Typography
                  component="h2"
                  variant="h2"
                  align="left"
                  color="000000"
                  fontWeight='bold'
                >
                  NFT Name
                </Typography>
          <Typography variant="body2" color="text.secondary" sx={{paddingTop: 4}}>
            NFT Information, including (1) Description (2) Origin Location (3) Destination Location (4) Timeline of Product&apos;s Journey.
          </Typography>
          <Typography fontWeight='bold' fontSize={30} color="#9c27b0" variant="body2" sx={{paddingTop: 4}}>
            Price
          </Typography>
        </CardContent>
        <CardActions>
        <Button variant="outlined" color="secondary" sx={{ marginLeft: '8px' }}>Transfer NFT</Button>
      </CardActions>
        </Card>
      </Grid>
    </Grid>
    
  );
}
export default ProductDisplay;
