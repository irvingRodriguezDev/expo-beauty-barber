import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    // CAMBIO: Modo oscuro para que los textos contrasten con el Esmeralda
    mode: "dark",
    primary: {
      main: "#D4AF37", // Oro / Dorado
      dark: "#B8860B", // Dorado oscuro para estados activos
      contrastText: "#041C16", // El texto sobre botones dorados será verde oscuro
    },
    background: {
      // El color base del sitio (Negro Esmeralda Profundo)
      default: "#041C16",
      // Las tarjetas y papeles tendrán un tinte esmeralda translúcido
      paper: "rgba(6, 44, 34, 0.8)",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.7)", // Blanco con opacidad para jerarquía
    },
    divider: "rgba(212, 175, 55, 0.2)", // Divisores con tinte dorado
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
      fontWeight: 800,
      letterSpacing: "0.02em",
    },
    h3: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
    },
    button: {
      fontFamily: "'Syne', sans-serif",
      letterSpacing: "0.2em",
      fontWeight: 800,
      textTransform: "uppercase",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // CAMBIO: Eliminamos el redondeado (40px) por bordes rectos (0px)
          borderRadius: "0px",
          padding: "12px 35px",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "none",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)",
            backgroundColor: "#D4AF37",
          },
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#FFFFFF",
            color: "#041C16",
          },
        },
        outlined: {
          borderColor: "#D4AF37",
          "&:hover": {
            borderColor: "#FFFFFF",
            backgroundColor: "rgba(255,255,255,0.05)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          // Navegación estilo "Glassmorphism" oscuro
          background: "rgba(4, 28, 22, 0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
          boxShadow: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "0px", // Todas las tarjetas MUI ahora son de corte recto
          backgroundImage: "none", // Quitamos el overlay grisáceo de MUI Dark Mode
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // Estilo para inputs que encajen con el Dorado
          "& label.Mui-focused": { color: "#D4AF37" },
          "& .MuiInput-underline:after": { borderBottomColor: "#D4AF37" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(212, 175, 55, 0.3)",
              borderRadius: "0px",
            },
            "&:hover fieldset": { borderColor: "#D4AF37" },
            "&.Mui-focused fieldset": { borderColor: "#D4AF37" },
          },
        },
      },
    },
  },
});

export default theme;
