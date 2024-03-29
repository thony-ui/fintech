import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../store/userSlice";
import { selectUser } from "../store/userSlice";
import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";
import detectProvider from "@portkey/detect-provider";
import { useRouter } from "next/router";
import Alert from '@mui/material/Alert';
import { AlignHorizontalCenter, CheckCircle } from "@mui/icons-material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Blockchain Buddies 2024
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function PendingTransaction() {
  const router = useRouter()
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [provider, setProvider] = useState(null);
  const init = async () => {
    try {
      setProvider(await detectProvider());
    } catch (error) {
      console.log(error, "=====error");
    }
  };
  const connect = async () => {
    try {
      const accounts = await provider?.request({
        method: MethodsBase.REQUEST_ACCOUNTS,
      });
      const address = accounts["tDVW"][0];
      dispatch(
        logIn({
          id: address,
        })
      ); // Assuming the first account is the user's addres
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };
  const [supplier, setSupplier] = useState("");
  const handleSubmit = async (event) => {
    console.log("confirm transaction");
  };

  useEffect(() => {
    if (!provider) {
      init();
    } else {
      connect();
    }
  }, [provider]);

  if (!provider) return <>Provider not found.</>;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
            <Card>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography component="div" variant="h4" color="black">
                            Transaction is pending your approval!
                        </Typography>
                        <Typography component="div" variant="h6" color="text.secondary">
                            Please accept or deny the transaction
                        </Typography>
                        <HourglassTopIcon sx={{ fontSize: 200, mt: '24px'}} />
                        <Typography component="div" variant="h6" color="text.secondary">
                            The following transaction has been requested.
                        </Typography>
                        <Typography component="div" variant="h6" color="text.secondary">
                            Transaction number: 1234567890
                        </Typography>

                        <Typography component="div" variant="h4" color="black" sx={{mt: '24px'}}>
                            Transaction Details
                        </Typography>
                    </Box>
                    
                </CardContent>

              <Typography component="div" variant="h6" color="text.secondary" sx={{paddingX: '14px'}}>
                Item to be Transfered
              </Typography>

              <Box sx={{ display: 'flex', 
                         justifyContent: "space-between",
                         marginBottom: '14px'}}>
                
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">
                      Panadol ActiFast x 1 Unit
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      Origin: Ireland
                    </Typography>
                  </CardContent>
                </Box>
                <CardMedia
                  style={{
                    border: "2px solid gray",
                    borderRadius: "10px",
                    width: "120px", // Adjust the width as desired
                    paddingTop: "120px", // Adjust the paddingTop to control the height and make it square
                    marginRight: "10px",
                    objectFit: "cover", // Ensure the image fills the container without distortion
                  }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  image="https://i-cf65.ch-static.com/content/dam/cf-consumer-healthcare/panadol/en_sg/adult/Singapore_Adult_product_images/Panadol_ActiFast/Panadol_Actifast-455x455.png?auto=format"
                  alt="Product Image"
                />
              </Box>
              <Typography component="div" variant="h6" color="text.secondary" sx={{paddingX: '14px'}}>
                Sender Name
              </Typography>
              <Typography component="body" variant="h6" sx={{paddingX: '14px', paddingBottom: '14px'}}>
                Shelia Teo
              </Typography>
              <Typography component="div" variant="h6" color="text.secondary" sx={{paddingX: '14px'}}>
                Ireland Panadol Manufacturing Base
              </Typography>
              <Typography component="body" variant="h6" sx={{paddingX: '14px', paddingBottom: '14px'}}>
                ELF-lorem-ipsum-dolor-sit-amet-meow
              </Typography>
          </Card>
          
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
                className="text-black bg-green-400 hover:bg-green-700 hover:text-white"
              sx={{ mt: 3, mb: 2 }}
            >
              <Link href="/">
                Accept Transaction
              </Link>
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="text-black bg-gray-200 hover:text-white hover:bg-red-700"
              sx={{ mt: 1, mb: 2 }}
            >
              Deny Transaction
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
