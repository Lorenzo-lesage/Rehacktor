import {
  AppBar,
  Toolbar,
  Box,
  Skeleton,
  CssBaseline,
  Divider,
} from "@mui/material";
import HideOnScroll from "../animationComponent/HideOnScroll";

function HeaderSkeleton(props) {
  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          position="fixed"
          color="default"
          elevation={0}
          sx={{
            display: "flex",
            backgroundColor: "transparent",
            backdropFilter: "blur(0.5rem)",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* Title Skeleton */}
            <Skeleton variant="text" width={120} height={30} />

            <Box display="flex" alignItems="center" gap={2}>
              {/* Search bar skeleton */}
              <Box sx={{ display: { xs: "none", md: "flex" }, width: {xs: "100%", sm: 500} }}>
                <Skeleton variant="rounded" height={36} width="100%" />
              </Box>

              <Divider orientation="vertical" flexItem />

              {/* Theme toggle skeleton */}
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Skeleton variant="circular" width={32} height={32} />
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
}

export default HeaderSkeleton;
