import { useState } from "react";
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
import { PrivacyPolicyModal } from "../sections/PrivacyPolicyModal";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const [openPolicy, setOpenPolicy] = useState(false);

  // Obtener el año en curso dinámicamente
  const currentYear = new Date().getFullYear();

  // --- PALETA LIGERA Y CLARA ---
  const lightPinkBg = "#FFD9E2";
  const softRose = "#FFB7CE";
  const deepText = "#3D2B2F";
  // -----------------------------

  const navLinks = [
    { name: "INICIO", id: "inicio" },
    { name: "VISITANTES", id: "visitantes" },
    { name: "BOLETOS", id: "events-list" },
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
        borderTop: `1px solid rgba(255, 183, 206, 0.3)`,
      }}
    >
      <Container maxWidth='xl'>
        <Grid container spacing={{ xs: 6, md: 4 }}>
          {/* Columna 1: Identidad de Marca */}
          <Grid item xs={12} sm={6} md={6}>
            <Box
              component='img'
              src={Logo}
              alt='Wapizima Events'
              sx={{
                height: { xs: 110, md: 90 },
                width: "auto",
                mb: 3,
                display: "block",
              }}
            />
            <Typography
              sx={{
                color: "rgba(61, 43, 47, 0.75)",
                lineHeight: 1.8,
                maxWidth: { xs: "100%", sm: 340 },
                fontSize: "0.95rem",
                mb: 4,
              }}
            >
              Conéctate con los eventos y la educación de nail art más grande de
              México. Asegura tu lugar en las mejores experiencias en vivo y
              eleva el estándar de tu talento junto a nosotros
            </Typography>

            <Stack
              direction='row'
              spacing={1.5}
              sx={{
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              {[InstagramIcon, FacebookIcon].map((Icon, i) => (
                <IconButton
                  key={i}
                  sx={{
                    color: softRose,
                    border: `1px solid ${softRose}`,
                    borderRadius: "12px",
                    "&:hover": {
                      bgcolor: softRose,
                      color: "#FFF",
                      transform: "translateY(-4px)",
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
          {/* <Grid item xs={6} sm={6} md={2}>
            <Typography
              sx={{
                fontWeight: 800,
                bgcolor: "#FFCBDA",
                mb: 4,
                fontSize: "0.75rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                width: "fit-content",
                display: "inline-block",
                px: 1,
                py: 0.2,
                borderRadius: "2px",
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
          </Grid> */}

          {/* Columna 3: Sede Principal / Oficinas */}
          {/* <Grid item xs={6} sm={6} md={3}>
            <Typography
              sx={{
                bgcolor: "#FFCBDA",
                fontWeight: 800,
                mb: 4,
                fontSize: "0.75rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                width: "fit-content",
                display: "inline-block",
                px: 1,
                py: 0.2,
                borderRadius: "2px",
              }}
            >
              Corporativo
            </Typography>
            <Typography
              sx={{
                color: deepText,
                fontSize: "0.85rem",
                lineHeight: 1.8,
                mb: 3,
                fontWeight: 500,
              }}
            >
              <strong style={{ color: deepText }}>Wapizima Oficial</strong>{" "}
              <br />
              Atención a Clientes y Distribución <br />
              Sedes Recurrentes: CDMX y Guadalajara.
            </Typography>
            <Typography
              component='a'
              href='https://maps.google.com'
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                color: deepText,
                fontWeight: 800,
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textDecoration: "none",
                borderBottom: `2px solid ${softRose}`,
                pb: 0.5,
                "&:hover": { color: softRose, borderColor: softRose },
                transition: "0.3s",
                width: "fit-content",
                display: "inline-block",
              }}
            >
              VER DIRECCIONES →
            </Typography>
          </Grid> */}

          {/* Columna 4: Fecha Dinámica Automática & Scroll */}
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            sx={{
              textAlign: { xs: "center", md: "right" },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-end" },
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ position: "relative", mb: { xs: 4, md: 0 } }}>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "3.5rem", md: "5rem" },
                  color: "rgba(238, 111, 151, 0.45)",
                  lineHeight: 0.8,
                }}
              >
                {currentYear}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  color: deepText,
                  mt: 0.5,
                  letterSpacing: "0.1em",
                }}
              >
                TEMPORADA • <span style={{ color: softRose }}>ÉLITE</span>
              </Typography>
            </Box>

            <IconButton
              onClick={scrollToTop}
              sx={{
                bgcolor: "white",
                border: `1px solid ${softRose}`,
                color: softRose,
                borderRadius: "12px",
                width: 48,
                height: 48,
                transition: "0.3s",
                "&:hover": {
                  bgcolor: softRose,
                  color: "#FFF",
                  boxShadow: `0 8px 20px rgba(255, 183, 206, 0.3)`,
                  transform: "translateY(-3px)",
                },
              }}
            >
              <ArrowUpwardIcon fontSize='small' />
            </IconButton>
          </Grid>
        </Grid>

        <Divider
          sx={{
            borderColor: "rgba(61, 43, 47, 0.08)",
            mt: { xs: 6, md: 8 },
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
              color: "rgba(61, 43, 47, 0.45)",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            © {currentYear} EVENTOS WAPIZIMA | TODOS LOS DERECHOS RESERVADOS
          </Typography>

          <Stack direction='row' spacing={{ xs: 2, md: 4 }}>
            <Typography
              component='a'
              href='#'
              onClick={(e) => {
                e.preventDefault();
                setOpenPolicy(true);
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
              POLÍTICA DE PRIVACIDAD
            </Typography>
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
