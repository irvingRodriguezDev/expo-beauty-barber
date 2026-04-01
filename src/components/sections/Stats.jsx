import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { Box, Container, Typography, Grid, Stack } from "@mui/material";

function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (inView) {
      const c = animate(count, to, { duration: 3.5, ease: [0.19, 1, 0.22, 1] });
      return c.stop;
    }
  }, [inView, to]);

  return (
    <Box
      component='span'
      ref={ref}
      sx={{ display: "inline-flex", alignItems: "baseline" }}
    >
      <motion.span>{rounded}</motion.span>
      <Typography
        component='span'
        sx={{
          color: "#EC4899",
          ml: 1,
          fontSize: "0.25em",
          fontWeight: 900,
          fontFamily: "'Syne'",
        }}
      >
        {suffix}
      </Typography>
    </Box>
  );
}

const stats = [
  {
    value: 5000,
    suffix: "+",
    label: "AUDIENCIA\nESTIMADA",
    desc: "Líderes y tomadores de decisión.",
  },
  {
    value: 2,
    suffix: "DÍAS",
    label: "EXPERIENCIA\nCURADA",
    desc: "Inmersión total en tendencia.",
  },
  {
    value: 50,
    suffix: "+",
    label: "MARCAS\nEXHIBIDORAS",
    desc: "El top tier de la industria.",
  },
  {
    value: 20,
    suffix: "+",
    label: "PONENTES\nINTERNACIONALES",
    desc: "Maestría técnica global.",
  },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box
      ref={ref}
      component='section'
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(0deg, #F9A8D4 0%, #FAF8F5 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* TÍTULO DE FONDO GIGANTE CON GRADIENTE */}
      <Typography
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Syne'",
          fontSize: { xs: "12rem", md: "25rem" },
          fontWeight: 900,
          background:
            "linear-gradient(180deg, rgba(45, 10, 26, 0.05) 0%, transparent 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          whiteSpace: "nowrap",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        EBB 2027
      </Typography>

      <Container maxWidth='xl' sx={{ position: "relative", zIndex: 1 }}>
        {/* CABECERA EDITORIAL DE SECCIÓN */}
        <Grid container sx={{ mb: { xs: 8, md: 15 } }} alignItems='flex-start'>
          <Grid item xs={12} md={12}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <Typography
                sx={{
                  fontFamily: "'Syne'",
                  fontSize: "3.7rem",
                  letterSpacing: "0.5em",
                  color: "#BE185D",
                  fontWeight: 800,
                  mb: 2,
                }}
              >
                PROYECCIÓN E IMPACTO
              </Typography>
              <Typography
                variant='h3'
                sx={{
                  fontFamily: "'Syne'",
                  fontWeight: 800,
                  color: "#2D0A1A",
                  maxWidth: "500px",
                  lineHeight: 1.1,
                  fontSize: { xs: "2rem", md: "3rem" },
                }}
              >
                Donde los números <br />
                <span style={{ color: "#EC4899" }}>se vuelven arte.</span>
              </Typography>
            </motion.div>
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
            sx={{ textAlign: { md: "right" }, mt: { xs: 4, md: 0 } }}
          >
            <Typography
              sx={{
                fontFamily: "'DM Sans'",
                fontSize: "0.9rem",
                color: "#552F3F",
                opacity: 0.7,
                maxWidth: { md: "300px" },
                ml: { md: "auto" },
                lineHeight: 1.8,
              }}
            >
              Analizamos cada métrica para garantizar que tu presencia tenga el
              retorno de inversión que tu marca merece.
            </Typography>
          </Grid>
        </Grid>

        {/* GRID DE ESTADÍSTICAS */}
        <Grid container spacing={4}>
          {stats.map((stat, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: i * 0.2 }}
              >
                <Box
                  sx={{
                    position: "relative",
                    p: 4,
                    // BORDES DE ESQUINA (EFECTO PREMIUM)
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "20px",
                      height: "20px",
                      borderTop: "2px solid #2D0A1A",
                      borderLeft: "2px solid #2D0A1A",
                    },
                    "&:hover::before": {
                      borderColor: "#EC4899",
                      width: "100%",
                      height: "100%",
                      transition: "0.6s ease",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Syne'",
                      fontWeight: 900,
                      fontSize: { xs: "4rem", md: "5.5rem" },
                      lineHeight: 1,
                      color: "#2D0A1A",
                      mb: 1,
                      letterSpacing: "-0.05em",
                    }}
                  >
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "'Syne'",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: "#BE185D",
                      letterSpacing: "0.3em",
                      mb: 1,
                    }}
                  >
                    {stat.label}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "'DM Sans'",
                      fontSize: "0.8rem",
                      color: "#552F3F",
                      opacity: 0.6,
                    }}
                  >
                    {stat.desc}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* FOOTER DE SECCIÓN (RELLENO VISUAL) */}
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{ mt: 10, pt: 4, borderTop: "1px solid rgba(45, 10, 26, 0.1)" }}
        >
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: "0.7rem",
              color: "#2D0A1A",
              opacity: 0.4,
            }}
          ></Typography>
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: "0.7rem",
              color: "#2D0A1A",
              opacity: 0.4,
            }}
          >
            {/* CDMX • MÉXICO */}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
