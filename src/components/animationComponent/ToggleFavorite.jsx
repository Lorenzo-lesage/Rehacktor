import { useContext } from "react";
import FavoritesContext from "../../context/FavoritesContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box,IconButton, Tooltip } from "@mui/material";
import SessionContext from "../../context/SessionContext";
import { useNavigate } from "react-router";

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

  /*
  |-----------------------------------------------------
  | Methods
  |-----------------------------------------------------
  */

  const handleClick = () => {
    if (!userProfile) {
      navigate("/login");
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
        <Tooltip
          title="Sign in to add to favorites"
        >
          <IconButton onClick={handleClick} size="small">
            <FavoriteBorderIcon />
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
        <IconButton
          onClick={() => {
            isFavorite() ? removeFavorite(data.id) : addFavorites(data);
          }}
          size="small"
        >
          {isFavorite() ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default ToggleFavorite;
