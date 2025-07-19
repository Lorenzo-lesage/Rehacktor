import {
  AppBar,
  Toolbar,
  Box,
  Skeleton,
  CssBaseline,
  Divider,
  useMediaQuery,
} from "@mui/material";
import HideOnScroll from "../animationComponent/HideOnScroll";
import { useTheme } from "@mui/material/styles";

function HeaderSkeleton(props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
            flexWrap: "wrap",
            backgroundColor: "transparent",
            backdropFilter: "blur(0.5rem)",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* Logo Skeleton */}
            <Skeleton
              variant="rectangular"
              sx={{
                width: 65,
                height: 65,
                borderRadius: "10%",
              }}
            />

            <Box display="flex" alignItems="center" gap={2}>
              {/* Search Bar Skeleton */}
              {!isSmallScreen && (
                <Box sx={{ width: 250 }}>
                  <Skeleton variant="rounded" height={36} width="100%" />
                </Box>
              )}

              {/* Sign In Button Skeleton (if not logged in) */}
              {!isSmallScreen && (
                <Skeleton
                  variant="rounded"
                  height={36}
                  width={80}
                  sx={{ borderRadius: 20 }}
                />
              )}

              <Divider orientation="vertical" flexItem />

              {/* Theme Toggle Skeleton */}
              <Skeleton variant="circular" width={32} height={32} />

              {/* Mobile Drawer Skeleton (Hamburger icon) */}
              {isSmallScreen && (
                <Skeleton variant="circular" width={36} height={36} />
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
}

export default HeaderSkeleton;
