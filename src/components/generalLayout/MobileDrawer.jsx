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
  /*
  |--------------------------------------------------------
  | Data
  |--------------------------------------------------------
 */

  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const toggleDrawer = (state) => () => setOpenDrawer(state);

  /*
  |--------------------------------------------------------
  | Return
  |--------------------------------------------------------
 */

  if (!isMobile) return null;

  return (
    <>
      <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
        slotProps={{
          sx: {
            width: 250,
          },
        }}
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
