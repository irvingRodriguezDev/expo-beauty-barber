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
import Logo from "../../assets/LogoRosa.png";

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
        background: "linear-gradient(180deg, #FFFFFF 0%, #FDF2F8 100%)",
        pt: { xs: 10, md: 12 },
        pb: 6,
        position: "relative",
        borderTop: "1px solid rgba(236, 72, 153, 0.15)",
      }}
    >
      <Container maxWidth='xl'>
        <Grid container spacing={{ xs: 6, md: 4 }}>
          {/* Columna 1: Brand Identity */}
          <Grid item xs={12} md={4}>
            <Box
              component='img'
              src={Logo}
              alt='Expo Beauty & Barber'
              sx={{
                height: { xs: 45, md: 55 },
                width: "auto",
                mb: 3,
                filter: "grayscale(0) contrast(1.2)", // Efecto editorial
                transition: "0.4s",
                "&:hover": { filter: "grayscale(0)" },
              }}
            />
            <Typography
              sx={{
                color: "#552F3F",
                lineHeight: 1.8,
                maxWidth: 340,
                fontFamily: "'DM Sans'",
                fontSize: "0.9rem",
                opacity: 0.8,
                mb: 4,
              }}
            >
              El punto de encuentro definitivo donde la maestría técnica se
              fusiona con la visión empresarial del sector belleza en México.
            </Typography>

            <Stack direction='row' spacing={1.5}>
              {[InstagramIcon, FacebookIcon, LinkedInIcon].map((Icon, i) => (
                <IconButton
                  key={i}
                  sx={{
                    color: "#2D0A1A",
                    border: "1px solid rgba(45, 10, 26, 0.1)",
                    borderRadius: 0,
                    transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      bgcolor: "#2D0A1A",
                      color: "#FFF",
                      transform: "translateY(-5px)",
                      borderColor: "#2D0A1A",
                    },
                  }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Columna 2: Navegación Estilizada */}
          <Grid item xs={6} md={2}>
            <Typography
              sx={{
                color: "#2D0A1A",
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
            <Stack spacing={2.5}>
              {navLinks.map((link) => (
                <Typography
                  key={link.name}
                  component='a'
                  href={`#${link.id}`}
                  sx={{
                    color: "#552F3F",
                    textDecoration: "none",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    transition: "0.3s",
                    display: "flex",
                    alignItems: "center",
                    "&::before": {
                      content: '""',
                      width: 0,
                      height: "1px",
                      bgcolor: "#EC4899",
                      mr: 0,
                      transition: "0.3s",
                    },
                    "&:hover": {
                      color: "#EC4899",
                      "&::before": { width: 15, mr: 1.5 },
                    },
                  }}
                >
                  {link.name}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Columna 3: Sede con Iconografía Visual */}
          <Grid item xs={6} md={3}>
            <Typography
              sx={{
                color: "#2D0A1A",
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
                color: "#552F3F",
                fontSize: "0.85rem",
                lineHeight: 2,
                mb: 3,
                fontWeight: 500,
                opacity: 0.9,
              }}
            >
              <strong style={{ color: "#2D0A1A" }}>WTC Ciudad de México</strong>{" "}
              <br />
              Montecito 38, Col. Nápoles <br />
              CP 03810, CDMX.
            </Typography>
            <Typography
              component='a'
              href='https://maps.google.com'
              target='_blank'
              sx={{
                color: "#EC4899",
                fontWeight: 800,
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textDecoration: "none",
                borderBottom: "2px solid #EC4899",
                pb: 0.5,
                transition: "0.3s",
                "&:hover": {
                  bgcolor: "#EC4899",
                  color: "#FFF",
                  px: 1,
                },
              }}
            >
              GOOGLE MAPS →
            </Typography>
          </Grid>

          {/* Columna 4: Data Visual & Scroll */}
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              textAlign: { xs: "left", md: "right" },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <Box sx={{ position: "relative", mb: 4 }}>
              <Typography
                sx={{
                  fontFamily: "'Syne'",
                  fontWeight: 900,
                  fontSize: { xs: "4rem", md: "5.5rem" },
                  color: "rgba(236, 72, 153, 0.08)",
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
                  color: "#2D0A1A",
                  mt: -2,
                }}
              >
                5 <span style={{ color: "#EC4899" }}>.</span> 6 FEB
              </Typography>
            </Box>

            <IconButton
              onClick={scrollToTop}
              sx={{
                border: "1px solid #2D0A1A",
                color: "#2D0A1A",
                borderRadius: "50%",
                width: 50,
                height: 50,
                mt: "auto",
                transition: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  bgcolor: "#2D0A1A",
                  color: "#FFF",
                  transform: "rotate(-45deg)",
                },
              }}
            >
              <ArrowUpwardIcon fontSize='small' />
            </IconButton>
          </Grid>
        </Grid>

        <Divider
          sx={{ borderColor: "rgba(45, 10, 26, 0.08)", mt: 10, mb: 4 }}
        />

        {/* Bottom Bar */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent='space-between'
          alignItems='center'
          spacing={3}
        >
          <Typography
            sx={{
              color: "#552F3F",
              fontSize: "0.65rem",
              opacity: 0.6,
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            © 2027 EXPO BELLEZA & BARBERÍAS | POWERED BY FR
          </Typography>

          <Stack direction='row' spacing={4}>
            {["PRIVACIDAD", "TÉRMINOS", "CONTACTO"].map((item) => (
              <Typography
                key={item}
                component='a'
                href='#'
                sx={{
                  color: "#2D0A1A",
                  fontSize: "0.65rem",
                  textDecoration: "none",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  transition: "0.3s",
                  "&:hover": { color: "#EC4899" },
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
