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
import Logo from "../../assets/logolargorosa.png";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Box
      component='footer'
      sx={{
        // CAMBIO A FONDO CLARO CON GRADIENTE SUTIL
        background: "linear-gradient(180deg, #FFFFFF 0%, #FFF5F9 100%)",
        pt: { xs: 10, md: 15 },
        pb: 4,
        position: "relative",
        borderTop: "1px solid rgba(236, 72, 153, 0.1)",
      }}
    >
      <Container maxWidth='xl'>
        <Grid container spacing={8}>
          {/* Columna 1: Brand Identity */}
          <Grid item xs={12} md={4}>
            <Box
              component='img'
              src={Logo}
              alt='Expo Beauty & Barber'
              sx={{
                height: 70,
                width: "100%",
                mb: 4,
                // Quitamos el filtro de brillo para que luzca su color original
              }}
            />
            <Typography
              sx={{
                color: "#552F3F",
                lineHeight: 1.8,
                maxWidth: 320,
                fontFamily: "'DM Sans'",
                fontSize: "0.95rem",
                opacity: 0.7,
              }}
            >
              Transformando la industria de la belleza a través de la conexión,
              la educación y los negocios de alto impacto.
            </Typography>

            <Stack direction='row' spacing={1} sx={{ mt: 4 }}>
              {[InstagramIcon, FacebookIcon, LinkedInIcon].map((Icon, i) => (
                <IconButton
                  key={i}
                  sx={{
                    color: "#2D0A1A",
                    bgcolor: "rgba(236, 72, 153, 0.05)",
                    borderRadius: 0,
                    transition: "0.4s",
                    "&:hover": {
                      bgcolor: "#EC4899",
                      color: "#FFF",
                      transform: "translateY(-5px) rotate(8deg)",
                    },
                  }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Columna 2: Navegación */}
          <Grid item xs={6} md={2}>
            <Typography
              sx={{
                color: "#2D0A1A",
                fontFamily: "'Syne'",
                fontWeight: 800,
                mb: 4,
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
              }}
            >
              EXPLORAR
            </Typography>
            <Stack spacing={2}>
              {["CONFERENCIAS", "EXPOSITORES", "BOLETOS", "CONTACTO"].map(
                (link) => (
                  <Typography
                    key={link}
                    component='a'
                    href={`#${link.toLowerCase()}`}
                    sx={{
                      color: "#552F3F",
                      textDecoration: "none",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      transition: "0.3s",
                      "&:hover": { color: "#EC4899", letterSpacing: "0.1em" },
                    }}
                  >
                    {link}
                  </Typography>
                ),
              )}
            </Stack>
          </Grid>

          {/* Columna 3: Sede */}
          <Grid item xs={6} md={3}>
            <Typography
              sx={{
                color: "#2D0A1A",
                fontFamily: "'Syne'",
                fontWeight: 800,
                mb: 4,
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
              }}
            >
              UBICACIÓN
            </Typography>
            <Typography
              sx={{
                color: "#552F3F",
                fontSize: "0.9rem",
                lineHeight: 2,
                mb: 2,
                fontWeight: 500,
              }}
            >
              WTC Ciudad de México <br />
              Montecito 38, Nápoles <br />
              03810, CDMX.
            </Typography>
            <Typography
              sx={{
                color: "#EC4899",
                fontWeight: 800,
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              COMO LLEGAR
            </Typography>
          </Grid>

          {/* Columna 4: Fecha Estilo Editorial */}
          <Grid
            item
            xs={12}
            md={3}
            sx={{ textAlign: { xs: "left", md: "right" } }}
          >
            <Typography
              sx={{
                fontFamily: "'Syne'",
                fontWeight: 900,
                fontSize: { xs: "3.5rem", md: "5.5rem" },
                color: "rgba(236, 72, 153, 0.08)", // Rosa muy clarito de fondo
                lineHeight: 0.8,
                mb: -1,
              }}
            >
              MARZO
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Syne'",
                fontWeight: 800,
                fontSize: "1.8rem",
                color: "#2D0A1A",
                mb: 3,
              }}
            >
              14 <span style={{ color: "#EC4899" }}>•</span> 16
            </Typography>
            <IconButton
              onClick={scrollToTop}
              sx={{
                border: "1px solid #2D0A1A",
                color: "#2D0A1A",
                borderRadius: 0,
                width: 45,
                height: 45,
                transition: "0.4s",
                "&:hover": {
                  bgcolor: "#2D0A1A",
                  color: "#FFF",
                  transform: "scale(1.1)",
                },
              }}
            >
              <ArrowUpwardIcon fontSize='small' />
            </IconButton>
          </Grid>
        </Grid>

        <Divider
          sx={{ borderColor: "rgba(45, 10, 26, 0.06)", mt: 10, mb: 4 }}
        />

        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent='space-between'
          alignItems='center'
          spacing={2}
        >
          <Typography
            sx={{
              color: "#552F3F",
              fontSize: "0.7rem",
              opacity: 0.5,
              fontWeight: 600,
            }}
          >
            © 2027 EXPO BEAUTY & BARBER | CDMX
          </Typography>

          <Stack direction='row' spacing={4}>
            {["PRIVACIDAD", "TÉRMINOS"].map((item) => (
              <Typography
                key={item}
                component='a'
                href='#'
                sx={{
                  color: "#552F3F",
                  fontSize: "0.7rem",
                  textDecoration: "none",
                  fontWeight: 600,
                  opacity: 0.5,
                  "&:hover": { opacity: 1, color: "#EC4899" },
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
