import { Box, Skeleton, Divider } from "@mui/material";

function SideBarSkeleton({ navbarHidden, open }) {
  const headerHeight = 64;
  const marginTop = navbarHidden ? 0 : headerHeight;

  return (
    <Box
      sx={{
        marginTop: { md: 0, lg: `${marginTop}px` },
        height: { xs: "100vh", lg: `calc(100vh - ${marginTop}px)` },
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
        padding: "0 0.5rem 1rem 0.5rem",
        backgroundColor: open ? "background.sidebar" : "transparent",
        borderRadius: { xs: 0, xl: "0 0.3rem 0.3rem 0" },
      }}
    >
      {/* User + Avatar */}
      <Box sx={{ mb: 2, px: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <Skeleton variant="circular" width={40} height={40} />
        {open && <Skeleton variant="text" width="60%" height={30} />}
      </Box>

      {/* Profile + Whishlist + Logout */}
      {[...Array(3)].map((_, i) => (
        <Skeleton
          key={`profile-${i}`}
          variant="rounded"
          height={36}
          sx={{ mb: 1.2, mx: 1.2, borderRadius: 2 }}
        />
      ))}

      <Divider sx={{ mb: 2 }} />

      {/* Sections: New Releases, Top, Games, Browse */}
      {[...Array(4)].map((_, sectionIndex) => (
        <Box key={sectionIndex} sx={{ mb: 2 }}>
          <Skeleton
            variant="text"
            width={open ? "40%" : "30%"}
            sx={{ mb: 1.5, mx: 2 }}
          />
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={`item-${sectionIndex}-${i}`}
              variant="rounded"
              height={36}
              sx={{ mb: 1.2, mx: 1.2, borderRadius: 2 }}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default SideBarSkeleton;
