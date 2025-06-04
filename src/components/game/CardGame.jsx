import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import LazyLoadGameImage from "../animationComponent/LazyLoadGameImage";
import { Link } from "react-router";
import InfoIcon from "@mui/icons-material/Info";
import ToggleFavorite from "../animationComponent/ToggleFavorite";

function CardGame({ game }) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const genres = game.genres.map((genre) => genre.name).join(", ");
  const { background_image: image } = game;

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <Card sx={{ width: { xs: 250, sm: 290 } }} key={game.id} elevation={16}>
      <Box sx={{ height: "20rem", overflow: "hidden", position: "relative" }}>
        <LazyLoadGameImage image={image} />
        <Tooltip title="Go to Detail" placement="top">
          <IconButton
            variant="outlined"
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
              fontSize="large"
              sx={{
                color: "white",
                filter: "drop-shadow(1px 2px 2px rgba(0,0,0))",
                ":hover": {
                  filter: "drop-shadow(1px 2px 5px rgba(0,0,0))",
                  transform: "scale(1.2) rotate(720deg)",
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
            olor: "white",
            filter: "drop-shadow(2px 3px 4px rgba(0,0,0))",
            ":hover": {
              filter: "drop-shadow(1px 2px 3px rgba(0,0,0))",
              transform: "scale(1.2) rotate(720deg)",
            },
            transition: "all 0.3s ease-in-out",
          }}
        >
          <ToggleFavorite data={game} />
        </Box>
        <Box sx={{ backdropFilter: "blur(5px)", position: "absolute", width: "100%", zIndex: 1, bottom: "0rem", left: "0", borderRadius: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '0.2rem 0.5rem' }}>
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
              mb: 0
            }}
          >
            {game.name}
          </Typography>
        </Box>
      </Box>

      {/* <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "7.4rem",
          textAlign: "center",
          px: 1,
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
          }}
        >
          {game.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              display: "block",
            }}
          >
            {genres}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Release date: {game.released || "N/A"}
          </Typography>
        </Box>
      </CardContent> */}
    </Card>
  );
}

export default CardGame;
