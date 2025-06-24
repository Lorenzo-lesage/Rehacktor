import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import CardGame from "./CardGame.jsx";
import PaginationMui from "../generalLayout/Pagination";

function LayoutGamesList({
  data,
  loading,
  error,
  title,
  titleStyles = {},
  currentPage,
  setCurrentPage,
  lastPage,
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
    <Box sx={{ paddingTop: "2rem" }}>
      <Typography variant="h3" gutterBottom sx={titleStyles}>
        {title}
      </Typography>

      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        spacing={1}
        justifyContent="center"
      >
        {data?.results?.map((game) => (
          <Grid key={game.id}>
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
