import { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import CardGame from "../../components/CardGame";

function HomePage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const api_key = "169792d0d9d043a69b438aadb36ad49e";
  const initialUrl = `https://api.rawg.io/api/games?key=${api_key}&dates=2024-01-01,2024-12-31&page=1`;

  /*
  |-----------------------------------------------------
  | Methods
  |-----------------------------------------------------
  */

  const load = async () => {
    try {
      const response = await fetch(initialUrl);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error.message);
      setData(null);
    }
  };

  /*
  |-----------------------------------------------------
  | Hook
  |-----------------------------------------------------
  */

  useEffect(() => {
    load();
  }, []);

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  if (error) {
    return (
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Home
      </Typography>

      {data && (
        <Grid container spacing={2}>
          {data.results.map((game) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
              <CardGame key={game.id} game={game} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default HomePage;
