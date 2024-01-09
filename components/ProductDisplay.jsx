import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import useTokenContract from "../src/useTokenContract";
import detectProvider from "@portkey/detect-provider";
import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";

function ProductDisplay({ id }) {
  const [provider, setProvider] = useState(null);
  const [meta, setMetaData] = useState();
  const init = async () => {
    try {
      setProvider(await detectProvider());
    } catch (error) {
      console.log(error, "=====error");
    }
  };
  const [imgUrl, setImgUrl] = useState();
  const tokenContract = useTokenContract(provider, "tDVW");
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    const onClick = async () => {
      try {
        const accounts = await provider?.request({
          method: MethodsBase?.ACCOUNTS,
        });

        if (!accounts) throw new Error("No accounts");
        let i = 1;
        while (true) {
          const result = await tokenContract?.callViewMethod("GetTokenInfo", {
            symbol: "TRUSTCHAINSUPPLYCHAIN-" + i,
            owner: accounts?.["tDVW"]?.[0],
          });
          if (result.data.symbol === id) {
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
  console.log(imgUrl);
  const dic = {};
  const metaData = imgUrl?.data?.externalInfo?.value?.__nft_metadata;
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
  return (
    <Grid
      container
      spacing={4}
      sx={{ my: 12, px: { xs: 2 }, maxWidth: 900, mx: { md: "auto" } }}
    >
      {/* Left side - Product Images */}
      <Grid item xs={12} md={6}>
        <Card sx={{ height: "100%", border: "none" }}>
          <CardMedia
            component="div"
            sx={{ width: "100%", height: "100%", paddingTop: "100%" }}
            image={imgUrl?.data?.externalInfo?.value?.__nft_image_url}
            alt="Product Image"
          />
        </Card>
      </Grid>

      {/* Right side - Product Details */}
      <Grid item xs={12} md={6}>
        <Card sx={{ height: "100%", border: "none" }}>
          <CardContent>
            <Typography
              component="h2"
              variant="h3"
              align="center"
              color="000000"
              fontWeight="bold"
            >
              {imgUrl?.data?.tokenName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ paddingTop: 4 }}
            >
              Supply: {imgUrl?.data?.totalSupply}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ paddingTop: 2 }}
            >
              Country Of Origin: {dic["Country of Origin"]}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ paddingTop: 2 }}
            >
              Maufactured Date: {dic["Manufactured Date"]}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ paddingTop: 2 }}
            >
              Expiry Date: {dic["Expiry Date"]}
            </Typography>
            <Typography
              fontWeight="bold"
              fontSize={30}
              color="#9c27b0"
              variant="body2"
              sx={{ paddingTop: 4 }}
              align="center"
            >
              Price
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ marginLeft: "8px" }}
            >
              Transfer NFT
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
export default ProductDisplay;
