import { useState } from "react";
import {
  Typography,
  Box,
  Tooltip,
  Collapse,
  Rating,
  CircularProgress,
} from "@mui/material";
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
import useFetchSolution from "../../hooks/useFetchSolution";
import apiConfig from "../../config/apiConfig";

function CardGame({ game }) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { background_image: image } = game;
  const [open, setOpen] = useState(false);
  const { data, loading, error } = useFetchSolution(
    apiConfig.endpoints.gameDetails(game.id)
  );
  
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
        width: { xs: 150, sm: 290 },
        zIndex: open ? 200 : 1,
        position: "relative",
      }}
      key={game.id}
      elevation={16}
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
          <Link to={`/games/${game.slug}/${game.id}`}>
            <LazyLoadGameImage image={image} />
          </Link>

          <Box
            sx={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 0.5,
              backdropFilter: open ? "blur(1px)" : "blur(0px)",
              transition: "backdrop-filter 0.2s ease",
              padding: "0.1rem ",
              borderRadius: 2,
            }}
          >
            {/* FavoriteButton */}
            <ToggleFavorite data={game} />
            <Box
              sx={{
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
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(70px)",
                transition:
                  "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
              }}
            >
              <Playtime hours={game.playtime} />
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
                  "linear-gradient(to bottom, rgba(0,0,0,0), rgb(17,24,39))",
              }}
            >
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  overflow: "hidden",
                  whiteSpace: open ? "normal" : "nowrap",
                  textOverflow: "ellipsis",
                  display: "block",
                  textAlign: "center",
                  filter: "drop-shadow(1px 1px 1px rgba(0,0,0))",
                  transition: "all 0.3s ease-in-out",
                  mb: 0,
                  fontWeight: 900,
                  color: "rgba(88,166,255)",
                }}
              >
                {game.name}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Collapse in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "99.5%",
              left: 0,
              width: "100%",
              padding: "0.8rem",
              backgroundColor: "#111827",
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
              {error && null}
              {loading && (
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
                    />
                  ))}
                </Box>
              ) : null}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
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
