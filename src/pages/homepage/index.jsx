import useFetch from "../../hooks/useFetch.js";
import apiConfig from "../../config/apiConfig";
import GamesList from "../../components/game/LayoutGameList.jsx";

function HomePage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { data, error, loading } = useFetch(
    apiConfig.endpoints.gamesByDate("2024-01-01", "2024-12-31", 1)
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
      title="Home"
      titleStyles={{ color: "secondary.main", fontWeight: 700 }}
    />
  );
}

export default HomePage;
