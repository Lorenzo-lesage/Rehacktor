import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

function ErrorPage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const navigate = useNavigate();

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h1" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Ops... pagina non trovata
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        La pagina che stai cercando non esiste o è stata spostata.
      </Typography>

      <Button variant="outlined" size="small" onClick={() => navigate("/")}>
        Torna alla Home
      </Button>
    </Box>
  );
}

export default ErrorPage;
