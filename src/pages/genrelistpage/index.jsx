import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "../../api/games";
import { useNavigate } from "react-router";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Container,
} from "@mui/material";
import {
  GiSwordClash,
  GiSpellBook,
  GiPistolGun,
  GiTreasureMap,
  GiChessRook,
  GiRaceCar,
  GiSoccerBall,
  GiCrossedSwords,
  GiJoystick,
  GiGamepadCross,
  GiCarWheel,
  GiPerspectiveDiceSixFacesRandom,
  GiCardAceClubs,
  GiFamilyHouse,
  GiGraduateCap,
  GiNetworkBars,
  GiPlatform,
  GiUfo,
} from "react-icons/gi";
import { FaPuzzlePiece, FaCar, FaUsers, FaLightbulb } from "react-icons/fa";

const genreIconMap = {
  Action: GiSwordClash,
  Indie: FaLightbulb,
  Adventure: GiTreasureMap,
  RPG: GiSpellBook,
  Strategy: GiChessRook,
  Shooter: GiPistolGun,
  Casual: GiGamepadCross,
  Simulation: GiCarWheel,
  Puzzle: FaPuzzlePiece,
  Arcade: GiJoystick,
  Platformer: GiPlatform,
  Racing: GiRaceCar,
  Sports: GiSoccerBall,
  Fighting: GiCrossedSwords,
  Family: GiFamilyHouse,
  "Board Games": GiPerspectiveDiceSixFacesRandom,
  Educational: GiGraduateCap,
  Card: GiCardAceClubs,
  "Massively Multiplayer": GiNetworkBars,
  "Science Fiction": GiUfo,
};

const GenreListPage = () => {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { data, isLoading, error } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: Infinity,
  });

  const navigate = useNavigate();

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  if (isLoading)
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

  if (error)
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
        <Typography color="error" align="center" mt={4}>
          Error loading genres. {error.message || error.toString()}
        </Typography>
      </Box>
    );

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ width: "90%" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: { xs: "center", md: "left" } }}
        >
          All Genres
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {data?.results.map((genre) => {
          const Icon = genreIconMap[genre.name];
          return (
            <Grid
              size={{ xs: 6, md: 4 }}
              key={genre.id}
              sx={{ overflow: "hidden", borderRadius: 3 }}
            >
              <Card
                elevation={2}
                sx={{
                  height: 240,
                  borderRadius: 3,
                  boxShadow: 3,
                  position: "relative",
                  transition: "transform 0.2s ease-in-out",
                  ":hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardActionArea
                  onClick={() => navigate(`/games/${genre.slug}`)}
                  sx={{ height: "100%" }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url(${
                        genre.image_background ||
                        "https://via.placeholder.com/400x200?text=No+Image"
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      zIndex: 1,
                    }}
                  />

                  <CardContent
                    sx={{
                      position: "relative",
                      zIndex: 2,
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      {Icon && <Icon size={24} />} {/* Icona dinamica */}
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {genre.name}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default GenreListPage;
