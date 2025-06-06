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
  Chip,
  Link as MuiLink,
  Tooltip,
  Rating,
} from "@mui/material";
import { Link } from "react-router";
import { useEffect } from "react";
import ToggleFavorite from "../../components/animationComponent/ToggleFavorite.jsx";
import StarIcon from "@mui/icons-material/Star";
import { useBackground } from "../../context/BackgroundContext";

function GamePage() {
  const { id } = useParams();
  const initialUrl = apiConfig.endpoints.gameDetails(id);
  const { data, loading, error } = useFetchSolution(initialUrl);
  const { setBackgroundImage } = useBackground();

  useEffect(() => {
    if (data?.background_image) {
      setBackgroundImage(data.background_image);
    } else {
      setBackgroundImage(null);
    }
  }, [data, setBackgroundImage]);

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

  if (!data) return null;

  return (
    <Container sx={{ paddingTop: 4, paddingBottom: 8 }}>
              
      <Paper  sx={{ p: 4, backgroundColor: "transparent",  }}>
        <Stack spacing={3}>
          {/* Header row: release date, rating stars, favorite */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {data.released ?? "Unknown release date"}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Rating
                name="game-rating"
                value={data.rating ?? 0}
                precision={0.1}
                max={5}
                readOnly
                emptyIcon={
                  <StarIcon style={{ opacity: 0.3 }} fontSize="inherit" />
                }
              />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ minWidth: 32 }}
              >
                {data.rating?.toFixed(1) ?? "N/A"}
              </Typography>
            </Box>

            <ToggleFavorite data={data} />
          </Box>

          {/* Title */}
          <Typography
            variant="h3"
            component="h1"
            textAlign="center"
            color="text.primary"
          >
            {data.name ?? "Untitled"}
          </Typography>

          {/* ESRB Rating */}
          {data.esrb_rating && (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ fontWeight: "bold" }}
            >
              ESRB Rating: {data.esrb_rating.name}
            </Typography>
          )}

          {/* Description */}
          <Typography variant="body1" color="text.secondary" textAlign="center">
            {data.description_raw ?? "No description available."}
          </Typography>

          {/* Main Image */}
          {data.background_image && (
            <Box
              component="img"
              src={data.background_image}
              alt={`Image of the game ${data.name}`}
              sx={{
                width: "100%",
                maxHeight: 500,
                objectFit: "cover",
                borderRadius: 2,
                mt: 2,
              }}
            />
          )}

          {/* Genres */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Genres:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {data.genres?.map((genre) => (
                <Chip
                  key={genre.id}
                  component={Link}
                  to={`/games/${genre.slug}`}
                  label={genre.name}
                  clickable
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Box>
          </Box>

          {/* Platforms */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Platforms:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {data.platforms?.map(({ platform }) => (
                <Chip
                  key={platform.id}
                  label={platform.name}
                  variant="outlined"
                />
              )) || <Typography color="text.secondary">N/A</Typography>}
            </Box>
          </Box>

          {/* Stores */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Stores:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {data.stores?.map(({ store }) => (
                <Chip key={store.id} label={store.name} variant="outlined" />
              )) || <Typography color="text.secondary">N/A</Typography>}
            </Box>
          </Box>

          {/* Metacritic and link */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Metacritic:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {data.metacritic ?? "N/A"}/100
            </Typography>
            {data.metacritic_url && (
              <MuiLink
                href={data.metacritic_url}
                target="_blank"
                rel="noopener noreferrer"
                variant="body2"
              >
                View Metacritic page
              </MuiLink>
            )}
          </Box>

          {/* Publishers and Developers */}
          <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Publishers:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {data.publishers?.map((pub) => (
                  <Chip key={pub.id} label={pub.name} variant="outlined" />
                )) || <Typography color="text.secondary">N/A</Typography>}
              </Box>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Developers:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {data.developers?.map((dev) => (
                  <Chip key={dev.id} label={dev.name} variant="outlined" />
                )) || <Typography color="text.secondary">N/A</Typography>}
              </Box>
            </Box>
          </Box>

          {/* Tags */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Tags:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {data.tags?.map((tag) => (
                <Chip key={tag.id} label={`#${tag.name}`} variant="outlined" />
              )) || <Typography color="text.secondary">No tags</Typography>}
            </Box>
          </Box>

          {/* Website */}
          <Box textAlign="center" sx={{ my: 2 }}>
            {data.website ? (
              <MuiLink
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                color="secondary"
                underline="hover"
              >
                {data.website}
              </MuiLink>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No website available
              </Typography>
            )}
          </Box>

          {/* Added By Status */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Added By Status:
            </Typography>
            <Box sx={{ color: "text.secondary" }}>
              {data.added_by_status &&
                Object.entries(data.added_by_status).map(([status, count]) => (
                  <Typography
                    key={status}
                    variant="body2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {status.replace(/_/g, " ")}: {count}
                  </Typography>
                ))}
            </Box>
          </Box>

          {/* Ratings */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Ratings:
            </Typography>
            <Box sx={{ color: "text.secondary" }}>
              {data.ratings?.map((rating, index) => (
                <Typography key={index} variant="body2">
                  {rating.title}: {rating.count} votes, {rating.percent}%
                </Typography>
              )) || "No ratings available"}
            </Box>
          </Box>

          {/* Reviews */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Reviews:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total: {data.reviews_count ?? 0}, With Text:{" "}
              {data.reviews_text_count ?? 0}
            </Typography>
          </Box>

          {/* Additional stats in chips */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Tooltip title="Number of games in the series">
              <Chip label={`Series: ${data.game_series_count ?? "N/A"}`} />
            </Tooltip>
            <Tooltip title="Number of parent achievements">
              <Chip
                label={`Parent Achievements: ${
                  data.parent_achievements_count ?? "N/A"
                }`}
              />
            </Tooltip>
            <Tooltip title="Average playtime in hours">
              <Chip label={`Playtime: ${data.playtime ?? "N/A"} hrs`} />
            </Tooltip>
            <Tooltip title="Total ratings count">
              <Chip label={`Ratings Count: ${data.ratings_count ?? "N/A"}`} />
            </Tooltip>
            <Tooltip title="Achievements count">
              <Chip
                label={`Achievements: ${data.achievements_count ?? "N/A"}`}
              />
            </Tooltip>
            <Tooltip title="Number of users who added the game">
              <Chip label={`Added: ${data.added ?? "N/A"}`} />
            </Tooltip>
          </Box>

          {/* Reddit Description */}
          {data.reddit_description && (
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Reddit Description:
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ whiteSpace: "pre-line" }}
              >
                {data.reddit_description}
              </Typography>
            </Box>
          )}

          {/* Additional Background Image at bottom */}
          {data.background_image_additional && (
            <Box
              component="img"
              src={data.background_image_additional}
              alt={`Additional image of the game ${data.name}`}
              sx={{
                width: "100%",
                maxHeight: 300,
                objectFit: "cover",
                borderRadius: 2,
                mt: 4,
              }}
            />
          )}
        </Stack>
      </Paper>
    </Container>
  );
}

export default GamePage;
