import { useParams } from "react-router";
import apiConfig from "../../config/apiConfig";
import useFetchSolution from "../../hooks/useFetchSolution.js";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Paper,
  Stack,
} from "@mui/material";
import { Link } from "react-router";
import ToggleFavorite from "../../components/animationComponent/ToggleFavorite.jsx";

function GamePage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { id } = useParams();
  const initialUrl = apiConfig.endpoints.gameDetails(id);
  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
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
          height: "100vh",
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
    <Container sx={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <Paper
        elevation={4}
        sx={{ padding: "2rem", backgroundColor: "background.default" }}
      >
        <Stack spacing={3}>
          { /* Realase date/rating */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Release date */}
            <Typography variant="body2" color="text.secondary">
              {data && data.released}
            </Typography>
            {/* Rating */}
            <Typography variant="body1" color="text.secondary">
              {data && data.rating?.toFixed(1)}/5
            </Typography>
            <ToggleFavorite data={data} />
          </Box>
          {/* Title */}
          <Typography variant="h3" component="h1" color="text.primary" sx={{ textAlign: "center" }}>
            {data && data.name}
          </Typography>
          {/* About */}
          <Box>
            {/* Description */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              {data && data.description_raw}
            </Typography>
          </Box>
          {/* Image */}
          {data && data.background_image && (
            <Box
              component="img"
              src={data.background_image}
              alt={`Image of the game ${data.name}`}
              sx={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "cover",
                borderRadius: 2,
                marginTop: 2,
              }}
            />
          )}
          {/* Genres/Platforms */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
            {/* Genres */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Genres:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {data &&
                  data.genres.map((genre, index) => (
                    <Box
                      key={genre.id}
                      sx={{
                        textDecoration: "none",
                        color: "text.secondary",
                        fontSize: "1rem",
                        fontWeight: 500,
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
                      {index < data.genres.length - 1 && ","}&nbsp;
                    </Box>
                  ))}
              </Box>
            </Box>
            {/* Platforms */}
            <Box sx={{ textAlign: "end" }}>
              <Typography variant="h6" gutterBottom>
                Platforms:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  color: "text.secondary",
                }}
              >
                {data &&
                  data.parent_platforms
                    .map((platform) => platform.platform.name)
                    .join(", ")}
              </Box>
            </Box>
          </Box>
          {/* Stores/Metacritic */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Stores */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Stores:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  color: "text.secondary",
                }}
              >
                {data &&
                  data.stores.map((store) => store.store.name).join(", ")}
              </Box>
            </Box>
            {/* Metacritic */}
            <Box sx={{ textAlign: "end" }}>
              <Typography variant="h6" gutterBottom>
                Metacritic:
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {data && data.metacritic}/100
              </Typography>
            </Box>
          </Box>
          {/* Publishers/Developers */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Publishers */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Publishers:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  color: "text.secondary",
                }}
              >
                {data &&
                  data.publishers.map((publisher) => publisher.name).join(", ")}
              </Box>
            </Box>
            {/* Developers */}
            <Box sx={{ textAlign: "end" }}>
              <Typography variant="h6" gutterBottom>
                Developers:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  color: "text.secondary",
                }}
              >
                {data &&
                  data.developers.map((developer) => developer.name).join(", ")}
              </Box>
            </Box>
          </Box>
          {/* Tags */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Tags:
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                color: "text.secondary",
              }}
            >
              {data && data.tags.map((tag) => `#${tag.name}`).join(", ")}
            </Box>
          </Box>

          {/* Website */}
          <Box
            sx={{
              textAlign: "center",
              color: "#1751B7",
              textDecoration: "underline",
            }}
          >
            {data && data.website ? (
              <Link
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                color="secondary"
                underline="hover"
              >
                {data.website}
              </Link>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No website available
              </Typography>
            )}
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}

export default GamePage;
