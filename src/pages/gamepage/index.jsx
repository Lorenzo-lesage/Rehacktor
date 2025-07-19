import { useParams } from "react-router";
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
  Grid,
  Button,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { useEffect, useState } from "react";
import ToggleFavorite from "../../components/animationComponent/ToggleFavorite.jsx";
import StarIcon from "@mui/icons-material/Star";
import { useBackground } from "../../hooks/useBackground.js";
import PlatformIcons from "../../components/game/renderingCard-Detail/PlatformIcons.jsx";
import StoreIcons from "../../components/game/renderingCard-Detail/StoreIcons.jsx";
import DeveloperIcon from "../../components/game/renderingCard-Detail/DeveloperIcon.jsx";
import GenreTags from "../../components/game/renderingCard-Detail/GenreTags.jsx";
import GameUserEngagement from "../../components/game/renderingCard-Detail/GameUserEngagement.jsx";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarRateIcon from "@mui/icons-material/StarRate";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import useGameScreenshots from "../../hooks/useGameScreenshots.js";
import Chatbox from "../../components/generalLayout/Chatbox.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchGameDetails } from "../../api/games.js";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Thumbnails } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Fullscreen } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/counter.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import { fetchGameMovies, fetchSimilarGamesFallback } from "../../api/games.js";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import YoutubeModal from "../../components/game/YoutubeDialog.jsx";
import SimilarGamesList from "../../components/game/SimilarGamesList.jsx";

