import GenresDropdown from "../game/GenresDropdown";
import { Box } from "@mui/material";


function SideBar({  navbarHidden }) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const headerHeight = 64;
  const marginTop = navbarHidden ? 0 : headerHeight;

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <Box
      component="aside"
      sx={{
        width: 240,
        display: { xs: "none", sm: "block" },
        flexShrink: 0,
      }}
    >
      {/* Wrapper con altezza 100vh e overflow hidden */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "transparent",
          boxSizing: "border-box",
        }}
      >
        {/* Contenuto con marginTop per spostarlo verso il basso */}
        <Box
          sx={{
            marginTop: `${marginTop}px`,
            height: `calc(100vh - ${marginTop}px)`,
            transition: "margin-top 0.3s ease",
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          padding: "0 0.5rem 1rem 0.5rem",
          }}
        >
          <GenresDropdown />

        </Box>
      </Box>
    </Box>
  );
}

export default SideBar;
