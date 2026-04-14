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
import Logo from "../../assets/LogoNegro.webp";

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

  const brandCyan = "#72F8FF";
  const darkPetroleum = "#02181B"; // El fondo más profundo

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
            ? "rgba(2, 24, 27, 0.85)" // Petróleo profundo con transparencia
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? `1px solid rgba(114, 248, 255, 0.1)`
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
            {/* Logo */}
            <Box
              onClick={() => scrollTo("inicio")}
              sx={{
                cursor: "pointer",
                filter: "brightness(0) invert(1)",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Box
                component='img'
                src={Logo}
                alt='Logo EBB'
                sx={{
                  height: { xs: 40, md: 50 },
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
                      // fontFamily: "'Syne'",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color:
                        active === link.to
                          ? brandCyan
                          : "rgba(255,255,255,0.6)",
                      position: "relative",
                      transition: "0.3s",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: -6,
                        left: 0,
                        width: active === link.to ? "100%" : "0%",
                        height: "1px",
                        bgcolor: brandCyan,
                        transition: "0.3s ease",
                      },
                      "&:hover": { color: "#FFF" },
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
                    bgcolor: brandCyan,
                    color: darkPetroleum,
                    borderRadius: 4,
                    px: 4,
                    py: 1.2,
                    fontSize: "0.75rem",
                    fontWeight: 900,
                    // fontFamily: "'Syne'",
                    letterSpacing: "0.1em",
                    boxShadow: `0 10px 20px rgba(114, 248, 255, 0.2)`,
                    "&:hover": {
                      bgcolor: "#FFF",
                      color: darkPetroleum,
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
                color: brandCyan,
                bgcolor: "rgba(114, 248, 255, 0.05)",
                borderRadius: 0,
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
              background: darkPetroleum,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 6,
            }}
          >
            {/* Fondo decorativo en el menu mobile */}
            <Typography
              sx={{
                position: "absolute",
                fontSize: "30vw",
                fontWeight: 900,
                color: "rgba(114, 248, 255, 0.03)",
                zIndex: 0,
                fontFamily: "'Syne'",
              }}
            >
              MENU
            </Typography>

            <Stack spacing={6} sx={{ zIndex: 1, textAlign: "center" }}>
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
                    fontFamily: "'Syne'",
                    fontSize: "2.2rem",
                    fontWeight: 900,
                    color: active === link.to ? brandCyan : "#FFF",
                    cursor: "pointer",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    "&:hover": { color: brandCyan },
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
                  bgcolor: brandCyan,
                  color: darkPetroleum,
                  borderRadius: 4,
                  py: 2,
                  px: 6,
                  fontWeight: 900,
                  fontFamily: "'Syne'",
                  fontSize: "1rem",
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
