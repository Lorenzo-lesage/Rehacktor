import { useState } from "react";
import { useNavigate } from "react-router";
import { InputBase, IconButton, Paper, Box } from "@mui/material";
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
      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", md: 500 },
          height: 35,
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Fake placeholder scrolling */}
        {ariaInvalid && !search && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 12,
              height: "100%",
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: "calc(100% - 35px)",
              pointerEvents: "none",
              color: "text.disabled",
              fontSize: "0.875rem",
            }}
          >
            <Box
              sx={{
                display: "inline-block",
                animation: "marqueeBounce 6s ease-in-out infinite",
              }}
            >
              Please enter a valid search term
            </Box>
          </Box>
        )}

        <Paper
          component="form"
          onSubmit={handleSearch}
          elevation={0}
          sx={{
            p: "0 0.5rem",
            display: "flex",
            alignItems: "center",
            height: 35,
            borderRadius: 2,
            backgroundColor: "background.accent",
            width: "100%",
          }}
        >
          <InputBase
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              ml: 1,
              flex: 1,
              "& input:-webkit-autofill": {
                boxShadow: "0 0 0px 1000px background.secondary inset",
                WebkitTextFillColor: (theme) => theme.palette.text.primary,
                transition: "background-color 5000s ease-in-out 0s",
                color: "text.primary"
              },
            }}
            placeholder={ariaInvalid ? "" : "Search"}
            inputProps={{ "aria-label": "search input" }}
            aria-invalid={ariaInvalid}
          />
          <IconButton
            type="submit"
            sx={{ p: "10px" }}
            aria-label="search"
            disabled={search.trim() === ""}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </>
  );
}

export default SearchBar;
