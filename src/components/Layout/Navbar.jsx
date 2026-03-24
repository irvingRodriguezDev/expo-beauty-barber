import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppBar, Box, Container, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const navLinks = [
  { label: "Inicio", to: "inicio" },
  { label: "Visitantes", to: "visitantes" },
  { label: "Expositores", to: "expositores" },
  { label: "Contacto", to: "contacto" },
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
            background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            borderBottom: scrolled
              ? "1px solid rgba(255,255,255,0.06)"
              : "none",
            transition: "all 0.3s ease",
            py: scrolled ? 1 : 2,
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
                sx={{ cursor: "pointer", lineHeight: 1 }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.4rem",
                    letterSpacing: "0.12em",
                    background:
                      "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1.1,
                  }}
                >
                  EXPO BEAUTY
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    color: "#666",
                    textTransform: "uppercase",
                  }}
                >
                  & Barber Emprende 2026
                </Typography>
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
                    <Typography
                      component='button'
                      onClick={() => scrollTo(link.to)}
                      sx={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: active === link.to ? "#C9A84C" : "#ABABAB",
                        transition: "color 0.2s",
                        p: 0,
                        "&:hover": { color: "#F5F0E8" },
                      }}
                    >
                      {link.label}
                    </Typography>
                    {active === link.to && (
                      <motion.div
                        layoutId='nav-indicator'
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "1px",
                          background: "#C9A84C",
                        }}
                      />
                    )}
                  </Box>
                ))}

                {/* CTA */}
                <Box
                  component='button'
                  onClick={() => scrollTo("contacto")}
                  sx={{
                    background: "none",
                    border: "1px solid #C9A84C",
                    cursor: "pointer",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#C9A84C",
                    px: 2.5,
                    py: 1,
                    transition: "all 0.2s",
                    "&:hover": { background: "#C9A84C", color: "#0A0A0A" },
                  }}
                >
                  Quiero exponer
                </Box>
              </Box>

              {/* Mobile burger */}
              <IconButton
                onClick={() => setMenuOpen(!menuOpen)}
                sx={{ display: { md: "none" }, color: "#F5F0E8" }}
              >
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Container>
        </AppBar>
      </motion.div>

      {/* Mobile menu */}
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
              background: "rgba(10,10,10,0.98)",
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
                <Typography
                  component='button'
                  onClick={() => {
                    scrollTo(link.to);
                    setMenuOpen(false);
                  }}
                  sx={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "3rem",
                    letterSpacing: "0.08em",
                    color: "#F5F0E8",
                    "&:hover": { color: "#C9A84C" },
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </Typography>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Box
                component='button'
                onClick={() => {
                  scrollTo("contacto");
                  setMenuOpen(false);
                }}
                sx={{
                  background: "#C9A84C",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#0A0A0A",
                  px: 5,
                  py: 2,
                  mt: 2,
                }}
              >
                Quiero exponer
              </Box>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
