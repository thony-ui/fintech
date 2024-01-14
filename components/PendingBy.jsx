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
import useSmartContract from "../src/useSmartContract";
import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";

function PendingBy({provider, account}) {
    const [users, setUsers] = useState([]);
    const [result, setResult] = useState([]);
    console.log(provider);
    
    const trustchainContract = useSmartContract({provider: provider});

    function contractview(method, params) {
      return async () => {
        try {
          const accounts = await provider?.request({
            method: MethodsBase.ACCOUNTS,
          });
          if (!accounts) throw new Error("No accounts");
    
          const account = accounts?.tDVW?.[0];
          if (!account) throw new Error("No account");
    
          const result = await trustchainContract?.callViewMethod(method, params);
          console.log(result, "====result1");
          return result;
        } catch (error) {
          console.error(error, "====error");
        }
      
      }
    }
    
    useEffect(() => {
    //   const unsubscribe = onSnapshot(collection(db, "user"), (snapshot) => {
    //     try {
    //       setUsers(snapshot.docs);
    //       setFilterUser(snapshot.docs);
    //     } catch (error) {
    //       console.error("Error reading data:", error);
    //     }
    //   });
        // console.log(account, "====account");
        // setResult(SmartContractView(provider, "GetPendingProposals", {value: account}));
    //   return () => unsubscribe();
      contractview("GetPendingProposals", {value: account})().then((result) => {setResult(result)});
      console.log(result, "====result");
    }, [account]);

    
    if (!provider) return null;
    // setResult(SmartContractView(provider, "GetPendingProposals", {value: account}));
    // setResult(SmartContractView(provider)("GetPendingProposals", {value: account}));
    // console.log(result, "====result");
    
    return (
      <div>
          <NavbarWithoutSearchBar />
          {/* <button onClick={contractview("GetPendingProposals", {value: "ELF_2vD3etVrDHrYd79zKREyaY8UrgZFCSjxP5tVTSLcyYpDmg5DLn_tDVW"})}>GetPendingProposals</button> */}
          <div className="flex gap-3 mt-[100px] items-center justify-center">
              <p>Pending....</p>
          <FaSpinner className="animate-spin w-[25px] h-[25px]"/>
          </div>
          {users.length === 0 ? (
          <div className="text-center mt-[25px]">Loading....</div>
        ) : (
          <Container sx={{ py: 8 }} maxWidth="md" >
            <Grid container spacing={4}>
              {users?.map((card, ind) => (
                <Grid item xs={12} sm={6} md={4} key = {card.id}>
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
                      image="https://source.unsplash.com/random?wallpapers"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.data().elfid.slice(0, 6)}
                      </Typography>
                      <Typography>
                        {card.data().firstname}{" "}
                        <span>{card.data().lastname}</span>
                      </Typography>
                    </CardContent>
                    <CardActions className="flex flex-col items-center">
                      <Button size="small">Accept</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        )}

        <Footer />
        </div>
    );
}

export default all;