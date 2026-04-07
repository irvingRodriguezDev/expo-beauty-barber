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
// Asegúrate de que el logo sea una versión clara/blanca si el fondo es muy oscuro
import Logo from "../../assets/LogoNegro.png";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navLinks = [
    { name: "INICIO", id: "hero" },
    { name: "VISITANTES", id: "visitantes" },
    { name: "REGISTRO", id: "register" },
  ];

  return (
    <Box
      component='footer'
      sx={{
        // CAMBIO: Gradiente que termina en el esmeralda más profundo
        background: "linear-gradient(0deg, #041C16 0%, #668678 100%)",
        pt: { xs: 8, md: 12 },
        pb: 6,
        width: "100%",
        color: "#FFF",
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
                height: { xs: 60, md: 80 },
                width: "auto",
                mb: 3,
                display: "block",
                filter: "brightness(0) invert(1)", // Volvemos el logo blanco para el fondo oscuro
              }}
            />
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: 1.8,
                maxWidth: { xs: "100%", sm: 340 },
                fontFamily: "'DM Sans'",
                fontSize: "0.95rem",
                mb: 4,
              }}
            >
              El punto de encuentro definitivo donde la maestría técnica se
              fusiona con la visión empresarial del sector belleza en México.
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
                    color: "#D4AF37",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    borderRadius: 0, // Consistencia con bordes rectos
                    "&:hover": {
                      bgcolor: "#D4AF37",
                      color: "#041C16",
                      transform: "translateY(-5px)",
                    },
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
                color: "#D4AF37",
                fontFamily: "'Syne'",
                fontWeight: 800,
                mb: 4,
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
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
                    color: "rgba(255, 255, 255, 0.8)",
                    textDecoration: "none",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    transition: "0.3s",
                    letterSpacing: "0.1em",
                    "&:hover": { color: "#D4AF37", pl: 1 },
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
                color: "#D4AF37",
                fontFamily: "'Syne'",
                fontWeight: 800,
                mb: 4,
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              La Sede
            </Typography>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "0.85rem",
                lineHeight: 2,
                mb: 3,
                fontWeight: 500,
              }}
            >
              <strong style={{ color: "#FFF" }}>WTC Ciudad de México</strong>{" "}
              <br />
              Montecito 38, Col. Nápoles <br />
              CP 03810, CDMX.
            </Typography>
            <Typography
              component='a'
              href='#'
              target='_blank'
              sx={{
                color: "#D4AF37",
                fontWeight: 800,
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textDecoration: "none",
                borderBottom: "1px solid #D4AF37",
                pb: 0.5,
                "&:hover": { color: "#FFF", borderColor: "#FFF" },
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
            <Box
              sx={{
                position: "relative",
                mb: { xs: 4, md: 4 },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Syne'",
                  fontWeight: 900,
                  fontSize: { xs: "4rem", md: "5.5rem" },
                  color: "rgba(212, 175, 55, 0.1)", // Dorado muy sutil
                  lineHeight: 0.7,
                }}
              >
                2027
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Syne'",
                  fontWeight: 800,
                  fontSize: "1.8rem",
                  color: "#FFFFFF",
                  mt: -2,
                }}
              >
                5 <span style={{ color: "#D4AF37" }}>.</span> 6 FEB
              </Typography>
            </Box>

            <IconButton
              onClick={scrollToTop}
              sx={{
                border: "1px solid #D4AF37",
                color: "#D4AF37",
                borderRadius: 0,
                width: 50,
                height: 50,
                "&:hover": { bgcolor: "#D4AF37", color: "#041C16" },
              }}
            >
              <ArrowUpwardIcon fontSize='small' />
            </IconButton>
          </Grid>
        </Grid>

        <Divider
          sx={{
            borderColor: "rgba(212, 175, 55, 0.2)",
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
              color: "rgba(255, 255, 255, 0.4)",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            © 2027 EXPO BELLEZA & BARBERÍAS | POWERED BY PUBLICIDAD MAHUR
          </Typography>

          <Stack direction='row' spacing={{ xs: 2, md: 4 }}>
            {["PRIVACIDAD", "TÉRMINOS", "CONTACTO"].map((item) => (
              <Typography
                key={item}
                component='a'
                href='#'
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "0.65rem",
                  textDecoration: "none",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  "&:hover": { color: "#D4AF37" },
                }}
              >
                {item}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
