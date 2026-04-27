import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EdificioWtc from "../../assets/images/EDIFICIOWTC.webp";

export default function MapSection() {
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
      component='section'
      sx={{
        py: { xs: 12, md: 20 },
        background: lightBg,
        position: "relative",
        overflow: "hidden",

        // CAPA DE LA IMAGEN: Sutil y cálida
        "&::before": {
          content: '""',
          position: "absolute",
          top: -100,
          left: -150,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${EdificioWtc})`,
          backgroundPosition: "left top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          opacity: 0.12,
          filter: "sepia(0.5) contrast(0.9)", // Tono cálido boutique
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth='xl' sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "0.8fr 1.2fr" },
            gap: { xs: 6, lg: 10 },
            alignItems: "center",
          }}
        >
          {/* Texto Informativo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 800,
                letterSpacing: "0.4em",
                color: "",
                textTransform: "uppercase",
                mb: 3,
                width: "fit-content",
                display: "inline-block",
                bgcolor: "#FFCBDA",
              }}
            >
              SEDE OFICIAL
            </Typography>
            <Typography
              variant='h2'
              sx={{
                fontSize: { xs: "2.5rem", md: "4rem" },
                color: deepText,
                lineHeight: 1.1,
                mb: 3,
              }}
            >
              WTC <br />
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: brandPink,
                }}
              >
                Ciudad de México
              </span>
            </Typography>

            <Typography
              variant='body1'
              sx={{
                color: "rgba(61, 43, 47, 0.7)",
                fontSize: "1.1rem",
                mb: 4,
                lineHeight: 1.8,
                maxWidth: 400,
              }}
            >
              El escenario más imponente de México se viste de gala para
              celebrar nuestro 7º Aniversario. Un espacio de clase mundial
              diseñado para brindarte la comodidad y seguridad que mereces
              durante toda la convención.
            </Typography>

            <Box
              sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 5 }}
            >
              <LocationOnIcon sx={{ color: brandPink, mt: 0.5 }} />
              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: deepText,
                    letterSpacing: "0.05em",
                  }}
                >
                  MONTECITO 38
                </Typography>
                <Typography
                  sx={{ color: "rgba(61, 43, 47, 0.6)", fontSize: "0.9rem" }}
                >
                  Col. Nápoles, Benito Juárez, <br />
                  CP 03810, CDMX.
                </Typography>
              </Box>
            </Box>

            <Button
              component='a'
              href='https://maps.google.com' // Ajustar a tu link real
              target='_blank'
              variant='outlined'
              endIcon={<OpenInNewIcon />}
              sx={{
                borderRadius: 2,
                borderColor: "rgba(61, 43, 47, 0.2)",
                color: deepText,
                px: 4,
                py: 1.5,
                fontWeight: 800,
                letterSpacing: "0.15em",
                "&:hover": {
                  borderColor: brandPink,
                  color: brandPink,
                  bgcolor: "rgba(255, 183, 206, 0.05)",
                  transform: "translateY(-3px)",
                },
                transition: "0.3s",
              }}
            >
              CÓMO LLEGAR
            </Button>
          </motion.div>

          {/* El Mapa con Frame Boutique */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ position: "relative" }}
          >
            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                p: { xs: 0.5, md: 0.8 },
                bgcolor: "#FFFFFF",
                border: "1px solid rgba(255, 183, 206, 0.2)",
                boxShadow: "0 40px 80px rgba(61, 43, 47, 0.08)",
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  aspectRatio: { xs: "1/1", md: "16/9" },
                  overflow: "hidden",
                  borderRadius: 1,
                  // FILTRO: Mapa claro y elegante
                  filter:
                    "grayscale(0.5) contrast(1.1) brightness(1) sepia(0.1)",
                }}
              >
                <iframe
                  title='WTC Ciudad de México'
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.1611883244!2d-99.1747864!3d19.393437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff71887e226d%3A0xc345ca6953289063!2sWorld%20Trade%20Center%20Ciudad%20de%20M%C3%A9xico!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx'
                  width='100%'
                  height='100%'
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading='lazy'
                />
              </Box>
            </Box>

            {/* Elemento Decorativo: Marco Rosa Sutil */}
            <Box
              sx={{
                position: "absolute",
                top: "-15px",
                right: "-15px",
                width: "80px",
                height: "80px",
                borderTopRightRadius: 16,
                borderTop: `2px solid ${brandPink}`,
                borderRight: `2px solid ${brandPink}`,
                zIndex: 3,
                pointerEvents: "none",
                opacity: 0.6,
              }}
            />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
