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
        // CAMBIO: Gradiente Esmeralda a Salvia (Inmersivo)
        background: "linear-gradient(0deg, #062C22 0%, #668678 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Texto de fondo - Marca de agua elegante */}
      <Typography
        sx={{
          position: "absolute",
          top: { xs: "5%", md: "10%" },
          right: { xs: "10%", md: "50%" },
          fontSize: { xs: "40vw", md: "25vw" },
          fontWeight: 900,
          fontFamily: "'Syne', sans-serif",
          // CAMBIO: Dorado con muy baja opacidad
          color: "rgba(212, 175, 55, 0.15)",
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
                  letterSpacing: "0.5em",
                  color: "#D4AF37", // CAMBIO: Dorado Mate
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
                  color: "#FFFFFF", // CAMBIO: Blanco para contraste
                  mb: 4,
                }}
              >
                Donde la <br />
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "#D4AF37",
                  }}
                >
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
                    color: "rgba(255, 255, 255, 0.8)", // Blanco seda
                    fontWeight: 300,
                  }}
                >
                  Expo Belleza & Barberías es el epicentro donde{" "}
                  <strong style={{ fontWeight: 600, color: "#D4AF37" }}>
                    el prestigio y la innovación
                  </strong>{" "}
                  convergen para redefinir el futuro de la estética en México.
                </Typography>

                <Box
                  sx={{
                    pl: { xs: 0, md: 3 },
                    // CAMBIO: Borde Dorado
                    borderLeft: { xs: "none", md: "2px solid #D4AF37" },
                    borderTop: {
                      xs: "1px solid rgba(212, 175, 55, 0.3)",
                      md: "none",
                    },
                    pt: { xs: 4, md: 0 },
                  }}
                >
                  <Typography
                    variant='body2'
                    sx={{
                      fontSize: "1rem",
                      color: "rgba(255, 255, 255, 0.6)",
                      lineHeight: 1.7,
                      mb: 2,
                    }}
                  >
                    Con el respaldo y la sólida infraestructura de{" "}
                    <strong style={{ color: "#FFF" }}>Publicidad Mahur</strong>,
                    integramos más de 15 años de experiencia en la creación de
                    eventos.
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Syne'",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "#D4AF37",
                      letterSpacing: "0.1em",
                    }}
                  >
                    LIDERANDO LA PRODUCCIÓN DE EXPERIENCIAS B2B
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
              {/* Imagen Principal con Marco Industrial/Lujo */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  p: { xs: 1, md: 1 },
                  bgcolor: "rgba(212, 175, 55, 0.1)", // Glow dorado muy tenue
                  backdropFilter: "blur(10px)",
                  borderRadius: "2px", // Look más recto y serio para barbería
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                }}
              >
                <Box
                  component='img'
                  src='https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1170&auto=format&fit=crop'
                  alt='The Experience'
                  sx={{
                    width: "100%",
                    height: { xs: "350px", md: "550px" },
                    objectFit: "cover",
                    borderRadius: "0px",
                    // Filtro más dramático para encajar con el verde
                    filter: "contrast(1.1) brightness(0.9)",
                    display: "block",
                  }}
                />
              </Box>

              {/* Marco decorativo - Dorado sutil */}
              <Box
                sx={{
                  position: "absolute",
                  inset: { xs: "-10px", md: "-30px" },
                  border: "1px solid #D4AF37",
                  zIndex: 1,
                  borderRadius: "2px",
                  opacity: 0.2,
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
