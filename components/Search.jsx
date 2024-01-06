/* eslint-disable react/jsx-no-duplicate-props */
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
import Footer from "./Footer"

function Search() {
  
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [inputValue, setInputValue] = useState("");
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

  useEffect(() => {
    const filter = users.filter(x => x.data()?.elfid.toLowerCase().includes(inputValue.toLowerCase()));
    setFilterUser(filter)
  }, [inputValue]);
  const userId = users.map((user) => user.data().elfid);

  return (
    <div className="">
      <NavbarWithoutSearchBar />
      <form
        className="flex flex-col items-center mt-[100px]"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/user/" + inputValue);
        }}
      >
        <Autocomplete
          disablePortal
          id="users"
          options={userId}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="users" />}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
        />
      </form>
      {users.length === 0 ? (
        <div className="text-center mt-[25px]">Loading....</div>
      ) : (
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {filterUser?.map((card, ind) => (
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
                    <Button size="small">View profile</Button>
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

export default Search;
