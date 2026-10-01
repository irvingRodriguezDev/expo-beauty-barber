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
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/images/LOGOTIPO-EVENTOS.webp";

const navLinks = [{ label: "Inicio", to: "/" }];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Paleta refinada
  const brandPink = "#E11D74";
  const darkText = "#2B1E22";
  const lightBg = "#FFFFFF";

  // Control de scroll en el body cuando el menú móvil está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        position='fixed'
        elevation={0}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(225, 29, 116, 0.15)"
            : "1px solid transparent",
          boxShadow: scrolled
            ? "0 10px 30px -10px rgba(225, 29, 116, 0.08)"
            : "none",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 1200,
        }}
      >
        <Container maxWidth='xl'>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: { xs: 68, md: 80 },
            }}
          >
            {/* Logo */}
            <Box
              component={Link}
              to='/'
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                "&:hover": { transform: "scale(1.03)" },
                "&:active": { transform: "scale(0.98)" },
              }}
            >
              <Box
                component='img'
                src={Logo}
                alt='Eventos Wapizima'
                sx={{
                  height: { xs: 44, md: 58 },
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* Navegación Desktop */}
            <Stack
              direction='row'
              spacing={4}
              alignItems='center'
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Button
                    key={link.to}
                    component={Link}
                    to={link.to}
                    disableRipple
                    sx={{
                      fontSize: "0.82rem",
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: isActive ? brandPink : darkText,
                      position: "relative",
                      background: "none",
                      px: 1,
                      py: 0.5,
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: isActive ? "100%" : "0%",
                        height: "2px",
                        borderRadius: "2px",
                        bgcolor: brandPink,
                        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      },
                      "&:hover": {
                        color: brandPink,
                        background: "none",
                        "&::after": { width: "100%" },
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                );
              })}

              {/* Botón CTA Mis Boletos */}
              <Button
                component={Link}
                to='/mis-boletos'
                variant='contained'
                startIcon={
                  <ConfirmationNumberIcon
                    sx={{
                      transition: "transform 0.3s ease",
                      ".MuiButton-root:hover &": {
                        transform: "rotate(-12deg) scale(1.1)",
                      },
                    }}
                  />
                }
                sx={{
                  bgcolor: brandPink,
                  color: "#FFFFFF",
                  borderRadius: "50px", // Formulario cápsula más moderno
                  px: 3.5,
                  py: 1.1,
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  boxShadow: "0 4px 14px rgba(225, 29, 116, 0.3)",
                  "&:hover": {
                    bgcolor: "#C21560",
                    color: "#FFFFFF",
                    boxShadow: "0 6px 20px rgba(225, 29, 116, 0.45)",
                    transform: "translateY(-2px)",
                  },
                  "&:active": { transform: "translateY(0)" },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Mis Boletos
              </Button>
            </Stack>

            {/* Dynamic Mobile Toggle Button */}
            <IconButton
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label='Abrir menú'
              sx={{
                display: { md: "none" },
                color: brandPink,
                bgcolor: menuOpen
                  ? "rgba(225, 29, 116, 0.15)"
                  : "rgba(225, 29, 116, 0.08)",
                border: "1px solid rgba(225, 29, 116, 0.2)",
                borderRadius: "12px",
                p: 1.2,
                transition: "all 0.2s ease",
              }}
            >
              <motion.div
                key={menuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex", alignItems: "center" }}
              >
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </motion.div>
            </IconButton>
          </Box>
        </Container>
      </AppBar>

      {/* Menú Móvil Fullscreen */}
      <AnimatePresence>
        {menuOpen && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: 1150,
              backgroundColor: "rgba(255, 255, 255, 0.96)",
              backgroundImage: `radial-gradient(circle at 50% 30%, rgba(225, 29, 116, 0.12) 0%, transparent 70%)`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              px: 3,
            }}
          >
            <Stack
              spacing={4}
              sx={{
                zIndex: 1,
                textAlign: "center",
                width: "100%",
                maxWidth: 320,
              }}
            >
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.to;
                return (
                  <Box
                    key={link.to}
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 + 0.1 }}
                  >
                    <Box
                      component={Link}
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      sx={{
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        color: isActive ? brandPink : darkText,
                        textDecoration: "none",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        display: "inline-block",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          color: brandPink,
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      {link.label}
                    </Box>
                  </Box>
                );
              })}

              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Button
                  component={Link}
                  to='/mis-boletos'
                  variant='contained'
                  fullWidth
                  onClick={() => setMenuOpen(false)}
                  startIcon={<ConfirmationNumberIcon />}
                  sx={{
                    bgcolor: brandPink,
                    color: "#FFFFFF",
                    borderRadius: "50px",
                    py: 1.8,
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    letterSpacing: "0.08em",
                    boxShadow: "0 8px 25px rgba(225, 29, 116, 0.35)",
                    "&:active": { transform: "scale(0.98)" },
                  }}
                >
                  Mis Boletos
                </Button>
              </Box>
            </Stack>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
}
