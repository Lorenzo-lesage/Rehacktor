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
  Divider,
  Chip,
  Tooltip,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { CssBaseline } from "@mui/material";
import HideOnScroll from "../animationComponent/HideOnScroll";
import { Link } from "react-router";
import SearchBar from "./SearchBar";
import supabase from "../../supabase/supabase-client";
import FaceIcon from "@mui/icons-material/Face";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LoginIcon from "@mui/icons-material/Login";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { showToast } from "../toast/toastHelper";
import { useNavigate } from "react-router";

function Header(props) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [session, setSession] = useState(null);

  /*
  |-----------------------------------------------------
  | Methods
  |-----------------------------------------------------
  */

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

  /**
   * Method to get the session
   */
  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) setSession(null);
    console.log(data);
    setSession(data);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      showToast("error", "Oops! Something went wrong");
    }
    showToast("success", "Signed out successfully!");
    setSession(null);
    navigate("/");
  };

  /*
  |-----------------------------------------------------
  | Hooks
  |-----------------------------------------------------
  */

  React.useEffect(() => {
    getSession();
  }, []);

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <>
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
              <Chip
                sx={{ border: "none" }}
                label="Servicies"
                color="primary"
                variant="outlined"
                size="small"
                clickable
              >
                Services
              </Chip>

              {/* Hover Menu Container */}
              <Box>
                {session ? (
                  <Chip
                    label="Account"
                    variant="outlined"
                    size="small"
                    clickable
                    icon={<FaceIcon color="text.primary" />}
                    deleteIcon={
                      anchorEl ? (
                        <ArrowDropUpIcon sx={{ color: "text.primary" }} />
                      ) : (
                        <ArrowDropDownIcon sx={{ color: "text.primary" }} />
                      )
                    }
                    onDelete={() => {}}
                    onClick={handleMenuItemClick}
                    sx={{
                      border: "none",
                      color: "text.primary",
                      "& .MuiChip-deleteIcon": {
                        color: "text.primary",
                      },
                    }}
                  />
                ) : (
                  <Chip
                    label="Projects"
                    variant="outlined"
                    size="small"
                    clickable
                    icon={<FaceIcon color="text.primary" />}
                    deleteIcon={
                      anchorEl ? (
                        <ArrowDropUpIcon sx={{ color: "text.primary" }} />
                      ) : (
                        <ArrowDropDownIcon sx={{ color: "text.primary" }} />
                      )
                    }
                    onDelete={() => {}}
                    onClick={handleMenuItemClick}
                    sx={{
                      border: "none",
                      color: "text.primary",
                      "& .MuiChip-deleteIcon": {
                        color: "text.primary",
                      },
                    }}
                  />
                )}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  elevation={4}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: (theme) => ({
                      width: 150,
                      backgroundColor: theme.palette.background.paper,
                      color: theme.palette.text.primary,
                    }),
                  }}
                >
                  {session ? (
                    <>
                      <MenuItem
                        onClick={handleMenuClose}
                        sx={{
                          borderRadius: 1,
                          ":hover": { backgroundColor: "background.paper" },
                          transition: "background-color 0.2s ease-in-out",
                        }}
                      >
                        <Link to="/profile">
                          <AccountBoxIcon
                            fontSize="small"
                            sx={{ marginRight: "0.5rem" }}
                          />
                          Profile
                        </Link>
                      </MenuItem>
                      <Divider sx={{ marginTop: "8rem" }} />
                      <MenuItem
                        onClick={signOut}
                        sx={{
                          borderRadius: 1,
                          ":hover": { backgroundColor: "background.paper" },
                          transition: "background-color 0.2s ease-in-out",
                        }}
                      >
                        <LogoutIcon
                          fontSize="small"
                          sx={{ marginRight: "0.5rem" }}
                        />
                        Logout
                      </MenuItem>
                    </>
                  ) : (
                    <MenuItem onClick={handleMenuClose}>
                      <Link to="/projects">Projects</Link>
                    </MenuItem>
                  )}

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
              {session ? null : (
                <>
                  <Box>
                    <Link
                      to="/register"
                      style={{ textDecoration: "none", width: "100%" }}
                    >
                      <Chip
                        sx={{ border: "none" }}
                        label="Sign up"
                        color="ext.primary"
                        variant="outlined"
                        clickable
                        size="small"
                        icon={<LoginIcon />}
                      />
                    </Link>
                  </Box>
                  <Box>
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", width: "100%" }}
                    >
                      <Chip
                        sx={{ border: "none" }}
                        label="Sign in"
                        color="text.primary"
                        variant="outlined"
                        clickable
                        size="small"
                        icon={<LoginIcon />}
                      />
                    </Link>
                  </Box>
                </>
              )}

              <Divider orientation="vertical" flexItem />

              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <ThemeToggle />
              </Box>
              <Tooltip title="Settings">
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ minWidth: "auto", padding: 0.5, borderRadius: 3 }}
                >
                  <SettingsOutlinedIcon fontSize="small" />
                </Button>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
}

export default Header;
