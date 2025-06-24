import { Pagination, Box, IconButton } from "@mui/material";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";

function PaginationMui({ currentPage, setPage, lastPage }) {
  /*
  |-----------------------------------------------------
  | Data
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
        marginY: 4,
        flexWrap: "wrap",
      }}
    >
      <IconButton
        onClick={handleJumpBack}
        disabled={currentPage <= 10}
        size="small"
        sx={{ border: "0.5px solid gray", borderRadius: 1 }}
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
        siblingCount={1}
        boundaryCount={1}
      />

      <IconButton
        onClick={handleJumpForward}
        disabled={currentPage + 10 > lastPage}
        size="small"
        sx={{ border: "0.5px solid gray", borderRadius: 1 }}
      >
        <KeyboardDoubleArrowRight fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default PaginationMui;
