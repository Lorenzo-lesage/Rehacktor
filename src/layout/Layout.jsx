import { Outlet } from "react-router";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout() {
  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />

      <Box component="main" sx={{ flex: 1, py: 4 }}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}

export default Layout;
