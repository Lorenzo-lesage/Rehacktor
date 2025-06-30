import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideBarContent from "./SideBarContent";

const MobileDrawer = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (state) => () => setOpen(state);

  if (!isMobile) return null;

  return (
    <>
      <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { width: 250 } }}
      >
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          sx={{ width: 250 }}
        >
          <SideBarContent navbarHidden={false} />
        </Box>
      </Drawer>
    </>
  );
};

export default MobileDrawer;
