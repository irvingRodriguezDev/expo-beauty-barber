import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Button, Chip, Stack } from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import StarsIcon from "@mui/icons-material/Stars";

const perks = [
  {
    label: "Networking Activo",
    description:
      "Conecta con miles de nail artists, dueñas de salón y distribuidoras líderes de la industria.",
    bgWord: "CONNECT",
  },
  {
    label: "Aprendizaje Élite",
    description:
      "Capacítate en vivo con las técnicas más cotizadas de estructura, micropintura y relieves.",
    bgWord: "LEARN",
  },
  {
    label: "Venta Directa",
    description:
      "Accede al stock más grande de insumos Wapizima directo de fábrica y sin intermediarios.",
    bgWord: "STOCK",
  },
  {
    label: "Lanzamientos de Producto",
    description:
      "Sé la primera en conocer y adquirir las colecciones exclusivas de temporada antes que nadie.",
    bgWord: "NEW",
  },
  {
    label: "Descuentos de Locura",
    description:
      "Aprovecha precios preferenciales de exposición y promociones únicas para renovar tu mesa.",
    bgWord: "OFFERS",
  },
  {
    label: "Música & Diversión",
    description:
      "Disfruta de shows en vivo, DJ sets y un ambiente electrizante lleno de energía boutique.",
    bgWord: "SHOW",
  },
  {
    label: "Entretenimiento Total",
    description:
      "Participa en dinámicas interactivas, pasarelas de arte y más de 50 rifas de regalos sorpresa.",
    bgWord: "FUN",
  },
];

const profiles = [
  "Nail Artists",
  "Técnicas Certificadas",
  "Dueñas de Salón",
  "Distribuidoras",
  "Estudiantes",
];

