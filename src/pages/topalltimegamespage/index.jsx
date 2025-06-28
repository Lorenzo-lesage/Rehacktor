import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTopAllTimeGames } from "../../api/games";
import LayoutGamesList from "../../components/game/LayoutGameList.jsx";

function TopAllTimeGamesPage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const [page, setPage] = useState(1);
  const [ordering, setOrdering] = useState("relevance");
  const itemsPerPage = 20;

  const { data, isLoading, error } = useQuery({
    queryKey: ["topAllTimeGames"],
    queryFn: fetchTopAllTimeGames,
    staleTime: 60 * 60 * 1000,
  });

  const orderedData = useMemo(() => {
    if (!data) return [];

    const sorted = [...data];
    switch (ordering) {
      case "-rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "rating":
        return sorted.sort((a, b) => a.rating - b.rating);
      case "-metacritic":
        return sorted.sort((a, b) => (b.metacritic ?? 0) - (a.metacritic ?? 0));
      case "metacritic":
        return sorted.sort((a, b) => (a.metacritic ?? 0) - (b.metacritic ?? 0));
      case "-released":
        return sorted.sort(
          (a, b) => new Date(b.released) - new Date(a.released)
        );
      case "released":
        return sorted.sort(
          (a, b) => new Date(a.released) - new Date(b.released)
        );
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "-name":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  }, [data, ordering]);

  const total = orderedData.length;
  const realLastPage = Math.ceil(total / itemsPerPage);
  const paginatedData = orderedData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <LayoutGamesList
      data={{ results: paginatedData, count: total }}
      loading={isLoading}
      error={error}
      title="Top 250 Games of All Time"
      titleStyles={{ color: "text.primary", fontWeight: 700 }}
      currentPage={page}
      setCurrentPage={setPage}
      lastPage={realLastPage}
      ordering={ordering}
      setOrdering={setOrdering}
      availableOrderings={[
        { value: "relevance", label: "Relevance" },
        { value: "-rating", label: "Rating (High → Low)" },
        { value: "rating", label: "Rating (Low → High)" },
        { value: "-metacritic", label: "Metacritic (High → Low)" },
        { value: "metacritic", label: "Metacritic (Low → High)" },
        { value: "-released", label: "Release Date (Newest)" },
        { value: "released", label: "Release Date (Oldest)" },
        { value: "name", label: "Name (A-Z)" },
        { value: "-name", label: "Name (Z-A)" },
      ]}
    />
  );
}

export default TopAllTimeGamesPage;
