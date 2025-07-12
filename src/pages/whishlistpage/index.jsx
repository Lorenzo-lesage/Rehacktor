import { useContext } from "react";
import FavoritesContext from "../../context/FavoritesContext";
import {
  Box,
  Typography,
  Grid,
  Alert,
  IconButton,
  Tooltip,
  Container,
  Paper,
  Fade,
  Card,
  CardContent,
  Button,
  Chip,
  useTheme,
  alpha,
  Divider,
} from "@mui/material";
import { Link } from "react-router";
import CardFavoriteItem from "../../components/game/CardFavoriteItem";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GamepadIcon from "@mui/icons-material/Gamepad";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);
  const sortedFavorites = [...favorites].reverse();
  const theme = useTheme();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Fade in timeout={600}>
        <Box>
          {/* Header Section */}
          <Paper
            elevation={0}
            sx={{
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.error.main,
                0.1
              )} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
              borderRadius: 4,
              p: 4,
              mb: 4,
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: `linear-gradient(90deg, ${theme.palette.error.main} 0%, ${theme.palette.primary.main} 100%)`,
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <FavoriteIcon
                sx={{
                  fontSize: 40,
                  color: theme.palette.error.main,
                }}
              />
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(45deg, ${theme.palette.error.main} 30%, ${theme.palette.primary.main} 90%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Your Favorite Games
              </Typography>
              <Chip
                label={sortedFavorites.length}
                size="large"
                color="error"
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  height: 36,
                }}
              />
            </Box>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 300 }}
            >
              Your personal collection of amazing games
            </Typography>
          </Paper>

          {/* Content Section */}
          {sortedFavorites.length === 0 ? (
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                maxWidth: 600,
                mx: "auto",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <GamepadIcon
                  sx={{
                    fontSize: 80,
                    color: theme.palette.primary.main,
                    mb: 3,
                    opacity: 0.7,
                  }}
                />
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  No Favorites Yet
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3, lineHeight: 1.6 }}
                >
                  Start building your personal gaming library! Discover amazing
                  games and add them to your favorites collection.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "text.secondary",
                    }}
                  >
                    Ready to explore?
                    <PanToolAltIcon sx={{ transform: "rotate(90deg)" }} />
                  </Typography>
                  <Tooltip title="Explore our game catalog">
                    <Button
                      component={Link}
                      to="/"
                      variant="contained"
                      size="large"
                      startIcon={<SportsEsportsIcon />}
                      sx={{
                        borderRadius: 3,
                        textTransform: "none",
                        px: 4,
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: 500,
                        boxShadow: theme.shadows[4],
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: theme.shadows[8],
                        },
                      }}
                    >
                      Explore Games
                    </Button>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Stats Section */}
              <Paper
                elevation={1}
                sx={{
                  borderRadius: 3,
                  p: 3,
                  mb: 4,
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette.primary.main,
                    0.05
                  )} 0%, ${alpha(theme.palette.secondary.main, 0.03)} 100%)`,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <TrendingUpIcon
                    sx={{
                      fontSize: 28,
                      color: theme.palette.primary.main,
                    }}
                  />
                  <Typography variant="h6" fontWeight={600}>
                    Collection Overview
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  You have collected <strong>{sortedFavorites.length}</strong>{" "}
                  amazing game{sortedFavorites.length !== 1 ? "s" : ""} in your
                  favorites!
                </Typography>
              </Paper>

              {/* Games Grid */}
              <Grid
                container
                spacing={1}
                sx={{
                  justifyContent: "center",
                }}
              >
                {sortedFavorites.map((game, index) => (
                  <Grid
                    size={{ xs: 6, md: 3 }}
                    key={game.id}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Fade in timeout={600 + index * 100}>
                      <Box sx={{ width: "100%" }}>
                        <CardFavoriteItem favorite={game} />
                      </Box>
                    </Fade>
                  </Grid>
                ))}
              </Grid>

              {/* Back to Catalog Button */}
              <Box sx={{ mt: 6, textAlign: "center" }}>
                <Button
                  component={Link}
                  to="/"
                  variant="outlined"
                  size="large"
                  startIcon={<SportsEsportsIcon />}
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  Discover More Games
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Fade>
    </Container>
  );
};

export default FavoritesPage;
