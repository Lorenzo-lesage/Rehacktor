import { useEffect } from "react";
import { useSearchParams } from "react-router";
import apiConfig from "../../config/apiConfig";
import useFetchSolution from "../../hooks/useFetchSolution.js";
import GamesList from "../../components/game/LayoutGameList.jsx";

function SearchPage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  let [searchParams] = useSearchParams();
  const game = searchParams.get("query");
  const initialUrl = apiConfig.endpoints.gameSearch(game)
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
    <GamesList
      data={data}
      loading={loading}
      error={error}
      title={`Results for "${game}"`}
      titleStyles={{ color: "secondary.main", fontWeight: 700 }}
    />
  );
}

export default SearchPage;
