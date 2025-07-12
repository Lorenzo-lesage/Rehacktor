import { useContext } from "react";
import SessionContext from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoritesContext";
import {
  Box,
  Typography,
  IconButton,
  Alert,
  Tooltip,
  Avatar,
  Divider,
  Grid,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Paper,
  Fade,
  useTheme,
  alpha,
} from "@mui/material";
import { Link } from "react-router";
import CardFavoriteItem from "../../components/game/CardFavoriteItem";
import useAvatarUrl from "../../hooks/useAvatarUrl";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";

function ProfilePage() {
  /*
  |----------------------------------------------------------------
  | Data
  |----------------------------------------------------------------
  */

  const { userProfile } = useContext(SessionContext);
  const { favorites } = useContext(FavoritesContext);
  const { avatarUrl } = useAvatarUrl(userProfile?.avatar_url);
  const sortedFavorites = [...favorites].reverse();
  const theme = useTheme();

  /*
  |----------------------------------------------------------------
  | Return
  |----------------------------------------------------------------
  */
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in timeout={600}>
        <Box>
          {/* Header with gradient background */}
          <Paper
            elevation={0}
            sx={{
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
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
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              },
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                mb: 1,
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
            >
              Welcome back,{" "}
              {userProfile?.username
                ? userProfile.username.charAt(0).toUpperCase() +
                  userProfile.username.slice(1)
                : "User"}
              !
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 300 }}
            >
              Manage your profile and explore your gaming journey
            </Typography>
          </Paper>

          {/* Main content */}
          <Grid container spacing={4} sx={{ display: "flex", justifyContent: "center" }}>
            {/* Profile Info Card */}
            <Grid size={12}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 3,
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <PersonIcon
                      sx={{
                        mr: 2,
                        color: theme.palette.primary.main,
                        fontSize: 28,
                      }}
                    />
                    <Typography variant="h5" fontWeight={600}>
                      Profile Information
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      gap: 4,
                      alignItems: { xs: "center", md: "flex-start" },
                    }}
                  >
                    {/* Avatar Section */}
                    <Box sx={{ position: "relative", textAlign: "center" }}>
                      <Avatar
                        sx={{
                          width: { xs: 200, md: 300 },
                          height: { xs: 200, md: 300 },
                          boxShadow: theme.shadows[6],
                          border: `4px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: theme.shadows[12],
                          },
                        }}
                        src={avatarUrl}
                      />
                      <Tooltip title="Edit Profile" placement="top">
                        <IconButton
                          component={Link}
                          to="/account"
                          sx={{
                            position: "absolute",
                            top: -8,
                            right: -8,
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                            boxShadow: theme.shadows[4],
                            "&:hover": {
                              backgroundColor: theme.palette.primary.dark,
                              transform: "scale(1.1)",
                            },
                          }}
                          size="small"
                        >
                          <EditNoteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    {/* User Details */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Box>
                          <Chip
                            label="First Name"
                            size="small"
                            variant="outlined"
                            sx={{ mb: 1 }}
                          />
                          <Typography
                            variant="h6"
                            sx={{
                              wordBreak: "break-word",
                              overflowWrap: "break-word",
                              whiteSpace: "normal",
                              fontWeight: 500,
                            }}
                          >
                            {userProfile?.first_name
                              ? userProfile.first_name.charAt(0).toUpperCase() +
                                userProfile.first_name.slice(1)
                              : "User"}
                          </Typography>
                        </Box>

                        <Divider />

                        <Box>
                          <Chip
                            label="Last Name"
                            size="small"
                            variant="outlined"
                            sx={{ mb: 1 }}
                          />
                          <Typography
                            variant="h6"
                            sx={{
                              wordBreak: "break-word",
                              overflowWrap: "break-word",
                              whiteSpace: "normal",
                              fontWeight: 500,
                            }}
                          >
                            {userProfile?.last_name
                              ? userProfile.last_name.charAt(0).toUpperCase() +
                                userProfile.last_name.slice(1)
                              : "User"}
                          </Typography>
                        </Box>

                        <Divider />

                        <Box>
                          <Chip
                            label="Username"
                            size="small"
                            variant="outlined"
                            sx={{ mb: 1 }}
                          />
                          <Typography
                            variant="h6"
                            sx={{
                              wordBreak: "break-word",
                              overflowWrap: "break-word",
                              whiteSpace: "normal",
                              fontWeight: 500,
                            }}
                          >
                            {userProfile?.username
                              ? userProfile.username.charAt(0).toUpperCase() +
                                userProfile.username.slice(1)
                              : "User"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Info Section */}
            <Grid item xs={12} lg={4}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 3,
                  height: "100%",
                  background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    About Gaming
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    Discover an incredible collection of games tailored to your preferences. 
                    Build your personal library of favorites and explore new adventures. 
                    Whether you're into action, strategy, or casual gaming, we've got 
                    something special waiting for you.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Favorites Section */}
          <Card
            elevation={3}
            sx={{
              mt: 4,
              borderRadius: 3,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: theme.shadows[8],
              },
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <FavoriteIcon
                  sx={{
                    mr: 2,
                    color: theme.palette.error.main,
                    fontSize: 28,
                  }}
                />
                <Typography variant="h5" fontWeight={600}>
                  Your Favorite Games
                </Typography>
                <Chip
                  label={sortedFavorites.length}
                  size="small"
                  color="primary"
                  sx={{ ml: 2 }}
                />
              </Box>

              {sortedFavorites.length === 0 ? (
                <Alert
                  severity="info"
                  sx={{
                    borderRadius: 2,
                    "& .MuiAlert-message": {
                      width: "100%",
                    },
                  }}
                >
                  <Box sx={{ 
                    display: "flex", 
                    gap: 2, 
                    alignItems: "center",
                    flexDirection: { xs: "column", sm: "row" },
                    textAlign: { xs: "center", sm: "left" }
                  }}>
                    <Typography
                      sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 1,
                        flexWrap: "wrap",
                        justifyContent: { xs: "center", sm: "flex-start" }
                      }}
                    >
                      No favorites yet! Start exploring our amazing games{" "}
                      <PanToolAltIcon sx={{ transform: "rotate(90deg)" }} />
                    </Typography>
                    <Tooltip title="Go to catalog">
                      <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        size="small"
                        startIcon={<SportsEsportsIcon />}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          boxShadow: theme.shadows[3],
                          "&:hover": {
                            boxShadow: theme.shadows[6],
                          },
                        }}
                      >
                        Explore Games
                      </Button>
                    </Tooltip>
                  </Box>
                </Alert>
              ) : (
                <>
                  <Grid
                    container
                    spacing={1}
                    sx={{
                      justifyContent: "center",
                    }}
                  >
                    {sortedFavorites.slice(0, 2).map((game) => (
                      <Grid
                        size={{ xs: 6, md: 3 }}
                        key={game.id}
                        sx={{ 
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <CardFavoriteItem favorite={game} />
                      </Grid>
                    ))}
                  </Grid>

                  <Box sx={{ mt: 3, textAlign: "center" }}>
                    <Button
                      component={Link}
                      to="/whishlist"
                      variant="outlined"
                      size="large"
                      endIcon={<ArrowCircleRightIcon />}
                      sx={{
                        borderRadius: 3,
                        textTransform: "none",
                        px: 4,
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: 500,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateX(4px)",
                          boxShadow: theme.shadows[4],
                        },
                      }}
                    >
                      Show All Favorites
                    </Button>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      </Fade>
    </Container>
  );
}

export default ProfilePage;