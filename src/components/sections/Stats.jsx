import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { Box, Container, Typography, Stack, Chip } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";

function Counter({ to, suffix = "", brandPink }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (inView) {
      const c = animate(count, to, { duration: 2.5, ease: [0.16, 1, 0.3, 1] });
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
          fontSize: "0.45em",
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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Paleta Unificada
  const brandPink = "#E11D74";
  const darkText = "#2B1E22";
  const lightBg = "#FFF5F8";
  const borderTone = "rgba(225, 29, 116, 0.12)";

  return (
    <Box
      ref={ref}
      component='section'
      sx={{
        py: { xs: 8, md: 14 },
        bgcolor: lightBg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Marca de Agua Tipográfica en Fondo */}
      <Typography
        aria-hidden='true'
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: { xs: "22vw", md: "18vw" },
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(225, 29, 116, 0.06)",
          whiteSpace: "nowrap",
          zIndex: 0,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        WAPIZIMA
      </Typography>

      <Container maxWidth='xl' sx={{ position: "relative", zIndex: 1 }}>
        {/* CABECERA EDITORIAL */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 3, md: 6 },
            alignItems: "flex-end",
            mb: { xs: 6, md: 8 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Chip
              icon={
                <PublicIcon
                  sx={{ color: `${brandPink} !important`, fontSize: 16 }}
                />
              }
              label='PRESENCIA NACIONAL'
              size='small'
              sx={{
                bgcolor: "#FFFFFF",
                color: darkText,
                fontWeight: 800,
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                borderRadius: "50px",
                border: `1px solid ${borderTone}`,
                mb: 2,
                px: 0.5,
                py: 1.8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              }}
            />
            <Typography
              variant='h3'
              sx={{
                fontWeight: 900,
                color: darkText,
                lineHeight: 1.08,
                fontSize: { xs: "2.2rem", sm: "3rem", md: "3.8rem" },
                letterSpacing: "-0.02em",
              }}
            >
              Evolucionando el arte <br />
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
                en cada rincón del país.
              </Typography>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.15rem" },
                color: "rgba(43, 30, 34, 0.75)",
                lineHeight: 1.75,
                fontWeight: 450,
                textAlign: { xs: "left", md: "right" },
              }}
            >
              Nuestra trayectoria no se detiene. Con una planeación estratégica
              recurrente de 3 a 4 magnos eventos al año, acercamos la educación
              de élite y los mejores insumos a las plazas más importantes de la
              república.
            </Typography>
          </motion.div>
        </Box>

        {/* GRID DE ESTADÍSTICAS EN TARJETAS DE ALTO IMPACTO */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Box
                sx={{
                  bgcolor: "#FFFFFF",
                  p: { xs: 3, md: 3.5 },
                  borderRadius: "24px",
                  border: `1px solid ${borderTone}`,
                  boxShadow: "0 10px 30px -10px rgba(225, 29, 116, 0.08)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: brandPink,
                    boxShadow: "0 18px 35px -10px rgba(225, 29, 116, 0.2)",
                  },
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: { xs: "2.8rem", sm: "3.2rem", md: "3.8rem" },
                      lineHeight: 1,
                      color: darkText,
                      mb: 1.5,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    <Counter
                      to={stat.value}
                      suffix={stat.suffix}
                      brandPink={brandPink}
                    />
                  </Typography>

                  <Chip
                    label={stat.label}
                    size='small'
                    sx={{
                      bgcolor: "rgba(225, 29, 116, 0.08)",
                      color: brandPink,
                      fontWeight: 800,
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      borderRadius: "6px",
                      mb: 2,
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: "rgba(43, 30, 34, 0.7)",
                    lineHeight: 1.6,
                    fontWeight: 450,
                  }}
                >
                  {stat.desc}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
