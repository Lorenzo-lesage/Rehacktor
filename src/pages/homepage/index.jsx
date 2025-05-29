import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import CardGame from "../../components/CardGame";
import useFetch from "../../hooks/useFetch.js";
import apiConfig from "../../config/apiConfig";

function HomePage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { data, error, loading } = useFetch(
    apiConfig.endpoints.gamesByDate("2024-01-01", "2024-12-31", 1)
  );

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
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ paddingTop: 3 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid size={11}>
          <Typography variant="h4" gutterBottom>
            Home
          </Typography>
        </Grid>
        {data?.results.map((game) => (
          <Grid key={game.id}>
            <CardGame game={game} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HomePage;
