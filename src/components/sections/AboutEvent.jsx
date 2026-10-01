import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Stack, Chip } from "@mui/material";
import convencion from "../../assets/images/convencion.jpg";

export default function AboutEvent() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Paleta Unificada
  const brandPink = "#E11D74";
  const darkText = "#2B1E22";
  const lightBg = "#FFF5F8";
  const borderTone = "rgba(225, 29, 116, 0.15)";

  const tags = [
    "MASTER CLASSES",
    "ZONAS DE EXPERIENCIA",
    "SHOWS EN VIVO",
    "VENTA DIRECTA",
    "CERTIFICACIONES",
  ];

  return (
    <Box
      ref={ref}
      component='section'
      id='visitantes'
      sx={{
        py: { xs: 8, md: 14 },
        bgcolor: lightBg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Marca de agua tipográfica decorativa */}
      <Typography
        aria-hidden='true'
        sx={{
          position: "absolute",
          top: { xs: "2%", md: "4%" },
          right: { xs: "-5%", md: "2%" },
          fontSize: { xs: "18vw", md: "11vw" },
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(225, 29, 116, 0.28)",
          lineHeight: 1,
          userSelect: "none",
          zIndex: 0,
          letterSpacing: "-0.04em",
        }}
      >
        WAPIZIMA
      </Typography>

      <Container maxWidth='xl' sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.1fr 0.9fr" },
            gap: { xs: 6, lg: 10 },
            alignItems: "center",
          }}
        >
          {/* LADO IZQUIERDO: CONTENIDO EDITORIAL */}
          <Box>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Typography
                variant='h2'
                sx={{
                  fontSize: { xs: "2.4rem", sm: "3.2rem", md: "4.2rem" },
                  fontWeight: 900,
                  lineHeight: 1.08,
                  color: darkText,
                  mb: 3.5,
                  letterSpacing: "-0.02em",
                }}
              >
                Donde tu pasión <br />
                <Typography
                  component='span'
                  inheritViewProp
                  sx={{
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: brandPink,
                    fontSize: "inherit",
                    fontFamily: "serif",
                  }}
                >
                  se convierte en arte
                </Typography>
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "1.05rem", md: "1.2rem" },
                  lineHeight: 1.8,
                  color: "rgba(43, 30, 34, 0.8)",
                  fontWeight: 450,
                  mb: 4,
                  maxWidth: 600,
                }}
              >
                Creamos espacios diseñados para inspirar, conectar y acelerar tu
                crecimiento profesional. Cada evento de Wapizima es una
                inmersión total en las últimas tendencias globales de la
                industria del nail art.
              </Typography>

              {/* Bloque Destacado */}
              <Box
                sx={{
                  pl: { xs: 2.5, md: 3.5 },
                  borderLeft: `3px solid ${brandPink}`,
                  bgcolor: "#FFFFFF",
                  p: { xs: 2.5, md: 3.5 },
                  borderRadius: "0 20px 20px 0",
                  boxShadow: "0 10px 30px -10px rgba(225, 29, 116, 0.08)",
                  border: `1px solid ${borderTone}`,
                  borderLeftWidth: 3,
                  mb: 4,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.82rem",
                    fontWeight: 800,
                    letterSpacing: "0.15em",
                    color: brandPink,
                    textTransform: "uppercase",
                    mb: 1,
                  }}
                >
                  Exposición, Networking y Más
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    color: "rgba(43, 30, 34, 0.82)",
                    lineHeight: 1.7,
                    mb: 2.5,
                  }}
                >
                  <strong>Lanzamientos Exclusivos:</strong> Accede de primera
                  mano a colecciones nuevas con precios preferenciales de marca.{" "}
                  <br />
                  <strong>Comunidad de Élite:</strong> Interactúa en zonas de
                  práctica guiada y conecta cara a cara con las master
                  instructors nacionales e internacionales.
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    color: darkText,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    mb: 1.5,
                  }}
                >
                  ¿Qué incluyen nuestras sedes?
                </Typography>

                <Stack
                  direction='row'
                  spacing={1}
                  flexWrap='wrap'
                  useFlexGap
                  sx={{ gap: 1 }}
                >
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size='small'
                      sx={{
                        bgcolor: "rgba(225, 29, 116, 0.06)",
                        color: darkText,
                        border: "1px solid rgba(225, 29, 116, 0.15)",
                        fontWeight: 700,
                        fontSize: "0.68rem",
                        borderRadius: "50px",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: brandPink,
                          color: "#FFFFFF",
                          borderColor: brandPink,
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              <Chip
                label='#COMUNIDADWAPIZIMA'
                sx={{
                  bgcolor: brandPink,
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  letterSpacing: "0.15em",
                  borderRadius: "50px",
                  px: 1,
                }}
              />
            </motion.div>
          </Box>

          {/* LADO DERECHO: COMPOSICIÓN VISUAL CON MARCO FLOTANTE */}
          <Box sx={{ position: "relative" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  borderRadius: { xs: "24px", md: "32px" },
                  overflow: "hidden",
                  boxShadow: "0 20px 40px -15px rgba(225, 29, 116, 0.22)",
                  border: "1px solid rgba(255, 255, 255, 0.8)",
                  height: { xs: 380, md: 580 },
                }}
              >
                <Box
                  component='img'
                  src={convencion}
                  alt='Wapizima Events Elite'
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "scale(1.04)",
                    },
                  }}
                />
              </Box>

              {/* Marco Decorativo Acento */}
              <Box
                sx={{
                  position: "absolute",
                  top: 20,
                  left: -20,
                  width: "100%",
                  height: "100%",
                  borderRadius: { xs: "24px", md: "32px" },
                  border: `2px solid ${brandPink}`,
                  opacity: 0.35,
                  zIndex: 1,
                  pointerEvents: "none",
                  display: { xs: "none", sm: "block" },
                }}
              />
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
