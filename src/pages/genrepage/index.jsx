import { useParams } from "react-router";
import apiConfig from "../../config/apiConfig";
import useFetchSolution from "../../hooks/useFetchSolution.js";
import GamesList from "../../components/game/LayoutGameList.jsx";
import { useEffect } from "react";

function GenrePage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { genre } = useParams();
  const initialUrl = apiConfig.endpoints.gamesByGenre(genre, 1);
  const genreUrl = apiConfig.endpoints.genres;
  /**
   * Fetch dei giochi di un determinato genere
   */
  const {
    data: gamesData,
    loading: gamesLoading,
    error: gamesError,
    updateUrl: updateGamesUrl,
  } = useFetchSolution(initialUrl);
  const {
    data: genresData,
    loading: genresLoading,
    error: genresError,
  } = useFetchSolution(genreUrl);

  /*
  |-----------------------------------------------------
  | Hooks
  |-----------------------------------------------------
  */

  useEffect(() => {
    updateGamesUrl(apiConfig.endpoints.gamesByGenre(genre, 1));
  }, [updateGamesUrl, genre]);

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  const genreInfo = genresData?.results?.find((g) => g.slug === genre);
  const genreTitle = genreInfo?.name || genre;
  const isLoading = gamesLoading || genresLoading;
  const error = gamesError && genresError;

  return (
    <GamesList
      data={gamesData}
      loading={isLoading}
      error={error}
      title={genreTitle}
      titleStyles={{ color: "secondary.main", fontWeight: 700 }}
    />
  );
}

export default GenrePage;
