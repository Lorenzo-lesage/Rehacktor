import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchComingSoonGames } from "../../api/games.js";
import LayoutGamesList from "../../components/game/LayoutGameList.jsx";
import { Box, Typography } from "@mui/material";

function IncomingPage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------    
  */

  const [page, setPage] = useState(1);
  const [ordering, setOrdering] = useState("relevance");

  const { data, isLoading, error } = useQuery({
    queryKey: ["nextWeekGames", page, ordering],
    queryFn: () => fetchComingSoonGames(page, ordering),
    staleTime: 60 * 60 * 1000,
    cacheTime: 2 * 60 * 60 * 1000,
    keepPreviousData: true,
  });

  const itemsPerPage = 20;
  const maxSafePage = 500;
  const count = data?.count || 1;
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

  if (!isLoading && (!data || data.results.length === 0)) {
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">No coming soon games</Typography>
      </Box>
    );
  }

  return (
    <LayoutGamesList
      data={data}
      loading={isLoading}
      error={error}
      title="Coming Soon"
      titleStyles={{ color: "Text.Primary", fontWeight: 700 }}
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

export default IncomingPage;
