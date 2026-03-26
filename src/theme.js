import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#EC4899",
      dark: "#831843", // Un borgoña profundo para el toque premium
    },
    background: {
      // Degradado sutil de seda rosada
      default: "#FFF5F7",
      paper: "rgba(255, 255, 255, 0.8)",
    },
    text: {
      primary: "#2D0A1A", // Un negro-rosado muy oscuro, no negro puro
      secondary: "#7D4A5F",
    },
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h1: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
      textTransform: "uppercase",
    },
    h2: { fontFamily: "'Syne', sans-serif", fontWeight: 700 },
    button: { letterSpacing: "0.15em", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "40px", // Botones más orgánicos y modernos
          padding: "12px 35px",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 10px 20px rgba(236, 72, 153, 0.2)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(255, 245, 247, 0.7)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(236, 72, 153, 0.1)",
        },
      },
    },
  },
});

export default theme;
