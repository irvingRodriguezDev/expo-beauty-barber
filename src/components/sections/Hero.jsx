import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { useEffect, useState } from "react";
import axios from "axios";
import MethodGet from "../../config/service";
import EventsSlider from "../EventsSlider";

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero({ loading, onOpenPurchase, onViewDetails }) {
  // --- PALETA DE COLORES PREMIUM ---
  const brandPink = "#ee6f97ff";
  const deepText = "#3D2B2F";
  const lightBg = "#FFD9E2";

  // Tomamos solo los 3 eventos más próximos
  const [events, setEvents] = useState([]);
  useEffect(() => {
    let url = "/events";
    MethodGet(url)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((error) => {
        console.log(error, "ocurrio uyn error");
      });
  }, []);

  const nextEvents = events ? events.slice(0, 3) : [];

  return (
    <Box
      component='section'
      sx={{
        position: "relative",
        minHeight: { xs: "auto", md: "100vh" },
        display: "flex",
        alignItems: "center",
        background: lightBg,
        overflow: "hidden",
        pt: { xs: 15, md: 12 },
        pb: { xs: 8, md: 12 },
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

      <Container maxWidth='xl' sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "0.9fr 1.1fr" },
            gap: { xs: 6, lg: 8 },
            alignItems: "center",
          }}
        >
          {/* LADO IZQUIERDO: CONCEPTO GENERAL DE LA PLATAFORMA */}
          <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
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
                  mb: 4,
                  display: "inline-block",
                  px: 2,
                  py: 0.8,
                  width: "fit-content",
                  borderRadius: "4px",
                }}
              >
                Plataforma Oficial de Eventos
              </Typography>
            </motion.div>

            <Box sx={{ mb: 4 }}>
              <Typography
                component='h1'
                variant='h1'
                sx={{
                  fontSize: { xs: "3rem", sm: "4.5rem", lg: "5.5rem" },
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
                  fontSize: { xs: "1.05rem", md: "1.15rem" },
                  maxWidth: 500,
                  mx: { xs: "auto", lg: 0 },
                  mb: 6,
                  color: "rgba(61, 43, 47, 0.8)",
                  lineHeight: 1.8,
                }}
              >
                Sé parte de los congresos, clases magistrales y competencias más
                exclusivos de la industria de las uñas en México. Descubre
                nuestros próximos eventos y asegura tu lugar antes de que se
                agoten.
              </Typography>
            </motion.div>

            <Stack
              direction='row'
              justifyContent={{ xs: "center", lg: "flex-start" }}
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

          {/* LADO DERECHO: TARJETAS DINÁMICAS DE LOS 3 PRÓXIMOS EVENTOS */}
          <Box sx={{ width: "100%", maxWidth: "800px", mx: "auto" }}>
            {" "}
            {/* Agregamos un maxWidth para que una sola tarjeta no se estire infinito en pantallas gigantes */}
            <Typography
              variant='h5'
              sx={{
                color: brandPink,
                fontWeight: 900,
                fontStyle: "italic",
                mb: 3,
                textAlign: { xs: "center", lg: "center" },
                letterSpacing: "-0.01em",
              }}
            >
              Próximos Eventos Disponibles 🔥
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
                onViewDetails={(slug) => console.log("Ver detalle de:", slug)}
                onOpenPurchase={(evt) =>
                  console.log("Abrir modal de compra para:", evt.titulo)
                }
              />
            )}
          </Box>
        </Box>
      </Container>

      {/* Indicador Scroll */}
      <Box
        onClick={() => scrollTo("visitantes")}
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          cursor: "pointer",
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
