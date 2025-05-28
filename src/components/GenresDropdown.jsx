import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryIcon from "@mui/icons-material/Category";

function GenresDropdown() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const api_key = "169792d0d9d043a69b438aadb36ad49e";
  const initialUrl = `https://api.rawg.io/api/genres?key=${api_key}`;

  /*
  |-----------------------------------------------------
  | Methods
  |-----------------------------------------------------
  */

  const load = async () => {
    try {
      const response = await fetch(initialUrl);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setGenres(json.results);
    } catch (error) {
      setError(error.message); // ✅ salva anche l'errore
      console.log(error);
    }
  };

  /*
  |-----------------------------------------------------
  | Hook
  |-----------------------------------------------------
  */

  useEffect(() => {
    load();
  }, []);

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <>
      <Accordion sx={{ border: 0, boxShadow: 0, backgroundColor: "background.paper" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
          <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CategoryIcon />
            Genres
          </Typography>
        </AccordionSummary>
        <AccordionDetails >
          {error && <Alert severity="error">{error}</Alert>}
          <List>
            {genres.map((genre) => (
              <ListItem key={genre.id} sx={{ paddingBottom: '0.5px', paddingTop: '0' }}>
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
