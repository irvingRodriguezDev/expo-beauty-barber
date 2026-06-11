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
          ml: 0.5,
          fontSize: "0.4em",
          fontWeight: 900,
        }}
      >
        {suffix}
      </Typography>
    </Box>
  );
}

// Estadísticas consolidadas con enfoque multi-sede e histórico de la marca
const stats = [
  {
    value: 7,
    suffix: "AÑOS",
    label: "TRAYECTORIA IMPECABLE",
    desc: "Liderando y cumpliendo sueños en la industria del nail art en México.",
  },
  {
    value: 4,
    suffix: "/AÑO",
    label: "EDICIONES GRANDES",
    desc: "Eventos masivos recurrentes en las ciudades más importantes del país.",
  },
  {
    value: 3,
    suffix: "SEDES",
    label: "CIUDADES CLAVE",
    desc: "Impactando con sedes premium en CDMX, Guadalajara y más.",
  },
  {
    value: 15000,
    suffix: "+",
    label: "COMUNIDAD ASISTENTE",
    desc: "Profesionales certificadas que han asistido a nuestras convenciones.",
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
      {/* TÍTULO DE FONDO GIGANTE - Manteniendo tu identidad sutil */}
      <Typography
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: { xs: "5rem", sm: "15rem", md: "23rem" },
          fontWeight: 900,
          background: `linear-gradient(180deg, rgba(225, 175, 186, 0.4) 0%, transparent 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          whiteSpace: "nowrap",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        WAPIZIMA
      </Typography>

      <Container maxWidth='xl' sx={{ position: "relative", zIndex: 1 }}>
        {/* CABECERA EDITORIAL */}
        <Grid container sx={{ mb: { xs: 6, md: 10 } }} spacing={2}>
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "1.3rem", sm: "2.2rem", md: "3.2rem" },
                  letterSpacing: { xs: "0.2em", md: "0.4em" },
                  color: deepText,
                  fontWeight: 800,
                  mb: 2,
                  lineHeight: 1.2,
                  textAlign: { xs: "center", md: "left" },
                  width: "fit-content",
                  display: "block",
                  bgcolor: "#FFCBDA",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "4px",
                }}
              >
                PRESENCIA NACIONAL
              </Typography>
              <Typography
                variant='h3'
                sx={{
                  fontWeight: 800,
                  color: deepText,
                  maxWidth: { xs: "100%", md: "600px" },
                  lineHeight: 1.15,
                  fontSize: { xs: "1.8rem", md: "2.8rem" },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Evolucionando el arte <br />
                <span
                  style={{
                    color: brandPink,
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  en cada rincón del país.
                </span>
              </Typography>
            </motion.div>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{ textAlign: { md: "right" }, mt: { xs: 2, md: -12 } }}
          >
            <Typography
              sx={{
                fontSize: "1.15rem",
                color: "rgba(61, 43, 47, 0.75)",
                maxWidth: { md: "520px" },
                ml: { md: "auto" },
                lineHeight: 1.8,
                textAlign: { xs: "center", md: "right" },
              }}
            >
              Nuestra trayectoria no se detiene. Con una planeación estratégica
              recurrente de 3 a 4 magnos eventos al año, acercamos la educación
              de élite y los mejores insumos a las plazas más importantes de la
              república.
            </Typography>
          </Grid>
        </Grid>

        {/* GRID DE ESTADÍSTICAS */}
        <Grid container spacing={{ xs: 4, md: 3 }}>
          {stats.map((stat, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: i * 0.15 }}
              >
                <Box
                  sx={{
                    position: "relative",
                    p: { xs: 3, md: 4 },
                    textAlign: { xs: "center", md: "left" },
                    // Bordes premium responsivos al hover
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: { xs: "50%", md: 0 },
                      transform: { xs: "translateX(-50%)", md: "none" },
                      width: "24px",
                      height: "24px",
                      borderTop: "1px solid rgba(61, 43, 47, 0.1)",
                      borderLeft: "1px solid rgba(61, 43, 47, 0.1)",
                      display: { xs: "none", md: "block" },
                      borderRadius: "8px",
                    },
                    "&:hover::before": {
                      borderColor: brandPink,
                      width: "100%",
                      height: "100%",
                      transition: "0.5s ease",
                    },
                    borderBottom: {
                      xs: "1px solid rgba(0, 0, 0, 0.05)",
                      md: "none",
                    },
                    pb: { xs: 4, md: 4 },
                    transition: "all 0.3s",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: { xs: "3.2rem", sm: "3.8rem", md: "4.8rem" },
                      lineHeight: 1,
                      color: deepText,
                      mb: 1,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: deepText,
                      letterSpacing: "0.2em",
                      mb: 2,
                      whiteSpace: "pre-line",
                      bgcolor: "#FFCBDA",
                      width: "fit-content",
                      display: "inline-block",
                      px: 1,
                      py: 0.2,
                      borderRadius: "2px",
                    }}
                  >
                    {stat.label}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.95rem",
                      color: "rgba(61, 43, 47, 0.65)",
                      lineHeight: 1.5,
                    }}
                  >
                    {stat.desc}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Stack
          direction='row'
          sx={{
            mt: { xs: 6, md: 8 },
            pt: 2,
            borderTop: `1px solid rgba(255, 183, 206, 0.2)`,
          }}
        />
      </Container>
    </Box>
  );
}
