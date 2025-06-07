import { useContext } from "react";
import FavoritesContext from "../../context/FavoritesContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, IconButton, Tooltip } from "@mui/material";
import SessionContext from "../../context/SessionContext";
import { useNavigate, useLocation } from "react-router";
import { showToast } from "../toast/toastHelper";

function ToggleFavorite({ data }) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { favorites, addFavorites, removeFavorite } =
    useContext(FavoritesContext);
  const { userProfile } = useContext(SessionContext);
  const isFavorite = () => favorites.find((el) => +el.game_id === data?.id);
  const navigate = useNavigate();
  const location = useLocation();
  const isGamePage = /^\/games\/[^/]+\/\d+$/.test(location.pathname);
  const iconColor = isGamePage ? "default" : "yellow";
  const className = isGamePage ? "" : "hoverImage";
  const sxStyles = isGamePage
    ? {}
    : {
        filter: "drop-shadow(2px 3px 4px rgba(0,0,0))",
        ":hover": {
          filter: "drop-shadow(1px 2px 3px rgba(0,0,0))",
          transform: "scale(1.2) rotateY(720deg)",
        },
        transition: "all 0.3s ease-in-out",
      };

  /*
  |-----------------------------------------------------
  | Methods
  |-----------------------------------------------------
  */

  const handleClick = () => {
    if (!userProfile) {
      navigate("/login");
      showToast("error", "You need to sign in to add to favorites");
    } else {
      isFavorite() ? removeFavorite(data.id) : addFavorites(data);
    }
  };

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  if (!userProfile)
    return (
      <Box>
        <Tooltip title="Sign in to add to favorites" placement="top">
          <IconButton onClick={handleClick} size="small">
            <FavoriteBorderIcon
              color={iconColor === "default" ? "action" : undefined}
              sx={iconColor !== "default" ? { color: iconColor, filter: "drop-shadow(2px 2px 3px rgba(0,0,0))", } : {}}
            />
          </IconButton>
        </Tooltip>
      </Box>
    );
  return (
    <Box>
      <Tooltip
        title={isFavorite() ? "Remove from favorites" : "Add to favorites"}
        placement="top"
      >
        <IconButton onClick={handleClick} size="small">
          {isFavorite() ? (
            <FavoriteIcon
              color={iconColor === "default" ? "action" : undefined}
              sx={{
                 filter: "drop-shadow(2px 2px 3px rgba(0,0,0))",
                ...(iconColor !== "default" && { color: iconColor }),
                ...sxStyles,
              }}
              className={className}
            />
          ) : (
            <FavoriteBorderIcon
              color={iconColor === "default" ? "action" : undefined}
              sx={{
                ...(iconColor !== "default" && { color: iconColor }),
                ...sxStyles,
              }}
              className={className}
            />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default ToggleFavorite;
