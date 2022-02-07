import { CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import StoryCard from "./StoryCard";
import { baseUrl } from "../constants";

const Body = () => {
  const [storyIds, setStoryIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let didMount: boolean = true;
    fetch(baseUrl + "topstories.json")
      .then((res) => res.json())
      .then((res) => {
        if (didMount) setStoryIds(res.slice(0, 10));
      })
      .finally(() => setIsLoading(false));
    return () => {
      didMount = false;
    };
  }, []);

  if (isLoading) return <CircularProgress />;

  return (
    <Grid container spacing={2} justifyContent={"center"} sx={{ pt: 2 }}>
      {storyIds.map((id, idx) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          justifyContent={"center"}
          sx={{ display: "flex" }}
        >
          <StoryCard id={id} idx={idx + 1} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Body;