function GamePage() {
  /*
  |------------------------------------------------
  | Data
  |------------------------------------------------
  */

  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["gameDetails", id],
    queryFn: () => fetchGameDetails(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
  const { setBackgroundImage } = useBackground();
  const { data: screenshots } = useGameScreenshots(id);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const images = [
    data?.background_image,
    data?.background_image_additional,
    ...(screenshots || []),
  ]
    .filter(Boolean)
    .map((img) => (typeof img === "string" ? img : img.image));

  // Fetch game movies con id e name (dopo che data è disponibile)
  const { data: movies = [] } = useQuery({
    queryKey: ["gameMovies", id],
    queryFn: () => fetchGameMovies(id, data?.name),
    enabled: !!id && !!data?.name, // attiva solo quando disponibile
  });

  // slides per lightbox: immagini
  const imageSlides = images.map((src) => ({ type: "image", src }));
  const videoSlides = movies
    .filter((movie) => movie.source === "rawg") // solo video RAWG nel Lightbox
    .map((movie) => ({
      type: "video",
      width: 1280,
      height: 720,
      poster: movie.preview,
      sources: [
        {
          src: movie.videoUrl,
          type: "video/mp4",
        },
      ],
      video: {
        controls: true,
        preload: "metadata",
        autoplay: false,
      },
    }));

  const slides = [...imageSlides, ...videoSlides];

  const youtubeVideos = movies.filter(
    (movie) =>
      movie.source === "youtube" && movie.videoUrl?.includes("youtube.com")
  );
  const [ytModalOpen, setYtModalOpen] = useState(false);
  const [ytVideoId, setYtVideoId] = useState(null);
  function openYouTube(videoUrl) {
    const videoId = new URL(videoUrl).searchParams.get("v");
    setYtVideoId(videoId);
    setYtModalOpen(true);
  }

  // Fetch similar games con id
  const [game, setGame] = useState(null);
  const [similarGames, setSimilarGames] = useState([]);

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

  // Fetch similar games con id
  const gameId = id;

  useEffect(() => {
    const loadGameAndSimilar = async () => {
      const gameDetails = await fetchGameDetails(gameId);
      setGame(gameDetails);

      const similar = await fetchSimilarGamesFallback(gameDetails);
      setSimilarGames(similar);
    };

    loadGameAndSimilar();
  }, [gameId]);

  /*
  |------------------------------------------------
  | Return
  |------------------------------------------------
  */

  if (isLoading) {
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
    <Box sx={{ paddingBottom: 8, mt: 2 }}>
      <Container>
        <Paper sx={{ p: 0, backgroundColor: "transparent" }} elevation={0}>
          <Stack spacing={3}>
            {/* Header row: release date, rating stars, favorite */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                gap: 2, // spazio verticale su mobile
                flexWrap: "wrap", // fallback per contenuti lunghi
                mt: 2,
              }}
            >
              {/* Release Date */}
              <Chip
                label={data.released ?? "Unknown release date"}
                color="default"
                variant="outlined"
                sx={{ p: 1 }}
              />

              {/* Rating */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
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

              {/* Metacritic */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "flex-start", md: "flex-end" },
                }}
              >
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

              {/* Favorite Toggle */}
              <ToggleFavorite data={data} />
            </Box>

            {/* Title mobile */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h3" textAlign="center" color="text.primary">
                {data.name ?? "Untitled"}
              </Typography>

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
            </Box>

            <Grid
              container
              spacing={1}
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: { xs: "column-reverse", md: "row" },
                alignItems: { xs: "end", md: "flex-start" },
              }}
            >
              {/* Title & Info Section */}
              <Grid size={{ xs: 12, md: 7, lg: 8 }}>
                <Typography
                  variant="h3"
                  textAlign="center"
                  color="text.primary"
                  sx={{ display: { xs: "none", md: "block" } }}
                >
                  {data.name ?? "Untitled"}
                </Typography>

                {data.esrb_rating && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    sx={{
                      fontWeight: "bold",
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    ESRB Rating: {data.esrb_rating.name}
                  </Typography>
                )}
                <Typography
                  variant="body1"
                  color="text.primary"
                  textAlign="center"
                >
                  {data.description_raw ?? "No description available."}
                </Typography>
              </Grid>

              <Grid
                size={{ xs: 12, md: 5, lg: 4 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: { xs: "100%", md: 300 },
                  mx: "auto",
                  mb: { xs: 2, md: 0 },
                }}
              >
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                    {images.length > 0 ? (
                      <>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          {/* Grid di immagini */}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                            }}
                          >
                            {/* Prima immagine grande */}
                            <Box sx={{ position: "relative"}}>
                              <Box
                                sx={{
                                  display: "grid",
                                  gap: 1,
                                  gridTemplateColumns: "2fr 1fr",
                                  gridTemplateRows: "1fr 1fr",
                                  height: 200,
                                  width: "100%",
                                }}
                              >
                                {images.slice(0, 3).map((img, index) => (
                                  <Box
                                    key={index}
                                    component="img"
                                    src={img}
                                    alt={`Screenshot ${index + 1}`}
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                      borderRadius: 1,
                                      cursor: "pointer",
                                      boxShadow: "0 0 8px rgba(0,0,0,0.3)",
                                      transition: "transform 0.3s",
                                      "&:hover": { transform: "scale(1.05)" },
                                      ...(index === 0 && { gridRow: "1 / 3" }),
                                    }}
                                    onClick={() => {
                                      setPhotoIndex(index);
                                      setIsOpen(true);
                                    }}
                                  />
                                ))}
                              </Box>

                              <Button
                                variant="text"
                                size="small"
                                startIcon={<PhotoLibraryIcon />}
                                onClick={() => {
                                  setPhotoIndex(0);
                                  setIsOpen(true);
                                }}
                                sx={{
                                  color: "rgba(255, 255, 255, 0.8)",
                                  "&:hover": {
                                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                                  },
                                  position: "absolute",
                                  top: 10,
                                  right: 10,
                                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                                  backdropFilter: "blur(1px)",
                                }}
                              >
                                Gallery ({images.length})
                              </Button>
                            </Box>

                            {/* Altre immagini piccole */}
                            <Box sx={{ display: "flex", gap: 1 }}>
                              {images.slice(1, 3).map((img, index) => (
                                <Box
                                  key={index + 1}
                                  component="img"
                                  src={img}
                                  alt={`Screenshot ${index + 2}`}
                                  sx={{
                                    width: "50%",
                                    height: 70,
                                    objectFit: "cover",
                                    borderRadius: 1,
                                    cursor: "pointer",
                                    boxShadow: "0 0 8px rgba(0,0,0,0.3)",
                                    transition: "transform 0.3s",
                                    "&:hover": { transform: "scale(1.05)" },
                                  }}
                                  onClick={() => {
                                    setPhotoIndex(index + 1);
                                    setIsOpen(true);
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>
                        </Box>
                      </>
                    ) : (
                      <Typography>
                        No screenshots available for this game.
                      </Typography>
                    )}
                  </Grid>
                  <Grid sx={{ mt: { xs: 1, sm: 0 } }} size={{ xs: 12, sm: 6, md: 12 }}>
                    {movies.length > 0 ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                          }}
                        >
                          {/* Preview del primo trailer */}
                          <Box
                            component="img"
                            src={movies[0].preview}
                            alt={movies[0].name || "Trailer"}
                            sx={{
                              width: "100%",
                              aspectRatio: "27/16",
                              objectFit: "cover",
                              borderRadius: 1,
                              cursor: "pointer",
                              flexShrink: 0,
                              boxShadow: "0 0 8px rgba(0,0,0,0.3)",
                              transition: "transform 0.3s",
                              "&:hover": { transform: "scale(1.05)" },
                            }}
                            onClick={() => {
                              if (videoSlides.length > 0) {
                                setPhotoIndex(images.length);
                                setIsOpen(true);
                              } else if (youtubeVideos.length > 0) {
                                openYouTube(youtubeVideos[0].videoUrl);
                              }
                            }}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-end",
                              gap: 1,
                              position: "absolute",
                              top: 10,
                              right: 10,
                            }}
                          >
                            <Button
                              variant="text"
                              size="small"
                              startIcon={<PlayArrowIcon />}
                              onClick={() => {
                                if (videoSlides.length > 0) {
                                  setPhotoIndex(images.length);
                                  setIsOpen(true);
                                } else if (youtubeVideos.length > 0) {
                                  openYouTube(youtubeVideos[0].videoUrl);
                                }
                              }}
                              sx={{
                                color: "rgba(255, 255, 255, 0.8)",
                                "&:hover": {
                                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                                },
                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                                backdropFilter: "blur(1px)",
                              }}
                            >
                              Trailer
                            </Button>

                            {movies.length > 1 && (
                              <Typography
                                variant="caption"
                                sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                              >
                                {movies.length} trailer
                                {movies.length > 1 ? "s" : ""} available
                              </Typography>
                            )}
                          </Box>

                          {/* Bottone per aprire tutti i trailer */}
                        </Box>
                      </>
                    ) : (
                      <Typography>
                        No trailers available for this game.
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                {isOpen && (
                  <Lightbox
                    open={isOpen}
                    close={() => setIsOpen(false)}
                    slides={slides}
                    index={photoIndex}
                    onIndexChange={setPhotoIndex}
                    plugins={[Thumbnails, Fullscreen, Counter, Video]}
                    thumbnails={{ showToggle: true }}
                  />
                )}
                <YoutubeModal
                  open={ytModalOpen}
                  onClose={() => setYtModalOpen(false)}
                  videoId={ytVideoId}
                />
              </Grid>
            </Grid>

            {/* Added By Status */}
            <Box
              sx={{
                width: "100%",
                display: { xs: "block", md: "flex" },
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
                    {data.achievements_count ?? "N/A"}
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

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  {/* Reviews */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      width: "100%",
                      flexDirection: "column",
                    }}
                  >
                    {/* Ratings */}
                    <Box sx={{ width: "100%" }}>
                      {data.ratings?.length > 0 ? (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
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

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        Total: {data.reviews_count ?? 0}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Reddit Description */}
                  {data.reddit_description && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                      }}
                    >
                      <Typography variant="h6">Reddit Description:</Typography>
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

                  <Box>
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
                          showTooltip={false}
                        />
                      )) || <Typography color="text.secondary">N/A</Typography>}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      justifyContent: "end",
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
                          showTooltip={false}
                        />
                      )) || <Typography color="text.secondary">N/A</Typography>}
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                {/* Chatbox */}
                <Box sx={{ height: "100%" }}>
                  <Chatbox data={data && data} />
                </Box>
              </Grid>
            </Grid>

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
      <SimilarGamesList games={similarGames} />
    </Box>
  );
}

export default GamePage;
