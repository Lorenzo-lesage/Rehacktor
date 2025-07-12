import { Pagination, Box, IconButton, useMediaQuery } from "@mui/material";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

function PaginationMui({ currentPage, setPage, lastPage }) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------  
  */

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); 

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleJumpBack = () => {
    setPage((prev) => Math.max(prev - 10, 1));
  };

  const handleJumpForward = () => {
    setPage((prev) => Math.min(prev + 10, lastPage));
  };

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginY: 4,
        gap: 1,
        maxWidth: "100%",
        overflow: "hidden", 
        whiteSpace: "nowrap",
      }}
    >
      <IconButton
        onClick={handleJumpBack}
        disabled={currentPage <= 10}
        size="small"
        sx={{
          border: "0.5px solid gray",
          borderRadius: 1,
        }}
      >
        <KeyboardDoubleArrowLeft fontSize="small" />
      </IconButton>

      <Pagination
        count={lastPage}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        shape="rounded"
        variant="outlined"
        size="small"
        siblingCount={isSmallScreen ? 0 : 1}
        boundaryCount={isSmallScreen ? 1 : 1}
        sx={{
          ".MuiPagination-ul": {
            flexWrap: "nowrap", 
          },
        }}
      />

      <IconButton
        onClick={handleJumpForward}
        disabled={currentPage + 10 > lastPage}
        size="small"
        sx={{
          border: "0.5px solid gray",
          borderRadius: 1,
        }}
      >
        <KeyboardDoubleArrowRight fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default PaginationMui;
