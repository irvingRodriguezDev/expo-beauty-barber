import { Box, Container, Typography, Grid } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export const BrandAuthority = () => {
  // --- PALETA COHERENTE ---
  const brandPink = "#ee6f97ff"; // Rosa pastel claro
  const deepText = "#3D2B2F"; // Texto oscuro cálido
  const lightBg = "#FFD9E2"; // Fondo crema rosado
  // -------------------------

  const milestones = [
    {
      icon: <BusinessIcon sx={{ color: brandPink, fontSize: 32 }} />,
      title: "15 AÑOS",
      desc: "De experiencia liderando exposiciones comerciales en México.",
    },
    {
      icon: <EventAvailableIcon sx={{ color: brandPink, fontSize: 32 }} />,
      title: "SEDE WTC",
      desc: "Organizadores constantes en el recinto más importante del país.",
    },
    {
      icon: <VerifiedUserIcon sx={{ color: brandPink, fontSize: 32 }} />,
      title: "SEGURIDAD",
      desc: "Comprometidos con la protección de tu información personal.",
    },
  ];

  return (
    <Box
      sx={{
        py: 10,
        borderY: "1px solid rgba(255, 183, 206, 0.2)",
        bgcolor: lightBg,
      }}
    >
      <Container maxWidth='lg'>
        <Grid container spacing={6} alignItems='center'>
          <Grid item xs={12} md={5}>
            <Typography
              variant='overline'
              sx={{
                color: "",
                fontWeight: 800,
                letterSpacing: 3,
                fontSize: "0.7rem",
                width: "fit-content",
                display: "inline-block",
                bgcolor: "#FFCBDA",
                mb: 2,
                textTransform: "uppercase",
              }}
            >
              RESPALDO ORGANIZATIVO
            </Typography>
            <Typography
              variant='h3'
              sx={{
                color: deepText,
                fontWeight: 900,
                mt: 1,
                mb: 3,
                // fontFamily: "'Syne', sans-serif",
              }}
            >
              Publicidad Mahur
            </Typography>
            <Typography
              sx={{
                color: "rgba(61, 43, 47, 0.7)",
                lineHeight: 1.8,
                mb: 4,
                fontSize: "1.05rem",
              }}
            >
              Somos una empresa especializada en la creación de puentes
              comerciales. Nuestra política se basa en la seguridad y el
              servicio de excelencia. Con éxitos comprobados como Expo Impresión
              y PubliFest, hoy consolidamos
              <strong> Beauty Worl Mexico 2027</strong> bajo los más altos
              estándares de calidad.
            </Typography>
          </Grid>

          <Grid item xs={12} md={7}>
            <Grid container spacing={3}>
              {milestones.map((m, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Box
                    sx={{
                      p: 4,
                      height: "100%",
                      borderRadius: 1,
                      border: "1px solid rgba(255, 183, 206, 0.3)",
                      background: "#FFFFFF",
                      textAlign: "center",
                      boxShadow: "0 10px 30px rgba(61, 43, 47, 0.03)",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    {m.icon}
                    <Typography
                      variant='h6'
                      sx={{
                        color: deepText,
                        fontWeight: 800,
                        mt: 2,
                        fontSize: "1.1rem",
                      }}
                    >
                      {m.title}
                    </Typography>
                    <Typography
                      variant='caption'
                      sx={{
                        color: "rgba(61, 43, 47, 0.6)",
                        mt: 1,
                        display: "block",
                        lineHeight: 1.4,
                        fontWeight: 500,
                      }}
                    >
                      {m.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
