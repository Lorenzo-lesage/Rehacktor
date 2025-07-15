import {
  Card,
  Typography,
  IconButton,
  Grid,
  CardMedia,
  CardContent,
  Rating,
  Tooltip,
  Box,
} from "@mui/material";
import { Link } from "react-router";
import { useContext } from "react";
import FavoritesContext from "../../context/FavoritesContext";
import { showToast } from "../../utils/snackbarUtils";

// Icon
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

function CardFavoriteItem({ favorite }) {
  const {
    game_id,
    game_name,
    game_image,
    slug = game_name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  } = favorite;
  console.log(favorite);
  const { removeFavorite } = useContext(FavoritesContext);

  return (
    <Card
      key={game_id}
      elevation={1}
      sx={{
        position: "relative",
        paddingRight: 1,
        height: { xs: 95, md: 110 },
        borderRadius: 2,
        transition: "all 0.2s ease-in-out",
        ":hover": {
          transform: "translateY(-5px)",
          boxShadow: 10,
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 4, md: 2, height: "100%" }}>
            {game_image && (
              <Link to={`/games/${slug}/${game_id}`}>
                <Box sx={{ overflow: "hidden", borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    sx={{
                      borderRadius: 2,
                      height: { xs: 70, md: 85 },
                      transition: "transform 0.1s ease-in-out",
                      ":hover": { transform: "scale(1.15)" },
                      cursor: "pointer",
                    }}
                    image={game_image}
                  />
                </Box>
              </Link>
            )}
          </Grid>
          <Grid
            size={{ xs: 8, md: 8 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to={`/games/${slug}/${game_id}`}>
              <Box sx={{ width: "100%" }}>
                <Typography
                  variant="h6"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: { xs: "12rem", md: "100%" },
                    ":hover": { textDecoration: "underline" },
                  }}
                >
                  {game_name}
                </Typography>
              </Box>
            </Link>
          </Grid>

          <Grid
            size={{ xs: 0, md: 2 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Tooltip title="Remove from favorites" placement="top">
              <IconButton
                size="small"
                onClick={() =>
                  removeFavorite(game_id) &&
                  showToast("default", `${game_name} removed from favorites`)
                }
                sx={{
                  position: { xs: "absolute", md: "relative" },
                  top: 0,
                  right: 0,
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>

            <Tooltip title="View details" placement="top">
              <Link to={`/games/${slug}/${game_id}`}>
                <IconButton
                  size="small"
                  sx={{
                    position: { xs: "absolute", md: "relative" },
                    top: 0,
                    left: 0,
                  }}
                >
                  <VisibilityIcon />
                </IconButton>
              </Link>
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CardFavoriteItem;
