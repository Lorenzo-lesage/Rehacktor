import {
  AppBar,
  Toolbar,
  Box,
  Skeleton,
  CssBaseline,
  Divider,
  IconButton,
} from "@mui/material";
import HideOnScroll from "../animationComponent/HideOnScroll";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

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
              <Box sx={{ display: { xs: "none", md: "flex" }, width: 200 }}>
                <Skeleton variant="rounded" height={36} width="100%" />
              </Box>

              {/* Services button */}
              <Skeleton variant="rounded" height={36} width={90} />

              {/* Avatar skeleton + button */}
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="text" width={60} />

              {/* Sign in or profile text skeleton */}
              <Skeleton variant="rounded" height={36} width={80} />

              <Divider orientation="vertical" flexItem />

              {/* Theme toggle skeleton */}
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Skeleton variant="circular" width={32} height={32} />
              </Box>

              {/* Settings icon */}
              <IconButton size="small" sx={{ borderRadius: 3 }}>
                <SettingsOutlinedIcon fontSize="small" color="disabled" />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
}

export default HeaderSkeleton;
