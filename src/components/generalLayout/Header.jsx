import React, { useContext } from "react";
import ThemeToggle from "../animationComponent/ThemeToggle";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { CssBaseline } from "@mui/material";
import HideOnScroll from "../animationComponent/HideOnScroll";
import { Link } from "react-router";
import SearchBar from "./SearchBar";
import LoginIcon from "@mui/icons-material/Login";
import SessionContext from "../../context/SessionContext";
import MobileDrawer from "./MobileDrawer";
import SideBar from "./SideBar";

function Header(props) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { userProfile } = useContext(SessionContext);

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
            <Link to="/">
              <Box
                component="img"
                src="../../../icon2.png"
                alt="Rehacktor Logo"
                sx={{
                  width: 65,
                  aspectRatio: 1,
                  filter: "drop-shadow(2px 3px 4px rgba(0,0,0))",
                  objectFit: "cover",
                  transition: "all 0.25s ease",
                  ":hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
            </Link>

            <Box display="flex" alignItems="center" gap={2}>
              {/* Search Bar */}
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <SearchBar />
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
              <Box>
                <ThemeToggle />
              </Box>

              <MobileDrawer>
                <SideBar />
              </MobileDrawer>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
}

export default Header;
