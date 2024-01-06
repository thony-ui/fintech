import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import CardActions from '@mui/material/CardActions';

function ProductDisplay() {
  return (
    <Grid container spacing={4} sx={{ my: 12, textAlign: "center", px: {xs:2, md:10}}}>
      {/* Left side - Product Images */}
      <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", border: "none"}}>
            <CardMedia
              component="div"
              sx={{ width: "100%", height: "100%", paddingTop: "100%" }}
              image="https://source.unsplash.com/random?wallpapers"
              alt="Product Image"
            />
          </Card>
        </Grid>

      {/* Right side - Product Details */}
      <Grid item xs={12} md = {6}>
        <Card sx={{ height: '100%', border: 'none'}}>
          <CardContent>
            <Typography
                  component="h2"
                  variant="h2"
                  align="left"
                  color="000000"
                  fontWeight='bold'
                  className='text-center'
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
        <CardActions className='flex flex-col items-center'>
        <Button variant="outlined" color="secondary" sx={{ marginLeft: '8px' }}>Transfer NFT</Button>
      </CardActions>
        </Card>
      </Grid>
    </Grid>
    
  );
}
export default ProductDisplay;
