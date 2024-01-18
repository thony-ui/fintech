import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";
import { useEffect, useState } from "react";
import useTokenContract from "./useTokenContract";
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
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../store/userSlice";
import { selectUser } from "../store/userSlice";
import { FaSpinner } from "react-icons/fa";

function Nft({ provider, chainId, symbol }) {
  const router = useRouter();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [userAddress, setUserAddress] = useState(null);
  const connect = async () => {
    try {
      const accounts = await provider?.request({
        method: MethodsBase.REQUEST_ACCOUNTS,
      });
      const address = accounts["tDVW"][0];
      setUserAddress(address);
      dispatch(
        logIn({
          id: address,
        })
      ); // Assuming the first account is the user's addres
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };
  const [imgUrl, setImgUrl] = useState([]);
  const tokenContract = useTokenContract(provider, "tDVW");
  useEffect(() => {
    const onClick = async () => {
      try {
        const accounts = await provider?.request({
          method: MethodsBase?.ACCOUNTS,
        });

        if (!accounts) throw new Error("No accounts");
        let arr = [];
        let i = 1;
        while (true) {
          const result = await tokenContract?.callViewMethod("GetBalance", {
            symbol: "TRUSTCHAINSUPPLYCHAIN-" + i,
            owner: accounts?.[chainId]?.[0],
          });
          const result2 = await tokenContract?.callViewMethod("GetTokenInfo", {
            symbol: "TRUSTCHAINSUPPLYCHAIN-" + i,
            owner: accounts?.[chainId]?.[0],
          });
          if (i == 7 || i == 8) {
            continue
          }
          if (result2?.data == null) {
            break;
          }
          if (result?.data?.balance == "1") {
            arr.push(result?.data?.symbol);
          }
          i += 1;
        }
        let j = 1;
        let ptr = 0;
        let tokens = [];
        while (ptr < arr.length) {
          const result = await tokenContract?.callViewMethod("GetTokenInfo", {
            symbol: "TRUSTCHAINSUPPLYCHAIN-" + j,
          });
          if (result?.data?.symbol == arr[ptr]) {
            tokens.push(result);
            ptr += 1;
          }
          j += 1;
        }
        console.log(tokens);
        setImgUrl(tokens);
      } catch (error) {
        console.log(error, "====error");
      }
    };

    onClick();

    return () => {
      // Cleanup logic (if needed)
    };
  }, [tokenContract, userAddress]);

  useEffect(() => {
    connect();
  }, [provider]);

  if (!provider) return <>Provider not found.</>;

  return (
    <div>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing = {4}>
          {imgUrl.length === 0 ? (
            <div className="flex gap-3 items-center justify-center w-full">
              <p>Loading....</p>
              <FaSpinner className="animate-spin w-[25px] h-[25px]" />
            </div>
          ) : (
            imgUrl?.map((img, ind) => (
              <Grid item key={ind} xs={12} sm={6} md={4}>
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
                    image={img.data?.externalInfo?.value?.__nft_image_url}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="p" component="h2">
                      {img.data?.symbol}
                    </Typography>
                    <Typography>{img.data?.tokenName}</Typography>
                  </CardContent>
                  <CardActions className="flex flex-col items-center">
                    <Button
                      size="small"
                      onClick={() =>
                        router.push("/productDisplay/" + img.data?.symbol)
                      }
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default Nft;
