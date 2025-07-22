import { useQuery } from "@tanstack/react-query";
import CardBrowse from "./CardBrowse";
import { Typography, Box, Avatar } from "@mui/material";
import { fetchCreatorDetails } from "../../api/games";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CreatorCardWithRoles = ({ creator }) => {
  /*
  |----------------------------------------------------
  | Data
  |----------------------------------------------------
  */
  const { data: details } = useQuery({
    queryKey: ["creatorDetails", creator.id],
    queryFn: () => fetchCreatorDetails(creator.id),
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: !!creator.id,
  });

  const roles =
    details?.positions && details.positions.length > 0
      ? details.positions.map((p) => p.name).join(", ")
      : "No roles available";

  const imageAvatar = details?.image || "";
  const title = details?.name || creator.name;

  /*
  |----------------------------------------------------
  | Return
  |----------------------------------------------------
  */

  return (
    <CardBrowse
      key={creator.id}
      title={creator.name}
      count={creator.games_count}
      items={creator.games}
      image={creator.image_background || creator.image || ""}
      extraimage={
        <Box display="flex" alignItems="center" gap={1}>
          {imageAvatar && (
            <Box
              sx={{
                width: { xs: 80, md: 105 },
                height: { xs: 80, md: 105 },
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: 16,
              }}
            >
              <LazyLoadImage
                src={imageAvatar}
                alt={title}
                effect="blur"
                width="100%"
                height="100%"
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            </Box>
          )}
        </Box>
      }
      extraContent={
        roles && (
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ fontSize: { xs: 9, md: 12 }, mb: 1 }}
          >
            {roles}
          </Typography>
        )
      }
    />
  );
};

export default CreatorCardWithRoles;
