import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { baseUrl } from "../constants";
import { Grid } from "@mui/material";

interface StoryCardProps {
  id: string;
  idx: number;
}
interface Story {
  by: string;
  descendants: number;
  score: number;
  time: number;
  title: string;
  url: string;
}
const StoryCard: React.FC<StoryCardProps> = ({ id, idx }) => {
  const [imgUrl, setImgUrl] = useState<string>("https://picsum.photos/300/200");
  const [story, setStory] = useState<Story | undefined>(undefined);

  useEffect(() => {
    getStoryById(id);
    getPreviewData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPreviewData = async () => {

  };

  const getStoryById = (id: string) => {
    fetch(baseUrl + `item/${id}.json`)
      .then((res) => res.json())
      .then((res) => {
        setStory(res);
      });
  };

  if (!story) return null;
  const { title, score, by, url } = story;
  return (
    <Card
      sx={{
        maxWidth: 345,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      onClick={() => {
        window.open(url, "_blank")?.focus();
      }}
    >
      <CardMedia
        component="img"
        height="194"
        image={imgUrl}
        alt="Paella dish"
      />
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        sx={{ flexGrow: 1 }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="body1">
            {idx + ". "}
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${score} points by ${by}`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={(e) => e.stopPropagation()}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={(e) => e.stopPropagation()}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Grid>
    </Card>
  );
};
export default StoryCard;
