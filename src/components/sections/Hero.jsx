import { motion } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Grid,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import MethodGet from "../../config/service";
import EventsSlider from "../EventsSlider";

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero({ loading, onOpenPurchase, onViewDetails }) {
  // --- PALETA DE COLORES PREMIUM ---
  const brandPink = "#ee6f97ff";
  const deepText = "#3D2B2F";
  const lightBg = "#FFD9E2";

  const [events, setEvents] = useState([]);

  useEffect(() => {
    let url = "/events";
    MethodGet(url)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((error) => {
        console.log(error, "ocurrio un error");
      });
  }, []);

  const nextEvents = events ? events.slice(0, 5) : [];

  return (
    <Box
      component='section'
      sx={{
        position: "relative",
        minHeight: { xs: "auto", lg: "100vh" },
        display: "flex",
        alignItems: "center",
        background: lightBg,
        overflow: "hidden",
        pt: { xs: 14, md: 16, lg: 6 }, // Ajustamos padding superior para que el Navbar no tape el contenido
        pb: { xs: 10, lg: 6 },
      }}
    >
      {/* Decoración sutil de fondo */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "60vw",
          height: "60vw",
          background: `radial-gradient(circle, rgba(255, 183, 206, 0.2) 0%, transparent 70%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* 💡 Envolvemos en un Container para que mantenga un ancho máximo elegante en pantallas gigantes */}
      <Container maxWidth='xl' sx={{ position: "relative", zIndex: 1 }}>
        <Grid
          container
          spacing={{ xs: 6, lg: 4 }} // Más espacio vertical en móvil, más compacto en pantallas grandes
          alignItems='center'
          justifyContent='center'
        >
          {/* LADO IZQUIERDO: CONCEPTO GENERAL (12 en móviles, 6 en pantallas grandes) */}
          <Grid item xs={12} lg={6}>
            <Box
              sx={{
                textAlign: { xs: "center", lg: "left" }, // Alineación centrada en móvil, izquierda en escritorio
                px: { xs: 2, sm: 4, lg: 0 },
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 900,
                    letterSpacing: "0.6em",
                    color: "#FFF",
                    bgcolor: "#3D2B2F",
                    textTransform: "uppercase",
                    mb: 3,
                    display: "inline-block",
                    px: 2,
                    py: 0.8,
                    borderRadius: "4px",
                  }}
                >
                  Plataforma Oficial de Eventos
                </Typography>
              </motion.div>

              <Box sx={{ mb: 3 }}>
                <Typography
                  component='h1'
                  sx={{
                    fontSize: {
                      xs: "2.8rem",
                      sm: "4rem",
                      md: "4.5rem",
                      lg: "5rem",
                    },
                    lineHeight: 0.95,
                    fontWeight: 900,
                    color: deepText,
                    letterSpacing: "-0.02em",
                    mb: 2,
                  }}
                >
                  VIVE LA
                  <br />
                  EXPERIENCIA
                  <br />
                  <span
                    style={{
                      color: brandPink,
                      fontStyle: "italic",
                      fontWeight: 400,
                    }}
                  >
                    WAPIZIMA
                  </span>
                </Typography>
              </Box>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    maxWidth: { xs: 550, lg: 480 },
                    mx: { xs: "auto", lg: 0 }, // Centrado en móvil, alineado a la izq en lg
                    mb: 4,
                    color: "rgba(61, 43, 47, 0.8)",
                    lineHeight: 1.7,
                  }}
                >
                  Sé parte de los congresos, clases magistrales y competencias
                  más exclusivos de la industria de las uñas en México. Descubre
                  nuestros próximos eventos y asegura tu lugar antes de que se
                  agoten.
                </Typography>
              </motion.div>

              <Stack
                direction='row'
                justifyContent={{ xs: "center", lg: "flex-start" }} // Botón a la izquierda en escritorio
              >
                <Button
                  variant='outlined'
                  onClick={() => scrollTo("visitantes")}
                  sx={{
                    borderColor: "rgba(61, 43, 47, 0.3)",
                    color: deepText,
                    borderRadius: "12px",
                    px: 4,
                    py: 1.5,
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    "&:hover": {
                      borderColor: brandPink,
                      color: brandPink,
                      bgcolor: "rgba(255,183,206,0.1)",
                    },
                  }}
                >
                  Conoce más sobre nosotros
                </Button>
              </Stack>
            </Box>
          </Grid>

          {/* LADO DERECHO: SLIDER (12 en móviles, 6 en pantallas grandes) */}
          <Grid item xs={12} lg={6}>
            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", sm: 550, lg: "100%" }, // Evita que el slider se desparrame en tablets
                mx: "auto",
                px: { xs: 2, sm: 0 },
              }}
            >
              <Typography
                variant='h5'
                sx={{
                  color: brandPink,
                  fontWeight: 900,
                  fontStyle: "italic",
                  mb: 3,
                  textAlign: "center",
                  letterSpacing: "-0.01em",
                }}
              >
                Próximos Eventos Disponibles
              </Typography>

              {loading ? (
                <Box display='flex' justifyContent='center' py={6}>
                  <CircularProgress sx={{ color: brandPink }} />
                </Box>
              ) : nextEvents.length === 0 ? (
                <Typography
                  variant='body1'
                  sx={{
                    color: "rgba(61, 43, 47, 0.6)",
                    fontStyle: "italic",
                    textAlign: "center",
                  }}
                >
                  Por el momento no hay eventos programados. ¡Vuelve pronto!
                </Typography>
              ) : (
                <EventsSlider
                  eventos={nextEvents}
                  brandPink='#EE6F97'
                  deepText='#3D2B2F'
                  onViewDetails={onViewDetails}
                  onOpenPurchase={onOpenPurchase}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Indicador Scroll (Oculto en móviles chicos para no amontonar el footer) */}
      <Box
        onClick={() => scrollTo("visitantes")}
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          cursor: "pointer",
          display: { xs: "none", md: "block" },
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <KeyboardArrowDownIcon sx={{ color: brandPink, fontSize: 36 }} />
        </motion.div>
      </Box>
    </Box>
  );
}
