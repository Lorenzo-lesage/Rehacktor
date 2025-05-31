import { useParams } from "react-router";
import apiConfig from "../../config/apiConfig";
import useFetch from "../../hooks/useFetch";
import GamesList from "../../components/game/LayoutGameList.jsx";

function GenrePage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { genre } = useParams();
  /**
   * Fetch dei giochi di un determinato genere
   */
  const {
    data: gamesData,
    loading: gamesLoading,
    error: gamesError,
  } = useFetch(apiConfig.endpoints.gamesByGenre(genre, 1));
  /**
   * Fetch dei generi di gioco
   */
  const {
    data: genresData,
    loading: genresLoading,
    error: genresError,
  } = useFetch(apiConfig.endpoints.genres);
  /**
   * Informazioni sul genere
   */
  const genreInfo = genresData?.results?.find((g) => g.slug === genre);
  /**
   * Titolo del genere dallo slug
   */
  const genreTitle = genreInfo?.name || genre;
  const isLoading = gamesLoading || genresLoading;
  const error = gamesError || genresError;

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

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
