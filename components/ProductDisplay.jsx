import React, {useState,useEffect} from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import useTokenContract from '../src/useTokenContract';
import detectProvider from "@portkey/detect-provider";
import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";

function ProductDisplay({id}) {
  const [provider, setProvider] = useState(null);
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
    init()
  },[])
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
            setImgUrl(result)
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
  console.log(imgUrl)
  return (
    <Grid container spacing={4} sx={{ my: 12, px: {xs:2}, maxWidth:900, mx:{md:"auto"}}}>
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
      <Grid item xs={12} md = {6}>
        <Card sx={{ height: '100%', border: 'none'}}>
          <CardContent>
            <Typography
                  component="h2"
                  variant="h3"
                  align="center"
                  color="000000"
                  fontWeight='bold'
                >
                  {imgUrl?.data?.tokenName}
                </Typography>
          <Typography variant="body2" color="text.secondary" sx={{paddingTop: 4}}>
            NFT Information, including (1) Description (2) Origin Location (3) Destination Location (4) Timeline of Product&apos;s Journey.
          </Typography>
          <Typography fontWeight='bold' fontSize={30} color="#9c27b0" variant="body2" sx={{paddingTop: 4}} align="center">
            Price
          </Typography>
        </CardContent>
        <CardActions sx = {{display: 'flex', justifyContent: 'center'}}>
        <Button variant="outlined" color="secondary" sx={{ marginLeft: '8px'}}>Transfer NFT</Button>
      </CardActions>
        </Card>
      </Grid>
    </Grid>
    
  );
}
export default ProductDisplay;
