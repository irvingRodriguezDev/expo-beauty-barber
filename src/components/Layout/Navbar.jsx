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
import Logo from "../../assets/LogoNegro.png"; // Asegúrate de tener una versión clara si es necesario

const navLinks = [
  { label: "Inicio", to: "inicio" },
  { label: "Experiencia", to: "experiencia" }, // Agregué la galería
  { label: "Quiero Exponer", to: "expositores" },
  { label: "Quiero Asistir", to: "register" },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("inicio");

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
          top: scrolled ? 0 : { xs: 0, md: 20 },
          left: 0,
          right: 0,
          mx: "auto",
          width: scrolled ? "100%" : { xs: "100%", md: "90%" },
          background: scrolled
            ? "rgba(6, 44, 34, 0.95)" // Verde esmeralda con transparencia
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(212, 175, 55, 0.2)" : "none",
          borderRadius: scrolled ? 0 : { xs: 0, md: "2px" },
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
            {/* Logo con filtro para visibilidad */}
            <Box
              onClick={() => scrollTo("inicio")}
              sx={{
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": { opacity: 0.8 },
                filter: scrolled
                  ? "brightness(0) invert(1)"
                  : "brightness(0) invert(1)", // Si el logo es negro, lo invierte a blanco al hacer scroll
              }}
            >
              <Box
                component='img'
                src={Logo}
                alt='Logo EBB'
                sx={{
                  height: { xs: 50, md: 60 },
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
              {navLinks.map((link) => (
                <Box
                  key={link.to}
                  component='button'
                  onClick={() => scrollTo(link.to)}
                  sx={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'DM Sans'",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color:
                      active === link.to
                        ? "#D4AF37"
                        : scrolled
                          ? "#FFF"
                          : "#ffffffff",
                    position: "relative",
                    transition: "0.3s",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -4,
                      left: 0,
                      width: active === link.to ? "100%" : "0%",
                      height: "1px",
                      bgcolor: "#D4AF37",
                      transition: "0.3s",
                    },
                    "&:hover": { color: "#D4AF37" },
                  }}
                >
                  {link.label}
                </Box>
              ))}

              {/* Botón Call to Action Premium */}
              <Button
                variant='contained'
                onClick={() => scrollTo("expositores")}
                sx={{
                  bgcolor: "#fff",
                  color: "#062C22",
                  borderRadius: 0,
                  px: 4,
                  py: 1,
                  fontSize: "0.65rem",
                  fontWeight: 900,
                  fontFamily: "'Syne'",
                  letterSpacing: "0.1em",
                  "&:hover": { bgcolor: "#D4AF37", color: "#fff" },
                }}
              >
                QUIERO EXPONER
              </Button>
              <Button
                variant='contained'
                onClick={() => scrollTo("register")}
                sx={{
                  bgcolor: "#D4AF37",
                  color: "#062C22",
                  borderRadius: 0,
                  px: 4,
                  py: 1,
                  fontSize: "0.65rem",
                  fontWeight: 900,
                  fontFamily: "'Syne'",
                  letterSpacing: "0.1em",
                  "&:hover": { bgcolor: "#FFF", color: "#062C22" },
                }}
              >
                QUIERO ASISTIR
              </Button>
            </Stack>

            {/* Mobile Toggle */}
            <IconButton
              onClick={() => setMenuOpen(!menuOpen)}
              sx={{
                display: { md: "none" },
                color: scrolled ? "#D4AF37" : "#FFF",
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
              background: "#062C22",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 6,
            }}
          >
            <Stack spacing={4}>
              {navLinks.map((link, i) => (
                <Typography
                  key={link.to}
                  component={motion.div}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    scrollTo(link.to);
                    setMenuOpen(false);
                  }}
                  sx={{
                    fontFamily: "'Syne'",
                    fontSize: "3rem",
                    fontWeight: 800,
                    color: active === link.to ? "#D4AF37" : "#FFF",
                    cursor: "pointer",
                    lineHeight: 1,
                  }}
                >
                  {link.label}
                </Typography>
              ))}

              <Box sx={{ pt: 4, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <Typography
                  sx={{
                    color: "#D4AF37",
                    letterSpacing: "0.3em",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                  }}
                >
                  WTC CIUDAD DE MÉXICO
                </Typography>
              </Box>
            </Stack>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
}
