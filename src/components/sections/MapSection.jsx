import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EdificioWtc from "../../assets/images/EDIFICIOWTC.webp";
export default function MapSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Colores de la nueva identidad
  const brandCyan = "#72F8FF";
  const darkPetroleum = "#042F35";

  return (
    <Box
      ref={ref}
      component='section'
      sx={{
        py: { xs: 12, md: 20 },
        // El fondo base sigue siendo el petróleo oscuro
        background: "linear-gradient(180deg, #042F35 0%, #02181B 100%)",
        position: "relative",
        overflow: "hidden", // Importante para que la imagen no se salga

        // CAPA DE LA IMAGEN: Centrada y con blend mode
        "&::before": {
          content: '""',
          position: "absolute",
          top: -130,
          left: -200,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${EdificioWtc})`,
          backgroundPosition: "center", // Centrado exacto
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain", // O "contain" si prefieres que se vea el edificio completo
          opacity: 0.2, // Ajusta este valor (0.1 a 0.2) para que se vea sutil
          mixBlendMode: "luminosity", // Hace que la foto adopte los tonos del fondo
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
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 800,
                letterSpacing: "0.4em",
                color: brandCyan, // Acento Cian
                textTransform: "uppercase",
                mb: 3,
              }}
            >
              UBICACIÓN PRESTIGIO
            </Typography>
            <Typography
              variant='h2'
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontSize: { xs: "2.5rem", md: "4rem" },
                color: "#FFFFFF",
                lineHeight: 1.1,
                mb: 3,
              }}
            >
              WTC <br />
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: brandCyan, // Itálica en Cian
                }}
              >
                Ciudad de México
              </span>
            </Typography>

            <Typography
              variant='body1'
              sx={{
                color: "rgba(255, 255, 255, 0.75)",
                fontSize: "1.1rem",
                mb: 4,
                lineHeight: 1.8,
                maxWidth: 400,
              }}
            >
              El centro de convenciones más emblemático del país abre sus
              puertas para recibir a la élite de la industria de la belleza.
            </Typography>

            <Box
              sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 5 }}
            >
              <LocationOnIcon sx={{ color: brandCyan, mt: 0.5 }} />
              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#FFFFFF",
                    // fontFamily: "'Syne'",
                    letterSpacing: "0.05em",
                  }}
                >
                  MONTECITO 38
                </Typography>
                <Typography
                  sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.9rem" }}
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
                borderRadius: 4,
                borderColor: "rgba(255, 255, 255, 0.3)",
                color: "#FFFFFF",
                px: 4,
                py: 1.5,
                fontWeight: 700,
                // fontFamily: "'Syne'",
                letterSpacing: "0.15em",
                "&:hover": {
                  borderColor: brandCyan,
                  color: brandCyan,
                  bgcolor: "rgba(114, 248, 255, 0.05)",
                  transform: "translateY(-3px)",
                },
                transition: "0.3s",
              }}
            >
              CÓMO LLEGAR
            </Button>
          </motion.div>

          {/* El Mapa con Frame de Diseño Tech */}
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
                bgcolor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 50px 100px rgba(0, 0, 0, 0.6)",
                borderRadius: 4,
              }}
            >
              <Box
                sx={{
                  aspectRatio: { xs: "1/1", md: "16/9" },
                  overflow: "hidden",
                  borderRadius: 4,
                  // FILTRO: Ahora el mapa se ve en tonos azules/oscuros para encajar
                  filter:
                    "grayscale(1) contrast(1.2) invert(0.9) brightness(0.7) sepia(0.3) hue-rotate(150deg)",
                }}
              >
                <iframe
                  title='WTC Ciudad de México'
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.153163351945!2d-99.1748245239556!3d19.394132841852533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff716d80e145%3A0x6335e390c529ec2e!2sWorld%20Trade%20Center%20Ciudad%20de%20M%C3%A9xico!5e0!3m2!1ses-419!2smx!4v1712580000000!5m2!1ses-419!2smx'
                  width='100%'
                  height='100%'
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading='lazy'
                />
              </Box>
            </Box>

            {/* Elemento Decorativo: Marco Cian Sutil */}
            <Box
              sx={{
                position: "absolute",
                top: "-15px",
                right: "-15px",
                width: "60px",
                height: "60px",
                borderTopRightRadius: 12,
                borderTop: `2px solid ${brandCyan}`,
                borderRight: `2px solid ${brandCyan}`,
                zIndex: 3,
                pointerEvents: "none",
              }}
            />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
