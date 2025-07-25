import { useState, useEffect } from "react";
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
  const [ordering, setOrdering] = useState("relevance");

  const { genre } = useParams();
  const {
    data: gamesData,
    isLoading: gamesLoading,
    isError: gamesError,
  } = useQuery({
    queryKey: ["gamesByGenre", genre, page, ordering],
    queryFn: () => fetchGamesByGenre(genre, page, ordering),
    keepPreviousData: true,
    staleTime: 60 * 60 * 1000,
    cacheTime: 2 * 60 * 60 * 1000,
    enabled: !!genre,
  });

  const {
    data: genresData,
    isLoading: genresLoading,
    isError: genresError,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // Paginazione calcolata
  const itemsPerPage = 20;
  const count = gamesData?.count || 0;
  const realLastPage = Math.ceil(count / itemsPerPage);
  const maxSafePage = 500;
  const lastPage = Math.min(realLastPage, maxSafePage);

  // Se oltre il massimo, riporta alla lastPage
  useEffect(() => {
    if (!gamesLoading && page > lastPage) {
      setPage(lastPage);
    }
  }, [page, lastPage, gamesLoading]);

  // Se pagina corrente è vuota, scala indietro
  useEffect(() => {
    if (!gamesLoading && gamesData?.results?.length === 0 && page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [gamesData, gamesLoading, page]);

  // Reset pagina a 1 quando cambia il genere
  useEffect(() => {
    setPage(1);
    setOrdering("relevance");
  }, [genre]);

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
      ordering={ordering}
      setOrdering={setOrdering}
      availableOrderings={[
        { value: "-rating", label: "Rating" },
        { value: "-metacritic", label: "Metacritic" },
        { value: "-added", label: "Most Added" },
        { value: "-released", label: "Release Date" },
      ]}
    />
  );
}

export default GenrePage;
