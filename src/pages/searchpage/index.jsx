import { useSearchParams } from "react-router";
import GamesList from "../../components/game/LayoutGameList.jsx";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { searchGames } from "../../api/games";

function SearchPage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  let [searchParams] = useSearchParams();
  const game = searchParams.get("query");
  const {
    data,
    isLoading: loading,
    isError: error,
  } = useQuery({
    queryKey: ["searchGames", game],
    queryFn: () => searchGames(game),
    enabled: !!game, // evita di chiamare se `game` è null
    staleTime: 5 * 60 * 1000, // 5 minuti senza refetch automatico
    cacheTime: 10 * 60 * 1000,
  });

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */
  return (
    <>
      {data?.results?.length !== 0 ? (
        <GamesList
          data={data}
          loading={loading}
          error={error}
          title={`Results for "${game}"`}
          titleStyles={{ color: "secondary.main", fontWeight: 700 }}
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
