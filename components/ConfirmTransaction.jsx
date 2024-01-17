import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
import Alert from "@mui/material/Alert";
import useTokenContract from "../src/useTokenContract";
import useSmartContract from "../src/useSmartContract";
import Link from "next/link";

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

export default function ConfirmTransaction({ provider }) {
  const trustchainContract = useSmartContract({ provider: provider });
  function contractsend(method, params) {
    return async () => {
      try {
        const accounts = await provider?.request({
          method: MethodsBase.ACCOUNTS,
        });
        if (!accounts) throw new Error("No accounts");

        const account = accounts?.tDVW?.[0];
        if (!account) throw new Error("No account");
        console.log(params, "====params");
        const result = await trustchainContract?.callSendMethod(
          method,
          params,
          params
        );
        console.log(result, "====result");
        return result;
      } catch (error) {
        console.error(error, "====error");
      }
    };
  }

  const router = useRouter();
  const { query } = useRouter();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [account, setAccount] = useState();
  const dic = {};
  const [imgUrl, setImgUrl] = useState();
  const tokenContract = useTokenContract(provider, "tDVW");

  useEffect(() => {
    const onClick = async () => {
      try {
        const accounts = await provider?.request({
          method: MethodsBase?.ACCOUNTS,
        });
        setAccount(accounts?.["tDVW"]?.[0]);
        if (!accounts) throw new Error("No accounts");
        let i = 1;
        while (true) {
          const result = await tokenContract?.callViewMethod("GetTokenInfo", {
            symbol: "TRUSTCHAINSUPPLYCHAIN-" + i,
            owner: accounts?.["tDVW"]?.[0],
          });
          if (result.data.symbol === query.nft) {
            setImgUrl(result);
            break;
          }
          i += 1;
        }
      } catch (error) {
        console.log(error, "====error");
      }
    };
    onClick();
    return () => {
      // Cleanup logic (if needed)
    };
  }, [tokenContract]);
  const metaData = imgUrl?.data?.externalInfo?.value?.__nft_metadata;
  console.log(metaData);
  if (metaData) {
    const newMetaData = JSON.parse(
      imgUrl?.data?.externalInfo?.value?.__nft_metadata
    );
    console.log(newMetaData);
    for (let i = 0; i < newMetaData.length; i++) {
      dic[newMetaData[i]["key"]] = newMetaData[i]["value"];
    }
  }
  console.log(dic);
  console.log(imgUrl);
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
            <CardHeader
              titleTypographyProps={{ variant: "h4" }}
              title="Confirmation"
              subheaderTypographyProps={{ variant: "h6" }}
              subheader="Please confirm the following details"
            />
            <Typography
              component="div"
              variant="h6"
              color="text.secondary"
              sx={{ paddingX: "14px" }}
            >
              Item to be Transfered
            </Typography>

            <Box
              sx={{
                display: "flex",

                marginBottom: "14px",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
                    {imgUrl?.data?.tokenName} x {imgUrl?.data?.supply} {" unit"}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {dic["Country of Origin"]}
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
                image={imgUrl?.data?.externalInfo?.value?.__nft_image_url}
                alt="Product Image"
              />
            </Box>

            <Typography
              component="div"
              variant="h6"
              color="text.secondary"
              sx={{ paddingX: "14px" }}
            >
              Recipient Name
            </Typography>
            <Typography
              component="body"
              variant="h6"
              sx={{ paddingX: "14px", paddingBottom: "14px" }}
            >
              {query?.name}
            </Typography>

            <Typography
              component="div"
              variant="h6"
              color="text.secondary"
              sx={{ paddingX: "14px" }}
            >
              Recipient Address
            </Typography>
            <Typography
              component="body"
              variant="h6"
              sx={{ paddingX: "14px", paddingBottom: "14px" }}
            >
              {query?.elf_id?.slice(0, 10)}
            </Typography>
          </Card>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}></Grid>
            <Link href="/pendingBy">
              <Button
                fullWidth
                variant="contained"
                className="text-black bg-green-400 hover:bg-green-700 hover:text-white"
                sx={{ mt: 3, mb: 2 }}
                onClick={contractsend("ProposeTransfer", {
                  tokenid: query?.nft,
                  to: query?.elf_id,
                  from: account,
                })}
              >
                Confirm Transaction
              </Button>
            </Link>
            <Link href="/">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="text-black bg-gray-200 hover:text-white hover:bg-red-700"
                sx={{ mt: 1, mb: 2 }}
              >
                Cancel Transaction
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
