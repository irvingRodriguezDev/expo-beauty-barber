import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3D2B2F", // Deep Espresso (Texto y Botones principales)
      light: "#5C464A",
      dark: "#25191B",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFB7CE", // Rosa Sakura (Acentos y Detalles)
      light: "#FFDDE8",
      dark: "#E899B3",
      contrastText: "#3D2B2F",
    },
    background: {
      default: "#FFF5F7", // Fondo base ultra-suave
      paper: "#FFFFFF", // Fondos de tarjetas
    },
    text: {
      primary: "#3D2B2F",
      secondary: "rgba(61, 43, 47, 0.6)",
    },
    divider: "rgba(255, 183, 206, 0.3)",
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h1: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: "-0.04em",
    },
    h2: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 900,
      letterSpacing: "-0.02em",
    },
    h6: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
      letterSpacing: "0.05em",
    },
    button: {
      fontFamily: "'Syne', sans-serif",
      letterSpacing: "0.15em",
      fontWeight: 800,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
    },
  },
  shape: {
    borderRadius: 24, // Curvatura Premium
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          padding: "12px 32px",
          textTransform: "uppercase",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 12px 24px rgba(61, 43, 47, 0.12)",
            transform: "translateY(-2px)",
          },
        },
        containedPrimary: {
          backgroundColor: "#3D2B2F",
          "&:hover": {
            backgroundColor: "#FFB7CE",
            color: "#3D2B2F",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 20px 60px rgba(61, 43, 47, 0.05)",
          border: "1px solid rgba(255, 183, 206, 0.2)",
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255, 183, 206, 0.05)",
            "& fieldset": {
              borderColor: "rgba(255, 183, 206, 0.3)",
              transition: "border-color 0.2s ease-in-out",
            },
            "&:hover fieldset": {
              borderColor: "#FFB7CE",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FFB7CE",
              borderWidth: "2px",
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(61, 43, 47, 0.5)",
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          color: "#3D2B2F",
          borderBottom: "1px solid rgba(255, 183, 206, 0.2)",
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;
