import { useContext } from "react";
import FavoritesContext from "../../context/FavoritesContext";
import {
  Box,
  Typography,
  Grid,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router";
import CardFavoriteItem from "../../components/game/CardFavoriteItem";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);
  const sortedFavorites = [...favorites].reverse();

  return (
    <Box sx={{ px: 2, py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Favorite Games
      </Typography>

      {sortedFavorites.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Alert
            severity="info"
            sx={{ mt: 2, width: { xs: "100%", md: "50%" } }}
          >
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                You haven’t added any favorites yet.
                <PanToolAltIcon sx={{ transform: "rotate(90deg)" }} />
              </Typography>
              <Tooltip title="Explore catalog">
                <Link to="/">
                  <IconButton
                    size="small"
                    sx={{ border: "1px solid" }}
                    color="text.primary"
                  >
                    <SportsEsportsIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            </Box>
          </Alert>
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            mt: 8,
            justifyContent: "center",
            width: '100'
          }}
        >
          {sortedFavorites.map((game) => (
            <Grid size={{ xs: 2, md: 3 }} key={game.id} sx={{ flexGrow: 1 }}>
              <CardFavoriteItem favorite={game} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FavoritesPage;
