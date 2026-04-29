import { useRef } from "react";
import {
  Box,
  Container,
  Typography,
  ImageList,
  ImageListItem,
} from "@mui/material";
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
  { img: principal, cols: 2, rows: 2, title: "PREMIOS" },
  { img: secundaria, cols: 2, rows: 1, title: "COMUNIDAD" },
  { img: tercera, cols: 1, rows: 1, title: "NUEVAS HABILIDADES" },
  { img: caro, cols: 1, rows: 2, title: "DINAMICAS" },
  { img: wtc, cols: 1, rows: 2, title: "WTC CDMX" },
  { img: cuarta, cols: 2, rows: 1, title: "MASTERCLASSES" },
  { img: limado, cols: 1, rows: 1, title: "APRENDIZAJE" },
  { img: convencion, cols: 1, rows: 1, title: "CONVENCION" },
  { img: morra, cols: 1, rows: 1, title: "RECUERDOS" },
];

export default function ExperienceGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // --- PALETA COHERENTE ---
  const brandPink = "#ee6f97ff"; // Rosa pastel claro
  const deepText = "#3D2B2F"; // Texto oscuro cálido
  const lightBg = "#FFD9E2"; // Fondo crema rosado
  // -------------------------

  return (
    <Box
      ref={ref}
      id='experiencia'
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: lightBg,
        overflow: "hidden",
      }}
    >
      <Container maxWidth='xl'>
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography
            sx={{
              // fontFamily: "'Syne'",
              fontWeight: 900,
              fontSize: { xs: "2.5rem", md: "4rem" },
              lineHeight: 1,
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
              letterSpacing: "0.5em",
              color: "",
              mt: 2,
              textTransform: "uppercase",
              bgcolor: "#FFCBDA",
              width: "fit-content",
              display: "inline-block",
            }}
          >
            Curaduría Visual 2026
          </Typography>
        </Box>

        <ImageList
          variant='quilted'
          cols={4}
          rowHeight={300}
          gap={20}
          sx={{
            gridTemplateColumns: {
              xs: "repeat(2, 1fr) !important",
              md: "repeat(4, 1fr) !important",
            },
          }}
        >
          {galleryData.map((item, index) => (
            <ImageListItem
              key={index}
              cols={item.cols || 1}
              rows={item.rows || 1}
              component={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 1,
                cursor: "pointer",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                boxShadow: "0 10px 30px rgba(61, 43, 47, 0.05)",
                "&:hover .gallery-overlay": { opacity: 1 },
                "&:hover img": {
                  transform: "scale(1.1)",
                  filter: "sepia(0) contrast(1) brightness(1)",
                },
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                loading='lazy'
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "sepia(0.3) brightness(0.9) contrast(1.1)", // Efecto editorial cálido
                  transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />

              {/* Overlay: Glassmorphism Blanco/Rosa */}
              <Box
                className='gallery-overlay'
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: "rgba(255, 255, 255, 0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  borderRadius: 1,
                  transition: "0.5s ease",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Typography
                  sx={{
                    color: deepText,
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    letterSpacing: "0.3em",
                    border: `2px solid ${brandPink}`,
                    px: 3,
                    py: 1.5,
                    borderRadius: 1,
                    textAlign: "center",
                    textTransform: "uppercase",
                    bgcolor: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            </ImageListItem>
          ))}
        </ImageList>

        {/* Decoración inferior */}
        <Box
          sx={{
            mt: 8,
            display: "flex",
            justifyContent: "center",
            gap: 6,
            opacity: 0.6,
          }}
        >
          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: 800,
              letterSpacing: "0.4em",
              color: deepText,
            }}
          >
            WTC MÉXICO
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
