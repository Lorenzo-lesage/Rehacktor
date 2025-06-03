import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import LazyLoadGameImage from "../animationComponent/LazyLoadGameImage";
import { Link } from "react-router";

function CardGame({ game }) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const genres = game.genres.map((genre) => genre.name).join(", ");
  const { background_image: image } = game;

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <Card sx={{ width: 260, m: 2 }} key={game.id} elevation={16}>
      <Box sx={{ height: "15rem", overflow: "hidden" }}>
        <LazyLoadGameImage image={image} />
      </Box>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "12rem",
        }}
      >
        <Typography gutterBottom variant="h6" component="div">
          {game.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              display: "block",
            }}
          >
            {genres}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Release date: {game.released || "N/A"}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          sx={{ mt: 1, width: "50%" }}
          component={Link}
          to={`/games/${game.slug}/${game.id}`}
        >
          Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default CardGame;
