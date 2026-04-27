import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Grid, Stack } from "@mui/material";
import Marquee from "react-fast-marquee";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const items = [
  "7º ANIVERSARIO WAPIZIMA • CLASES MASTER CON EXPERTAS • VENTA DE PRODUCTOS A PRECIO ESPECIAL • MÚSICA EN VIVO • RIFAS Y PREMIOS • RECONOCIMIENTOS 'EL SALÓN DE TUS SUEÑOS' • DINÁMICAS Y SORPRESAS • WTC CIUDAD DE MÉXICO •",
];

export default function Highlights() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // --- PALETA COHERENTE ---
  const brandPink = "#ee6f97ff"; // Rosa pastel claro
  const deepText = "#3D2B2F"; // Texto oscuro cálido
  const lightBg = "#FFD9E2"; // Fondo crema rosado
  // -------------------------

  const benefits = [
    {
      title: "TÉCNICA Y ARTE",
      desc: "Aprende micropintura, relieves, texturas y estructura de salón de la mano de Carolina Tavera, Yazmin Ibarra y grandes másteres.",
    },
    {
      title: "SHOPPING EXCLUSIVO",
      desc: "Aprovecha precios especiales de aniversario en toda la línea Wapizima. Stock disponible y lanzamientos durante todo el día.",
    },
    {
      title: "COMUNIDAD Y PREMIOS",
      desc: "Participa en las dinámicas 'El Salón de tus Sueños' y vive la emoción de nuestras rifas, reconocimientos y sorpresas especiales.",
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
          opacity: 0.25,
          pointerEvents: "none",
        }}
      >
        <Marquee speed={80} gradient={false}>
          <Typography
            sx={{
              fontSize: { xs: "5rem", md: "12rem" },
              fontWeight: 900,
              color: "rgba(238, 111, 151, 0.4)",
              whiteSpace: "nowrap",
            }}
          >
            {items}
          </Typography>
        </Marquee>
      </Box>

      <Box
        sx={{
          position: "absolute",
          width: "120%",
          left: "-10%",
          bottom: { xs: "5%", md: "2%" },
          opacity: 0.3,
          pointerEvents: "none",
        }}
      >
        <Marquee speed={40} direction='right' gradient={false}>
          <Typography
            sx={{
              fontSize: { xs: "4rem", md: "10rem" },
              fontWeight: 900,
              WebkitTextStroke: {
                xs: `1px ${brandPink}`,
                md: `2px ${brandPink}`,
              },
              color: "transparent",
              whiteSpace: "nowrap",
            }}
          >
            {items}
          </Typography>
        </Marquee>
      </Box>

      {/* 2. CONTENIDO PRINCIPAL */}
      <Container maxWidth='xl' sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems='center'>
          {/* Lado Izquierdo: Manifiesto */}
          <Grid item xs={12} md={6} sx={{ mt: { xs: 0, md: -12 } }}>
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
                  color: "",
                  mb: 3,
                  width: "fit-content",
                  display: "inline-block",
                  bgcolor: "#FFCBDA",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                NUESTRO CAMINO JUNTAS
              </Typography>
              <Typography
                variant='h2'
                sx={{
                  fontSize: { xs: "2.2rem", sm: "3.5rem", md: "5rem" },
                  color: deepText,
                  lineHeight: { xs: 1.1, md: 0.9 },
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
                  color: "rgba(61, 43, 47, 0.7)",
                  maxWidth: { xs: "100%", md: "480px" },
                  lineHeight: 1.8,
                  textAlign: { xs: "center", md: "left" },
                  fontWeight: 400,
                }}
              >
                Wapizima cumple 7 años. Hemos diseñado un itinerario intensivo
                de 07:00 a 20:00 hrs para que te lleves el máximo conocimiento,
                los mejores productos y recuerdos inolvidables en el WTC.
              </Typography>
            </motion.div>
          </Grid>

          {/* Lado Derecho: Pilares */}
          <Grid item xs={12} md={6} sx={{ mt: { xs: 0, md: -12 } }}>
            <Stack spacing={{ xs: 2, md: 2 }}>
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.2 }}
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
                        transform: { xs: "none", md: "translateX(20px)" },
                        boxShadow: "0 10px 30px rgba(61, 43, 47, 0.05)",
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
                          letterSpacing: "0.1em",
                        }}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(61, 43, 47, 0.6)",
                          fontSize: "0.95rem",
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
          bottom: { md: "25%" },
          my: { xs: 6, md: 0 },
          left: "-5%",
          background: "#FFFFFF",
          backdropFilter: "blur(10px)",
          py: 3,
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
            "DINÁMICAS ESPECIALES",
            "ZONA DE NETWORKING",
            "LANZAMIENTOS EXCLUSIVOS",
            "RELIEVES Y TEXTURAS",
            "WTC MÉXICO",
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
                  fontSize: { xs: "0.9rem", md: "1.1rem" },
                  letterSpacing: "0.2em",
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
          position: { xs: "relative", md: "absolute" },
          bottom: { md: 40 },
          mt: { xs: 4, md: 0 },
          width: "100%",
          px: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          opacity: 0.6,
        }}
      >
        <Typography
          sx={{
            fontSize: "0.7rem",
            color: brandPink,
            textAlign: "center",
            letterSpacing: "0.2em",
            fontWeight: 700,
          }}
        >
          CONVENCIÓN WAPIZIMA 2026
        </Typography>
        <Typography
          sx={{
            fontSize: "0.7rem",
            color: deepText,
            fontWeight: 600,
            display: { xs: "none", sm: "block" },
          }}
        >
          2026 • WTC MEXICO CITY ↓
        </Typography>
      </Box>
    </Box>
  );
}
