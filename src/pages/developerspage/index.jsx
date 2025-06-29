import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchDevelopersPaginated } from "../../api/games";
import { useEffect, useRef } from "react";
import BrowseLayout from "../../components/browse/BrowseLayout";
import CardBrowse from "../../components/browse/CardBrowse";
import { Box, Chip, CircularProgress } from "@mui/material";

const DevelopersPage = () => {
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

  const observerRef = useRef();

  const allDevelopers = data?.pages.flatMap((page) => page.results) || [];

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
        <Box ref={observerRef} sx={{ textAlign: "center", my: 4 }}>
          <Chip
            label={isFetchingNextPage ? "Loading..." : "More Developers"}
            icon={isFetchingNextPage && <CircularProgress size={16} />}
          />
        </Box>
      }
    />
  );
};

export default DevelopersPage;
