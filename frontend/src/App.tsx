import { Grid } from "@mui/material";
import React from "react";
import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";

function App() {

  return (
    <Grid
      container
      direction="column"
      alignItems={"center"}
      sx={{ px: { xs: "0%", sm: "5%", md: "10%", lg: "15%" } }}
    >
      <Header />
      <Body />
    </Grid>
  );
}

export default App;
