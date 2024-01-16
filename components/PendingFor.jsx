import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import NFT from "../src/NFT";
import detectProvider from "@portkey/detect-provider";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import useTokenContract from "../src/useTokenContract";
import useSmartContract from "../src/useSmartContract";
import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function PendingByYou({ provider, account }) {
  const [nfts, setNfts] = useState([]);
  const tokenContract = useTokenContract(provider, "tDVW");
  const trustchainContract = useSmartContract({ provider: provider });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (method, params) => {
      try {
        const accounts = await provider?.request({
          method: MethodsBase.ACCOUNTS,
        });

        if (!accounts) throw new Error("No accounts");

        const account = accounts?.tDVW?.[0];
        if (!account) throw new Error("No account");

        const result = await trustchainContract?.callViewMethod(method, params);

        const nfts = result.data.values;

        if (nfts) {
          let arr = [];
          let i = 0;

          while (i < nfts.length) {
            let dic = {};
            const symbol = nfts[i];
            if (symbol) {
              try {
                const nft = await tokenContract?.callViewMethod(
                  "GetTokenInfo",
                  {
                    symbol: symbol,
                  }
                );
               
                const image = nft?.data?.externalInfo?.value?.__nft_image_url;
                const metaData = JSON.parse(
                  nft?.data?.externalInfo?.value?.__nft_metadata
                );
                for (let i = 0; i < metaData.length; i++) {
                  dic[metaData[i]["key"]] = metaData[i]["value"];
                }
                dic["image"] = image;
                dic["name"] = nft?.data?.tokenName;
                dic["supply"] = nft?.data?.totalSupply;
                dic["tokenId"] = nft?.data?.symbol;
                arr.push(dic);
              } catch (error) {
                console.error("Error fetching token info:", error);
                // Handle the error if needed
              }
            }
            i++;
          }
          // Move setNfts outside the loop to update state after all iterations
          setNfts(arr);
        }
      } catch (error) {
        console.error(error, "====error");
      }
    };

    fetchData("GetPendingAcceptances", {
      value: account,
    });
  }, [tokenContract, account, nfts]);

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

  if (!provider) return <>Provider not found.</>;
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            marginTop: 6,
          }}
        >
          <div className="mx-auto max-w-[1000px]">
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
              fontWeight="bold"
              sx={{ whiteSpace: "nowrap" }}
            >
              NFTs Pending For You
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
              sx={{ textAlign: "center" }}
            >
              Waiting for you to receive the product and confirm the
              transaction.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            ></Stack>
          </div>
        </Box>
        {nfts.length === 0 ? (
          <div className="flex gap-3 items-center justify-center">
            <p>Pending....</p>
            <FaSpinner className="animate-spin w-[25px] h-[25px]" />
          </div>
        ) : (
          <Container sx={{}} maxWidth="md">
            <Grid container spacing={4}>
              {nfts?.map((card, ind) => (
                <Grid item xs={12} sm={6} md={4} key={ind}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      image={card["image"]}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="p" component="p">
                        Name: {card["name"]}
                      </Typography>
                      <Typography gutterBottom variant="p" component="p">
                        Supply: {card["supply"]}
                      </Typography>
                      <Typography gutterBottom variant="p" component="p">
                        Country Of Origin: {card["Country of Origin"]}
                      </Typography>
                      <Typography gutterBottom variant="p" component="p">
                        Manufactured Date: {card["Manufactured Date"]}
                      </Typography>
                      <Typography gutterBottom variant="p" component="p">
                        Expiry Date: {card["Expiry Date"]}
                      </Typography>
                    </CardContent>
                    <CardActions className="flex flex-col items-center">
                      <Button
                        size="small"
                        onClick={contractsend("AcceptTransfer", {
                          tokenid: card["tokenId"],
                        })}
                      >
                        Accept
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default PendingByYou;
