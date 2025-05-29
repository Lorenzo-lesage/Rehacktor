import GenresDropdown from "./GenresDropdown";
import { Box } from "@mui/material";

function SideBar({ footerVisible, navbarHidden }) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */
  const headerHeight = 64;
  const footerHeight = 120; // deve essere uguale al tuo footer

  const paddingTop = navbarHidden ? 0 : headerHeight;
  const paddingBottom = footerVisible ? footerHeight : 0;

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
<Box
  component="aside"
  sx={{
    position: "fixed",
    top: 0,
    left: 0,
    width: 240,
    height: footerVisible ? `calc(100vh - ${footerHeight}px)` : "100vh",
    backgroundColor: "red",
    paddingTop: `${paddingTop}px`,
    paddingBottom: footerVisible ? `${footerHeight}px` : `${paddingBottom}px`,
    transition: "height 300ms ease, padding-top 300ms ease, padding-bottom 300ms ease",
    display: { xs: "none", sm: "block" },
    overflowY: "auto",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    zIndex: (theme) => theme.zIndex.appBar - 1,
  }}
>
  <GenresDropdown />
</Box>
  );
}

export default SideBar;
