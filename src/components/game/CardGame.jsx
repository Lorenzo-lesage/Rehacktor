import { useState } from "react";
import {
  Card,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Collapse,
  Chip,
} from "@mui/material";
import LazyLoadGameImage from "../animationComponent/LazyLoadGameImage";
import { Link } from "react-router";
import InfoIcon from "@mui/icons-material/Info";
import ToggleFavorite from "../animationComponent/ToggleFavorite";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function CardGame({ game }) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { background_image: image } = game;
  const [open, setOpen] = useState(false);

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <Card sx={{ width: { xs: 150, sm: 290 } }} key={game.id} elevation={16}>
      <Box sx={{ height: { xs: 150, sm: '15rem' }, overflow: "hidden", position: "relative" }}>
        <LazyLoadGameImage image={image} />
        <Tooltip title="Click for Detail" placement="top">
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              zIndex: 1,
            }}
            component={Link}
            to={`/games/${game.slug}/${game.id}`}
          >
            <InfoIcon
              sx={{
                color: "yellow",
                filter: "drop-shadow(1px 2px 2px rgba(0,0,0))",
                ":hover": {
                  filter: "drop-shadow(1px 2px 5px rgba(0,0,0))",
                  transform: "scale(1.2) rotateY(720deg)",
                },
                transition: "all 0.3s ease-in-out",
              }}
            />
          </IconButton>
        </Tooltip>
        <Box
          sx={{
            position: "absolute",
            top: "0.5rem",
            left: "0.5rem",
          }}
        >
          <ToggleFavorite data={game} />
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
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Box
              sx={{
                padding: "0.3rem 0.2rem 0.2rem 0.3rem",
                borderRadius: "0.5rem 0 0 0",
              }}
            >
              <IconButton size="small" onClick={() => setOpen((prev) => !prev)}>
                {open ? (
                  <ArrowDropUpIcon sx={{ color: "yellow" }} />
                ) : (
                  <AddCircleOutlineIcon
                    sx={{
                      color: "yellow",
                      filter: "drop-shadow(2px 3px 4px rgba(0,0,0))",
                      transition: "all 0.2s ease-in-out",
                      ":hover": {
                        transform: "scale(1.2)",
                      },
                    }}
                  />
                )}
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              borderRadius: 0,
              padding: "0.2rem 0.5rem",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.9))",
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
            padding: "0.8rem",
            backgroundColor: "rgba(0, 0, 0)",
            color: "yellow",
            textAlign: "left",
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
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="body2">
              <strong style={{ color: "rgba(88,166,255)" }}>
                {game.rating != null ? game.rating.toFixed(1) : "N/A"}/5
              </strong>
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong style={{ color: "rgba(88,166,255)" }}>
                {game.released || "N/A"}
              </strong>{" "}
            </Typography>
          </Box>
        </Box>
      </Collapse>
    </Card>
  );
}

export default CardGame;
