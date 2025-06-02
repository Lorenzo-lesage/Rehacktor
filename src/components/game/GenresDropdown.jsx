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
import apiConfig from "../../config/apiConfig.js";
import useFetchSolution from "../../hooks/useFetchSolution.js";
import { Link } from "react-router";

function GenresDropdown() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const initialUrl = apiConfig.endpoints.genres;
  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  if (loading) {
    return (
      <Box
        sx={{
          mt: 5,
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
        sx={{ border: 0, boxShadow: 0, backgroundColor: "transparent" }}
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
            {data?.results?.map((genre) => (
              <ListItem
                key={genre.id}
                sx={{ paddingBottom: "0.1rem", paddingTop: "0" }}
              >
                <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default GenresDropdown;
