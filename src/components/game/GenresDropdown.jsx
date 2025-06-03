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
  Divider,
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
        sx={{
          border: 0,
          backgroundColor: "transparent",
        }}
        elevation={0}
        
      >
        <AccordionSummary
          sx={{
            ":hover": { backgroundColor: "background.paper" },
            borderRadius: 1,
            transition: "all 0.2s ease-in-out",
          }}
          expandIcon={<ExpandMoreIcon sx={{ color: "text.primary" }} fontSize="small" />}
        >
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <CategoryIcon fontSize="small" />
            Genres
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {error && <Alert severity="error">{error}</Alert>}
          <List sx={{ p: 0 }}>
            {data?.results?.map((genre) => (
              <Box key={genre.id}>
                <ListItem
                  component={Link}
                  to={`/games/${genre.slug}`}
                  sx={{
                    ":hover": { backgroundColor: "background.paper" },
                    borderRadius: 1,
                    transition: "all 0.2s ease-in-out",
                    py: 0.5,
                    color: "text.primary",
                    textDecoration: "none",
                  }}
                >
                  {genre.name}
                </ListItem>
                <Divider component="li" />
              </Box>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default GenresDropdown;
