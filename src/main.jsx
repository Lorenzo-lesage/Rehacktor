import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.jsx";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

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
          paper: "#1f2937",
          opposite: "#F7FAFC",
        },
        text: {
          primary: "#c9d1d9",
          secondary: "#8b949e",
        },
        primary: {
          main: "#58a6ff",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
