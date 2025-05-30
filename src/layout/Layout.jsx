import { Box } from "@mui/material";
import Header from "../components/generalLayout/Header";
import Footer from "../components/generalLayout/Footer";
import SideBar from "../components/generalLayout/SideBar";
import { Outlet } from "react-router";
import { useRef } from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";

function Layout() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const trigger = useScrollTrigger();
  const footerRef = useRef(null);

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Header */}
      <Header />

      {/* Main layout: Sidebar + Content */}
      <Box display="flex" flex={1}>
        {/* Sidebar */}
        <SideBar navbarHidden={trigger} />

        {/* Page content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 2,
            mt: 4,
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {/* Footer */}
      <Footer footerRef={footerRef} />
    </Box>
  );
}

export default Layout;
