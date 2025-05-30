import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import CardGame from "./CardGame.jsx";

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
    <Box sx={{ paddingTop: "3rem" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid size={11}>
          <Typography variant="h4" gutterBottom sx={titleStyles}>
            {title}
          </Typography>
        </Grid>
        {data?.results?.map((game) => (
          <Grid key={game.id}>
            <CardGame game={game} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default GamesList;
