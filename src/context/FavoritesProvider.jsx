import { useState, useEffect, useContext, useCallback } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "./SessionContext";
import FavoritesContext from "./FavoritesContext";

function FavoritesProvider({ children }) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { userProfile } = useContext(SessionContext);
  const [favorites, setFavorites] = useState([]);

  /*
  |-----------------------------------------------------
  | Methods
  |-----------------------------------------------------
  */

  /**
   * Method to get favorites
   */
  const getFavorites = useCallback(async () => {
    let { data: favourites, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", userProfile?.id);
    if (error) {
      console.log(error);
    } else {
      setFavorites(favourites);
    }
  }, [userProfile]);

  /**
   * Method to add game to favorites
   * @param {*} game
   */
  const addFavorites = async (game) => {
    const { data, error } = await supabase
      .from("favorites")
      .insert([
        {
          user_id: userProfile?.id,
          game_id: game.id,
          game_name: game.name,
          game_image: game.background_image,
        },
      ])
      .select();

    if (!error && data) {
      setFavorites((prev) => [...prev, ...data]);
    }
  };

  /**
   * Method to remove game from favorites
   * @param {*} gameId
   */
  const removeFavorite = async (gameId) => {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("game_id", gameId)
      .eq("user_id", userProfile?.id);

    if (!error) {
      setFavorites((prev) => prev.filter((fav) => +fav.game_id !== +gameId));
  };
  };

  /*
  |-----------------------------------------------------
  | Hook
  |-----------------------------------------------------
  */

  useEffect(() => {
    if (userProfile) {
      getFavorites();
    }
    const favorites = supabase
      .channel("favorites")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "favorites" },
        () => getFavorites()
      )
      .subscribe();

    return () => {

      favorites.unsubscribe();
    };
  }, [getFavorites, userProfile]);

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <FavoritesContext.Provider
      value={{ favorites, setFavorites, addFavorites, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;
