import { useRef } from "react";
import { Box, Container, Typography, Chip, Stack } from "@mui/material";
import { motion, useInView } from "framer-motion";
import Marquee from "react-fast-marquee";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CollectionsIcon from "@mui/icons-material/Collections";

import principal from "../../assets/images/IMG_3944.webp";
import secundaria from "../../assets/images/IMG_0266.webp";
import tercera from "../../assets/images/595928731_1763292267821013_7968336426710516918_n.jpg";
import cuarta from "../../assets/images/595711977_1763292237821016_6095411728285724851_n.jpg";
import caro from "../../assets/images/caro.jpg";
import convencion from "../../assets/images/convencion.jpg";
import limado from "../../assets/images/limado.jpg";
import morra from "../../assets/images/morra.jpg";
import wtc from "../../assets/images/wtc.webp";

const galleryData = [
  { img: principal, title: "PREMIOS", category: "RECONOCIMIENTOS" },
  { img: secundaria, title: "COMUNIDAD", category: "NETWORKING" },
  { img: tercera, title: "NUEVAS HABILIDADES", category: "APRENDIZAJE" },
  { img: caro, title: "DINÁMICAS", category: "ENTRETENIMIENTO" },
  { img: wtc, title: "SEDES PREMIUM", category: "INFRAESTRUCTURA" },
  { img: cuarta, title: "MASTERCLASSES", category: "CAPACITACIÓN" },
  { img: limado, title: "TÉCNICA Y PRÁCTICA", category: "WORKSHOPS" },
  { img: convencion, title: "CONVENCIONES", category: "EVENTOS MASIVOS" },
  { img: morra, title: "RECUERDOS", category: "EXPERIENCIAS" },
];

export default function ExperienceGallery() {
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
      id='experiencia'
      component='section'
      sx={{
        py: { xs: 8, md: 14 },
        bgcolor: lightBg,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Container maxWidth='xl' sx={{ relative: 1, zIndex: 2 }}>
        {/* ENCABEZADO COMPACTO Y EDITORIAL */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Chip
              icon={
                <CollectionsIcon
                  sx={{ color: `${brandPink} !important`, fontSize: 16 }}
                />
              }
              label='EVIDENCIA DE NUESTRA CALIDAD'
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
              variant='h2'
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.2rem", sm: "3.2rem", md: "4.2rem" },
                lineHeight: 1.05,
                color: darkText,
                letterSpacing: "-0.02em",
              }}
            >
              Vive la{" "}
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
                experiencia
              </Typography>{" "}
              Wapizima
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "0.95rem", md: "1.1rem" },
                color: "rgba(43, 30, 34, 0.7)",
                mt: 1.5,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Un vistazo real a la energía, escenarios y momentos inolvidables
              vividos por miles de profesionales.
            </Typography>
          </motion.div>
        </Box>
      </Container>

      {/* CONTENEDOR DEL CARRUSEL INFINITO CON GRADIENTES LATERALES */}
      <Box sx={{ position: "relative", width: "100%", py: 1 }}>
        {/* Degradado Izquierdo */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: { xs: 40, md: 160 },
            height: "100%",
            background: `linear-gradient(90deg, ${lightBg} 0%, transparent 100%)`,
            zIndex: 3,
            pointerEvents: "none",
          }}
        />

        {/* Degradado Derecho */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: { xs: 40, md: 160 },
            height: "100%",
            background: `linear-gradient(-90deg, ${lightBg} 0%, transparent 100%)`,
            zIndex: 3,
            pointerEvents: "none",
          }}
        />

        <Marquee speed={35} pauseOnHover gradient={false}>
          {galleryData.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: 260, sm: 300, md: 340 },
                height: { xs: 350, sm: 400, md: 440 },
                mx: 1.5,
                position: "relative",
                overflow: "hidden",
                borderRadius: "24px",
                cursor: "pointer",
                border: `1px solid ${borderTone}`,
                boxShadow: "0 10px 30px -10px rgba(225, 29, 116, 0.12)",
                bgcolor: "#FFFFFF",
                "&:hover .gallery-overlay": { opacity: 1 },
                "&:hover .gallery-text": { transform: "translateY(0)" },
                "&:hover img": { transform: "scale(1.06)" },
              }}
            >
              {/* Imagen principal */}
              <Box
                component='img'
                src={item.img}
                alt={item.title}
                loading='lazy'
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />

              {/* Insignia Fija Superior */}
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  zIndex: 2,
                }}
              >
                <Chip
                  icon={
                    <PhotoCameraIcon
                      sx={{ color: "#FFFFFF !important", fontSize: 13 }}
                    />
                  }
                  label={item.category}
                  size='small'
                  sx={{
                    bgcolor: "rgba(43, 30, 34, 0.55)",
                    backdropFilter: "blur(8px)",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "0.62rem",
                    letterSpacing: "0.08em",
                    borderRadius: "50px",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                />
              </Box>

              {/* Overlay Glassmorphism al Hover */}
              <Box
                className='gallery-overlay'
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(43, 30, 34, 0.9) 0%, rgba(43, 30, 34, 0.2) 60%, transparent 100%)",
                  display: "flex",
                  alignItems: "flex-end",
                  p: 3,
                  opacity: 0,
                  transition: "opacity 0.35s ease",
                  backdropFilter: "blur(3px)",
                  zIndex: 2,
                }}
              >
                <Box
                  className='gallery-text'
                  sx={{
                    width: "100%",
                    transform: "translateY(12px)",
                    transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#FFFFFF",
                      fontWeight: 900,
                      fontSize: "1.1rem",
                      letterSpacing: "0.02em",
                      mb: 0.5,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: brandPink,
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    CONVENCIONES WAPIZIMA
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Marquee>
      </Box>

      {/* CIERRE DE SECCIÓN */}
      <Container maxWidth='xl'>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{
            mt: 5,
            pt: 2.5,
            borderTop: `1px solid ${borderTone}`,
            opacity: 0.7,
            px: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              color: darkText,
              textTransform: "uppercase",
            }}
          >
            Ediciones Nacionales
          </Typography>
          <Typography
            sx={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: darkText,
              display: { xs: "none", sm: "block" },
              textTransform: "uppercase",
            }}
          >
            México • Pasión y Comunidad
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
