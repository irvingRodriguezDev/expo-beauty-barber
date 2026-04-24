import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../assets/images/LOGO_VINO.png";

const navLinks = [
  { label: "Inicio", to: "inicio" },
  { label: "Experiencia", to: "experiencia" },
  { label: "visitantes", to: "visitantes" },
  { label: "¿Quiero Exponer?", to: "expositores" },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  // --- NUEVA PALETA LIGERA ---
  const brandPink = "#ee6f97ff"; // Rosa claro/pastel
  const deepText = "#3D2B2F"; // Texto oscuro cálido
  const lightBg = "#FFCCD8"; // Fondo crema rosado
  // ---------------------------

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => document.getElementById(l.to));
      const current = sections.findLast(
        (s) => s && s.getBoundingClientRect().top <= 120,
      );
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar
        component={motion.nav}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        position='fixed'
        elevation={0}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          background: scrolled
            ? "#FFD9E2" // Fondo ligero con transparencia
            : "transparent",
          backdropFilter: scrolled ? "blur(15px)" : "none",
          borderBottom: scrolled
            ? `1px solid rgba(255, 183, 206, 0.2)`
            : "none",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 1200,
        }}
      >
        <Container maxWidth='xl'>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: { xs: 70, md: 90 },
            }}
          >
            {/* Logo - Ahora en versión normal (oscura) */}
            <Box
              onClick={() => scrollTo("inicio")}
              sx={{
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Box
                component='img'
                src={Logo}
                alt='Logo BWM'
                sx={{
                  height: { xs: 80, md: 80 },
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* Desktop Navigation */}
            <Stack
              direction='row'
              spacing={5}
              alignItems='center'
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Stack direction='row' spacing={4}>
                {navLinks.map((link) => (
                  <Box
                    key={link.to}
                    component='button'
                    onClick={() => scrollTo(link.to)}
                    sx={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color:
                        active === link.to
                          ? brandPink
                          : "rgba(61, 43, 47, 0.6)", // Texto suave cuando no está activo
                      position: "relative",
                      transition: "0.3s",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: -6,
                        left: 0,
                        width: active === link.to ? "100%" : "0%",
                        height: "2px",
                        bgcolor: brandPink,
                        transition: "0.3s ease",
                      },
                      "&:hover": { color: deepText },
                    }}
                  >
                    {link.label}
                  </Box>
                ))}
              </Stack>

              <Stack direction='row' spacing={2} sx={{ ml: 4 }}>
                <Button
                  variant='contained'
                  onClick={() => scrollTo("register")}
                  sx={{
                    bgcolor: brandPink,
                    color: "#FFF", // Texto blanco sobre el rosa para mejor contraste
                    borderRadius: 2,
                    px: 4,
                    py: 1.2,
                    fontSize: "0.75rem",
                    fontWeight: 900,
                    letterSpacing: "0.1em",
                    boxShadow: `0 8px 15px rgba(255, 183, 206, 0.3)`,
                    "&:hover": {
                      bgcolor: deepText,
                      color: "#FFF",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  BOLETOS
                </Button>
              </Stack>
            </Stack>

            {/* Mobile Toggle */}
            <IconButton
              onClick={() => setMenuOpen(!menuOpen)}
              sx={{
                display: { md: "none" },
                color: brandPink,
                bgcolor: "rgba(255, 183, 206, 0.08)",
                borderRadius: 2,
              }}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Container>
      </AppBar>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <Box
            component={motion.div}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: 1150,
              background: lightBg,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 6,
            }}
          >
            {/* Texto de fondo en menu mobile */}
            <Typography
              sx={{
                position: "absolute",
                fontSize: "25vw",
                fontWeight: 900,
                color: "rgba(255, 183, 206, 0.1)",
                zIndex: 0,
                userSelect: "none",
              }}
            >
              MENU
            </Typography>

            <Stack spacing={5} sx={{ zIndex: 1, textAlign: "center" }}>
              {navLinks.map((link, i) => (
                <Typography
                  key={link.to}
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    scrollTo(link.to);
                    setMenuOpen(false);
                  }}
                  sx={{
                    fontSize: "2rem",
                    fontWeight: 900,
                    color: active === link.to ? brandPink : deepText,
                    cursor: "pointer",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    "&:hover": { color: brandPink },
                  }}
                >
                  {link.label}
                </Typography>
              ))}

              <Button
                variant='contained'
                onClick={() => {
                  scrollTo("register");
                  setMenuOpen(false);
                }}
                sx={{
                  bgcolor: brandPink,
                  color: "#FFF",
                  borderRadius: 2,
                  py: 2,
                  px: 6,
                  fontWeight: 900,
                  fontSize: "1rem",
                  boxShadow: `0 10px 20px rgba(255, 183, 206, 0.2)`,
                }}
              >
                BOLETOS
              </Button>
            </Stack>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
}
