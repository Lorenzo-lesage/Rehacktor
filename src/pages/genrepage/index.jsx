import { useParams } from "react-router";
import apiConfig from "../../config/apiConfig";
import useFetch from "../../hooks/useFetch";
import GamesList from "../../components/game/LayoutGameList.jsx";

function GenrePage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { genre } = useParams();
  const { data, error, loading } = useFetch(
    apiConfig.endpoints.gamesByGenre(genre, 1)
  );

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
      title={`Welcome to the "${genre}" genre`}
      titleStyles={{ color: "secondary.main", fontWeight: 700 }}
    />
  );
}

export default GenrePage;
