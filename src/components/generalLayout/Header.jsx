import React, { useState, useEffect } from "react";
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
  Tooltip,
  Avatar,
} from "@mui/material";
import { CssBaseline } from "@mui/material";
import HideOnScroll from "../animationComponent/HideOnScroll";
import { Link } from "react-router";
import SearchBar from "./SearchBar";
import supabase from "../../supabase/supabase-client";
import { showToast } from "../toast/toastHelper";
import { useNavigate } from "react-router";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LoginIcon from "@mui/icons-material/Login";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useContext } from "react";
import SessionContext from "../../context/SessionContext";
import useAvatarUrl from "../../hooks/useAvatarUrl";

function Header(props) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { userProfile } = useContext(SessionContext);
  const { avatarUrl } = useAvatarUrl(userProfile?.avatar_url);

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
   * Method to open menu
   * @param {*} event
   */
  const handleMenuItemClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      showToast("error", "Oops! Something went wrong");
    }
    showToast("success", "You have been signed out");
    navigate("/");
  };

  /*
  |-----------------------------------------------------
  | Hooks
  |-----------------------------------------------------
  */

  useEffect(() => {
    setAnchorEl(null);
  }, [userProfile]);

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  // if (loadingSession) return <HeaderSkeleton />;
  // if (userProfile) {
  //   if (avatarLoading) return null;
  // }
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
              {/* Search Bar */}
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <SearchBar />
              </Box>
              {/* Services Button */}
              <Button
                sx={{
                  borderRadius: 3,
                  border: "none",
                  color: "text.tertiary",
                  textTransform: "none",
                  display: { xs: "none", md: "flex" },
                }}
                label="Servicies"
                variant="outlined"
                size="small"
              >
                Services
              </Button>

              {/* Hover Menu Container */}
              <Box>
                {/* Account/Projects Buttons */}
                {userProfile ? (
                  <>
                    {/* Account Button */}
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleMenuItemClick}
                      endIcon={
                        anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                      }
                      sx={{
                        border: "none",
                        borderRadius: 3,
                        color: "text.tertiary",
                        textTransform: "none",
                        "& .MuiButton-endIcon, & .MuiButton-startIcon": {
                          color: "text.tertiary",
                        },
                      }}
                    >
                      {avatarUrl ? (
                        <Avatar
                          src={avatarUrl}
                          sx={{
                            width: 27,
                            height: 27,
                            border: "2px solid black",
                            mr: 1,
                          }}
                        />
                      ) : (
                        <Avatar
                          sx={{
                            bgcolor: "text.tertiary",
                            width: 27,
                            height: 27,
                            fontSize: 13,
                            border: "2px solid black",
                            mr: 1,
                          }}
                        >
                          {userProfile.first_name?.charAt(0).toUpperCase()}
                          {userProfile.last_name?.charAt(0).toUpperCase()}
                        </Avatar>
                      )}
                      Account
                    </Button>

                    {/* Menu for logged-in user */}
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
                      <MenuItem
                        onClick={handleMenuClose}
                        sx={{
                          borderRadius: 1,
                          ":hover": { backgroundColor: "background.paper" },
                          transition: "background-color 0.2s ease-in-out",
                        }}
                      >
                        <Link
                          to="/profile"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            color: "inherit",
                            textDecoration: "none",
                          }}
                        >
                          <AccountBoxIcon
                            fontSize="small"
                            sx={{ marginRight: "0.5rem" }}
                          />
                          Profile
                        </Link>
                      </MenuItem>

                      <Divider sx={{ my: 1 }} />

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

                      {/* Theme toggle on small screens */}
                      <MenuItem
                        sx={{
                          display: { xs: "flex", md: "none" },
                          justifyContent: "start",
                        }}
                      >
                        <ThemeToggle />
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    {/* Guest Projects Button */}
                    <Button
                      sx={{
                        borderRadius: 3,
                        border: "none",
                        color: "text.tertiary",
                        textTransform: "none",
                      }}
                      label="Servicies"
                      variant="outlined"
                      size="small"
                    >
                      <Link
                        to="/projects"
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        Projects
                      </Link>
                    </Button>
                  </>
                )}
              </Box>

              {/* Sign in Button */}
              {userProfile ? null : (
                <Box>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    size="small"
                    endIcon={<LoginIcon color="text.tertiary" />}
                    sx={{
                      border: "none",
                      borderRadius: 3,
                      color: "text.tertiary",
                      textTransform: "none",
                    }}
                  >
                    Sign in
                  </Button>
                </Box>
              )}

              <Divider orientation="vertical" flexItem />

              {/* Theme Toggle desktop mode */}
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <ThemeToggle />
              </Box>

              {/* Settings Button */}
              <Box>
                <Tooltip title="Settings">
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{
                      minWidth: "auto",
                      padding: 0.5,
                      borderRadius: 3,
                      color: "text.tertiary",
                    }}
                  >
                    <SettingsOutlinedIcon
                      fontSize="small"
                      color="text.tertiary"
                    />
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
}

export default Header;
