import { useParams } from "react-router";
import apiConfig from "../../config/apiConfig";
import useFetch from "../../hooks/useFetch";
import { Box, Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";

function GamePage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { id } = useParams();
  const { data, error, loading } = useFetch(apiConfig.endpoints.gameDetails(id));

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
        <Box>
            <Typography variant="body2" color="text.secondary">
                {data && data.realeased}
            </Typography>
            <Typography variant="h1" color="text.primary">
                {data && data.name}
            </Typography>
            <Typography variant="body1">
                Rating: {data && data.rating}
            </Typography>
            <Typography variant="body1">
                About:
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {data && data.description_raw}
            </Typography>
            <Box>
                <img src={data && data.background_image} alt={`image of the game {data && data.name}`} />
            </Box>
        </Box>
    </Box>
  );
}

export default GamePage;
