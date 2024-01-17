import React, { useEffect, useState } from "react";
import NavbarWithoutSearchBar from "./NavbarWithoutSearchBar";
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
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { FaSpinner } from "react-icons/fa";
import Footer from "./Footer";
// import SmartContractView from "../src/SmartContractView";
import useTokenContract from "../src/useTokenContract";
import useSmartContract from "../src/useSmartContract";
import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";
import Stack from "@mui/material/Stack";

function PendingBy({ provider, account }) {
  const [nfts, setNfts] = useState([]);
  const tokenContract = useTokenContract(provider, "tDVW");
  const trustchainContract = useSmartContract({ provider: provider });

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
    fetchData("GetPendingProposals", {
      value: account,
    });
  }, [tokenContract, account, nfts]);

  if (!provider) return null;
  // setResult(SmartContractView(provider, "GetPendingProposals", {value: account}));
  // setResult(SmartContractView(provider)("GetPendingProposals", {value: account}));
  // console.log(result, "====result");
  console.log(nfts);

  return (
    <div>
      <NavbarWithoutSearchBar />

      <div className="flex flex-col items-center mt-[100px]">
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
            NFTs Sent out
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ textAlign: "center" }}
          >
            Products awaiting consumer approval
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          ></Stack>
        </div>
      </div>
      {nfts.length === 0 ? (
        <div className="flex gap-3 mb-[20px] items-center justify-center">
          <p>Pending....</p>
          <FaSpinner className="animate-spin w-[25px] h-[25px]" />
        </div>
      ) : (
        <Container sx={{ py: 8 }} maxWidth="md">
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
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

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
          NFTs ready to be sent out
        </Typography>
      </div>

      <Footer />
    </div>
  );
}

export default PendingBy;
