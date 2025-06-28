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
      }}
    >
      <Box sx={{ display: { xs: "block", md: "flex" }, alignItems: "center", justifyContent: "space-between", width: "90%", mb: 2 }}>
        <Typography variant="h3" gutterBottom sx={titleStyles}>
          {title}
        </Typography>

        {availableOrderings.length > 0 && ordering && setOrdering && (
          <Box sx={{ mb: 2, width: "100%", maxWidth: 300 }}>
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
