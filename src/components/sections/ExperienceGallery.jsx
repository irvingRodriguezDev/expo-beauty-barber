import { useRef } from "react";
import {
  Box,
  Container,
  Typography,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { motion, useInView } from "framer-motion";
import masterclasses from "../../assets/images/masterclasess.webp";
import makeupartist from "../../assets/images/makeupartist.webp";
import barberskills from "../../assets/images/barberskills.webp";
import networking from "../../assets/images/networking.webp";
import exibithors from "../../assets/images/exibithors.webp";
import wtc from "../../assets/images/wtc.webp";
const galleryData = [
  {
    img: masterclasses,
    cols: 2,
    rows: 2,
    title: "MASTERCLASSES",
  },
  {
    img: makeupartist,
    cols: 1,
    rows: 1,
    title: "MAKEUP ART",
  },
  {
    img: barberskills,
    cols: 1,
    rows: 1,
    title: "BARBER SKILLS",
  },
  {
    img: networking,
    cols: 1,
    rows: 2,
    title: "NETWORKING",
  },
  {
    img: wtc,
    cols: 1,
    rows: 2,
    title: "WTC CDMX",
  },
  {
    img: exibithors,
    cols: 2,
    rows: 1,
    title: "EXHIBITORS",
  },
];

export default function ExperienceGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Paleta High-Tech
  const brandCyan = "#72F8FF";
  const darkPetroleum = "#02181B"; // El tono más oscuro para el cierre

  return (
    <Box
      ref={ref}
      id='experiencia'
      sx={{
        py: { xs: 10, md: 15 },
        // GRADIENTE: Del petróleo profundo al negro casi total
        background: `linear-gradient(180deg, #042F35 0%, ${darkPetroleum} 100%)`,
        overflow: "hidden",
      }}
    >
      <Container maxWidth='xl'>
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography
            sx={{
              fontFamily: "'Syne'",
              fontWeight: 900,
              fontSize: { xs: "2.5rem", md: "4rem" },
              lineHeight: 1,
              color: "#FFFFFF",
            }}
          >
            VIVE LA{" "}
            <span
              style={{ color: brandCyan, fontStyle: "italic", fontWeight: 400 }}
            >
              EXPERIENCIA
            </span>{" "}
            EBB
          </Typography>
          <Typography
            sx={{
              // fontFamily: "'DM Sans'",
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.5em",
              color: brandCyan,
              mt: 2,
              textTransform: "uppercase",
              opacity: 0.8,
            }}
          >
            Curaduría Visual 2027
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
                borderRadius: 4,
                cursor: "pointer",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                "&:hover .gallery-overlay": { opacity: 1 },
                "&:hover img": {
                  transform: "scale(1.1)",
                  filter: "grayscale(0%) brightness(1.1)",
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
                  filter: "grayscale(80%) brightness(0.7)", // Más dramático inicialmente
                  transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />

              {/* Overlay: Glassmorphism Cian */}
              <Box
                className='gallery-overlay'
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: "rgba(4, 47, 53, 0.6)", // Tono petróleo con transparencia
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  borderRadius: 4,
                  transition: "0.5s ease",
                  backdropFilter: "blur(12px)",
                }}
              >
                <Typography
                  sx={{
                    // fontFamily: "'Syne'",
                    color: brandCyan,
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    letterSpacing: "0.3em",
                    border: `1.5px solid ${brandCyan}`,
                    px: 3,
                    py: 1.5,
                    borderRadius: 4,
                    textAlign: "center",
                    textTransform: "uppercase",
                    boxShadow: `0 0 20px rgba(114, 248, 255, 0.2)`,
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
            opacity: 0.4,
          }}
        >
          <Typography
            sx={{
              // fontFamily: "'DM Sans'",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.4em",
              color: brandCyan,
            }}
          >
            1RA EDICIÓN
          </Typography>
          <Typography
            sx={{
              // fontFamily: "'DM Sans'",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.4em",
              color: "#FFF",
            }}
          >
            WTC MÉXICO
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
