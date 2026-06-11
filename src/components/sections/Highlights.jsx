import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Grid, Stack } from "@mui/material";
import Marquee from "react-fast-marquee";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// Textos conceptuales continuos para los marquees gigantes de fondo
const backgroundItems =
  "• PASIÓN POR EL ARTE • COMUNIDAD DE ÉLITE • EXPERIENCIA TOTAL • CAPACITACIÓN INTERNACIONAL • LANZAMIENTOS EXCLUSIVOS • WAPIZIMA EVENTS • ";

export default function Highlights() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // --- PALETA COHERENTE ---
  const brandPink = "#ee6f97ff";
  const deepText = "#3D2B2F";
  const lightBg = "#FFD9E2";
  // -------------------------

  const benefits = [
    {
      title: "ALTA TÉCNICA Y ARTE",
      desc: "Domina estructuras de salón, relieves, texturas y las últimas tendencias globales de la mano de las másteres e instructoras más influyentes.",
    },
    {
      title: "SHOPPING EXCLUSIVO",
      desc: "Accede a todo el stock oficial de la marca con precios preferenciales de exposición y sé la primera en adquirir los lanzamientos de temporada.",
    },
    {
      title: "COMUNIDAD Y LOGROS",
      desc: "Comparte experiencias con profesionales de todo el país, expande tu red de networking y vive dinámicas únicas diseñadas para impulsar tu negocio.",
    },
  ];

  return (
    <Box
      ref={ref}
      component='section'
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        bgcolor: lightBg,
        overflow: "hidden",
        position: "relative",
        py: { xs: 8, md: 0 },
      }}
    >
      {/* 1. MARQUEES DE FONDO (TEXTURAS ROSAS SUTILES) */}
      <Box
        sx={{
          position: "absolute",
          width: "120%",
          left: "-10%",
          top: { xs: "-2%", md: "1%" },
          opacity: 0.2,
          pointerEvents: "none",
        }}
      >
        <Marquee speed={60} gradient={false}>
          <Typography
            sx={{
              fontSize: { xs: "5rem", md: "11rem" },
              fontWeight: 900,
              color: "rgba(238, 111, 151, 0.3)",
              whiteSpace: "nowrap",
            }}
          >
            {backgroundItems}
          </Typography>
        </Marquee>
      </Box>

      <Box
        sx={{
          position: "absolute",
          width: "120%",
          left: "-10%",
          bottom: { xs: "5%", md: "2%" },
          opacity: 0.25,
          pointerEvents: "none",
        }}
      >
        <Marquee speed={40} direction='right' gradient={false}>
          <Typography
            sx={{
              fontSize: { xs: "4rem", md: "9rem" },
              fontWeight: 900,
              WebkitTextStroke: {
                xs: `1px ${brandPink}`,
                md: `2px ${brandPink}`,
              },
              color: "transparent",
              whiteSpace: "nowrap",
            }}
          >
            {backgroundItems}
          </Typography>
        </Marquee>
      </Box>

      {/* 2. CONTENIDO PRINCIPAL */}
      <Container maxWidth='xl' sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems='center'>
          {/* Lado Izquierdo: Manifiesto General */}
          <Grid item xs={12} md={6} sx={{ mt: { xs: 0, md: -6 } }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  letterSpacing: "0.5em",
                  color: deepText,
                  mb: 3,
                  width: "fit-content",
                  display: "inline-block",
                  bgcolor: "#FFCBDA",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "4px",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                NUESTRO CAMINO JUNTAS
              </Typography>
              <Typography
                variant='h2'
                sx={{
                  fontSize: { xs: "2.2rem", sm: "3.5rem", md: "4.5rem" },
                  color: deepText,
                  lineHeight: { xs: 1.1, md: 0.95 },
                  mb: 4,
                  fontWeight: 900,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                MÁS QUE UN EVENTO, <br />
                <span
                  style={{
                    color: brandPink,
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  UNA CELEBRACIÓN.
                </span>
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "rgba(61, 43, 47, 0.8)",
                  maxWidth: { xs: "100%", md: "480px" },
                  lineHeight: 1.8,
                  textAlign: { xs: "center", md: "left" },
                  fontWeight: 400,
                }}
              >
                Diseñamos experiencias de alto impacto logístico y educativo
                para que te lleves el máximo conocimiento, acceso preferencial a
                insumos premium y recuerdos inolvidables en cada una de nuestras
                sedes.
              </Typography>
            </motion.div>
          </Grid>

          {/* Lado Derecho: Pilares */}
          <Grid item xs={12} md={6} sx={{ mt: { xs: 0, md: -6 } }}>
            <Stack spacing={1}>
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "center", sm: "flex-start" },
                      textAlign: { xs: "center", sm: "left" },
                      gap: { xs: 2, sm: 4 },
                      p: 3,
                      borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
                      transition: "0.4s",
                      "&:hover": {
                        bgcolor: "white",
                        transform: { xs: "none", md: "translateX(15px)" },
                        boxShadow: "0 10px 30px rgba(61, 43, 47, 0.05)",
                        borderRadius: "12px",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        fontWeight: 900,
                        color: brandPink,
                        minWidth: { sm: "40px" },
                      }}
                    >
                      0{i + 1}
                    </Typography>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: "1.2rem",
                          color: deepText,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(61, 43, 47, 0.65)",
                          fontSize: "0.95rem",
                          mt: 0.5,
                        }}
                      >
                        {benefit.desc}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* 3. MARQUEE CENTRAL (EL CINTURÓN DE AUTORIDAD) */}
      <Box
        sx={{
          position: { xs: "relative", md: "absolute" },
          width: "110%",
          bottom: { md: "20%" },
          my: { xs: 6, md: 0 },
          left: "-5%",
          background: "#FFFFFF",
          py: 2.5,
          transform: { xs: "rotate(1.5deg)", md: "rotate(-1.5deg)" },
          zIndex: 1,
          borderY: `1px solid rgba(255, 183, 206, 0.3)`,
          boxShadow: "0 15px 35px rgba(61, 43, 47, 0.08)",
        }}
      >
        <Marquee speed={60} gradient={false}>
          {[
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
          ].map((txt, idx) => (
            <Stack
              direction='row'
              alignItems='center'
              key={idx}
              sx={{ mx: { xs: 2, md: 4 } }}
            >
              <AutoAwesomeIcon
                sx={{ color: brandPink, mr: 2, fontSize: { xs: 16, md: 20 } }}
              />
              <Typography
                sx={{
                  fontWeight: 800,
                  color: deepText,
                  fontSize: { xs: "0.9rem", md: "1.05rem" },
                  letterSpacing: "0.15em",
                }}
              >
                {txt}
              </Typography>
            </Stack>
          ))}
        </Marquee>
      </Box>

      {/* FOOTER DE SECCIÓN */}
      <Box
        sx={{
          position: "absolute",
          bottom: 30,
          width: "100%",
          px: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: 0.6,
        }}
      >
        <Typography
          sx={{
            fontSize: "0.7rem",
            color: brandPink,
            letterSpacing: "0.2em",
            fontWeight: 700,
          }}
        >
          PLATAFORMA DE EVENTOS WAPIZIMA
        </Typography>
        <Typography
          sx={{
            fontSize: "0.7rem",
            color: deepText,
            fontWeight: 600,
            display: { xs: "none", sm: "block" },
          }}
        >
          MÉXICO • EXPERIENCIA DIGITAL ↓
        </Typography>
      </Box>
    </Box>
  );
}
