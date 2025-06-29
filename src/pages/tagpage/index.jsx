import CardBrowse from "../../components/browse/CardBrowse";
import BrowseLayout from "../../components/browse/BrowseLayout";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTagsPaginated } from "../../api/games";
import { useEffect, useRef } from "react";
import { Box, Chip, CircularProgress } from "@mui/material";

const TagPage = () => {
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
    queryKey: ["tags"],
    queryFn: ({ pageParam = 1 }) => fetchTagsPaginated(pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.next ? allPages.length + 1 : undefined,
    staleTime: Infinity,
  });
  const observerRef = useRef();

  const allTags = data?.pages.flatMap((page) => page.results) || [];

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
      title="Game Tags"
      data={allTags}
      isLoading={isLoading}
      error={error}
      renderItem={(tag) => (
        <CardBrowse
          title={tag.name}
          count={tag.games_count}
          items={tag.games}
          image={tag.image_background}
        />
      )}
      bottomContent={
        <Box ref={observerRef} sx={{ textAlign: "center", my: 4 }}>
          <Chip
            label={isFetchingNextPage ? "Loading..." : "More Tags"}
            icon={isFetchingNextPage && <CircularProgress size={16} />}
          />
        </Box>
      }
    />
  );
};

export default TagPage;
