import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function Footer() {
    return (
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
                Footer
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
            >
                Something here to give the footer a purpose!
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            Blockchain Buddies 2024
            </Typography>
        </Box>
    );
}
export default Footer;