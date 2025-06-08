import { useQuery } from "@tanstack/react-query";
import { fetchGamesByDate } from "../../api/games";
import LayoutGameList from "../../components/game/LayoutGameList.jsx";

function HomePage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const startDate = "2024-01-01";
  const endDate = "2024-12-31";
  const page = 1;
  const { data, isLoading, error } = useQuery({
    queryKey: ["gamesByDate", startDate, endDate, page],
    queryFn: () => fetchGamesByDate(startDate, endDate, page),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });

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
    />
  );
}

export default HomePage;
