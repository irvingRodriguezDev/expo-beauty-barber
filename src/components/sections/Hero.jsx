import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  Stack,
  Chip,
  Skeleton,
  Grid,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MethodGet from "../../config/service";
import EventCard from "../events/EventCard";

export default function Hero() {
  const brandPink = "#E11D74";
  const darkText = "#2B1E22";
  const lightBg = "#FFF5F8";
  const borderTone = "rgba(225, 29, 116, 0.15)";

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = "/events";
    setLoading(true);
    MethodGet(url)
      .then((res) => {
        setEvents(res.data || []);
      })
      .catch((error) => {
        console.error("Error al obtener eventos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Limitamos a los primeros 6 eventos para el Hero Grid
  const featuredEvents = events ? events.slice(0, 6) : [];

  if (loading) {
    return (
      <Box
        sx={{
          bgcolor: lightBg,
          borderRadius: { xs: 3, md: 4 },
          mt: { xs: 10, md: 12 },
          mb: 4,
          mx: { xs: 2, md: 4 },
          p: { xs: 3, md: 4 },
          border: `1px solid ${borderTone}`,
        }}
      >
        <Stack spacing={3}>
          <Skeleton
            variant='rounded'
            width={240}
            height={32}
            sx={{ bgcolor: "rgba(225, 29, 116, 0.08)", borderRadius: "50px" }}
          />
          <Grid container spacing={3}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Skeleton
                  variant='rounded'
                  width='100%'
                  height={380}
                  sx={{
                    bgcolor: "rgba(225, 29, 116, 0.05)",
                    borderRadius: "20px",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>
    );
  }

  if (featuredEvents.length === 0) {
    return (
      <Box
        sx={{
          bgcolor: lightBg,
          py: 6,
          px: 3,
          textAlign: "center",
          borderRadius: { xs: 4, md: 5 },
          mt: { xs: 10, md: 12 },
          mb: 4,
          mx: { xs: 2, md: 4 },
          border: `1px solid ${borderTone}`,
          boxShadow: "0 10px 30px rgba(225, 29, 116, 0.06)",
        }}
      >
        <Typography
          variant='h6'
          sx={{ color: darkText, fontWeight: 800, mb: 1 }}
        >
          Próximamente más eventos
        </Typography>
        <Typography
          variant='body2'
          sx={{ color: "rgba(43, 30, 34, 0.65)", fontWeight: 500 }}
        >
          Mantente al tanto de nuestras redes para nuevas fechas y
          capacitaciones.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      component='section'
      sx={{
        position: "relative",
        bgcolor: lightBg,
        backgroundImage: `radial-gradient(circle at 80% 20%, rgba(225, 29, 116, 0.08) 0%, transparent 50%),
                          radial-gradient(circle at 10% 90%, rgba(225, 29, 116, 0.05) 0%, transparent 40%)`,
        borderRadius: { xs: 3, md: 4 },
        overflow: "hidden",
        mt: { xs: 10, md: 12 },
        mb: 6,
        mx: { xs: 2, md: 4 },
        p: { xs: 2.5, sm: 3, md: 4 },
        border: `1px solid ${borderTone}`,
        boxShadow: "0 12px 35px -10px rgba(225, 29, 116, 0.08)",
      }}
    >
      <Container maxWidth='xl' disableGutters>
        {/* Encabezado del Hero */}
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          sx={{ mb: 3.5, px: 0.5 }}
        >
          <Chip
            icon={
              <EventAvailableIcon
                sx={{ color: `${brandPink} !important`, fontSize: 16 }}
              />
            }
            label='PRÓXIMOS EVENTOS DESTACADOS'
            size='small'
            sx={{
              backgroundColor: "#FFFFFF",
              color: darkText,
              borderColor: borderTone,
              borderWidth: 1,
              borderStyle: "solid",
              fontWeight: 800,
              letterSpacing: "0.08em",
              fontSize: "0.68rem",
              py: 1.6,
              px: 0.5,
              borderRadius: "50px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          />

          <Typography
            variant='caption'
            sx={{
              color: "rgba(43, 30, 34, 0.6)",
              fontWeight: 700,
              display: { xs: "none", sm: "block" },
            }}
          >
            {featuredEvents.length}{" "}
            {featuredEvents.length === 1
              ? "evento disponible"
              : "eventos disponibles"}
          </Typography>
        </Stack>

        {/* Grid Adaptativo de EventCards */}
        <Grid container spacing={{ xs: 2.5, sm: 3, md: 3.5 }}>
          {featuredEvents.map((evento, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={evento.id || index}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                sx={{ height: "100%" }}
              >
                <EventCard
                  evento={evento}
                  brandPink={brandPink}
                  deepText={darkText}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
