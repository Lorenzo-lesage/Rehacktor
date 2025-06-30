import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchDevelopersPaginated } from "../../api/games";
import BrowseLayout from "../../components/browse/BrowseLayout";
import CardBrowse from "../../components/browse/CardBrowse";
import { Box, Chip, CircularProgress } from "@mui/material";

const DevelopersPage = () => {
  /*
  |----------------------------------------------------
  | Data
  |----------------------------------------------------
  */

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["developers"],
    queryFn: ({ pageParam = 1 }) => fetchDevelopersPaginated(pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.next ? allPages.length + 1 : undefined,
    staleTime: Infinity,
  });

  const allDevelopers = data?.pages.flatMap((page) => page.results) || [];

  /*
  |----------------------------------------------------
  | Return
  |----------------------------------------------------
  */

  return (
    <BrowseLayout
      title="Developers"
      data={allDevelopers}
      isLoading={isLoading}
      error={error}
      renderItem={(developer) => (
        <CardBrowse
          key={developer.id}
          title={developer.name}
          count={developer.games_count}
          items={developer.games}
          image={developer.image_background}
        />
      )}
      bottomContent={
        hasNextPage && (
          <Box sx={{ textAlign: "center", my: 4 }}>
            <Chip
              label={isFetchingNextPage ? "Loading..." : "Show more developers"}
              icon={
                isFetchingNextPage ? <CircularProgress size={16} /> : undefined
              }
              onClick={() => fetchNextPage()}
              clickable={!isFetchingNextPage}
              disabled={isFetchingNextPage}
              sx={{ cursor: isFetchingNextPage ? "default" : "pointer" }}
            />
          </Box>
        )
      }
    />
  );
};

export default DevelopersPage;
