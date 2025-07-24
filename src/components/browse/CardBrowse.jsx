import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CardBrowse = ({
  title,
  count,
  items = [],
  image,
  icon: Icon,
  extraContent,
  extraimage,
}) => (
  <Box sx={{ overflow: "hidden", borderRadius: 3 }}>
    <Card
      elevation={2}
      sx={{
        height: 300,
        borderRadius: 3,
        boxShadow: 3,
        position: "relative",
        transition: "transform 0.2s ease-in-out",
        ":hover": { transform: "scale(1.07)" },
      }}
    >
      <CardActionArea sx={{ height: "100%", cursor: "default" }}>
        <Box sx={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <LazyLoadImage
            src={image || "https://via.placeholder.com/400x200?text=No+Image"}
            alt={`${title} background`}
            effect="blur"
            width="100%"
            height="100%"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
          {/* Gradient Overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
            }}
          />
        </Box>

        <CardContent
          sx={{
            position: "relative",
            zIndex: 2,
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            height: "100%",
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                fontSize: { xs: 14, md: 20 },
                display: "flex",
                alignItems: "center",
              }}
            >
              {Icon && <Icon />}
            </Box>
            <Box display="flex" flexDirection="column" width={"100%"}>
              {extraimage && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  {extraimage}
                </Box>
              )}
              <Typography
                variant="h6"
                fontWeight="bold"
                fontSize={{ xs: 15, md: 20 }}
              >
                {title}
              </Typography>
              {extraContent && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {extraContent}
                </Box>
              )}
            </Box>
          </Box>
          <Box padding={{ xs: 0, md: 1 }}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" fontSize={{ xs: 10, md: 12 }}>
                Popular Items
              </Typography>
              <Typography variant="body2" fontSize={{ xs: 10, md: 12 }}>
                {count.toLocaleString()}{" "}
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box>
              {items.slice(0, 3).map((game) => (
                <Typography
                  variant="body2"
                  key={game.id}
                  color="text.secondary"
                  fontSize={{ xs: 10, md: 12 }}
                >
                  {game.name}
                </Typography>
              ))}
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  </Box>
);

export default CardBrowse;
