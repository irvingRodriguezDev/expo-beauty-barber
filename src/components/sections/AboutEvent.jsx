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
        py: { xs: 12, md: 20 },
        minHeight: "100vh",
        background: "linear-gradient(0deg, #F9A8D4 0%, #FAF8F5 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decoración de fondo sutil: Texto gigante de agua */}
      <Typography
        sx={{
          position: "absolute",
          top: "10%",
          right: "50%",
          fontSize: "20vw",
          fontWeight: 900,
          fontFamily: "'Syne', sans-serif",
          color: "rgba(236, 72, 154, 0.21)",
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
            gap: { xs: 8, lg: 15 },
            alignItems: "center",
          }}
        >
          {/* Lado Izquierdo: Contenido Editorial */}
          <Box>
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
                  gap: 2,
                }}
              >
                LA EXPERIENCIA
              </Typography>

              <Typography
                variant='h2'
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: { xs: "3rem", md: "4.5rem" },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: "#2D0A1A",
                  mb: 4,
                }}
              >
                Donde la <br />
                <span
                  className='reveal-text'
                  style={{ fontStyle: "italic", fontWeight: 400 }}
                >
                  industria brilla
                </span>
              </Typography>

              <Stack spacing={4} sx={{ maxWidth: 540 }}>
                <Typography
                  variant='body1'
                  sx={{
                    fontSize: "1.2rem",
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

                <Box sx={{ pl: 3, borderLeft: "2px solid #EC4899" }}>
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
                    eventos de gran impacto a nivel nacional.
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

          {/* Lado Derecho: Composición Visual Premium */}
          <Box sx={{ position: "relative" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Imagen Principal con marco de diseño */}
              <Box
                className='glass-card'
                sx={{
                  position: "relative",
                  zIndex: 2,
                  p: 2,
                  borderRadius: "24px",
                  overflow: "hidden",
                }}
              >
                <Box
                  component='img'
                  src='https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  alt='The Experience'
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "16px",
                    filter: "grayscale(20%) contrast(1.1)",
                  }}
                />
              </Box>

              {/* Elementos Flotantes de Lujo */}
              {/* <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  zIndex: 3,
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#2D0A1A",
                    color: "#FFF",
                    p: 4,
                    borderRadius: "50%",
                    width: "140px",
                    height: "140px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Syne'",
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                  >
                    TOP
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}
                  >
                    BRANDS
                  </Typography>
                </Box>
              </motion.div> */}

              {/* Marco decorativo de línea fina */}
              <Box
                sx={{
                  position: "absolute",
                  inset: "-20px",
                  border: "1px solid #EC4899",
                  zIndex: 1,
                  borderRadius: "30px",
                  opacity: 0.3,
                }}
              />
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
