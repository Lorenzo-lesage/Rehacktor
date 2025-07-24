import React from "react";
import {
  Box,
  Skeleton,
} from "@mui/material";

function SkeletonGameCard() {

  return (
    <Box
      sx={{
        display: "block",
        width: "100%",
        height: { xs: 150, sm: "15rem" },
        overflow: "hidden",
        position: "relative",
        borderRadius: 1,
      }}
    >
      {/* Image Skeleton */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        animation="wave"
      />

      {/* Top right actions */}
      <Box
        sx={{
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "flex-end", lg: "center" },
          gap: 0.5,
        }}
      >
        {/* IconButton Skeletons */}
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
        </Box>

        {["0.1s", "0.3s", "0.5s"].map((delay, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width={40}
            height={20}
            sx={{
              display: { xs: "none", lg: "block" },
              opacity: open ? 1 : 0,
              transform: open ? "translateX(0)" : `translateX(${20 + index * 10}px)`,
              transition: `opacity 0.3s ease ${delay}, transform 0.3s ease ${delay}`,
              borderRadius: 1,
            }}
          />
        ))}
      </Box>

      {/* Top left rating */}
      <Box
        sx={{
          position: "absolute",
          top: "0.5rem",
          left: "0.5rem",
          zIndex: 1,
        }}
      >
        <Skeleton variant="rounded" width={80} height={24} />
      </Box>

      {/* Bottom title */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          bottom: "0rem",
          left: 0,
          borderRadius: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0), rgb(0,0,0))",
          padding: "0.2rem 0.5rem",
        }}
      >
        <Skeleton
          variant="text"
          width="80%"
          sx={{
            mx: "auto",
            height: "1.2rem",
            fontSize: { xs: "0.8rem", md: "1rem" },
          }}
        />
      </Box>
    </Box>
  );
}

export default SkeletonGameCard;
