import { useContext, useState } from "react";
import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { showToast } from "../../components/toast/toastHelper";
import { Button } from "@mui/material";

function ToggleFavorite({ data }) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { userProfile } = useContext(SessionContext);
  const [favorites, setFavorites] = useState([]);
  const isFavorite = favorites.find((el) => +el.game_id === data.id);
  console.log("userProfile", userProfile);
  
  /*
  |-----------------------------------------------------
  | Methods
  |-----------------------------------------------------
  */
 
 /**
  * Method to add game to favorites
  * @param {*} game 
 */
const addFavorites = async (game) => {
    console.log("addFavorites game:", game);
    const { data, error } = await supabase
      .from("favorites")
      .insert([
        {
          user_id: userProfile.id,
          game_id: game.id,
          game_name: game.name,
          game_image: game.background_image,
        },
      ])
      .select();
    if (error) {
      showToast("error", {
        message: "Error adding game to favorites",
        description: error.message,
      });
    } else {
      setFavorites(data);
    }
  };

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return <Button onClick={() => addFavorites(data)}>
    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
  </Button>;
}

export default ToggleFavorite;
