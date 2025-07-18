import { Box, Typography, Grid, CircularProgress } from "@mui/material";
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
        padding: { xs: 1, md: 4 },
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
        spacing={2}
        justifyContent="center"
      >
        {data?.results?.map((game) => (
          <Grid key={game.id} size={{ xs: 2, md: 3 }}>
            <CardGame game={game} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <PaginationMui
          currentPage={currentPage}
          setPage={setCurrentPage}
          lastPage={lastPage}
        />
      </Box>
    </Box>
  );
}

export default LayoutGamesList;
