import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { searchGames } from "../../api/games";
import LayoutGamesList from "../../components/game/LayoutGameList.jsx";

function SearchPage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const [page, setPage] = useState(1);
  const [ordering, setOrdering] = useState("-relevance");

  let [searchParams] = useSearchParams();
  const game = searchParams.get("query");
  const {
    data,
    isLoading: loading,
    isError: error,
  } = useQuery({
    queryKey: ["searchGames", game, page, ordering],
    queryFn: () => searchGames(game, page, ordering),
    enabled: !!game,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  // Calcolate last page
  const itemsPerPage = 20;
  const count = data?.count || 0;
  const lastPage = Math.ceil(count / itemsPerPage);

  /*
  |-----------------------------------------------------
  | Hooks
  |-----------------------------------------------------
  */

  // Reset page when query changes
  useEffect(() => {
    setPage(1);
  }, [game]);

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */
  return (
    <>
      {data?.results?.length !== 0 ? (
        <LayoutGamesList
          data={data}
          loading={loading}
          error={error}
          title={`Results for "${game}"`}
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
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">No results for "{game}"</Typography>
        </Box>
      )}
    </>
  );
}

export default SearchPage;
