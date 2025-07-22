import { useState } from "react";
import {
  Typography,
  Box,
  Tooltip,
  Collapse,
  Rating,
  CircularProgress,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LazyLoadGameImage from "../animationComponent/LazyLoadGameImage";
import { Link } from "react-router";
import TiltCard from "../animationComponent/TiltCard";
import PlatformIcons from "./renderingCard-Detail/PlatformIcons";
import StoreIcons from "./renderingCard-Detail/StoreIcons";
import DeveloperIcon from "./renderingCard-Detail/DeveloperIcon";
import EsrbRating from "./renderingCard-Detail/EsrbRating";
import Playtime from "./renderingCard-Detail/Playtime";
import GenreTags from "./renderingCard-Detail/GenreTags";
import MetacriticScore from "./renderingCard-Detail/MetacriticScore";
import ToggleFavorite from "../animationComponent/ToggleFavorite";
import { useQuery } from "@tanstack/react-query";
import { fetchGameDetails } from "../../api/games";

//icon
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function CardGame({ game }) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const [open, setOpen] = useState(false);
  const [openFromXs, setOpenFromXs] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isExpanded = isMobile ? openFromXs : open;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gameDetails", game.id],
    queryFn: () => fetchGameDetails(game.id),
    staleTime: 1000 * 60 * 60 * 6, // 6 ore
    cacheTime: 1000 * 60 * 60 * 24, // 24 ore
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: open || openFromXs, // solo se apri la card
  });

  const id = game.id || game.game_id;
  const slug = game.slug || game.game_slug || "default-slug";
  const name = game.name || game.game_name || "Unknown Game";
  const image = game.background_image || game.game_image || "";

  /*
  |-----------------------------------------------------
  | Methods
  |-----------------------------------------------------
 */

  /*
  |-----------------------------------------------------
  | Props Style
  |-----------------------------------------------------
  */

  const styleGenre = {
    color: "yellow",
    borderColor: "yellow",
    paddingX: 0.5,
  };
  const styleIconGenre = { color: "yellow" };
  const styleIconPlatform = { color: "yellow", marginRight: 4 };
  const styleStores = {
    textDecoration: "none",
    color: "lightblue",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      textDecoration: "underline",
      transform: "scale(1.2)",
    },
  };
  const stylePublisher = {
    color: "rgba(88,166,255)",
    borderColor: "rgba(88,166,255)",
    px: 0.5,
    m: 0.2,
  };
  const styleIconPublisher = { color: "rgba(88,166,255)" };

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <TiltCard
      sx={{
        width: "100%",
        zIndex: open ? 200 : 1,
        position: "relative",
      }}
      key={game.id}
      elevation={16}
      onClose={() => setOpenFromXs(false)}
    >
      <Box
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Box
          sx={{
            height: { xs: 150, sm: "15rem" },
            overflow: "hidden",
            position: "relative",
            borderRadius: open ? "0.2rem 0.2rem 0 0" : 1,
          }}
        >
          {isMobile ? (
            <Box
              onClick={() => {
                setOpenFromXs((prev) => !prev);
              }}
            >
              <LazyLoadGameImage image={image} />
            </Box>
          ) : (
            <Link to={`/games/${slug}/${id}`}>
              <LazyLoadGameImage image={image} />
            </Link>
          )}

          <Box
            sx={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: { xs: "flex-end", lg: "center" },
              gap: 0.5,
              backdropFilter: open ? "blur(1px)" : "blur(0px)",
              transition: "backdrop-filter 0.2s ease",
              padding: "0.1rem ",
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Box
                sx={{
                  zIndex: 1,
                  display: { xs: "block", lg: "none" },
                  filter: "drop-shadow(3px 3px 3px rgba(0,0,0))",
                  textShadow: "2px 1px 1px rgba(0,0,0)",
                }}
              >
                <Link to={`/games/${slug}/${id}`}>
                  <IconButton size="small" sx={{ color: "yellow" }}>
                    <RemoveRedEyeIcon size={15} />
                  </IconButton>
                </Link>
              </Box>

              {/* FavoriteButton */}
              <Box>
                <ToggleFavorite data={game} />
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", lg: "block" },
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(50px)",
                transition:
                  "opacity 0.1s ease-in-out, transform 0.1s ease-in-out",
              }}
            >
              <MetacriticScore score={game.metacritic} />
            </Box>
            <Box
              sx={{
                display: { xs: "none", lg: "block" },
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(60px)",
                transition:
                  "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
              }}
            >
              <EsrbRating rating={game.esrb_rating} />
            </Box>
            <Box
              sx={{
                display: { xs: "none", lg: "block" },
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(70px)",
                transition:
                  "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
              }}
            >
              <Playtime hours={game.playtime} />
            </Box>

            <Box
              sx={{
                zIndex: 1,
                display: { xs: "block", lg: "none" },
                filter: "drop-shadow(3px 3px 3px rgba(0,0,0))",
                textShadow: "2px 2px 10px rgba(0,0,0)",
                backdropFilter: "blur(100px)",
              }}
            >
              <IconButton
                onClick={() => setOpenFromXs((prev) => !prev)}
                size="small"
                sx={{
                  color: "yellow",
                  backdropFilter: "blur(100px)",
                  transition: "all 2s ease",
                }}
              >
                {openFromXs ? (
                  <RemoveCircleOutlineIcon
                    size={15}
                    sx={{ transition: "all 2s ease" }}
                  />
                ) : (
                  <AddCircleOutlineIcon
                    size={15}
                    sx={{ transition: "all 2s ease" }}
                  />
                )}
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: "0.5rem",
              left: "0.5rem",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              backdropFilter: "blur(1px)",

              padding: "0.1rem ",
              borderRadius: 2,
            }}
          >
            <Tooltip
              title={game.rating ? `${game.rating.toFixed(1)}/5` : "No rating"}
              aria-label="rating"
              placement="right-start"
            >
              <Box sx={{ display: "inline-block" }}>
                <Rating
                  name="read-only-rating"
                  size="small"
                  max={5}
                  precision={0.5}
                  readOnly
                  value={game.rating || 0}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    filter: "drop-shadow(2px 2px 3px rgba(0,0,0))",
                    color: "yellow",
                    "& .MuiRating-iconEmpty": {
                      color: "black",
                    },
                  }}
                />
              </Box>
            </Tooltip>
          </Box>

          <Box
            sx={{
              position: "absolute",
              width: "100%",
              zIndex: 1,
              bottom: "0rem",
              left: "0",
              borderRadius: 0,
            }}
          >
            <Box
              sx={{
                width: "100%",
                borderRadius: 0,
                padding: "0.2rem 0.5rem",
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0), rgb(0,0,0))",
              }}
            >
              <Link to={`/games/${slug}/${id}`}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    textDecoration: { xs: "underline", md: "none" },
                    overflow: "hidden",
                    whiteSpace: open || openFromXs ? "normal" : "nowrap",
                    textOverflow: "ellipsis",
                    display: "block",
                    textAlign: "center",
                    filter: "drop-shadow(1px 1px 1px rgba(0,0,0))",
                    transition: "all 0.3s ease-in-out",
                    mb: 0,
                    fontWeight: 900,
                    color: "rgba(88,166,255)",
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  }}
                >
                  {name}
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>

        <Collapse in={isExpanded}>
          <Box
            sx={{
              position: "absolute",
              top: "99.5%",
              left: 0,
              width: "100%",
              padding: "0.8rem",
              backgroundColor: "#000000",
              borderRadius: "0 0 0.2rem 0.2rem",
              color: "yellow",
              textAlign: "left",
              zIndex: 100,
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-10px)",
              pointerEvents: open ? "auto" : "none",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <Box
              sx={{
                mb: 1,
              }}
            >
              <StoreIcons stores={game.stores} styleStores={styleStores} />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <GenreTags
                genres={game.genres}
                styleGenre={styleGenre}
                styleIconGenre={styleIconGenre}
              />
            </Box>

            {/* publishers */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {isError && null}
              {isLoading && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress size={15} />
                </Box>
              )}
              {data?.publishers?.length > 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {data.publishers.map((pub) => (
                    <DeveloperIcon
                      key={pub.id}
                      name={pub.name}
                      type="Publisher"
                      stylePublisher={stylePublisher}
                      styleIconPublisher={styleIconPublisher}
                      showTooltip={true}
                    />
                  ))}
                </Box>
              ) : null}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", lg: "space-between" },
                flexDirection: { xs: "column", lg: "row" },
                alignItems: "center",
                mt: 1,
              }}
            >
              <PlatformIcons
                platforms={game.platforms}
                styleIconPlatform={styleIconPlatform}
              />
              <Typography
                variant="body2"
                gutterBottom
                sx={{
                  textAlign: "center",
                  mt: { xs: 1, lg: 0 },
                }}
              >
                <strong style={{ color: "rgba(88,166,255)" }}>
                  {game.released || "N/A"}
                </strong>{" "}
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </TiltCard>
  );
}

export default CardGame;
