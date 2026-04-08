import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Stack } from "@mui/material";

export default function AboutEvent() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const brandCyan = "#72F8FF";
  const darkPetroleum = "#02181B"; // Oscuridad profunda Midnight

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
        // Fondo profundo para que el contenido "flote"
        bgcolor: darkPetroleum,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Marca de agua EBB - Estilo "Outline" para máxima elegancia */}
      <Typography
        sx={{
          position: "absolute",
          bottom: { xs: "5%", md: "70%" },
          right: { xs: "-5%", md: "45%" },
          fontSize: { xs: "35vw", md: "15vw" },
          fontWeight: 900,
          // fontFamily: "'Syne', sans-serif",
          color: "transparent",
          WebkitTextStroke: "1px rgba(114, 248, 255, 0.29)",
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
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: { xs: 8, lg: 12 },
            alignItems: "center",
          }}
        >
          {/* LADO IZQUIERDO: CONTENIDO EDITORIAL */}
          <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Typography
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 900,
                  letterSpacing: "0.6em",
                  color: brandCyan,
                  textTransform: "uppercase",
                  mb: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", lg: "flex-start" },
                  gap: 2,
                }}
              >
                VISIÓN ESTRATÉGICA
              </Typography>

              <Typography
                variant='h2'
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: { xs: "2.8rem", sm: "3.5rem", md: "5rem" },
                  fontWeight: 900,
                  lineHeight: 1,
                  color: "#FFFFFF",
                  mb: 5,
                  letterSpacing: "-0.02em",
                }}
              >
                Donde la <br />
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: brandCyan,
                    textShadow: `0 0 20px rgba(114, 248, 255, 0.2)`,
                  }}
                >
                  industria brilla
                </span>
              </Typography>

              <Stack
                spacing={5}
                sx={{ maxWidth: { xs: "100%", lg: 560 }, mx: "auto" }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                    lineHeight: 1.7,
                    color: "rgba(255, 255, 255, 0.7)",
                    fontWeight: 300,
                  }}
                >
                  Expo Belleza & Barberías es el epicentro donde el prestigio y
                  la innovación convergen para redefinir el futuro de la
                  estética en México.
                </Typography>

                <Box
                  sx={{
                    pl: { xs: 0, md: 4 },
                    borderLeft: {
                      xs: "none",
                      md: `1px solid rgba(114, 248, 255, 0.3)`,
                    },
                    position: "relative",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      color: "rgba(255, 255, 255, 0.5)",
                      lineHeight: 1.8,
                      mb: 3,
                      // fontFamily: "'DM Sans'",
                    }}
                  >
                    Con el respaldo de <strong>Publicidad Mahur</strong>,
                    integramos más de 15 años de experiencia liderando la
                    producción de experiencias B2B que transforman negocios.
                  </Typography>
                  <Typography
                    sx={{
                      // fontFamily: "'Syne'",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: brandCyan,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    #EBB2027
                  </Typography>
                </Box>
              </Stack>
            </motion.div>
          </Box>

          {/* LADO DERECHO: COMPOSICIÓN VISUAL */}
          <Box sx={{ position: "relative" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Contenedor de Imagen con Frame Flotante */}
              <Box sx={{ position: "relative", zIndex: 2 }}>
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: "400px", md: "650px" },
                    overflow: "hidden",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    position: "relative",
                  }}
                >
                  <Box
                    component='img'
                    src='https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1170&auto=format&fit=crop'
                    alt='Beauty Industry Elite'
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "grayscale(100%) contrast(1.2) brightness(0.8)",
                      transition: "all 0.8s ease",
                      "&:hover": {
                        filter: "grayscale(0%) contrast(1.1) brightness(0.9)",
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                  {/* Gradiente de cierre sobre la imagen */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "30%",
                      background: `linear-gradient(to top, ${darkPetroleum}, transparent)`,
                    }}
                  />
                </Box>

                {/* Badge Flotante en la imagen */}
                {/* <Box
                  sx={{
                    position: "absolute",
                    bottom: -20,
                    right: { xs: 20, md: -20 },
                    bgcolor: brandCyan,
                    color: darkPetroleum,
                    p: 3,
                    minWidth: 160,
                    textAlign: "center",
                    boxShadow: `0 20px 40px rgba(0,0,0,0.5)`,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Syne'",
                      fontWeight: 900,
                      fontSize: "1.5rem",
                      lineHeight: 1,
                    }}
                  >
                    15+
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Syne'",
                      fontWeight: 800,
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    AÑOS DE ÉXITO
                  </Typography>
                </Box> */}
              </Box>

              {/* Elemento decorativo de fondo */}
              <Box
                sx={{
                  position: "absolute",
                  top: -40,
                  left: -40,
                  width: "100%",
                  height: "100%",
                  border: `1px solid rgba(114, 248, 255, 0.1)`,
                  zIndex: 1,
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
