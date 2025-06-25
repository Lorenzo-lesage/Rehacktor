import GenresDropdown from "../game/GenresDropdown";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router";
import StarIcon from "@mui/icons-material/Star";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function SideBar({ navbarHidden }) {
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

          {/* Top of the week */}
          <Box>
            <Link to="/top-games" style={{ textDecoration: "none" }}>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.3rem 1rem",
                  fontWeight: 600,
                  color: "text.primary",
                }}
              >
                <StarIcon sx={{ mr: 1 }} fontSize="small" />
                Top of The Week
              </Typography>
            </Link>
          </Box>

          {/* Top of the month */}
          <Box>
            <Link to="/top-games-month" style={{ textDecoration: "none" }}>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.3rem 1rem",
                  fontWeight: 600,
                  color: "text.primary",
                }}
              >
                <CalendarMonthIcon sx={{ mr: 1 }} fontSize="small" />
                Top of the Month
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SideBar;
