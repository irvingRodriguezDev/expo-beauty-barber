import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Stack } from "@mui/material";

export default function AboutEvent() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box
      ref={ref}
      component='section'
      id='visitantes'
      sx={{
        py: { xs: 8, md: 20 },
        minHeight: { xs: "auto", md: "100vh" },
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(0deg, #F9A8D4 0%, #FAF8F5 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Texto de fondo responsivo */}
      <Typography
        sx={{
          position: "absolute",
          top: { xs: "5%", md: "10%" },
          right: { xs: "10%", md: "50%" },
          fontSize: { xs: "40vw", md: "20vw" },
          fontWeight: 900,
          fontFamily: "'Syne', sans-serif",
          color: "rgba(236, 72, 154, 0.12)", // Bajé un poco la opacidad para mejor lectura en móvil
          lineHeight: 1,
          userSelect: "none",
          zIndex: 0,
        }}
      >
        EBB
      </Typography>

      <Container maxWidth='xl' sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1.1fr" },
            gap: { xs: 6, lg: 15 },
            alignItems: "center",
          }}
        >
          {/* Lado Izquierdo: Contenido Editorial */}
          <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", lg: "flex-start" },
                  gap: 2,
                }}
              >
                LA EXPERIENCIA
              </Typography>

              <Typography
                variant='h2'
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                  fontWeight: 800,
                  lineHeight: { xs: 1.2, md: 1.1 },
                  color: "#2D0A1A",
                  mb: 4,
                }}
              >
                Donde la <br />
                <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                  industria brilla
                </span>
              </Typography>

              <Stack
                spacing={4}
                sx={{ maxWidth: { xs: "100%", lg: 540 }, mx: "auto" }}
              >
                <Typography
                  variant='body1'
                  sx={{
                    fontSize: { xs: "1.1rem", md: "1.2rem" },
                    lineHeight: 1.8,
                    color: "#552F3F",
                    fontWeight: 300,
                  }}
                >
                  Expo Belleza & Barberías es el epicentro donde{" "}
                  <strong style={{ fontWeight: 600, color: "#2D0A1A" }}>
                    el prestigio y la innovación
                  </strong>{" "}
                  convergen para redefinir el futuro de la estética en México.
                </Typography>

                <Box
                  sx={{
                    pl: { xs: 0, md: 3 },
                    borderLeft: { xs: "none", md: "2px solid #EC4899" },
                    borderTop: {
                      xs: "1px solid rgba(236, 72, 153, 0.3)",
                      md: "none",
                    },
                    pt: { xs: 4, md: 0 },
                  }}
                >
                  <Typography
                    variant='body2'
                    sx={{
                      fontSize: "1rem",
                      color: "#7D4A5F",
                      lineHeight: 1.7,
                      mb: 2,
                    }}
                  >
                    Con el respaldo y la sólida infraestructura de{" "}
                    <strong style={{ color: "#2D0A1A" }}>
                      Publicidad Mahur
                    </strong>
                    , integramos más de 15 años de experiencia en la creación de
                    eventos.
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Syne'",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "#BE185D",
                      letterSpacing: "0.05em",
                    }}
                  >
                    MÁS DE 15 AÑOS PRODUCIENDO EXPERIENCIAS
                  </Typography>
                </Box>
              </Stack>
            </motion.div>
          </Box>

          {/* Lado Derecho: Composición Visual */}
          <Box
            sx={{
              position: "relative",
              mt: { xs: 4, lg: 0 },
              px: { xs: 2, md: 0 },
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Imagen Principal */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  p: { xs: 1, md: 2 },
                  bgcolor: "rgba(255,255,255,0.3)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "24px",
                  boxShadow: "0 30px 60px rgba(45,10,26,0.12)",
                }}
              >
                <Box
                  component='img'
                  src='https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1170&auto=format&fit=crop'
                  alt='The Experience'
                  sx={{
                    width: "100%",
                    height: { xs: "300px", md: "500px" },
                    objectFit: "cover",
                    borderRadius: "16px",
                    filter: "grayscale(10%) contrast(1.1)",
                    display: "block",
                  }}
                />
              </Box>

              {/* Marco decorativo - Ajustado para no causar scroll horizontal */}
              <Box
                sx={{
                  position: "absolute",
                  inset: { xs: "-10px", md: "-20px" },
                  border: "1px solid #EC4899",
                  zIndex: 1,
                  borderRadius: { xs: "20px", md: "30px" },
                  opacity: 0.3,
                  pointerEvents: "none",
                }}
              />
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
