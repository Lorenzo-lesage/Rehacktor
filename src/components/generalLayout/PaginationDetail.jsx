import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function PaginationDetail({ setPagination, currentPage, lastPage }) {
    /*
    |---------------------------------------------------------------------
    | Methods
    |---------------------------------------------------------------------
    */

    /**
     * Bottone per andare alla pagina precedente
     */
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setPagination(currentPage - 1);
        }
    };

    /**
     * Bottone per andare alla pagina successiva
     */
    const handleNextPage = () => {
        if (currentPage < lastPage) {
            setPagination(currentPage + 1);
        }
    };

    /*
    |---------------------------------------------------------------------
    | Return
    |---------------------------------------------------------------------
    */

    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "50%",
            }}
        >
            <Button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                variant="outlined"
            >
                <ArrowBackIcon /> Previous
            </Button>
            <Box>
                <Typography variant="h5">Page {currentPage}</Typography>
            </Box>
            <Button
                onClick={handleNextPage}
                disabled={currentPage >= lastPage}
                variant="outlined"
            >
                Next
                <ArrowForwardIcon />
            </Button>
        </Box>
    );
}

export default PaginationDetail;
