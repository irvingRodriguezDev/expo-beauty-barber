import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function MapSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box
      ref={ref}
      component='section'
      sx={{
        py: { xs: 12, md: 20 },
        // CAMBIO: Gradiente Esmeralda a Salvia
        background: "linear-gradient(180deg, #062C22 0%, #668678 100%)",
        position: "relative",
      }}
    >
      <Container maxWidth='xl'>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "0.8fr 1.2fr" },
            gap: { xs: 6, lg: 10 },
            alignItems: "center",
          }}
        >
          {/* Texto Informativo Estilo Concierge */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Typography
              sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.4em",
                color: "#D4AF37", // CAMBIO: Dorado
                textTransform: "uppercase",
                mb: 3,
              }}
            >
              UBICACIÓN PRESTIGIO
            </Typography>
            <Typography
              variant='h2'
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontSize: { xs: "2.5rem", md: "4rem" },
                color: "#FFFFFF", // CAMBIO: Blanco
                lineHeight: 1.1,
                mb: 3,
              }}
            >
              WTC <br />
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#D4AF37",
                }}
              >
                Ciudad de México
              </span>
            </Typography>

            <Typography
              variant='body1'
              sx={{
                color: "rgba(255, 255, 255, 0.7)", // Blanco suave
                fontSize: "1.1rem",
                mb: 4,
                lineHeight: 1.8,
                maxWidth: 400,
              }}
            >
              El centro de convenciones más emblemático del país abre sus
              puertas para recibir a la élite de la industria de la belleza.
            </Typography>

            <Box
              sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 5 }}
            >
              <LocationOnIcon sx={{ color: "#D4AF37", mt: 0.5 }} />
              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#FFFFFF",
                    fontFamily: "'Syne'",
                    letterSpacing: "0.05em",
                  }}
                >
                  MONTECITO 38
                </Typography>
                <Typography
                  sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.9rem" }}
                >
                  Col. Nápoles, Benito Juárez, <br />
                  CP 03810, CDMX.
                </Typography>
              </Box>
            </Box>

            <Button
              component='a'
              href='https://maps.google.com'
              target='_blank'
              variant='outlined'
              endIcon={<OpenInNewIcon />}
              sx={{
                borderRadius: 0, // Bordes rectos para mayor seriedad
                borderColor: "#D4AF37",
                color: "#D4AF37",
                px: 4,
                py: 1.5,
                fontWeight: 700,
                fontFamily: "'Syne'",
                letterSpacing: "0.1em",
                "&:hover": {
                  borderColor: "#FFFFFF",
                  color: "#FFFFFF",
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              CÓMO LLEGAR
            </Button>
          </motion.div>

          {/* El Mapa con Frame de Diseño Premium */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ position: "relative" }}
          >
            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                p: { xs: 0.5, md: 1 },
                bgcolor: "rgba(212, 175, 55, 0.2)", // Borde dorado tenue
                borderRadius: 1,
                boxShadow: "0 50px 100px rgba(0, 0, 0, 0.4)",
              }}
            >
              <Box
                sx={{
                  aspectRatio: { xs: "1/1", md: "16/9" },
                  overflow: "hidden",
                  borderRadius: 0,
                  // CAMBIO: Filtro para que el mapa se vea oscuro y minimalista
                  filter:
                    "grayscale(1) contrast(1.2) invert(0.9) brightness(0.8)",
                }}
              >
                <iframe
                  title='WTC Ciudad de México'
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.155462526553!2d-99.17474412391035!3d19.394145981878496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff719e782633%3A0x63a3560647f3f6e5!2sWorld%20Trade%20Center%20Ciudad%20de%20M%C3%A9xico!5e0!3m2!1ses-419!2smx!4v1712431234567!5m2!1ses-419!2smx'
                  width='100%'
                  height='100%'
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading='lazy'
                />
              </Box>
            </Box>

            {/* Elemento Decorativo: Marco Dorado Flotante */}
            <Box
              sx={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "100%",
                height: "100%",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
