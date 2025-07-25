import { Pagination, Box, IconButton, useMediaQuery } from "@mui/material";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";

function PaginationMui({ currentPage, setPage, lastPage, disabled }) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------  
  */

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  /*
  |-----------------------------------------------------
  | Hooks
  |-----------------------------------------------------
  */

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  /*
  |-----------------------------------------------------
  | Methods
  |-----------------------------------------------------
  */

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
        gap: 1,
        maxWidth: "100%",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <IconButton
        onClick={handleJumpBack}
        disabled={currentPage <= 10 || disabled}
        size="small"
        sx={{
          border: "0.5px solid gray",
          borderRadius: 1,
        }}
      >
        <KeyboardDoubleArrowLeft fontSize="small" />
      </IconButton>

      <Pagination
        disabled={disabled}
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
        disabled={currentPage + 10 > lastPage || disabled}
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
