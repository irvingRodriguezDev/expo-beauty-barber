import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { Box, Container, Typography } from "@mui/material";

function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (inView) {
      const c = animate(count, to, { duration: 3, ease: [0.16, 1, 0.3, 1] });
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
      <Box
        component='span'
        sx={{
          color: "#eb188cff",
          ml: 1,
          fontSize: "0.4em",
          fontWeight: 400,
          opacity: 0.8,
        }}
      >
        {suffix}
      </Box>
    </Box>
  );
}

const stats = [
  { value: 5000, suffix: "+", label: "AUDIENCIA \n ESTIMADA" },
  { value: 3, suffix: "DÍAS", label: "EXPERIENCIA \n CURADA" },
  { value: 50, suffix: "+", label: "MARCAS \n EXHIBIDORAS" },
  { value: 20, suffix: "+", label: "PONENTES \n INTERNACIONALES" },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box
      ref={ref}
      component='section'
      sx={{
        py: { xs: 12, md: 18 },
        // REGRESO AL ROSADO: Usamos el mismo tono base del Hero para total conexión
        background: "linear-gradient(180deg, #FDF2F8 0%, #FCE7F3 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decoración: Resplandor rosa vibrante para dar profundidad */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "120%",
          height: "120%",
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth='xl' sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: { xs: 8, md: 0 },
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: i * 0.15 }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  px: 2,
                  position: "relative",
                  // Separadores ultra finos en color rosa oscuro
                  "&:not(:last-child)::after": {
                    content: { xs: "none", md: '""' },
                    position: "absolute",
                    right: 0,
                    top: "20%",
                    height: "60%",
                    width: "1px",
                    background:
                      "linear-gradient(to bottom, transparent, rgba(190, 24, 93, 0.15), transparent)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: { xs: "3.5rem", md: "4.5rem", lg: "5.8rem" },
                    lineHeight: 1,
                    // Color Borgoña para legibilidad sobre el rosa
                    color: "#2D0A1A",
                    mb: 2,
                    letterSpacing: "-0.04em",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                  }}
                >
                  <Counter to={stat.value} suffix={stat.suffix} />
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    letterSpacing: "0.4em", // Mucho espacio entre letras (Top Brand style)
                    textTransform: "uppercase",
                    color: "#BE185D", // Rosa vibrante para los labels
                    whiteSpace: "pre-line",
                    lineHeight: 1.6,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
