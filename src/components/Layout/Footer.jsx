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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Logo from "../../assets/images/LOGOTIPO-EVENTOS.webp";
import { PrivacyPolicyModal } from "../sections/PrivacyPolicyModal";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const [openPolicy, setOpenPolicy] = useState(false);

  const currentYear = new Date().getFullYear();

  // Paleta Consistente y Vibrante
  const brandPink = "#E11D74";
  const darkText = "#2B1E22";
  const lightBg = "#FFF5F8"; // Rosa ultrasuave para fondo de sección

  return (
    <Box
      component='footer'
      sx={{
        bgcolor: lightBg,
        pt: { xs: 8, md: 10 },
        pb: 5,
        width: "100%",
        color: darkText,
        borderTop: "1px solid rgba(225, 29, 116, 0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth='xl'>
        <Grid container spacing={{ xs: 5, md: 4 }} alignItems='center'>
          {/* Columna 1: Branding e Identidad */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Box
                component='img'
                src={Logo}
                alt='Wapizima Events'
                sx={{
                  height: { xs: 65, md: 75 },
                  width: "auto",
                  mb: 2.5,
                  objectFit: "contain",
                }}
              />
              <Typography
                sx={{
                  color: "rgba(43, 30, 34, 0.75)",
                  lineHeight: 1.7,
                  maxWidth: 460,
                  fontSize: "0.92rem",
                  mb: 3.5,
                  fontWeight: 450,
                }}
              >
                Conéctate con los eventos y la educación de nail art más grande
                de México. Asegura tu lugar en las mejores experiencias en vivo
                y eleva el estándar de tu talento junto a nosotros.
              </Typography>

              {/* Redes Sociales */}
              <Stack direction='row' spacing={1.5}>
                {[
                  { icon: InstagramIcon, url: "https://instagram.com" },
                  { icon: FacebookIcon, url: "https://facebook.com" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <IconButton
                      key={i}
                      component='a'
                      href={item.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      sx={{
                        color: brandPink,
                        bgcolor: "rgba(225, 29, 116, 0.06)",
                        border: "1px solid rgba(225, 29, 116, 0.18)",
                        borderRadius: "14px",
                        p: 1.2,
                        transition:
                          "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        "&:hover": {
                          bgcolor: brandPink,
                          color: "#FFFFFF",
                          transform: "translateY(-4px)",
                          boxShadow: "0 8px 20px rgba(225, 29, 116, 0.28)",
                        },
                      }}
                    >
                      <Icon sx={{ fontSize: 20 }} />
                    </IconButton>
                  );
                })}
              </Stack>
            </Box>
          </Grid>

          {/* Columna 2: Indicador de Temporada & Scroll Top */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-end" },
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                textAlign: { xs: "center", md: "right" },
                mb: 3,
                userSelect: "none",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "4rem", md: "5.5rem" },
                  color: "rgba(225, 29, 116, 0.12)",
                  lineHeight: 0.8,
                  letterSpacing: "-0.04em",
                  fontFamily: "monospace, sans-serif",
                }}
              >
                {currentYear}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  color: darkText,
                  mt: 1,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                TEMPORADA • <span style={{ color: brandPink }}>ÉLITE</span>
              </Typography>
            </Box>

            <IconButton
              onClick={scrollToTop}
              aria-label='Volver arriba'
              sx={{
                bgcolor: "#FFFFFF",
                border: "1px solid rgba(225, 29, 116, 0.2)",
                color: brandPink,
                borderRadius: "14px",
                width: 48,
                height: 48,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                "&:hover": {
                  bgcolor: brandPink,
                  color: "#FFFFFF",
                  boxShadow: "0 8px 22px rgba(225, 29, 116, 0.35)",
                  transform: "translateY(-4px)",
                },
                "&:active": { transform: "translateY(-1px)" },
              }}
            >
              <ArrowUpwardIcon fontSize='small' />
            </IconButton>
          </Grid>
        </Grid>

        <Divider
          sx={{
            borderColor: "rgba(225, 29, 116, 0.1)",
            mt: { xs: 5, md: 7 },
            mb: 4,
          }}
        />

        {/* Bottom Bar / Copyright */}
        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          justifyContent='space-between'
          alignItems='center'
          spacing={2}
        >
          <Typography
            sx={{
              color: "rgba(43, 30, 34, 0.5)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            © {currentYear} EVENTOS WAPIZIMA | TODOS LOS DERECHOS RESERVADOS
          </Typography>

          <Stack direction='row' spacing={3}>
            <Typography
              component='button'
              onClick={() => setOpenPolicy(true)}
              sx={{
                background: "none",
                border: "none",
                padding: 0,
                color: "rgba(43, 30, 34, 0.65)",
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                cursor: "pointer",
                transition: "color 0.2s ease",
                "&:hover": { color: brandPink },
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
