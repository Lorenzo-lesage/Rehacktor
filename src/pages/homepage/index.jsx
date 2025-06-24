import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGamesByDate } from "../../api/games";
import LayoutGameList from "../../components/game/LayoutGameList.jsx";

function HomePage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const [page, setPage] = useState(1);
  const startDate = "2024-01-01";
  const endDate = "2024-12-31";

  // Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["gamesByDate", startDate, endDate, page],
    queryFn: () => fetchGamesByDate(startDate, endDate, page),
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

  // Se andiamo oltre il massimo supportato, riportaci indietro
  useEffect(() => {
    if (!isLoading && page > lastPage) {
      setPage(lastPage);
    }
  }, [page, lastPage, isLoading]);

  // Se risultati vuoti, torna indietro di 1 pagina
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
    <LayoutGameList
      data={data}
      loading={isLoading}
      error={error}
      title="Home"
      titleStyles={{ color: "secondary.main", fontWeight: 700 }}
      currentPage={page}
      setCurrentPage={setPage}
      lastPage={lastPage}
    />
  );
}

export default HomePage;
