import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import CardGame from "./CardGame.jsx";
import TiltCard from "../animationComponent/TiltCard.jsx";

function GamesList({ data, loading, error, title, titleStyles = {} }) {
  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  if (loading) {
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="error">
          Error: {error.message || error.toString()}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ paddingTop: "2rem", px: "1rem" }}>
      <Typography variant="h3" gutterBottom sx={titleStyles}>
        {title}
      </Typography>

      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        spacing={2}
        justifyContent="center"
      >
        {data?.results?.map((game) => (
          <Grid key={game.id}>
            <TiltCard>
              <CardGame game={game} />
            </TiltCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default GamesList;
