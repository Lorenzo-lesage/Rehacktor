import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import SideBarContent from "./SideBarContent";

function SideBar({ navbarHidden }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  if (!isDesktop) return null;

  return (
    <Box
      component="aside"
      sx={{
        width: 240,
        flexShrink: 0,
      }}
    >
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
        <SideBarContent navbarHidden={navbarHidden} />
      </Box>
    </Box>
  );
}

export default SideBar;
