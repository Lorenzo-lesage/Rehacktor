import { Box } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router";
import { useEffect, useRef, useState } from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";

function Layout() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const trigger = useScrollTrigger();
  const footerRef = useRef(null);
  const [footerVisible, setFooterVisible] = useState(false);

  /*
  |-----------------------------------------------------
  | Hooks
  |-----------------------------------------------------
  */

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

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
        <SideBar footerVisible={footerVisible} navbarHidden={trigger} />

        {/* Page content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginLeft: { sm: "240px" },
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
