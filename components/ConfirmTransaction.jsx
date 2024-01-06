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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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

export default function ConfirmTransaction() {
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
    
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (user) {
      router.push("/")
      await addDoc(collection(db, "user"), {
        elfid: user.id,
        firstname: data.get("firstName"),
        lastname: data.get("lastName"),
        address: data.get("address"),
        supplier: supplier,
      });
    } else {
      alert("login with portkey first")
    }
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Transaction Information
          </Typography>
          <Typography component="h1" variant="h5">
            NFT Information
          </Typography>
          <Avatar sx={{ m: 5, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Card>
            <Typography component="h1" variant="h5">
              Recipient Information: Shelia Teo
              Address : 0x1234567890 Tampines
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
              Confirm Transaction
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="text-black bg-gray-200 hover:text-white hover:bg-red-700"
              sx={{ mt: 1, mb: 2 }}
            >
              Cancel Transaction
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
