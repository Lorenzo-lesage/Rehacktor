import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPublishersPaginated } from "../../api/games";
import BrowseLayout from "../../components/browse/BrowseLayout";
import CardBrowse from "../../components/browse/CardBrowse";
import { Box, Chip, CircularProgress } from "@mui/material";

const PublisherPage = () => {
  /*
  |----------------------------------------------------------------
  | Data
  |----------------------------------------------------------------
  */

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["publishers"],
    queryFn: ({ pageParam = 1 }) => fetchPublishersPaginated(pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.next ? allPages.length + 1 : undefined,
    staleTime: Infinity,
    cacheTime: 24 * 60 * 60 * 1000,
  });

  const allPublishers = data?.pages.flatMap((page) => page.results) || [];

  /*
  |----------------------------------------------------------------
  | Return
  |----------------------------------------------------------------
  */

  return (
    <BrowseLayout
      title="Publishers"
      data={allPublishers}
      isLoading={isLoading}
      error={error}
      renderItem={(publisher) => (
        <CardBrowse
          key={publisher.id}
          title={publisher.name}
          count={publisher.games_count}
          items={publisher.games}
          image={publisher.image_background}
        />
      )}
      bottomContent={
        hasNextPage && (
          <Box sx={{ textAlign: "center", my: 4 }}>
            <Chip
              label={isFetchingNextPage ? "Loading..." : "Show more publishers"}
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

export default PublisherPage;
