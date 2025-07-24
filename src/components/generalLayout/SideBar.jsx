import React, { useState } from "react";
import { Box, useMediaQuery, useTheme, Button } from "@mui/material";
import SideBarContent from "./SideBarContent";

function SideBar({ navbarHidden }) {
  /*
  |--------------------------------------------------------
  | Data
  |--------------------------------------------------------
 */

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  /*
  |--------------------------------------------------------
  | Handlers
  |--------------------------------------------------------
 */

  /*
  |--------------------------------------------------------
  | Return
  |--------------------------------------------------------
 */

  if (!isDesktop) return null;

  return (
    <Box
      component="aside"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      sx={{
        width: open ? 240 : 110,
        flexShrink: 0,
        position: "fixed",
        transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 201,
      }}
    >
      <Box
        sx={{
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "transparent",
          boxSizing: "border-box",
        }}
      >
        <SideBarContent navbarHidden={navbarHidden} open={open} setOpen={setOpen} />
      </Box>
    </Box>
  );
}

export default SideBar;
