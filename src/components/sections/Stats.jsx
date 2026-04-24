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

  // Color de acento rosa boutique
  const brandPink = "#ee6f97ff";

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
          color: brandPink,
          ml: 1,
          fontSize: "0.25em",
          fontWeight: 900,
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
    label: "SESIONES DE\nALTA MAESTRÍA",
    desc: "Conferencias, talleres y demostraciones en vivo.",
  },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const brandPink = "#ee6f97ff";
  const deepText = "#3D2B2F";
  const lightBg = "#FFD9E2";

  return (
    <Box
      ref={ref}
      component='section'
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        bgcolor: lightBg,
        position: "relative",
        overflow: "hidden",
        py: { xs: 10, md: 0 },
      }}
    >
      {/* TÍTULO DE FONDO GIGANTE - Efecto Sutil Boutique */}
      <Typography
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: { xs: "5rem", sm: "15rem", md: "25rem" },
          fontWeight: 900,
          background: `linear-gradient(180deg, rgba(225, 175, 186, 0.5) 0%, transparent 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          whiteSpace: "nowrap",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        BWM 2027
      </Typography>

      <Container maxWidth='xl' sx={{ position: "relative", zIndex: 1 }}>
        {/* CABECERA EDITORIAL */}
        <Grid container sx={{ mb: { xs: 6, md: 12 } }} spacing={2}>
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3.7rem" },
                  letterSpacing: { xs: "0.2em", md: "0.5em" },
                  color: "",
                  fontWeight: 800,
                  mb: 2,
                  lineHeight: 1.2,
                  textAlign: { xs: "center", md: "left" },
                  width: { xs: "100%", md: "fit-content" },
                  display: "block",
                  bgcolor: "#FFCBDA",
                }}
              >
                PROYECCIÓN E IMPACTO
              </Typography>
              <Typography
                variant='h3'
                sx={{
                  fontWeight: 800,
                  color: deepText,
                  maxWidth: { xs: "100%", md: "500px" },
                  lineHeight: 1.1,
                  fontSize: { xs: "1.8rem", md: "3rem" },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Donde los números <br />
                <span
                  style={{
                    color: brandPink,
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  se vuelven arte.
                </span>
              </Typography>
            </motion.div>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{ textAlign: { md: "right" }, mt: { xs: 2, md: -15 } }}
          >
            <Typography
              sx={{
                fontSize: "1.2rem",
                color: "rgba(61, 43, 47, 0.7)",
                maxWidth: { md: "550px" },
                ml: { md: "auto" },
                lineHeight: 1.8,
                textAlign: { xs: "center", md: "right" },
              }}
            >
              Analizamos cada métrica para garantizar que tu presencia tenga el
              retorno de inversión que la industria de alto nivel exige.
            </Typography>
          </Grid>
        </Grid>

        {/* GRID DE ESTADÍSTICAS */}
        <Grid container spacing={{ xs: 4, md: 4 }}>
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
                    p: { xs: 3, md: 4 },
                    textAlign: { xs: "center", md: "left" },
                    // BORDES DE ESQUINA ROSA
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: { xs: "50%", md: 0 },
                      transform: { xs: "translateX(-50%)", md: "none" },
                      width: "20px",
                      height: "20px",
                      borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                      borderLeft: "1px solid rgba(0, 0, 0, 0.1)",
                      display: { xs: "none", md: "block" },
                      borderRadius: 2,
                    },
                    "&:hover::before": {
                      borderColor: brandPink,
                      width: "100%",
                      height: "100%",
                      transition: "0.6s ease",
                    },
                    borderBottom: {
                      xs: "1px solid rgba(0, 0, 0, 0.05)",
                      md: "none",
                    },
                    pb: { xs: 4, md: 4 },
                    transition: "0.3s",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: { xs: "3.5rem", sm: "4rem", md: "5.5rem" },
                      lineHeight: 1,
                      color: deepText,
                      mb: 1,
                      letterSpacing: "-0.05em",
                    }}
                  >
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: "",
                      letterSpacing: "0.3em",
                      mb: 1,
                      whiteSpace: "pre-line",
                      bgcolor: "#FFCBDA",
                      width: "fit-content",
                      display: "inline-block",
                    }}
                  >
                    {stat.label}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.99rem",
                      color: "rgba(61, 43, 47, 0.6)",
                    }}
                  >
                    {stat.desc}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* LÍNEA DE CIERRE */}
        <Stack
          direction='row'
          sx={{
            mt: { xs: 6, md: 10 },
            pt: 4,
            borderTop: `1px solid rgba(255, 183, 206, 0.2)`,
          }}
        />
      </Container>
    </Box>
  );
}
