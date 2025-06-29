import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchCreatorsPaginated, fetchCreatorRoles } from "../../api/games";
import { useEffect, useRef } from "react";
import BrowseLayout from "../../components/browse/BrowseLayout";
import CardBrowse from "../../components/browse/CardBrowse";
import { Box, Chip, CircularProgress, Typography } from "@mui/material";

const CreatorPage = () => {
  const { data: rolesData, isLoading: rolesLoading } = useQuery({
    queryKey: ["creatorRoles"],
    queryFn: fetchCreatorRoles,
    staleTime: Infinity,
  });

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
  });

  const observerRef = useRef();

  const allCreators = data?.pages.flatMap((page) => page.results) || [];
  const creatorRoles = rolesData || [];

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

  // Funzione flessibile per mappare i ruoli
  const mapCreatorRoles = (roles) => {
    if (!roles || roles.length === 0) return [];

    if (typeof roles[0] === "object" && roles[0]?.name) {
      // roles è un array di oggetti con 'name'
      return roles.map((r) => r.name);
    } else if (typeof roles[0] === "number") {
      // roles è un array di ID numerici
      return roles
        .map((id) => {
          const role = creatorRoles.find((r) => r.id === id);
          return role?.name || null;
        })
        .filter(Boolean);
    }
    return [];
  };

  return (
    <BrowseLayout
      title="Creators"
      data={allCreators}
      isLoading={isLoading || rolesLoading}
      error={error}
      renderItem={(creator) => {
        // Log per debug, poi puoi togliere
        console.log("Creator roles raw:", creator.creator_roles);

        const roleNames = mapCreatorRoles(creator.creator_roles);

        return (
          <CardBrowse
            key={creator.id}
            title={creator.name}
            count={creator.games_count}
            items={creator.games}
            image={creator.image_background || creator.image || ""}
            extraContent={
              <Box sx={{ mt: 1 }}>
                {roleNames.length > 0 && (
                  <Typography variant="caption" color="textSecondary">
                    Roles: {roleNames.join(", ")}
                  </Typography>
                )}
              </Box>
            }
          />
        );
      }}
      bottomContent={
        <Box ref={observerRef} sx={{ textAlign: "center", my: 4 }}>
          <Chip
            label={isFetchingNextPage ? "Loading..." : "More Creators"}
            icon={isFetchingNextPage && <CircularProgress size={16} />}
          />
        </Box>
      }
    />
  );
};

export default CreatorPage;