export default function Visitors() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Paleta Unificada
  const brandPink = "#E11D74";
  const darkText = "#2B1E22";
  const lightBg = "#FFF5F8";
  const borderTone = "rgba(225, 29, 116, 0.12)";

  const handleScrollToEvents = () => {
    const element = document.getElementById("events-list");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      ref={ref}
      component='section'
      id='visitantes'
      sx={{
        py: { xs: 8, md: 14 },
        bgcolor: lightBg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth='xl'>
        {/* CABECERA DE SECCIÓN */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
            gap: { xs: 3, md: 6 },
            alignItems: "flex-end",
            mb: { xs: 5, md: 7 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Chip
              icon={
                <StarsIcon
                  sx={{ color: `${brandPink} !important`, fontSize: 16 }}
                />
              }
              label='TU CRECIMIENTO ES NUESTRA PASIÓN'
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
                fontSize: { xs: "2.2rem", sm: "3.2rem", md: "4rem" },
                fontWeight: 900,
                color: darkText,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              El epicentro del <br />
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
                nail art en México
              </Typography>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <Typography
              sx={{
                color: "rgba(43, 30, 34, 0.75)",
                fontSize: { xs: "0.95rem", md: "1.1rem" },
                lineHeight: 1.7,
                borderLeft: `3px solid ${brandPink}`,
                pl: 2.5,
                fontWeight: 450,
              }}
            >
              Un ecosistema diseñado para elevar el estándar de tu trabajo.
              Vanguardia técnica, educación de primer nivel y oportunidades de
              negocio masivas en una misma experiencia.
            </Typography>
          </motion.div>
        </Box>

        {/* CARRUSEL DE BENEFICIOS SWIPER NATIVO */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            px: { xs: 0, md: 1 },
            py: 2,
            mb: { xs: 8, md: 10 },
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {perks.map((p, i) => (
            <Box
              key={i}
              component={motion.div}
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              sx={{
                scrollSnapAlign: "start",
                width: { xs: "280px", sm: "310px", md: "340px" },
                height: "230px",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 3.5,
                bgcolor: "#FFFFFF",
                border: `1px solid ${borderTone}`,
                borderRadius: "24px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 10px 30px -10px rgba(225, 29, 116, 0.06)",
                transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                "&:hover": {
                  transform: "translateY(-6px)",
                  borderColor: brandPink,
                  boxShadow: "0 16px 35px -10px rgba(225, 29, 116, 0.18)",
                },
                "&:hover .bg-word": {
                  opacity: 0.1,
                  transform: "scale(1.05)",
                },
              }}
            >
              <Typography
                className='bg-word'
                sx={{
                  position: "absolute",
                  fontSize: "4.2rem",
                  fontWeight: 900,
                  color: brandPink,
                  opacity: 0.035,
                  right: 12,
                  bottom: -12,
                  transition: "all 0.4s ease",
                  pointerEvents: "none",
                  userSelect: "none",
                  letterSpacing: "-0.04em",
                }}
              >
                {p.bgWord}
              </Typography>

              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: "1.25rem",
                  color: darkText,
                  letterSpacing: "-0.01em",
                }}
              >
                {p.label}
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.92rem",
                  color: "rgba(43, 30, 34, 0.7)",
                  lineHeight: 1.6,
                  fontWeight: 450,
                  zIndex: 1,
                }}
              >
                {p.description}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* TARJETA GRAND FINALE DE CONVOCATORIA Y COMPRA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Box
            sx={{
              bgcolor: darkText,
              color: "#FFFFFF",
              borderRadius: "32px",
              p: { xs: 4, sm: 6, md: 7 },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
              gap: { xs: 4, md: 6 },
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(43, 30, 34, 0.35)",
            }}
          >
            {/* Destello sutil de fondo */}
            <Box
              sx={{
                position: "absolute",
                top: "-40%",
                right: "-20%",
                width: "450px",
                height: "450px",
                borderRadius: "50%",
                background: `radial-gradient(circle, rgba(225, 29, 116, 0.35) 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />

            <Box sx={{ zIndex: 1 }}>
              <Typography
                variant='h3'
                sx={{
                  fontSize: { xs: "1.9rem", sm: "3rem", md: "3.8rem" },
                  fontWeight: 900,
                  lineHeight: 1.05,
                  mb: 1.5,
                  letterSpacing: "-0.02em",
                }}
              >
                ¿Lista para vivir la <br />
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
                  próxima edición?
                </Typography>
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  color: "rgba(255, 255, 255, 0.7)",
                  fontWeight: 400,
                }}
              >
                Asegura tu entrada para la sede más cercana y forma parte del
                evento más importante del año.
              </Typography>
            </Box>

            <Box sx={{ zIndex: 1, textAlign: { xs: "center", md: "right" } }}>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  mb: 2,
                  letterSpacing: "0.15em",
                  color: "rgba(255, 255, 255, 0.5)",
                  textTransform: "uppercase",
                }}
              >
                COMUNIDAD CONVOCADA
              </Typography>

              <Stack
                direction='row'
                flexWrap='wrap'
                gap={1}
                justifyContent={{ xs: "center", md: "flex-end" }}
                sx={{ mb: 4 }}
              >
                {profiles.map((p, i) => (
                  <Chip
                    key={i}
                    label={p}
                    size='small'
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.08)",
                      color: "#FFFFFF",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      fontWeight: 700,
                      fontSize: "0.68rem",
                      borderRadius: "50px",
                    }}
                  />
                ))}
              </Stack>

              <Button
                variant='contained'
                onClick={handleScrollToEvents}
                startIcon={<ConfirmationNumberIcon />}
                sx={{
                  bgcolor: brandPink,
                  color: "#FFFFFF",
                  borderRadius: "50px",
                  px: 4,
                  py: 1.8,
                  fontSize: "0.9rem",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  boxShadow: "0 10px 25px rgba(225, 29, 116, 0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "#c91361",
                    color: "#ffff",
                    transform: "translateY(-2px)",
                    boxShadow: "0 14px 30px rgba(225, 29, 116, 0.5)",
                  },
                }}
              >
                ADQUIRIR BOLETOS
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
