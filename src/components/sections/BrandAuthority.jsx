import { Box, Container, Typography, Grid, Divider } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export const BrandAuthority = () => {
  const brandCyan = "#72F8FF";

  const milestones = [
    {
      icon: <BusinessIcon sx={{ color: brandCyan }} />,
      title: "15 AÑOS",
      desc: "De experiencia liderando exposiciones comerciales en México.",
    },
    {
      icon: <EventAvailableIcon sx={{ color: brandCyan }} />,
      title: "SEDE WTC",
      desc: "Organizadores constantes en el recinto más importante del país.",
    },
    {
      icon: <VerifiedUserIcon sx={{ color: brandCyan }} />,
      title: "SEGURIDAD",
      desc: "Comprometidos con la protección de tu información personal.",
    },
  ];

  return (
    <Box sx={{ py: 10, bgcolor: "rgba(0,0,0,0.2)" }}>
      <Container maxWidth='lg'>
        <Grid container spacing={6} alignItems='center'>
          <Grid item xs={12} md={5}>
            <Typography
              variant='overline'
              sx={{ color: brandCyan, fontWeight: 800, letterSpacing: 3 }}
            >
              RESPALDO ORGANIZATIVO
            </Typography>
            <Typography
              variant='h3'
              sx={{ color: "#FFF", fontWeight: 900, mt: 2, mb: 3 }}
            >
              Publicidad Mahur
            </Typography>
            <Typography
              sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, mb: 4 }}
            >
              Somos una empresa especializada en la creación de puentes
              comerciales. Nuestra política se basa en la seguridad y el
              servicio de excelencia[cite: 2, 3]. Con éxitos comprobados como
              Expo Impresión y PubliFest, hoy consolidamos
              <strong> Expo Belleza y Barbería 2027</strong> bajo los más altos
              estándares.
            </Typography>
          </Grid>

          <Grid item xs={12} md={7}>
            <Grid container spacing={3}>
              {milestones.map((m, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Box
                    sx={{
                      p: 3,
                      height: "100%",
                      borderRadius: 4,
                      border: "1px solid rgba(114, 248, 255, 0.1)",
                      background: "rgba(255,255,255,0.02)",
                      textAlign: "center",
                    }}
                  >
                    {m.icon}
                    <Typography
                      variant='h6'
                      sx={{ color: "#FFF", fontWeight: 800, mt: 2 }}
                    >
                      {m.title}
                    </Typography>
                    <Typography
                      variant='caption'
                      sx={{
                        color: "rgba(255,255,255,0.5)",
                        mt: 1,
                        display: "block",
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
