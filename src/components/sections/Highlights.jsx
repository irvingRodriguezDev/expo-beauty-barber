import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Grid, Stack } from "@mui/material";
import Marquee from "react-fast-marquee";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

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
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // CAMBIO: Gradiente Esmeralda a Salvia
        background: "linear-gradient(180deg, #062C22 0%, #668678 100%)",
        overflow: "hidden",
        position: "relative",
        py: { xs: 8, md: 0 },
      }}
    >
      {/* 1. MARQUEES DE FONDO (TEXTURAS DORADAS SUTILES) */}
      <Box
        sx={{
          position: "absolute",
          width: "120%",
          left: "-10%",
          top: { xs: "-2%", md: "1%" },
          opacity: 0.2, // Casi imperceptible, muy elegante
          pointerEvents: "none",
        }}
      >
        <Marquee speed={80} gradient={false}>
          <Typography
            sx={{
              fontFamily: "'Syne'",
              fontSize: { xs: "5rem", md: "12rem" },
              fontWeight: 900,
              color: "#D4AF37", // CAMBIO: Dorado
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
          opacity: 0.25,
          pointerEvents: "none",
        }}
      >
        <Marquee speed={40} direction='right' gradient={false}>
          <Typography
            sx={{
              fontFamily: "'Syne'",
              fontSize: { xs: "4rem", md: "10rem" },
              fontWeight: 900,
              // CAMBIO: Contorno en Dorado
              WebkitTextStroke: { xs: "1px #D4AF37", md: "2px #D4AF37" },
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
                  fontFamily: "'Syne'",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  letterSpacing: "0.5em",
                  color: "#D4AF37", // CAMBIO: Dorado
                  mb: 3,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                LA EXPERIENCIA
              </Typography>
              <Typography
                variant='h2'
                sx={{
                  fontFamily: "'Syne'",
                  fontSize: { xs: "2.2rem", sm: "3.5rem", md: "5rem" },
                  color: "#FFFFFF", // CAMBIO: Blanco para contraste
                  lineHeight: { xs: 1.1, md: 0.9 },
                  mb: 4,
                  fontWeight: 900,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                MÁS QUE UNA EXPO, <br />
                <span
                  style={{
                    color: "#D4AF37",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  UN LEGADO.
                </span>
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'DM Sans'",
                  fontSize: "1.1rem",
                  color: "rgba(255, 255, 255, 0.7)", // Blanco suave
                  maxWidth: { xs: "100%", md: "480px" },
                  lineHeight: 1.8,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Donde la técnica se convierte en legado. Un espacio diseñado
                para profesionales que buscan dominar las tendencias globales en
                estilismo, estética avanzada y la arquitectura del corte
                masculino.
              </Typography>
            </motion.div>
          </Grid>

          {/* Lado Derecho: Beneficios / Pilares */}
          <Grid item xs={12} md={6} sx={{ mt: { xs: 0, md: -12 } }}>
            <Stack spacing={{ xs: 2, md: 4 }}>
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
                      // CAMBIO: Borde en blanco con baja opacidad
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "0.4s",
                      "&:hover": {
                        bgcolor: "rgba(212, 175, 55, 0.05)", // Hover dorado tenue
                        transform: { xs: "none", md: "translateX(20px)" },
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "'Syne'",
                        fontSize: "1.5rem",
                        fontWeight: 900,
                        color: "#D4AF37", // CAMBIO: Dorado
                        minWidth: { sm: "40px" },
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
                          color: "#FFFFFF", // CAMBIO: Blanco
                          letterSpacing: "0.1em",
                        }}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "'DM Sans'",
                          color: "rgba(255, 255, 255, 0.6)",
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

      {/* 3. MARQUEE CENTRAL (EL ACENTO DE AUTORIDAD) */}
      <Box
        sx={{
          position: { xs: "relative", md: "absolute" },
          width: "110%",
          bottom: { md: "28%" },
          my: { xs: 6, md: 0 },
          left: "-5%",
          background: "#041C16", // Verde aún más oscuro para el Marquee
          py: 2,
          transform: { xs: "rotate(0deg)", md: "rotate(-1.5deg)" },
          zIndex: 1,
          borderY: "1px solid rgba(212, 175, 55, 0.3)", // Bordes dorados
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
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
            <Stack
              direction='row'
              alignItems='center'
              key={idx}
              sx={{ mx: { xs: 2, md: 4 } }}
            >
              <AutoAwesomeIcon
                sx={{ color: "#D4AF37", mr: 2, fontSize: { xs: 16, md: 20 } }} // Icono Dorado
              />
              <Typography
                sx={{
                  fontFamily: "'Syne'",
                  fontWeight: 800,
                  color: "#FFFFFF",
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

      {/* FOOTER DE SECCIÓN: DETALLE TÉCNICO DORADO */}
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
          opacity: 0.4,
        }}
      >
        <Typography
          sx={{
            fontFamily: "monospace",
            fontSize: "0.6rem",
            color: "#D4AF37",
            textAlign: "center",
            letterSpacing: "0.2em",
          }}
        >
          PRODUCTION BY PUBLICIDAD MAHUR
        </Typography>
        <Typography
          sx={{
            fontFamily: "monospace",
            fontSize: "0.6rem",
            color: "#FFFFFF",
            display: { xs: "none", sm: "block" },
          }}
        >
          2027 • WTC MEXICO CITY ↓
        </Typography>
      </Box>
    </Box>
  );
}
