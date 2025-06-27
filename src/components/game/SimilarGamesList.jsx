import { Box, Typography } from "@mui/material";
import CardGame from "./CardGame";

const SimilarGamesList = ({ games }) => {
  if (!games || games.length === 0) return null;

  return (
    <Box sx={{ mt: 6, height: "50vh" }}>
      <Typography variant="h5" gutterBottom>
        Similar games
      </Typography>
      <Box sx={{ display: "flex",gap: 2, pb: 2 }}>
        {games.map((game) => (
          <CardGame key={game.id} game={game} />
        ))}
      </Box>
    </Box>
  );
};

export default SimilarGamesList;
