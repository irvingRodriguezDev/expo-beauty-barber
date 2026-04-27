import {
  Box,
  Container,
  Typography,
  Divider,
  IconButton,
  Stack,
  Grid,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Logo from "../../assets/images/logo-wapizima.webp";
import { useState } from "react";
import { PrivacyPolicyModal } from "../sections/PrivacyPolicyModal";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const [openPolicy, setOpenPolicy] = useState(false);

  // --- PALETA LIGERA Y CLARA ---
  const lightPinkBg = "#FFD9E2"; // Fondo crema rosado muy ligero
  const softRose = "#FFB7CE"; // Rosa pastel para acentos
  const deepText = "#3D2B2F"; // Gris cálido oscuro para textos legibles
  const mediumRose = "#F2A7C0"; // Rosa un poco más intenso para hovers
  // -----------------------------

  const navLinks = [
    { name: "INICIO", id: "hero" },
    { name: "VISITANTES", id: "visitantes" },
    { name: "EXPOSITORES", id: "expositores" },
    { name: "BOLETOS", id: "register" },
  ];

  return (
    <Box
      component='footer'
      sx={{
        bgcolor: lightPinkBg,
        pt: { xs: 8, md: 12 },
        pb: 6,
        width: "100%",
        color: deepText,
        borderTop: `1px solid rgba(255, 183, 206, 0.3)`, // Línea sutil superior
      }}
    >
      <Container maxWidth='xl'>
        <Grid container spacing={{ xs: 6, md: 4 }}>
          {/* Columna 1: Brand Identity */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              component='img'
              src={Logo}
              alt='Expo Beauty & Barber'
              sx={{
                height: { xs: 120, md: 100 },
                width: "auto",
                mb: 3,
                display: "block",
                // Quitamos el filtro invert ya que el fondo es claro
              }}
            />
            <Typography
              sx={{
                color: "rgba(61, 43, 47, 0.7)",
                lineHeight: 1.8,
                maxWidth: { xs: "100%", sm: 340 },
                fontSize: "0.95rem",
                mb: 4,
              }}
            >
              El punto de encuentro donde tu talento florece y se conecta con la
              comunidad de nail art más grande de México. Celebramos siete años
              elevando juntas el estándar de nuestra industria.
            </Typography>

            <Stack
              direction='row'
              spacing={1.5}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              {[InstagramIcon, FacebookIcon, LinkedInIcon].map((Icon, i) => (
                <IconButton
                  key={i}
                  sx={{
                    color: softRose,
                    border: `1px solid ${softRose}`,
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: softRose,
                      color: "#FFF",
                      transform: "translateY(-5px)",
                      boxShadow: `0 5px 15px rgba(255, 183, 206, 0.4)`,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Columna 2: Navegación */}
          <Grid item xs={6} sm={6} md={2}>
            <Typography
              sx={{
                color: "",
                fontWeight: 800,
                bgcolor: "#FFCBDA",
                mb: 4,
                fontSize: "0.75rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                width: "fit-content",
                display: "inline-block",
              }}
            >
              Navegación
            </Typography>
            <Stack spacing={2}>
              {navLinks.map((link) => (
                <Typography
                  key={link.name}
                  component='a'
                  href={`#${link.id}`}
                  sx={{
                    color: deepText,
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    transition: "0.3s",
                    letterSpacing: "0.1em",
                    "&:hover": { color: softRose, pl: 1 },
                  }}
                >
                  {link.name}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Columna 3: Sede */}
          <Grid item xs={6} sm={6} md={3}>
            <Typography
              sx={{
                color: "",
                bgcolor: "#FFCBDA",
                fontWeight: 800,
                mb: 4,
                fontSize: "0.75rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                width: "fit-content",
                display: "inline-block",
              }}
            >
              La Sede
            </Typography>
            <Typography
              sx={{
                color: deepText,
                fontSize: "0.85rem",
                lineHeight: 2,
                mb: 3,
                fontWeight: 500,
              }}
            >
              <strong style={{ color: deepText }}>WTC Ciudad de México</strong>{" "}
              <br />
              Montecito 38, Col. Nápoles <br />
              CP 03810, CDMX.
            </Typography>
            <Typography
              component='a'
              href='#'
              target='_blank'
              sx={{
                color: deepText,
                fontWeight: 800,
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textDecoration: "none",
                borderBottom: `2px solid ${softRose}`,
                pb: 0.5,
                "&:hover": { color: deepText, borderColor: deepText },
                transition: "0.3s",
                width: "fit-content",
                display: "inline-block",
                bgcolor: "#FFCBDA",
              }}
            >
              GOOGLE MAPS →
            </Typography>
          </Grid>

          {/* Columna 4: Fecha & Scroll */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{
              textAlign: { xs: "center", md: "right" },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-end" },
            }}
          >
            <Box sx={{ position: "relative", mb: 4 }}>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "4rem", md: "5.5rem" },
                  color: "rgba(238, 111, 151, 0.5)", // Rosa fantasma sobre fondo claro
                  lineHeight: 0.7,
                }}
              >
                2026
              </Typography>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1.8rem",
                  color: deepText,
                  mt: -2,
                }}
              >
                6 <span style={{ color: softRose }}></span> JUNIO
              </Typography>
            </Box>

            <IconButton
              onClick={scrollToTop}
              sx={{
                bgcolor: "white",
                border: `1px solid ${softRose}`,
                color: softRose,
                borderRadius: 2,
                width: 50,
                height: 50,
                transition: "0.3s",
                "&:hover": {
                  bgcolor: softRose,
                  color: "#FFF",
                  boxShadow: `0 8px 20px rgba(255, 183, 206, 0.3)`,
                },
              }}
            >
              <ArrowUpwardIcon fontSize='small' />
            </IconButton>
          </Grid>
        </Grid>

        <Divider
          sx={{
            borderColor: "rgba(0, 0, 0, 0.05)",
            mt: { xs: 8, md: 10 },
            mb: 4,
          }}
        />

        {/* Bottom Bar */}
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          justifyContent='space-between'
          alignItems='center'
          spacing={3}
        >
          <Typography
            sx={{
              color: "rgba(61, 43, 47, 0.4)",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
            }}
          >
            © 2026 CONVENCIÓN WAPIZIMA | TODOS LOS DERECHOS RESERVADOS
          </Typography>

          <Stack direction='row' spacing={{ xs: 2, md: 4 }}>
            {["POLITICA DE PRIVACIDAD"].map((item) => (
              <Typography
                key={item}
                component='a'
                href={
                  item === "CONTACTO"
                    ? "mailto:contacto@expobellezaybarberias.com"
                    : "#"
                }
                onClick={(e) => {
                  if (item === "POLITICA DE PRIVACIDAD") {
                    e.preventDefault();
                    setOpenPolicy(true);
                  }
                }}
                sx={{
                  color: "rgba(61, 43, 47, 0.6)",
                  fontSize: "0.7rem",
                  textDecoration: "none",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": { color: softRose },
                }}
              >
                {item}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Container>

      <PrivacyPolicyModal
        open={openPolicy}
        onClose={() => setOpenPolicy(false)}
      />
    </Box>
  );
}
