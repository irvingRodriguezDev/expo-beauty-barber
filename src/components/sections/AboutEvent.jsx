import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography } from "@mui/material";

export default function AboutEvent() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box
      ref={ref}
      component='section'
      sx={{
        py: 16,
        background: "#0D0D0D",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 120,
          height: "1px",
          background: "linear-gradient(90deg, #E040A0, transparent)",
        }}
      />
      <Container maxWidth={false}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: 10,
            alignItems: "center",
          }}
        >
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Typography variant='overline' display='block' sx={{ mb: 2 }}>
              Sobre el evento
            </Typography>
            <Typography
              variant='h2'
              sx={{
                fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                color: "#F5F0E8",
                mb: 1,
              }}
            >
              Donde la industria
            </Typography>
            <Typography
              variant='h2'
              sx={{
                fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                background:
                  "linear-gradient(135deg, #E040A0, #E8C96A, #E040A0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 3,
              }}
            >
              se encuentra
            </Typography>
            <Box
              sx={{
                width: 60,
                height: 3,
                background: "linear-gradient(90deg, #E040A0, #E8407A)",
                mb: 4,
              }}
            />
            <Typography variant='body1' sx={{ mb: 2 }}>
              Expo Beauty & Barber Emprende reúne a{" "}
              <Box component='span' sx={{ color: "#F5F0E8", fontWeight: 600 }}>
                marcas, emprendedores y profesionales
              </Box>{" "}
              del sector belleza para generar relaciones comerciales,
              posicionamiento de marca y nuevas oportunidades de negocio.
            </Typography>
            <Typography variant='body2' sx={{ color: "#777" }}>
              Organizado por{" "}
              <Box component='span' sx={{ color: "#ABABAB" }}>
                Publicidad Mahur
              </Box>
              , empresa con más de{" "}
              <Box component='span' sx={{ color: "#E040A0" }}>
                15 años de experiencia
              </Box>{" "}
              en la organización de exposiciones comerciales.
            </Typography>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative" }}
          >
            <Box
              sx={{
                aspectRatio: "4/3",
                overflow: "hidden",
                position: "relative",
                background: "#1A1A1A",
              }}
            >
              <Box
                component='img'
                src='https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80'
                alt='Expo'
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.75,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top right, rgba(10,10,10,0.6), transparent)",
                }}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: -12,
                right: -12,
                width: 80,
                height: 80,
                border: "2px solid rgba(201,168,76,0.25)",
                zIndex: -1,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: -12,
                left: -12,
                width: 56,
                height: 56,
                border: "1px solid rgba(232,64,122,0.2)",
                zIndex: -1,
              }}
            />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
