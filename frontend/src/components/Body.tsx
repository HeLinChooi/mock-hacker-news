import { CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import StoryCard from "./StoryCard";
import { baseUrl } from "../constants";

const Body = () => {
  const [storyIds, setStoryIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      let didMount: boolean = true;
      try {
        const res = await fetch(baseUrl + "topstories.json");
        if(res.ok){
          const data = await res.json();
          console.log('data', data);
          if (didMount) setStoryIds(data.slice(0, 10));
          setIsLoading(false);
        } else {
          setIsLoading(false);
          throw Error("Response is not ok");
        }
      } catch (error) {}
      return () => {
        didMount = false;
      };
    };
    getData();
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
