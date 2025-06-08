import { Box, Skeleton, CircularProgress } from "@mui/material";
import HeaderSkeleton from "./HeaderSkeleton";
import SideBarSkeleton from "./SideBarSkeleton";
import { useBackground } from "../../hooks/useBackground.js";

function LayoutSkeleton() {
  const { backgroundImage } = useBackground() ?? {};

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box
        sx={(theme) => ({
          backgroundImage: backgroundImage
            ? `linear-gradient(${theme.palette.background.default}cc 60%, ${theme.palette.background.default}), url(${backgroundImage})`
            : `linear-gradient(${theme.palette.background.default}cc, ${theme.palette.background.default}), url('../../giochi.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        })}
      >
        {/* Header Skeleton */}
        <HeaderSkeleton />

        {/* Main: Sidebar + Content */}
        <Box display="flex" flex={1}>
          {/* Sidebar Skeleton */}
          <SideBarSkeleton />

          {/* Content Skeleton */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              padding: 2,
              mt: 8,
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          </Box>
        </Box>

        {/* Footer Skeleton */}
        <Box
          sx={{
            height: 64,
            px: 2,
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Skeleton variant="text" width={100} />
        </Box>
      </Box>
    </Box>
  );
}

export default LayoutSkeleton;
