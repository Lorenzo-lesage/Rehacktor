import { Box, Grid, Typography } from "@mui/material";
import CardGame from "./CardGame";

const SimilarGamesList = ({ games }) => {
  if (!games || games.length === 0) return null;

  return (
    <Box sx={{ mt: 6, minHeight: "50vh" }}>
      <Typography variant="h5" gutterBottom>
        Similar games
      </Typography>

      <Grid
        container
        spacing={2}
      >
        {games.map((game) => (
          <Grid key={game.id} size={{ xs: 6, md: 3 }}>
            <CardGame game={game} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SimilarGamesList;
