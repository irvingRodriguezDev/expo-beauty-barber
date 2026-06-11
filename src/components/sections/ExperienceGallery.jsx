import { useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion, useInView } from "framer-motion";

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
  { img: principal, title: "PREMIOS" },
  { img: secundaria, title: "COMUNIDAD" },
  { img: tercera, title: "NUEVAS HABILIDADES" },
  { img: caro, title: "DINÁMICAS" },
  { img: wtc, title: "SEDES PREMIUM" },
  { img: cuarta, title: "MASTERCLASSES" },
  { img: limado, title: "APRENDIZAJE" },
  { img: convencion, title: "CONVENCIONES" },
  { img: morra, title: "RECUERDOS" },
];

export default function ExperienceGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // --- PALETA COHERENTE ---
  const brandPink = "#ee6f97ff";
  const deepText = "#3D2B2F";
  const lightBg = "#FFD9E2";
  // -------------------------

  // Duplicamos el array para lograr el efecto infinito impecable en el carrusel
  const duplicatedGallery = [...galleryData, ...galleryData];

  return (
    <Box
      ref={ref}
      id='experiencia'
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: lightBg,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Container maxWidth='xl'>
        {/* ENCABEZADO COMPACTO */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 6 } }}>
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.2rem", md: "3.5rem" },
              lineHeight: 1.1,
              color: deepText,
            }}
          >
            VIVE LA{" "}
            <span
              style={{ color: brandPink, fontStyle: "italic", fontWeight: 400 }}
            >
              EXPERIENCIA
            </span>{" "}
            WAPIZIMA
          </Typography>
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.4em",
              color: deepText,
              mt: 1.5,
              textTransform: "uppercase",
              bgcolor: "#FFCBDA",
              width: "fit-content",
              display: "inline-block",
              px: 1.5,
              py: 0.3,
              borderRadius: "4px",
            }}
          >
            Galería Curada de Momentos
          </Typography>
        </Box>
      </Container>

      {/* CONTENEDOR DEL CARRUSEL INFINITO */}
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          py: 2,
          "&:hover .marquee-track": {
            animationPlayState: "paused", // Pausa el movimiento al hacer hover general
          },
        }}
      >
        <Box
          className='marquee-track'
          component={motion.div}
          animate={inView ? { x: [0, -1800] } : {}}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
          sx={{
            display: "flex",
            gap: "24px",
            whiteSpace: "nowrap",
            width: "max-content",
            px: 2,
          }}
        >
          {duplicatedGallery.map((item, index) => (
            <Box
              key={index}
              component={motion.div}
              whileHover={{
                scale: 1.03,
                y: -5,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
              sx={{
                width: { xs: "260px", md: "340px" },
                height: { xs: "320px", md: "420px" },
                position: "relative",
                overflow: "hidden",
                borderRadius: "16px",
                cursor: "pointer",
                flexShrink: 0,
                border: "1px solid rgba(255, 255, 255, 0.4)",
                boxShadow: "0 8px 25px rgba(61, 43, 47, 0.06)",
                "&:hover .gallery-overlay": { opacity: 1 },
                "&:hover img": {
                  filter: "sepia(0) contrast(1) brightness(1)",
                },
              }}
            >
              <Box
                component='img'
                src={item.img}
                alt={item.title}
                loading='lazy'
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "sepia(0.2) brightness(0.95) contrast(1.05)",
                  transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />

              {/* Overlay: Glassmorphism Ultra-Premium */}
              <Box
                className='gallery-overlay'
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(61, 43, 47, 0.85) 0%, rgba(255, 255, 255, 0.1) 100%)",
                  display: "flex",
                  alignItems: "flex-end",
                  p: 3,
                  opacity: 0,
                  transition: "opacity 0.4s ease",
                  backdropFilter: "blur(4px)",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Typography
                    sx={{
                      color: "#FFF",
                      fontWeight: 900,
                      fontSize: "0.9rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      mb: 0.5,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: brandPink,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                    }}
                  >
                    CONVENCIONES ÉLITE
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* LÍNEA DE CRÉDITO O CIERRE DE SECCIÓN */}
      <Container maxWidth='xl'>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: 0.5,
            px: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: deepText,
            }}
          >
            EDICIONES NACIONALES
          </Typography>
          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: deepText,
              display: { xs: "none", sm: "block" },
            }}
          >
            MÉXICO • COMPARTIERON SU PASIÓN
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
