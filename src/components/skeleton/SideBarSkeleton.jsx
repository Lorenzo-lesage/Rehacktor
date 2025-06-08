import { Box, Skeleton } from "@mui/material";

function SideBarSkeleton({ navbarHidden }) {
  const headerHeight = 64;
  const marginTop = navbarHidden ? 0 : headerHeight;

  return (
    <Box
      component="aside"
      sx={{
        width: 240,
        display: { xs: "none", sm: "block" },
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "transparent",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            marginTop: `${marginTop}px`,
            height: `calc(100vh - ${marginTop}px)`,
            transition: "margin-top 0.3s ease",
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            padding: "0 0.5rem 1rem 0.5rem",
          }}
        >
          {/* Simulazione delle voci di generi */}
          {[...Array(10)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              height={32}
              sx={{ mb: 1, borderRadius: 1 }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default SideBarSkeleton;
