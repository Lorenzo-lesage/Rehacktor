import React, { useState } from "react";
import ThemeToggle from "../animationComponent/ThemeToggle";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { CssBaseline } from "@mui/material";
import HideOnScroll from "../animationComponent/HideOnScroll";
import { Link } from "react-router";
import SearchBar from "./SearchBar";

function Header(props) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  /*
  |-----------------------------------------------------
  | Methods
  |-----------------------------------------------------
  */

  /**
   * Method to open the hover menu
   * @param {*} event
   */
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Method to close the hover menu
   */
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /**
   * Method to open the hover menu Phone mode
   * @param {*} event
   */
  const handleMenuItemClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          position="fixed"
          color="default"
          elevation={0}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            backgroundColor: "transparent",
            backdropFilter: "blur(0.5rem)",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" component="div" fontWeight="bold">
              <Link to="/">Rehacktor</Link>
            </Typography>

            <Box display="flex" alignItems="center" gap={2}>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <SearchBar />
              </Box>
              <Button color="secondary" href="#">
                Services
              </Button>

              {/* Hover Menu Container */}
              <Box onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose}>
                <Button
                  endIcon={!open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                  color="inherit"
                  onClick={handleMenuItemClick}
                >
                  Projects
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  MenuListProps={{ onMouseLeave: handleMenuClose }}
                  PaperProps={{
                    sx: { width: 150 },
                  }}
                >
                  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                  <MenuItem
                    sx={{
                      display: { xs: "flex", md: "none" },
                      justifyContent: "start",
                    }}
                  >
                    <ThemeToggle />
                  </MenuItem>
                </Menu>
              </Box>

              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <ThemeToggle />
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  );
}

export default Header;
