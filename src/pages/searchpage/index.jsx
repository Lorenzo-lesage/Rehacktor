import { useEffect } from "react";
import { useSearchParams } from "react-router";
import apiConfig from "../../config/apiConfig";
import useFetchSolution from "../../hooks/useFetchSolution.js";
import GamesList from "../../components/game/LayoutGameList.jsx";
import { Box, Typography } from "@mui/material";

function SearchPage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  let [searchParams] = useSearchParams();
  const game = searchParams.get("query");
  const initialUrl = apiConfig.endpoints.gameSearch(game);
  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

  /*
  |-----------------------------------------------------
  | Hooks
  |-----------------------------------------------------
  */

  useEffect(() => {
    updateUrl(initialUrl);
  }, [initialUrl, updateUrl]);

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
