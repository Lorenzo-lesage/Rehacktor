import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";

function SkeletonGenreCard() {
  return (
    <Box
      sx={{
        height: 240,
        borderRadius: 3,
        boxShadow: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Immagine Skeleton */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        animation="wave"
        sx={{ position: "absolute", inset: 0 }}
      />

      {/* Gradient overlay (simulato con Box semitrasparente) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
          pointerEvents: "none",
        }}
      />

      {/* Contenuto skeleton: icona + testo */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 1,
          padding: 2,
          height: "100%",
          justifyContent: "flex-end",
          flexDirection: "column",
        }}
      >
        {/* Skeleton icona */}
        <Skeleton variant="circular" width={24} height={24} sx={{ mb: 1 }} />

        {/* Skeleton testo */}
        <Skeleton variant="text" width="60%" height={28} />
      </Box>
    </Box>
  );
}

export default SkeletonGenreCard;
