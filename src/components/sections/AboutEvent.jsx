import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Stack } from "@mui/material";
import Makeup from "../../assets/images/makeup.jpg";
export default function AboutEvent() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // --- PALETA COHERENTE ---
  const brandPink = "#ee6f97ff"; // Rosa pastel claro
  const deepText = "#3D2B2F"; // Texto oscuro cálido
  const lightBg = "#FFD9E2"; // Fondo crema rosado
  // -------------------------

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
        bgcolor: lightBg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Marca de agua BWM - Ahora en un rosa sutil para fondo claro */}
      <Typography
        sx={{
          position: "absolute",
          bottom: { xs: "94%", md: "82%" },
          right: { xs: "1%", md: "55%" },
          fontSize: { xs: "20vw", md: "8vw" },
          fontWeight: 800,
          color: "transparent",
          WebkitTextStroke: `3px rgba(238, 111, 151, 2.8)`,
          lineHeight: 1,
          userSelect: "none",
          zIndex: 0,
        }}
      >
        BWM2027
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
                  fontSize: "0.7rem",
                  fontWeight: 900,
                  letterSpacing: "0.6em",
                  color: "",
                  textTransform: "uppercase",
                  mb: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", lg: "flex-start" },
                  gap: 2,
                  width: { xs: "100%", md: "fit-content" },
                  display: "inline-block",
                  bgcolor: "#FFCBDA",
                }}
              >
                VISIÓN ESTRATÉGICA
              </Typography>

              <Typography
                variant='h2'
                sx={{
                  // fontFamily: "'Syne', sans-serif",
                  fontSize: { xs: "2.8rem", sm: "3.5rem", md: "5rem" },
                  fontWeight: 900,
                  lineHeight: 1,
                  color: deepText,
                  mb: 5,
                  letterSpacing: "-0.02em",
                }}
              >
                Donde la <br />
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: brandPink,
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
                    color: "rgba(61, 43, 47, 0.7)",
                    fontWeight: 400,
                  }}
                >
                  Beauty World Mexico es el epicentro donde el prestigio y la
                  innovación convergen para redefinir el futuro de la estética
                  en México.
                </Typography>

                <Box
                  sx={{
                    pl: { xs: 0, md: 4 },
                    borderLeft: {
                      xs: "none",
                      md: `2px solid ${brandPink}`,
                    },
                    position: "relative",
                  }}
                >
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      sx={{
                        fontSize: "1.1rem",
                        color: deepText,
                        fontWeight: 700,
                        mb: 1,
                        // fontFamily: "'Syne', sans-serif",
                      }}
                    >
                      RESPALDO Y EXPERIENCIA
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        color: "rgba(61, 43, 47, 0.7)",
                        lineHeight: 1.7,
                        mb: 3,
                      }}
                    >
                      Organizado por <strong>Publicidad Mahur</strong>, líderes
                      con más de 15 años proyectando negocios en el{" "}
                      <strong>WTC CDMX</strong>. Nuestra trayectoria respalda la
                      calidad y seguridad de cada edición.
                    </Typography>

                    <Typography
                      variant='caption'
                      sx={{
                        color: "",
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        display: "block",
                        mb: 2,
                        width: "fit-content",
                        bgcolor: "#FFCBDA",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "4px",
                      }}
                    >
                      CASOS DE ÉXITO PREVIOS:
                    </Typography>

                    <Stack
                      direction='row'
                      spacing={1}
                      flexWrap='wrap'
                      useFlexGap
                    >
                      {[
                        "Expo Impresión",
                        "PubliFest",
                        "Mundo para la Mujer",
                        "Industrias Creativas",
                      ].map((evento) => (
                        <Box
                          key={evento}
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "4px",
                            border: `1px solid ${brandPink}`,
                            color: deepText,
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            mb: 1,
                            bgcolor: "white",
                          }}
                        >
                          {evento}
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: "",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      width: "fit-content",
                      display: "inline-block",
                      bgcolor: "#FFCBDA",
                    }}
                  >
                    #BWM2027
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
              <Box sx={{ position: "relative", zIndex: 2 }}>
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: "400px", md: "650px" },
                    overflow: "hidden",
                    borderRadius: 1,
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                    position: "relative",
                    boxShadow: "0 20px 40px rgba(61, 43, 47, 0.1)",
                  }}
                >
                  <Box
                    component='img'
                    src={Makeup}
                    alt='Beauty Industry Elite'
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "sepia(20%) contrast(1.1) brightness(0.95)",
                      transition: "all 0.8s ease",
                      "&:hover": {
                        filter: "sepia(0%) contrast(1) brightness(1)",
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                  {/* Gradiente de cierre suave en la base de la imagen */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "20%",
                      background: `linear-gradient(to top, ${lightBg}, transparent)`,
                    }}
                  />
                </Box>
              </Box>

              {/* Elemento decorativo de fondo (Frame) */}
              <Box
                sx={{
                  position: "absolute",
                  top: -30,
                  left: -30,
                  width: "100%",
                  height: "100%",
                  borderRadius: 2,
                  border: `1px solid ${brandPink}`,
                  opacity: 0.4,
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
