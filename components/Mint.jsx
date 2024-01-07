import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Footer from "./Footer";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Mint() {
  const handleInputChange = (e) => {
    // Allow only numeric values
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };
  return (
    <div>
      <Grid container spacing={4} sx={{ my: 12, px: {xs:2}, maxWidth:900, mx:{md:"auto"}}}>
        {/* Picture and Details side by side on larger screens */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", border: "none" }}>
            <CardMedia
              component="div"
              sx={{ width: "100%", height: "100%", paddingTop: "100%" }}
              image="https://source.unsplash.com/random?wallpapers"
              alt="Product Image"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", border: "none" }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    component="h3"
                    variant="h3"
                    align="center"
                    color="000000"
                    fontWeight="bold"
                  >
                    Mint your NFT
                  </Typography>
                </Grid>
                <Grid item xs={12} sx = {{display:"flex", justifyContent:"center"}}>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload picture
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="Name"
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="Collection"
                    label="Collection"
                    name="Collection"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="TokenId"
                    label="TokenId"
                    type="text"
                    id="TokenId"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="Quantity"
                    label="Quantity"
                    type="text" // Set the type to "text" to allow handling the input
                    id="Quantity"
                    inputProps={{
                      inputMode: "numeric", // Inform the browser that the input will be numeric
                      pattern: "[0-9]*", // Set a pattern to further enforce numeric input
                      onInput: handleInputChange, // Attach the event handler to allow only numeric values
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="Description"
                    label="Description"
                    type="text"
                    id="Description"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ marginLeft: "8px" }}
                className="w-full"
              >
                Mint NFT
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default Mint;
