import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from './Navbar';
import Footer from './Footer';
import { useRouter } from 'next/router';

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme();
  
  export function Album() {
    const router = useRouter()
    return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
              marginTop: 6,
            }}
          >
            <div className='mx-auto max-w-[1000px]'>
              <Typography
                component="h4"
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom
                fontWeight='bold'
                sx={{ whiteSpace: 'nowrap' }}
              >
                Your NFT Collection
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph sx = {{textAlign: "center"}}>
              Unveil the beauty of your NFTs with ease, track ownership details, 
              and revel in the creativity of your digital treasures on our user-friendly platform.
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained" onClick = {() => router.push("/Mint")}>Mint NFT</Button>
                <Button variant="outlined" color = "secondary" onClick = {() => router.push("/search")}>Search Users</Button>
              </Stack>
              </div>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: '56.25%',
                      }}
                      image="https://source.unsplash.com/random?wallpapers"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        NFT Name
                      </Typography>
                      <Typography>
                        NFT Description
                      </Typography>
                    </CardContent>
                    <CardActions className='flex flex-col items-center'>
                      <Button size="small" onClick = {() => router.push("/productDisplay")}>View</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    );
  }

function all() {
    return (
        <div>
        <ResponsiveAppBar />
        <Album />
        <Footer />
        </div>
    );
}

export default all;