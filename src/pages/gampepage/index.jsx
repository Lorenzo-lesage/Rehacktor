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
  Rating,
  LinearProgress,
} from "@mui/material";
import { useEffect } from "react";
import ToggleFavorite from "../../components/animationComponent/ToggleFavorite.jsx";
import StarIcon from "@mui/icons-material/Star";
import { useBackground } from "../../hooks/useBackground.js";
import PlatformIcons from "../../components/game/renderingCard-Detail/PlatformIcons";
import StoreIcons from "../../components/game/renderingCard-Detail/StoreIcons";
import DeveloperIcon from "../../components/game/renderingCard-Detail/DeveloperIcon";
import GenreTags from "../../components/game/renderingCard-Detail/GenreTags";
import GameUserEngagement from "../../components/game/renderingCard-Detail/GameUserEngagement.jsx";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarRateIcon from "@mui/icons-material/StarRate";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import useGameScreenshots from "../../hooks/useGameScreenshots";

function GamePage() {
  /*
  |------------------------------------------------
  | Data
  |------------------------------------------------
  */

  const { id } = useParams();
  const initialUrl = apiConfig.endpoints.gameDetails(id);
  const { data, loading, error } = useFetchSolution(initialUrl);
  const { setBackgroundImage } = useBackground();
  const {
    screenshots,
    loading: screenshotsLoading,
    error: screenshotsError,
  } = useGameScreenshots(id);
  console.log(data);

  /*
  |------------------------------------------------
  | Props Style
  |------------------------------------------------
  */

  const styleGenre = {
    padding: 1,
    fontSize: 15,
  };
  const styleIconPlatform = { marginRight: 4, fontSize: 20 };
  const styleStores = {
    textDecoration: "none",
    transition: "all 0.2s ease-in-out",
    paddingX: 0.5,
    "&:hover": {
      color: "text.secondary",
      transform: "scale(1.2)",
    },
  };
  const styleIconStores = {
    color: "text.primary",
    fontSize: 20,
    padding: 1,
  };
  const stylePublisher = {
    fontSize: 15,
    padding: 1,
  };
  const styleIconPublisher = { color: "text.primary" };

  /*
  |------------------------------------------------
  | Hooks
  |------------------------------------------------
  */

  useEffect(() => {
    if (data?.background_image) {
      setBackgroundImage(data.background_image);
    }

    return () => {
      setBackgroundImage(null);
    };
  }, [data, setBackgroundImage]);

  /*
  |------------------------------------------------
  | Return
  |------------------------------------------------
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

  if (!data) return null;

  return (
    <Container sx={{ paddingBottom: 8 }}>
      <Paper sx={{ p: 0, backgroundColor: "transparent" }} elevation={0}>
        <Stack spacing={3}>
          {/* Header row: release date, rating stars, favorite */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Chip
              label={data.released ?? "Unknown release date"}
              color="background.default"
              variant="outlined"
              sx={{ p: 1 }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Rating
                name="game-rating"
                value={data.rating ?? 0}
                precision={0.1}
                max={5}
                sx={{ color: "text.primary" }}
                readOnly
                emptyIcon={
                  <StarIcon
                    style={{ opacity: 1, color: "text.primary" }}
                    fontSize="inherit"
                  />
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

            {/* Metacritic and link */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Typography variant="body1">Metacritic:</Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.metacritic ?? "N/A"}/100
                </Typography>
              </Box>
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

            <ToggleFavorite data={data} />
          </Box>

          <Box>
            <Box>
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
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
                mt={2}
              >
                {data.description_raw ?? "No description available."}
              </Typography>
            </Box>
            <Box>
              {/* Main Image */}
              {data.background_image && (
                <Box
                  sx={{
                    width: "100%",
                    height: 500,
                    borderRadius: 2,
                    mt: 2,
                    backgroundImage: `url(${data.background_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
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
                    mt: 1,
                  }}
                />
              )}
            </Box>
          </Box>

          <Container>
            {/* ...altro contenuto */}

            {screenshotsLoading && <CircularProgress />}
            {screenshotsError && (
              <Typography color="error">
                Errore nel caricamento degli screenshot.
              </Typography>
            )}
            {screenshots?.length > 0 && (
              <Box sx={{ display: "flex", overflowX: "auto", gap: 2, mt: 4 }}>
                {screenshots.map((shot) => (
                  <Box
                    key={shot.id}
                    component="img"
                    src={shot.image}
                    alt={`Screenshot ${shot.id}`}
                    sx={{
                      height: 200,
                      borderRadius: 2,
                      objectFit: "cover",
                    }}
                  />
                ))}
              </Box>
            )}
          </Container>

          {/* Genres */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <GenreTags genres={data.genres} styleGenre={styleGenre} />

            {/* Stores */}
            <StoreIcons
              stores={data.stores}
              styleStores={styleStores}
              styleIconStores={styleIconStores}
            />

            {/* Platforms */}
            <PlatformIcons
              platforms={data.parent_platforms}
              styleIconPlatform={styleIconPlatform}
            />
          </Box>
          {/* Added By Status */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: 1,
              justifyContent: "space-between",
            }}
          >
            <GameUserEngagement data={data.added_by_status} />
            {/* Additional stats in chips */}
            <Box
              sx={{
                textAlign: "end",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Additional Stats:
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 1,
                  mb: 0.5,
                }}
              >
                <Typography color="text.primary">
                  <strong>Games in the Series:</strong>{" "}
                </Typography>
                <Typography color="text.secondary">
                  {data.game_series_count ?? "N/A"}
                </Typography>
                <FormatListNumberedIcon fontSize="small" />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 1,
                  mb: 0.5,
                }}
              >
                <Typography color="text.primary">
                  <strong>Parent Achievements:</strong>{" "}
                </Typography>
                <Typography color="text.secondary">
                  {data.parent_achievements_count ?? "N/A"}
                </Typography>
                <MilitaryTechIcon fontSize="small" />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 1,
                  mb: 0.5,
                }}
              >
                <Typography color="text.primary">
                  <strong>Average Playtime:</strong>
                </Typography>
                <Typography color="text.secondary">
                  {data.playtime ?? "N/A"} hours
                </Typography>
                <AccessTimeIcon fontSize="small" />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 1,
                  mb: 0.5,
                }}
              >
                <Typography color="text.primary">
                  <strong>Total Ratings Count:</strong>{" "}
                </Typography>
                <Typography color="text.secondary">
                  {data.ratings_count ?? "N/A"}
                </Typography>
                <StarRateIcon fontSize="small" />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 1,
                  mb: 0.5,
                }}
              >
                <Typography color="text.primary">
                  <strong>Achievements:</strong>{" "}
                </Typography>
                <Typography color="text.secondary">
                  {data.achievements_count ?? "N/A"}u
                </Typography>
                <EmojiEventsIcon fontSize="small" />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 1,
                }}
              >
                <Typography color="text.primary">
                  <strong>Users Who Added the Game:</strong>{" "}
                </Typography>
                <Typography color="text.secondary">
                  {data.added ?? "N/A"}
                </Typography>
                <GroupAddIcon fontSize="small" />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{ display: { xs: "none", md: "flex" }, gap: 2, width: "100%" }}
          >
            {/* Reviews */}
            <Box
              sx={{
                width: "fit-content",
                display: "flex",
                gap: 1,
                alignItems: "start",
              }}
            >
              <Typography
                variant="body1"
                color="text.primary"
                sx={{ fontWeight: "bold" }}
              >
                Reviews:
              </Typography>
              <Box>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ whiteSpace: "nowrap" }}
                >
                  Total: {data.reviews_count ?? 0},
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ whiteSpace: "nowrap" }}
                >
                  With Text: {data.reviews_text_count ?? 0}
                </Typography>
              </Box>
            </Box>

            {/* Ratings */}
            <Box sx={{ width: "100%" }}>
              {data.ratings?.length > 0 ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {data.ratings.map((rating, index) => (
                    <Box key={index}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: "text.primary" }}
                        >
                          {rating.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {rating.count} votes
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={rating.percent}
                        sx={{
                          height: 8,
                          borderRadius: 5,
                          backgroundColor: "#background.default",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#background.paper",
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography color="text.secondary">
                  No ratings available
                </Typography>
              )}
            </Box>
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

          {/* Publishers and Developers */}
          <Box
            sx={{
              display: "flex",
              gap: 4,
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Publishers:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {data.publishers?.map((pub) => (
                  <DeveloperIcon
                    developers={data.publishers}
                    stylePublisher={stylePublisher}
                    styleIconPublisher={styleIconPublisher}
                    name={pub.name}
                    key={pub.id}
                    type="publisher"
                  />
                )) || <Typography color="text.secondary">N/A</Typography>}
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Developers:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {data.developers?.map((dev) => (
                  <DeveloperIcon
                    developers={data.developers}
                    stylePublisher={stylePublisher}
                    styleIconPublisher={styleIconPublisher}
                    name={dev.name}
                    key={dev.id}
                    type="publisher"
                  />
                )) || <Typography color="text.secondary">N/A</Typography>}
              </Box>
            </Box>
          </Box>

          {/* Tags */}
          <Box sx={{ my: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tags:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {data.tags?.length > 0 ? (
                data.tags.map((tag, i) => (
                  <Typography key={tag.id || i} component="span">
                    #{tag.name}
                    {i < data.tags.length - 1 ? ", " : ""}
                  </Typography>
                ))
              ) : (
                <Typography color="text.secondary">No tags</Typography>
              )}
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
        </Stack>
      </Paper>
    </Container>
  );
}

export default GamePage;
