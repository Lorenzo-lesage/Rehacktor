import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCreatorsPaginated } from "../../api/games";
import BrowseLayout from "../../components/browse/BrowseLayout";
import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import CreatorCardWithRoles from "../../components/browse/CreatorCardWithRoles";

const CreatorPage = () => {
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
    queryKey: ["creators"],
    queryFn: ({ pageParam = 1 }) => fetchCreatorsPaginated(pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.next ? allPages.length + 1 : undefined,
    staleTime: Infinity,
    cacheTime: 2 * 60 * 60 * 1000,
  });

  const allCreators = data?.pages.flatMap((page) => page.results) || [];

  /*
  |----------------------------------------------------
  | Return
  |----------------------------------------------------
  */

  return (
    <BrowseLayout
      title="Creators"
      data={allCreators}
      isLoading={isLoading}
      error={error}
      renderItem={(creator) => <CreatorCardWithRoles creator={creator} />}
      bottomContent={
        hasNextPage && (
          <Box sx={{ textAlign: "center", my: 4 }}>
            <Chip
              label={isFetchingNextPage ? "Loading..." : "Show more creators"}
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

export default CreatorPage;
