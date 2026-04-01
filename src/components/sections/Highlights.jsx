import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Grid, Stack } from "@mui/material";
import Marquee from "react-fast-marquee";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import GroupsIcon from "@mui/icons-material/Groups";
import StorefrontIcon from "@mui/icons-material/Storefront";

const items = [
  "STANDS COMERCIALES • DEMOSTRACIONES EN VIVO • BARBER SHOWS • ZONA DE MAQUILLAJE • TALLERES Y CONFERENCIAS • NETWORKING VIP • MARKETPLACE PROFESIONAL • PREMIACIONES",
];

export default function Highlights() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      title: "NEGOCIO",
      desc: "Conecta con los proveedores más influyentes de la industria.",
    },
    {
      title: "EDUCACIÓN",
      desc: "Aprende técnicas disruptivas de la mano de expertos globales.",
    },
    {
      title: "CULTURA",
      desc: "Vive la vibrante energía de las pasarelas y shows en vivo.",
    },
  ];

  return (
    <Box
      ref={ref}
      component='section'
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "linear-gradient(180deg, #F9A8D4 0%, #FAF8F5 100%)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* 1. MARQUEES DE FONDO (TEXTURAS DINÁMICAS) */}
      <Box
        sx={{
          position: "absolute",
          width: "120%",
          left: "-10%",
          top: "1%",
          opacity: 0.1,
          pointerEvents: "none",
        }}
      >
        <Marquee speed={80} gradient={false}>
          <Typography
            sx={{
              fontFamily: "'Syne'",
              fontSize: "12rem",
              fontWeight: 900,
              color: "#2D0A1A",
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
          bottom: "2%",
          opacity: 0.05,
          pointerEvents: "none",
        }}
      >
        <Marquee speed={40} direction='right' gradient={false}>
          <Typography
            sx={{
              fontFamily: "'Syne'",
              fontSize: "10rem",
              fontWeight: 900,
              WebkitTextStroke: "2px #2D0A1A",
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
        <Grid container spacing={6} alignItems='center'>
          {/* Lado Izquierdo: Manifiesto */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: -12 }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <Typography
                sx={{
                  fontFamily: "'Syne'",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  letterSpacing: "0.5em",
                  color: "#BE185D",
                  mb: 3,
                }}
              >
                LA EXPERIENCIA
              </Typography>
              <Typography
                variant='h2'
                sx={{
                  fontFamily: "'Syne'",
                  fontSize: { xs: "3rem", md: "5rem" },
                  color: "#2D0A1A",
                  lineHeight: 0.9,
                  mb: 4,
                  fontWeight: 900,
                }}
              >
                MÁS QUE UNA EXPO, <br />
                <span style={{ color: "#EC4899" }}>UN LEGADO.</span>
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'DM Sans'",
                  fontSize: "1.1rem",
                  color: "#552F3F",
                  maxWidth: "480px",
                  lineHeight: 1.8,
                  opacity: 0.8,
                }}
              >
                Diseñamos un entorno donde la creatividad no tiene límites.
                Desde pasarelas de alta costura hasta talleres técnicos de
                precisión.
              </Typography>
            </motion.div>
          </Grid>

          {/* Lado Derecho: Beneficios / Pilares */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: -12 }}>
            <Stack spacing={4}>
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
                      gap: 4,
                      p: 3,
                      borderBottom: "1px solid rgba(45,10,26,0.1)",
                      transition: "0.4s",
                      "&:hover": {
                        bgcolor: "rgba(236,72,153,0.05)",
                        transform: "translateX(20px)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "'Syne'",
                        fontSize: "1.5rem",
                        fontWeight: 900,
                        color: "#EC4899",
                        minWidth: "40px",
                      }}
                    >
                      0{i + 1}
                    </Typography>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "'Syne'",
                          fontWeight: 800,
                          fontSize: "1.2rem",
                          color: "#2D0A1A",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "'DM Sans'",
                          color: "#552F3F",
                          opacity: 0.7,
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

      {/* 3. MARQUEE CENTRAL DE ALTO IMPACTO (ACCENT) */}

      <Box
        sx={{
          position: "absolute",
          width: "110%",
          bottom: "28%",
          left: "-5%",
          background: "#2D0A1A",
          py: 2,
          transform: "rotate(-2deg)",
          zIndex: 1,
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
      >
        <Marquee speed={60} gradient={false}>
          {[
            "SHOWS DE BARBERÍA",
            "ZONA DE MAQUILLAJE",
            "MASTERCLASSES",
            "OFERTAS EXCLUSIVAS",
            "LUGAR PARA CREADORES",
            "RELACIONES COMERCIALES",
          ].map((txt, idx) => (
            <Stack direction='row' alignItems='center' key={idx} sx={{ mx: 4 }}>
              <AutoAwesomeIcon sx={{ color: "#EC4899", mr: 2, fontSize: 20 }} />
              <Typography
                sx={{
                  fontFamily: "'Syne'",
                  fontWeight: 800,
                  color: "#FAF8F5",
                  fontSize: "1.2rem",
                  letterSpacing: "0.2em",
                }}
              >
                {txt}
              </Typography>
            </Stack>
          ))}
        </Marquee>
      </Box>

      {/* FOOTER DE SECCIÓN: DETALLE TÉCNICO */}
      <Box
        sx={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          px: 4,
          display: "flex",
          justifyContent: "space-between",
          opacity: 0.3,
        }}
      >
        <Typography
          sx={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#2D0A1A" }}
        >
          EXPO BELLEZA Y BARBERÍA 2027
        </Typography>
        <Typography
          sx={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#2D0A1A" }}
        >
          SCROLL TO EXPLORE ↓
        </Typography>
      </Box>
    </Box>
  );
}
