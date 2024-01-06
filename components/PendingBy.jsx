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

function PendingBy() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, "user"), (snapshot) => {
        try {
          setUsers(snapshot.docs);
          setFilterUser(snapshot.docs);
        } catch (error) {
          console.error("Error reading data:", error);
        }
      });
  
      return () => unsubscribe();
    }, [db]);
    
    return (
      <div>
          <NavbarWithoutSearchBar />
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
      </div>
    )
}

export default PendingBy