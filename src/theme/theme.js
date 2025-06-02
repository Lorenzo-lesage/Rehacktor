import { createTheme } from "@mui/material";

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        background: {
          default: "#F7FAFC",
          paper: "#E0E0E0",
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
        },
        text: {
          primary: "#58A6FF",
          secondary: "#8b949e",
        },
        primary: {
          main: "#58a6ff",
        },
      },
    },
  },
});

export default theme;
