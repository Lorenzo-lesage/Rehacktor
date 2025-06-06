import { useState } from "react";
import {
  Card,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Collapse,
  Chip,
  Rating,
} from "@mui/material";
import LazyLoadGameImage from "../animationComponent/LazyLoadGameImage";
import { Link } from "react-router";
import TiltCard from "../animationComponent/TiltCard";
import InfoIcon from "@mui/icons-material/Info";
import ToggleFavorite from "../animationComponent/ToggleFavorite";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { FaXbox } from "react-icons/fa";

function CardGame({ game }) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { background_image: image } = game;
  const [open, setOpen] = useState(false);
  const platformIcons = {
    Xbox: FaXbox,
    "Xbox One": FaXbox,
    // ...
  };

  console.log(game.platforms);

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
          }}
        >
          <LazyLoadGameImage image={image} />
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
            }}
          >
            {/* FavoriteButton */}
            <ToggleFavorite data={game} />
            {/* InfoButton */}
            <Tooltip title="Go to Detail" placement="left">
              <IconButton
                size="small"
                component={Link}
                to={`/games/${game.slug}/${game.id}`}
              >
                <InfoIcon
                  sx={{
                    color: "yellow",
                    filter: "drop-shadow(1px 2px 2px rgba(0,0,0))",
                    ":hover": {
                      filter: "drop-shadow(1px 2px 5px rgba(0,0,0))",
                      transform: "scale(1.2) rotateX(-720deg)",
                    },
                    transition: "all 0.3s ease-in-out",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: "0.5rem",
              left: "0.5rem",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(88,166,255, 0.5)",
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
                  whiteSpace: "nowrap",
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
              top: "99%",
              left: 0,
              width: "100%",
              padding: "0.8rem",
              backgroundColor: "#111827",
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
                display: "flex",
                gap: 0.5,
                flexWrap: "wrap",
                mt: 1,
                justifyContent: "center",
              }}
            >
              {game.genres?.map((genre) => (
                <Chip
                  key={genre.id || genre.name}
                  label={genre.name}
                  size="small"
                  variant="outlined"
                  sx={{
                    color: "yellow",
                    borderColor: "yellow",
                  }}
                  clickable
                  component={Link}
                  to={`/games/${genre.slug}`}
                />
              ))}
            </Box>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ mt: 1, textAlign: "center" }}
            >
              <strong style={{ color: "rgba(88,166,255)" }}>
                {game.released || "N/A"}
              </strong>{" "}
            </Typography>
            <Box>
              {game.platforms?.map((platformWrapper) => {
                const platform = platformWrapper.platform; // estrai platform dall'oggetto wrapper
                const Icon = platformIcons[platform.name];
                return Icon ? (
                  <Tooltip
                    key={platform.id || platform.name}
                    title={platform.name}
                    placement="top"
                  >
                    <Icon fontSize="large" style={{ color: "yellow" }} />
                  </Tooltip>
                ) : null;
              })}
            </Box>
          </Box>
        </Collapse>
      </Box>
    </TiltCard>
  );
}

export default CardGame;
