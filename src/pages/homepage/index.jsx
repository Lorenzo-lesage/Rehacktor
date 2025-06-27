import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNewAndTrendingGames } from "../../api/games";
import LayoutGamesList from "../../components/game/LayoutGameList.jsx";

function HomePage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const [page, setPage] = useState(1);
  const [ordering, setOrdering] = useState("-released");

  const { data, isLoading, error } = useQuery({
    queryKey: ["newAndTrendingGames", page, ordering],
    queryFn: () => fetchNewAndTrendingGames(page, ordering),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });

  const itemsPerPage = 20;
  const maxSafePage = 500;
  const count = data?.count || 0;
  const realLastPage = Math.ceil(count / itemsPerPage);
  const lastPage = Math.min(realLastPage, maxSafePage);

  /*
  |-----------------------------------------------------
  | Hooks
  |-----------------------------------------------------
  */

  useEffect(() => {
    if (!isLoading && page > lastPage) {
      setPage(lastPage);
    }
  }, [page, lastPage, isLoading]);

  useEffect(() => {
    if (!isLoading && data?.results?.length === 0 && page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [data, isLoading, page]);

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <LayoutGamesList
      data={data}
      loading={isLoading}
      error={error}
      title="New & Trending"
      titleStyles={{ color: "text.primary", fontWeight: 700 }}
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

export default HomePage;
