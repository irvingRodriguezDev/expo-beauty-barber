import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#72F8FF", // Cian Eléctrico (Acento Neón)
      dark: "#00E5FF", // Cian más saturado para interacción
      contrastText: "#02181B", // Texto oscuro sobre fondos cian
    },
    secondary: {
      main: "#FFFFFF",
      contrastText: "#02181B",
    },
    background: {
      // Midnight Petroleum: El color base ultra-profundo
      default: "#02181B",
      // Papel con transparencia para efectos de cristal ahumado
      paper: "rgba(6, 78, 87, 0.05)",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.6)", // Para descripciones y leyendas
    },
    divider: "rgba(114, 248, 255, 0.1)", // Divisores con tinte cian sutil
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h1: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 900,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
    },
    h3: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
    },
    body1: {
      fontFamily: "'DM Sans', sans-serif",
      lineHeight: 1.8,
    },
    button: {
      fontFamily: "'Syne', sans-serif",
      letterSpacing: "0.25em",
      fontWeight: 800,
      textTransform: "uppercase",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0px", // Identidad de cortes rectos y arquitectónicos
          padding: "14px 40px",
          transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
          boxShadow: "none",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.5)",
          },
        },
        containedPrimary: {
          boxShadow: "0 10px 20px rgba(114, 248, 255, 0.2)",
          "&:hover": {
            backgroundColor: "#FFFFFF",
            color: "#02181B",
            boxShadow: "0 15px 30px rgba(255, 255, 255, 0.2)",
          },
        },
        outlined: {
          borderColor: "rgba(114, 248, 255, 0.5)",
          "&:hover": {
            borderColor: "#72F8FF",
            backgroundColor: "rgba(114, 248, 255, 0.05)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "transparent",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(114, 248, 255, 0.1)",
          boxShadow: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
          backgroundImage: "none",
          backgroundColor: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(114, 248, 255, 0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "rgba(255, 255, 255, 0.4)",
            fontFamily: "'Syne'",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
          },
          "& label.Mui-focused": { color: "#72F8FF" },
          "& .MuiOutlinedInput-root": {
            color: "#FFFFFF",
            "& fieldset": {
              borderColor: "rgba(114, 248, 255, 0.2)",
              borderRadius: "0px",
            },
            "&:hover fieldset": { borderColor: "rgba(114, 248, 255, 0.5)" },
            "&.Mui-focused fieldset": { borderColor: "#72F8FF" },
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "'DM Sans'",
          fontSize: "0.9rem",
          "&.Mui-selected": {
            backgroundColor: "rgba(114, 248, 255, 0.1)",
            color: "#72F8FF",
            "&:hover": {
              backgroundColor: "rgba(114, 248, 255, 0.2)",
            },
          },
        },
      },
    },
  },
});

export default theme;
