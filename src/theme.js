import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // ─── PALETTE ────────────────────────────────────────────────────────────────
  palette: {
    mode: "dark",
    primary: {
      main: "#C9A84C", // Gold
      light: "#E8C96A",
      dark: "#A8873A",
      contrastText: "#0A0A0A",
    },
    secondary: {
      main: "#E8407A", // Rose
      light: "#EF6A99",
      dark: "#C02060",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#0A0A0A",
      paper: "#141414",
    },
    text: {
      primary: "#F5F0E8",
      secondary: "#ABABAB",
      disabled: "#555555",
    },
    divider: "rgba(255,255,255,0.08)",
    // Custom tokens accessible via theme.palette.brand.*
    brand: {
      gold: "#C9A84C",
      goldLight: "#E8C96A",
      rose: "#E8407A",
      dark1: "#0A0A0A",
      dark2: "#0D0D0D",
      dark3: "#141414",
      dark4: "#1C1C1C",
      cream: "#F5F0E8",
    },
  },

  // ─── TYPOGRAPHY ─────────────────────────────────────────────────────────────
  typography: {
    fontFamily: "'Outfit', sans-serif",
    // Display headings — Bebas Neue
    h1: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontWeight: 400,
      letterSpacing: "0.02em",
      lineHeight: 0.95,
    },
    h2: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontWeight: 400,
      letterSpacing: "0.02em",
      lineHeight: 1.0,
    },
    h3: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontWeight: 400,
      letterSpacing: "0.02em",
      lineHeight: 1.1,
    },
    h4: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h5: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 600,
    },
    // Body
    body1: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.75,
      color: "#ABABAB",
    },
    body2: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.7,
      color: "#ABABAB",
    },
    // Labels / overlines
    overline: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 600,
      fontSize: "0.7rem",
      letterSpacing: "0.3em",
      color: "#C9A84C",
    },
    caption: {
      fontFamily: "'Outfit', sans-serif",
      fontSize: "0.75rem",
      color: "#777",
    },
    button: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 600,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
    },
  },

  // ─── SHAPE ──────────────────────────────────────────────────────────────────
  shape: {
    borderRadius: 0, // Sharp corners — editorial look
  },

  // ─── SPACING ────────────────────────────────────────────────────────────────
  spacing: 8, // base 8px

  // ─── BREAKPOINTS ────────────────────────────────────────────────────────────
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  // ─── COMPONENT OVERRIDES ────────────────────────────────────────────────────
  components: {
    // Button
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: "14px 32px",
          fontSize: "0.75rem",
          letterSpacing: "0.15em",
          fontWeight: 600,
          textTransform: "uppercase",
          transition: "all 0.2s ease",
          "&:active": { transform: "scale(0.98)" },
        },
        containedPrimary: {
          background: "#C9A84C",
          color: "#0A0A0A",
          "&:hover": {
            background: "#E8C96A",
            boxShadow: "0 0 24px rgba(201,168,76,0.25)",
          },
        },
        containedSecondary: {
          background: "#E8407A",
          color: "#FFFFFF",
          "&:hover": {
            background: "#EF6A99",
            boxShadow: "0 0 24px rgba(232,64,122,0.25)",
          },
        },
        outlinedPrimary: {
          borderColor: "#C9A84C",
          color: "#C9A84C",
          borderWidth: "1px",
          "&:hover": {
            background: "rgba(201,168,76,0.08)",
            borderColor: "#E8C96A",
            borderWidth: "1px",
          },
        },
        outlinedSecondary: {
          borderColor: "rgba(255,255,255,0.2)",
          color: "#F5F0E8",
          "&:hover": {
            background: "rgba(255,255,255,0.05)",
            borderColor: "rgba(255,255,255,0.4)",
          },
        },
      },
    },

    // Card
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#141414",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 0,
          boxShadow: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "#1C1C1C",
            borderColor: "rgba(201,168,76,0.3)",
          },
        },
      },
    },

    // TextField
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 0,
            background: "#0F0F0F",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.875rem",
            color: "#F5F0E8",
            "& fieldset": {
              borderColor: "rgba(255,255,255,0.12)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(255,255,255,0.25)",
            },
            "&.Mui-focused": {
              background: "#141414",
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgba(201,168,76,0.5)",
              borderWidth: "1px",
            },
          },
          "& .MuiInputLabel-root": {
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.875rem",
            color: "#555",
            "&.Mui-focused": {
              color: "#C9A84C",
            },
          },
          "& .MuiInputBase-input": {
            padding: "14px 16px",
          },
          "& .MuiSelect-select": {
            padding: "14px 16px",
          },
        },
      },
    },

    // Select
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        icon: {
          color: "#555",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: "#1C1C1C",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "'Outfit', sans-serif",
          fontSize: "0.875rem",
          color: "#ABABAB",
          "&:hover": { background: "rgba(201,168,76,0.08)", color: "#F5F0E8" },
          "&.Mui-selected": {
            background: "rgba(201,168,76,0.12)",
            color: "#C9A84C",
          },
        },
      },
    },

    // Divider
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(255,255,255,0.08)",
        },
      },
    },

    // Chip
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontFamily: "'Outfit', sans-serif",
          fontSize: "0.7rem",
          letterSpacing: "0.05em",
          height: "28px",
        },
        outlinedDefault: {
          borderColor: "rgba(255,255,255,0.12)",
          color: "#ABABAB",
        },
      },
    },

    // AppBar
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "transparent",
          boxShadow: "none",
        },
      },
    },

    // Container — 90% width on large screens
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "5%",
          paddingRight: "5%",
          "@media (min-width: 1200px)": {
            maxWidth: "1600px",
            paddingLeft: "5%",
            paddingRight: "5%",
          },
        },
      },
    },

    // Paper
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
