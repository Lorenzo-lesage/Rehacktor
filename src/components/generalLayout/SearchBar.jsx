import { useState } from "react";
import { useNavigate } from "react-router";
import { InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


function SearchBar() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [ariaInvalid, setAriaInvalid] = useState(null);

  /*
  |-----------------------------------------------------
  | Methods
  |-----------------------------------------------------
  */

  const handleSearch = (event) => {
    event.preventDefault();
    if (typeof search === "string" && search.trim().length !== 0) {
      navigate(`/search?query=${search}`);
      setSearch("");
    } else {
      setAriaInvalid(true);
    }
  };

  return (
    <>
      <Paper
        component="form"
        onSubmit={handleSearch}
        sx={{
          p: "0 0.5rem",
          display: "flex",
          alignItems: "center",
          width: { xs: '100%', sm: 200 },
          height: 35,
          borderRadius: 5,
          backgroundColor: "background.secondary",
        }}
      >
        <InputBase
          type="text"
          name="search"
          value={search}
          sx={{ ml: 1, flex: 1 }}
          placeholder={
            ariaInvalid ? "Please enter a valid search term" : "Search"
          }
          inputProps={{ "aria-label": "search google maps" }}
          aria-invalid={ariaInvalid}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
}

export default SearchBar;
