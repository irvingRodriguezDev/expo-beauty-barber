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
        background: "linear-gradient(180deg, #F9A8D4 0%, #FAF8F5 100%)",
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
                color: "#BE185D",
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
                color: "#2D0A1A",
                lineHeight: 1.1,
                mb: 3,
              }}
            >
              WTC <br />
              <span
                className='gradient-text'
                style={{ fontStyle: "italic", fontWeight: 500 }}
              >
                Ciudad de México
              </span>
            </Typography>

            <Typography
              variant='body1'
              sx={{
                color: "#7D4A5F",
                fontSize: "1.1rem",
                mb: 4,
                lineHeight: 1.8,
                maxWidth: 400,
              }}
            >
              El centro de convenciones más emblemático del país abre sus
              puertas para recibir a la élite de la industria.
            </Typography>

            <Box
              sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 5 }}
            >
              <LocationOnIcon sx={{ color: "#EC4899", mt: 0.5 }} />
              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#2D0A1A",
                    fontFamily: "'Syne'",
                  }}
                >
                  MONTECITO 38
                </Typography>
                <Typography sx={{ color: "#7D4A5F", fontSize: "0.9rem" }}>
                  Col. Nápoles, Benito Juárez, <br />
                  CP 03810, CDMX.
                </Typography>
              </Box>
            </Box>

            <Button
              component='a'
              href='https://maps.google.com/?q=World+Trade+Center+Mexico+City'
              target='_blank'
              variant='outlined'
              endIcon={<OpenInNewIcon />}
              sx={{
                borderRadius: 4,
                borderColor: "#2D0A1A",
                color: "#2D0A1A",
                px: 4,
                py: 1.5,
                fontWeight: 700,
                "&:hover": {
                  borderColor: "#EC4899",
                  color: "#EC4899",
                  bgcolor: "transparent",
                },
              }}
            >
              CÓMO LLEGAR
            </Button>
          </motion.div>

          {/* El Mapa con Frame de Diseño */}
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
                p: { xs: 1, md: 2 },
                bgcolor: "#FFF",
                borderRadius: 4,
                boxShadow: "0 50px 100px rgba(131, 24, 67, 0.1)",
              }}
            >
              <Box
                sx={{
                  aspectRatio: { xs: "1/1", md: "16/9" },
                  overflow: "hidden",
                  borderRadius: 4,
                  // Filtro para que el mapa se vea más "estético" y rosado sutil
                  filter:
                    "grayscale(0.2) contrast(1.1) brightness(1.05) sepia(0.1)",
                }}
              >
                <iframe
                  title='WTC Ciudad de México'
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.0585258397654!2d-99.17808512394628!3d19.389218981879734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff4601a5785f%3A0x2553d5a4c3e39b09!2sWorld%20Trade%20Center%20Ciudad%20de%20M%C3%A9xico!5e0!3m2!1ses!2smx!4v1710000000000'
                  width='100%'
                  height='100%'
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading='lazy'
                />
              </Box>
            </Box>

            {/* Elemento Decorativo Flotante (Aura) */}
            <Box
              sx={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "100px",
                height: "100px",
                bgcolor: "#EC4899",
                zIndex: 1,
                opacity: 0.1,
              }}
            />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
