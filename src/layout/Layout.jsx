import { Box } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router";

function Layout() {
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
        <Box
          component="aside"
          sx={{
            width: 240,
            backgroundColor: "background.paper",
            position: "sticky",
            top: 64,
            p: 1,
            height: "calc(100vh - 64px)", // es. "calc(100vh - 64px)"
            flexShrink: 0,
            display: { xs: "none", sm: "block" },
            overflowY: "auto",
            scrollbarWidth: "none", // Firefox
            "&::-webkit-scrollbar": {
              display: "none", // Chrome/Safari
            },
          }}
        >
          <SideBar />
        </Box>

        {/* Page content */}
        <Box component="main" sx={{ flex: 1, p: 3, mt: 4 }}>
          <Outlet />
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default Layout;
