import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPublishersPaginated } from "../../api/games";
import { useEffect, useRef } from "react";
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
  });

  const observerRef = useRef();

  const allPublishers = data?.pages.flatMap((page) => page.results) || [];

  /*
  |----------------------------------------------------------------
  | Hooks
  |----------------------------------------------------------------
  */

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [fetchNextPage, hasNextPage]);

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
        <Box ref={observerRef} sx={{ textAlign: "center", my: 4 }}>
          <Chip
            label={isFetchingNextPage ? "Loading..." : "More Publishers"}
            icon={isFetchingNextPage && <CircularProgress size={16} />}
          />
        </Box>
      }
    />
  );
};

export default PublisherPage;
