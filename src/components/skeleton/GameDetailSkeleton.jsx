import { Box, Container, Grid, Paper, Skeleton, Stack } from "@mui/material";

function GameDetailSkeleton() {
  return (
    <Box sx={{ mt: 2 }}>
      <Container>
        <Paper sx={{ p: 0, backgroundColor: "transparent" }} elevation={0}>
          <Stack spacing={3}>
            {/* Header row */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                gap: 2,
                mt: 2,
              }}
            >
              <Skeleton variant="rounded" width={150} height={32} />
              <Skeleton variant="rounded" width={120} height={32} />
              <Skeleton variant="rounded" width={100} height={32} />
              <Skeleton variant="circular" width={32} height={32} />
            </Box>

            {/* Title mobile */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Skeleton variant="text" width="70%" height={40} />
              <Skeleton variant="text" width="40%" height={20} />
            </Box>

            {/* Main content */}
            <Grid
              container
              spacing={1}
              sx={{
                mt: 2,
                flexDirection: { xs: "column-reverse", md: "row" },
                alignItems: { xs: "end", md: "flex-start" },
              }}
            >
              {/* Left - text */}
              <Grid size={{ xs: 12, md: 7, lg: 8 }}>
                <Skeleton variant="text" width="80%" height={40} />
                <Skeleton
                  variant="text"
                  width="50%"
                  height={20}
                  sx={{ mb: 2 }}
                />
                <Skeleton variant="rectangular" width="100%" height={150} />
              </Grid>

              {/* Right - images + trailers */}
              <Grid size={{ xs: 12, md: 5, lg: 4 }}>
                <Stack spacing={2}>
                  {/* Image block */}
                  <Skeleton variant="rectangular" width="100%" height={200} />
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Skeleton variant="rectangular" width="50%" height={70} />
                    <Skeleton variant="rectangular" width="50%" height={70} />
                  </Box>

                  {/* Trailer block */}
                  <Skeleton variant="rectangular" width="100%" height={150} />
                </Stack>
              </Grid>
            </Grid>

            {/* Stats row */}
            <Box
              sx={{
                width: "100%",
                display: { xs: "block", md: "flex" },
                gap: 1,
                justifyContent: "space-between",
              }}
            >
              <Skeleton variant="rectangular" width="40%" height={80} />
              <Stack spacing={1} sx={{ width: "55%" }}>
                {[...Array(5)].map((_, i) => (
                  <Skeleton
                    key={i}
                    v
                    ariant="rectangular"
                    width="100%"
                    height={40}
                  />
                ))}
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default GameDetailSkeleton;