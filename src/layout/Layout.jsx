import { Box } from "@mui/material";
import Header from "../components/generalLayout/Header";
import Footer from "../components/generalLayout/Footer";
import SideBar from "../components/generalLayout/SideBar";
import { Outlet } from "react-router";
import { useRef } from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import SearchBar from "../components/generalLayout/SearchBar";
import { useBackground } from "../hooks/useBackground.js";

function Layout() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const trigger = useScrollTrigger();
  const footerRef = useRef(null);
  const { backgroundImage } = useBackground();

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box
        sx={(theme) => ({
          backgroundImage: backgroundImage
            ? `linear-gradient(${theme.palette.background.default}cc 60%, ${theme.palette.background.default}), url(${backgroundImage})`
            : `linear-gradient(${theme.palette.background.default}cc, ${theme.palette.background.default}), url('../../primo.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        })}
      >
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
              paddingX: 2,
              paddindTop: 2, 
              mt: 8,
              minHeight: '100vh',
              ml: { xs: 0, lg: 10, xl: 10 },
            }}
          >
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <SearchBar />
            </Box>
            <Outlet />
          </Box>
        </Box>

        {/* Footer */}
        <Footer footerRef={footerRef} />
      </Box>
    </Box>
  );
}

export default Layout;
