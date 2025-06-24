import { Pagination, Box } from "@mui/material";

function PaginationMui({ currentPage, setPage, lastPage }) {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginY: 4,
      }}
    >
      <Pagination
        count={lastPage}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        shape="rounded"
        size="large"
        siblingCount={1}
        boundaryCount={1}
      />
    </Box>
  );
}

export default PaginationMui;
