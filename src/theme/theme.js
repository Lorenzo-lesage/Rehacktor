import { createTheme } from "@mui/material";

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        background: {
          default: "#E2E8F0",
          paper: "#E0E0E0",
          sidebar: "#BDC5D2",
          icon: "#d1d2d3ff",
          iconHover: "#f1f2f3ff",
        },
        text: {
          primary: "#1a237e",
          secondary: "#5c6bc0",
        },
        primary: {
          main: "#3f51b5",
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        background: {
          default: "#111827",
          paper: "#000000",
          accent: "#1f2937",
          sidebar: "#111827",
          icon: "#243352ff",
          iconHover: "#2b426fff",
        },
        text: {
          primary: "#c9d1d9",
          secondary: "#8b949e",
          tertiary: "#58A6FF",
        },
        primary: {
          main: "#58a6ff",
        },
      },
    },
  },
});

export default theme;
