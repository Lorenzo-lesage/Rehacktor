import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryIcon from "@mui/icons-material/Category";
import apiConfig from "../config/apiConfig";
import useFetch from "../hooks/useFetch.js";

function GenresDropdown() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */
  const { data, error, loading } = useFetch(apiConfig.endpoints.genres);

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "70vh",
          alignItems: "center",
        }}
      >
        {/* <CircularProgress /> */}
      </Box>
    );
  }
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Accordion
        sx={{ border: 0, boxShadow: 0, backgroundColor: "background.paper" }}
        elevation={0}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <CategoryIcon />
            Genres
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {error && <Alert severity="error">{error}</Alert>}
          <List>
            {data.results.map((genre) => (
              <ListItem
                key={genre.id}
                sx={{ paddingBottom: "0.5px", paddingTop: "0" }}
              >
                <Typography>{genre.name}</Typography>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default GenresDropdown;
