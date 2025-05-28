import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import LazyLoadGameImage from "./LazyLoadGameImage";

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
    <Card sx={{ maxWidth: 345, m: 2 }} key={game.id}>
      <LazyLoadGameImage image={image} />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "200px",
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
          <Typography variant="body2" color="text.secondary">
            {genres}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Release date: {game.released}
          </Typography>
        </Box>
        <Button variant="outlined" size="small" sx={{ mt: 1, width: "50%" }}>
          Dettagli
        </Button>
      </CardContent>
    </Card>
  );
}

export default CardGame;
