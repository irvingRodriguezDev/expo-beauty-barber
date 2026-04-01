import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppBar, Box, Container, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../assets/LogoRosa.png";
const navLinks = [
  { label: "Inicio", to: "inicio" },
  { label: "Visitantes", to: "visitantes" },
  // { label: "Expositores", to: "expositores" },
  // { label: "Contacto", to: "contacto" },
];

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map((l) => document.getElementById(l.to));
      const current = sections.findLast(
        (s) => s && s.getBoundingClientRect().top <= 100,
      );
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1100 }}
      >
        <AppBar
          position='static'
          sx={{
            mx: "auto",
            mt: scrolled ? 0 : 2,
            width: scrolled ? "100%" : "95%",
            borderRadius: scrolled ? 0 : "100px",
            transition: "all 0.5s ease",
            // Glassmorphism
            background: scrolled ? "rgba(255, 245, 247, 0.85)" : "transparent",
            boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.05)" : "none",
          }}
        >
          <Container maxWidth={false}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Logo */}
              <Box
                onClick={() => scrollTo("inicio")}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  component='img'
                  src={Logo}
                  alt='Expo Beauty & Barber Emprende 2027'
                  sx={{
                    height: { xs: 40, md: 70 },
                    width: "100%",
                    objectFit: "contain",
                    padding: "10px",
                  }}
                />
              </Box>

              {/* Desktop nav */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 4,
                  alignItems: "center",
                }}
              >
                {navLinks.map((link) => (
                  <Box key={link.to} sx={{ position: "relative", pb: 0.5 }}>
                    <Box
                      component='button'
                      onClick={() => scrollTo(link.to)}
                      sx={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: active === link.to ? "#EC4899" : "#555",
                        transition: "color 0.2s",
                        p: 0,
                        "&:hover": { color: "#BE185D" },
                      }}
                    >
                      {link.label}
                    </Box>
                    {active === link.to && (
                      <motion.div
                        layoutId='nav-indicator'
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "2px",
                          background:
                            "linear-gradient(90deg, #F9A8D4, #BE185D)",
                        }}
                      />
                    )}
                  </Box>
                ))}

                <Box
                  component='button'
                  onClick={() => scrollTo("register")}
                  sx={{
                    background: "transparent",
                    border: "1.5px solid #EC4899",
                    color: "#EC4899",
                    borderRadius: "50px",
                    px: 4,
                    py: 1,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    "&:hover": {
                      background: "linear-gradient(135deg, #F9A8D4, #EC4899)",
                      color: "#fff",
                      borderColor: "transparent",
                    },
                  }}
                >
                  QUIERO ASISTIR
                </Box>
              </Box>

              <IconButton
                onClick={() => setMenuOpen(!menuOpen)}
                sx={{ display: { md: "none" }, color: "#1A1A1A" }}
              >
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Container>
        </AppBar>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1090,
              background: "rgba(250,248,245,0.98)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Box
                  component='button'
                  onClick={() => {
                    scrollTo(link.to);
                    setMenuOpen(false);
                  }}
                  sx={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    color: "#1A1A1A",
                    "&:hover": { color: "#EC4899" },
                    transition: "color 0.2s",
                    display: "block",
                  }}
                >
                  {link.label}
                </Box>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
