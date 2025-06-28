import { Card, Typography, Box, Tooltip, IconButton } from "@mui/material";
import LazyLoadGameImage from "../animationComponent/LazyLoadGameImage";
import { Link } from "react-router";
import InfoIcon from "@mui/icons-material/Info";
import TiltCard from "../animationComponent/TiltCard";
import { useContext } from "react";
import FavoritesContext from "../../context/FavoritesContext";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function CardFavoriteItem({ favorite }) {
  const {
    game_id,
    game_name,
    game_image,
    slug = game_name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  } = favorite;
  const { removeFavorite } = useContext(FavoritesContext);

  return (
    <TiltCard sx={{ width: '100%' }} key={favorite.id}>
      <Box
        sx={{
          height: { xs: 150, sm: "15rem" },
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Link to={`/games/${slug}/${game_id}`}>
          <LazyLoadGameImage image={game_image} />
        </Link>
        <Tooltip title="Remove from Favorite" placement="top">
          <IconButton
            aria-label="remove favorite"
            size="small"
            onClick={() => removeFavorite(game_id)}
            sx={{ ml: 1, position: "absolute", top: "0.5rem", right: "0.5rem" }}
          >
            <RemoveCircleIcon
              sx={{
                color: "red",
                filter: "drop-shadow(1px 2px 2px rgba(0,0,0))",
                ":hover": {
                  filter: "drop-shadow(1px 2px 5px rgba(0,0,0))",
                  transform: "scale(1.2) rotateY(720deg)",
                },
                transition: "all 0.3s ease-in-out",
              }}
            />
          </IconButton>
        </Tooltip>

        <Box
          sx={{
            position: "absolute",
            width: "100%",
            zIndex: 1,
            bottom: "0rem",
            left: "0",
            borderRadius: 0,
          }}
        >
          <Box
            sx={{
              width: "100%",
              borderRadius: 0,
              padding: "0.2rem 0.5rem",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0), rgb(17,24,39))",
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                display: "block",
                textAlign: "center",
                filter: "drop-shadow(1px 1px 1px rgba(0,0,0))",
                transition: "all 0.3s ease-in-out",
                mb: 0,
                fontWeight: 900,
                color: "rgba(88,166,255)",
              }}
            >
              {game_name}
            </Typography>
          </Box>
        </Box>
      </Box>
    </TiltCard>
  );
}

export default CardFavoriteItem;
