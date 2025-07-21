import { Box, Typography, Grid, CircularProgress, Fade } from "@mui/material";
import { motion } from "framer-motion";
import CardGame from "./CardGame.jsx";
import PaginationMui from "../generalLayout/Pagination";
import GameOrderingSelect from "./GameOrderingSelect.jsx";

function LayoutGamesList({
  data,
  loading,
  error,
  title,
  titleStyles = {},
  currentPage,
  setCurrentPage,
  lastPage,
  ordering,
  setOrdering,
  availableOrderings = [],
}) {
  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  if (loading) {
    return (
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
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="error">
          Error: {error.message || error.toString()}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        paddingTop: 4,
        paddingBottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "space-between" },
          flexDirection: { xs: "column", md: "row" },
          width: "90%",
          my: 2,
        }}
      >
        <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
          <Typography variant="h4" sx={titleStyles}>
            {title}
          </Typography>

          {data?.count > 0 && (
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontStyle: "italic",
                }}
              >
                {data.count} Games available
              </Typography>
            </Box>
          )}
        </Box>

        {availableOrderings.length > 0 && ordering && setOrdering && (
          <Box sx={{ mb: 2, width: "100%", maxWidth: { xs: "100%", md: 200 } }}>
            <GameOrderingSelect
              ordering={ordering}
              setOrdering={setOrdering}
              options={availableOrderings}
            />
          </Box>
        )}
      </Box>

      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        spacing={1}
        display={"flex"}
        justifyContent="center"
      >
        {data?.results?.map((game, index) => {
          const fromLeft = index % 2 === 0;

          return (
            <Grid
              key={game.id}
              size={{ xs: 2, sm: 3.3, md: 3.5, lg: 3, xl: 2.6 }}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  x: fromLeft ? -50 : 50,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(index, 10) * 0.15,
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CardGame game={game} />
              </motion.div>
            </Grid>
          );
        })}
      </Grid>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
          marginBottom: "5rem",
        }}
      >
        <PaginationMui
          currentPage={currentPage}
          setPage={setCurrentPage}
          lastPage={lastPage}
        />
      </Box>

      {/* EndPage */}
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Box
          sx={{
            width: { xs: "100%", lg: "90%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 4,
            px: { xs: 2, lg: 0 },
            backgroundColor: "background.paper",
            color: "text.primary",
            borderRadius: "0.5rem 0.5rem 0 0",
            borderTop: { xs: "1px solid", lg: "3px solid" },
            borderLeft: { xs: "1px solid", lg: "3px solid" },
            borderRight: { xs: "1px solid", lg: "3px solid" },
            borderBottom: "none",
          }}
        >
          <Box
            sx={{
              backgroundColor: "background.icon",
              p: 2,
              borderRadius: 2,
              mb: 2,
              width: "fit-content",
            }}
          >
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              Enjoy your gaming experience with our platform!
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: "background.iconHover",
              p: 2,
              borderRadius: 2,
              mb: 2,
              width: "fit-content",
            }}
          >
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              Discover the best games on our platform and have fun!
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: "background.icon",
              p: 2,
              borderRadius: 2,
              mb: 2,
              width: "fit-content",
              display: "flex",
            }}
          >
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              Join our community and share your favorite games with others!
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default LayoutGamesList;
