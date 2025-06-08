import { useParams } from "react-router";
import GamesList from "../../components/game/LayoutGameList.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchGamesByGenre, fetchGenres } from "../../api/games";

function GenrePage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { genre } = useParams();
  const {
    data: gamesData,
    isLoading: gamesLoading,
    isError: gamesError,
  } = useQuery({
    queryKey: ["gamesByGenre", genre],
    queryFn: () => fetchGamesByGenre(genre, 1),
  });

  const {
    data: genresData,
    isLoading: genresLoading,
    isError: genresError,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

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
