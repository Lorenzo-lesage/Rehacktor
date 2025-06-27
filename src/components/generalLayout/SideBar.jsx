import GenresDropdown from "../game/GenresDropdown";
import { Box, Typography, Divider } from "@mui/material";
import { NavLink } from "react-router";
import StarIcon from "@mui/icons-material/Star";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FastForwardIcon from "@mui/icons-material/FastForward";
import { useTheme } from "@mui/material/styles";

function SideBar({ navbarHidden }) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const headerHeight = 64;
  const marginTop = navbarHidden ? 0 : headerHeight;
  const lastYear = new Date().getFullYear() - 1;

  const theme = useTheme();

  const typographyHoverSx = (isActive) => ({
    display: "flex",
    alignItems: "center",
    padding: "0.3rem 1rem",
    cursor: "pointer",
    borderRadius: 2,
    transition: "all 0.25s ease",
    color: isActive ? theme.palette.text.secondary : theme.palette.text.primary,
    fontWeight: 600,

    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      transform: "translateX(4px)",
    },
    "& svg": {
      color: isActive ? theme.palette.primary.main : theme.palette.text.disabled,
      transition: "all 0.25s ease",
    },
    "&:hover svg": {
      color: theme.palette.primary.main,
      transform: "scale(1.15)",
    },
  });

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

          {/* New Realeases section */}
          <Box>
            <Divider />

            {/* New realeasion */}
            <Box>
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.7rem 1rem",
                  fontWeight: 600,
                  color: "text.primary",
                }}
              >
                New Realeases
              </Typography>
            </Box>

            {/* Top of the month */}
            <Box>
              <NavLink to="/top-games-month">
                {({ isActive }) => (
                  <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                    <CalendarMonthIcon sx={{ mr: 1 }} fontSize="small" />
                    Last Month
                  </Typography>
                )}
              </NavLink>
            </Box>

            {/* Realesed this year */}
            <Box>
              <NavLink to="/year-games">
                {({ isActive }) => (
                  <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                    <CalendarMonthIcon sx={{ mr: 1 }} fontSize="small" />
                    This Year
                  </Typography>
                )}
              </NavLink>
            </Box>

            {/* Next Week */}
            <Box>
              <NavLink to="/next-week">
                {({ isActive }) => (
                  <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                    <FastForwardIcon sx={{ mr: 1 }} fontSize="small" />
                    Next Week
                  </Typography>
                )}
              </NavLink>
            </Box>

            <Divider />
          </Box>

          {/*top games*/}
          <Box>
            <Divider />

            {/* Top games section */}
            <Box>
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.7rem 1rem",
                  fontWeight: 600,
                  color: "text.primary",
                }}
              >
                Top
              </Typography>
            </Box>

            {/* Top of the week */}
            <Box>
              <NavLink to="/top-games">
                {({ isActive }) => (
                  <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                    <StarIcon sx={{ mr: 1 }} fontSize="small" />
                    Top of The Week
                  </Typography>
                )}
              </NavLink>
            </Box>

            {/* Top of last year */}
            <Box>
              <NavLink to="/top-games-last-year">
                {({ isActive }) => (
                  <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                    <StarIcon sx={{ mr: 1 }} fontSize="small" />
                    Best of {lastYear}
                  </Typography>
                )}
              </NavLink>
            </Box>

            {/* Top of all time 250 */}
            <Box>
              <NavLink to="/top-all-time-games">
                {({ isActive }) => (
                  <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                    <StarIcon sx={{ mr: 1 }} fontSize="small" />
                    Top 250 Of All Time
                  </Typography>
                )}
              </NavLink>
            </Box>

            <Divider />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SideBar;
