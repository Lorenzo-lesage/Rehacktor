import { useState } from "react";
import { useParams } from "react-router";
import LayoutGameList from "../../components/game/LayoutGameList.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchGamesByGenre, fetchGenres } from "../../api/games";

function GenrePage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const [page, setPage] = useState(1);
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

  const itemsPerPage = gamesData?.results?.length || 20;
  const lastPage = gamesData?.count ? Math.ceil(gamesData.count / itemsPerPage) : 1;

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
    <LayoutGameList
      data={gamesData}
      loading={isLoading}
      error={error}
      title={genreTitle}
      titleStyles={{ color: "secondary.main", fontWeight: 700 }}
      currentPage={page}
      setCurrentPage={setPage}
      lastPage={lastPage}
    />
  );
}

export default GenrePage;
