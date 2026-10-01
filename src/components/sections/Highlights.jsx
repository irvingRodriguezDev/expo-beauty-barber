import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Stack, Chip } from "@mui/material";
import Marquee from "react-fast-marquee";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function Highlights() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Paleta Unificada y Consistente
  const brandPink = "#E11D74";
  const darkText = "#2B1E22";
  const lightBg = "#FFF5F8";
  const borderTone = "rgba(225, 29, 116, 0.12)";

  const benefits = [
    {
      num: "01",
      title: "ALTA TÉCNICA Y ARTE",
      desc: "Domina estructuras de salón, relieves, texturas y las últimas tendencias globales de la mano de las másteres e instructoras más influyentes.",
    },
    {
      num: "02",
      title: "SHOPPING EXCLUSIVO",
      desc: "Accede a todo el stock oficial de la marca con precios preferenciales de exposición y sé la primera en adquirir los lanzamientos de temporada.",
    },
    {
      num: "03",
      title: "COMUNIDAD Y LOGROS",
      desc: "Comparte experiencias con profesionales de todo el país, expande tu red de networking y vive dinámicas únicas diseñadas para impulsar tu negocio.",
    },
  ];

  const marqueeKeywords = [
    "VENTA DE PRODUCTOS",
    "MÚSICA EN VIVO",
    "RIFAS Y PREMIOS",
    "CLASES DE ESTRUCTURA",
    "MICROPINTURA EN GEL",
    "RECONOCIMIENTOS",
    "ZONA DE NETWORKING",
    "LANZAMIENTOS EXCLUSIVOS",
    "RELIEVES Y TEXTURAS",
    "EXPERIENCIA PREMIUM",
  ];

  return (
    <Box
      ref={ref}
      component='section'
      sx={{
        py: { xs: 8, md: 14 },
        bgcolor: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth='xl'
        sx={{ position: "relative", zIndex: 2, mb: { xs: 6, md: 8 } }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: { xs: 6, lg: 10 },
            alignItems: "center",
          }}
        >
          {/* LADO IZQUIERDO: MANIFIESTO Y ENCABEZADO */}
          <Box>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Chip
                label='NUESTRO CAMINO JUNTAS'
                size='small'
                sx={{
                  bgcolor: lightBg,
                  color: brandPink,
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  letterSpacing: "0.12em",
                  borderRadius: "50px",
                  border: `1px solid ${borderTone}`,
                  mb: 2.5,
                  px: 0.5,
                }}
              />

              <Typography
                variant='h2'
                sx={{
                  fontSize: { xs: "2.3rem", sm: "3.2rem", md: "4.2rem" },
                  color: darkText,
                  lineHeight: 1.05,
                  mb: 3,
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                }}
              >
                Más que un evento, <br />
                <Typography
                  component='span'
                  sx={{
                    color: brandPink,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "inherit",
                    fontFamily: "serif",
                  }}
                >
                  una celebración.
                </Typography>
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "1.05rem", md: "1.15rem" },
                  color: "rgba(43, 30, 34, 0.75)",
                  maxWidth: 520,
                  lineHeight: 1.8,
                  fontWeight: 450,
                }}
              >
                Diseñamos experiencias de alto impacto logístico y educativo
                para que te lleves el máximo conocimiento, acceso preferencial a
                insumos premium y recuerdos inolvidables en cada una de nuestras
                sedes.
              </Typography>
            </motion.div>
          </Box>

          {/* LADO DERECHO: PILARES DE EXPERIENCIA */}
          <Box>
            <Stack spacing={2.5}>
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.num}
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 3,
                      p: { xs: 2.5, md: 3 },
                      bgcolor: lightBg,
                      borderRadius: "20px",
                      border: `1px solid ${borderTone}`,
                      transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      "&:hover": {
                        bgcolor: "#FFFFFF",
                        borderColor: brandPink,
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 30px -8px rgba(225, 29, 116, 0.15)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.4rem",
                        fontWeight: 900,
                        color: brandPink,
                        lineHeight: 1,
                        py: 0.5,
                        px: 1.2,
                        borderRadius: "10px",
                        bgcolor: "rgba(225, 29, 116, 0.08)",
                      }}
                    >
                      {benefit.num}
                    </Typography>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: "1.05rem",
                          color: darkText,
                          letterSpacing: "0.02em",
                          mb: 0.5,
                        }}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(43, 30, 34, 0.7)",
                          fontSize: "0.92rem",
                          lineHeight: 1.6,
                        }}
                      >
                        {benefit.desc}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>

      {/* CINTURÓN DINÁMICO DE BENEFICIOS (MARQUEE BELT) */}
      <Box
        sx={{
          width: "106%",
          left: "-3%",
          position: "relative",
          bgcolor: darkText,
          py: 2,
          transform: { xs: "rotate(1deg)", md: "rotate(-1.2deg)" },
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Marquee speed={50} gradient={false}>
          {marqueeKeywords.map((txt, idx) => (
            <Stack
              direction='row'
              alignItems='center'
              key={idx}
              sx={{ mx: { xs: 2, md: 3.5 } }}
            >
              <AutoAwesomeIcon
                sx={{ color: brandPink, mr: 1.8, fontSize: 18 }}
              />
              <Typography
                sx={{
                  fontWeight: 800,
                  color: "#FFFFFF",
                  fontSize: { xs: "0.85rem", md: "0.95rem" },
                  letterSpacing: "0.12em",
                }}
              >
                {txt}
              </Typography>
            </Stack>
          ))}
        </Marquee>
      </Box>
    </Box>
  );
}
