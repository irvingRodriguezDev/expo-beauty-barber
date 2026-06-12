import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

// Lista enriquecida con todos los pilares clave solicitados
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
  "Manicuristas",
  "Técnicas",
  "Nail Artists",
  "Dueñas de Salón",
  "Educadoras",
  "Emprendedoras",
];

export default function Visitors() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // --- PALETA COHERENTE ---
  const brandPink = "#ee6f97ff";
  const deepText = "#3D2B2F";
  const lightBg = "#FFD9E2";
  // -------------------------

  return (
    <Box
      ref={ref}
      component='section'
      id='visitantes'
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: lightBg,
        position: "relative",
        overflow: "hidden",
        mt: -10,
      }}
    >
      <Container maxWidth='xl'>
        {/* CABECERA DE SECCIÓN COMPACTA */}
        <Grid container spacing={4} alignItems='flex-end' sx={{ mb: 6 }}>
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  letterSpacing: "0.4em",
                  color: deepText,
                  mb: 2,
                  textTransform: "uppercase",
                  bgcolor: "#FFCBDA",
                  width: "fit-content",
                  display: "inline-block",
                  px: 1.5,
                  py: 0.3,
                  borderRadius: "4px",
                }}
              >
                — TU CRECIMIENTO ES NUESTRA PASIÓN
              </Typography>
              <Typography
                variant='h2'
                sx={{
                  fontSize: { xs: "2.8rem", md: "4.5rem" },
                  fontWeight: 900,
                  color: deepText,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                El epicentro del <br />
                <span
                  style={{
                    color: brandPink,
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  nail art en México
                </span>
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography
              sx={{
                color: "rgba(61, 43, 47, 0.75)",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                maxWidth: "450px",
                borderLeft: `3px solid ${brandPink}`,
                pl: 3,
                fontWeight: 500,
              }}
            >
              Un ecosistema diseñado para elevar el estándar de la industria.
              Vanguardia estética, entretenimiento de primer nivel y
              oportunidades de negocio masivas en una sola fila de experiencias.
            </Typography>
          </Grid>
        </Grid>

        {/* CONTENEDOR EN UNA SOLA FILA DESLIZABLE (SWIPER NATIVO PREMIUM) */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            px: { xs: 2, md: 4 },
            mx: { xs: -2, md: -4 },
            py: 3,
            mb: 8,
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none", // Oculta barra en Firefox
            "&::-webkit-scrollbar": { display: "none" }, // Oculta barra en Chrome/Safari
          }}
        >
          {perks.map((p, i) => (
            <Box
              key={i}
              component={motion.div}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              sx={{
                scrollSnapAlign: "center",
                width: { xs: "280px", sm: "320px", md: "360px" },
                height: "240px",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: 4,
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(255, 183, 206, 0.2)",
                position: "relative",
                overflow: "hidden",
                borderRadius: "16px",
                transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                boxShadow: "0 10px 30px rgba(61, 43, 47, 0.03)",
                "&:hover": {
                  transform: "translateY(-8px)",
                  borderColor: brandPink,
                  boxShadow: "0 20px 40px rgba(255, 183, 206, 0.12)",
                },
                "&:hover .bg-text": {
                  opacity: 0.12,
                  transform: "scale(1.05) translateX(-5%)",
                },
              }}
            >
              {/* Palabra conceptual trasera */}
              <Typography
                className='bg-text'
                sx={{
                  position: "absolute",
                  fontSize: "4.5rem",
                  fontWeight: 900,
                  color: brandPink,
                  opacity: 0.04,
                  right: 10,
                  bottom: -10,
                  transition: "0.6s ease",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {p.bgWord}
              </Typography>

              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1.35rem",
                  color: deepText,
                  mb: 1.5,
                  letterSpacing: "-0.01em",
                }}
              >
                {p.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  color: "rgba(61, 43, 47, 0.65)",
                  lineHeight: 1.6,
                  zIndex: 1,
                  fontWeight: 500,
                  whiteSpace: "normal", // Previene que herede el wrap del flex horizontal
                }}
              >
                {p.description}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* ÁREA DE REGISTRO E INVITACIÓN (Alineación compactada) */}
        {/* <Box sx={{ position: "relative" }}>
          <Grid container justifyContent='center'>
            <Grid item xs={12} lg={11}>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Box
                  sx={{
                    background: "#FFFFFF",
                    color: deepText,
                    borderRadius: "24px",
                    p: { xs: 4, md: 6 },
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: { xs: 4, md: 6 },
                    position: "relative",
                    overflow: "hidden",
                    border: `1px solid rgba(255, 183, 206, 0.4)`,
                    boxShadow: "0 30px 70px rgba(61, 43, 47, 0.06)",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -150,
                      right: -150,
                      width: 350,
                      height: 350,
                      borderRadius: "50%",
                      background: `radial-gradient(circle, rgba(255,183,206,0.15) 0%, transparent 70%)`,
                    }}
                  />

                  <Box
                    sx={{
                      flex: 1,
                      textAlign: { xs: "center", md: "left" },
                      zIndex: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "3.5rem", md: "5.5rem" },
                        fontWeight: 900,
                        lineHeight: 1,
                        mb: 1,
                        color: deepText,
                      }}
                    >
                      PRÓXIMA <br />
                      <span
                        style={{
                          color: brandPink,
                          fontStyle: "italic",
                          fontWeight: 400,
                          fontSize: "0.8em",
                        }}
                      >
                        Sede Élite
                      </span>
                    </Typography>
                    <Typography
                      sx={{
                        letterSpacing: "0.3em",
                        fontWeight: 800,
                        fontSize: "0.85rem",
                        color: "rgba(61, 43, 47, 0.6)",
                      }}
                    >
                      REVISA LAS FECHAS DISPONIBLES ABAJO
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1, width: "100%", zIndex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        mb: 2.5,
                        letterSpacing: "0.2em",
                        color: "rgba(61, 43, 47, 0.4)",
                        textAlign: "center",
                        textTransform: "uppercase",
                      }}
                    >
                      PERFILES CONVOCADOS
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        justifyContent: "center",
                        mb: 4,
                      }}
                    >
                      {profiles.map((p, i) => (
                        <Box
                          key={i}
                          sx={{
                            px: 1.8,
                            py: 0.4,
                            fontSize: "0.7rem",
                            border: `1px solid ${brandPink}`,
                            color: brandPink,
                            borderRadius: "20px",
                            fontWeight: 700,
                            letterSpacing: "0.05em",
                            backgroundColor: "rgba(255, 183, 206, 0.04)",
                          }}
                        >
                          {p.toUpperCase()}
                        </Box>
                      ))}
                    </Box>
                    <Button
                      variant='contained'
                      fullWidth
                      onClick={() => {
                        const element = document.getElementById("events-list");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      startIcon={<ConfirmationNumberIcon />}
                      sx={{
                        bgcolor: deepText,
                        color: "#FFFFFF",
                        borderRadius: "12px",
                        py: 2,
                        fontWeight: 800,
                        letterSpacing: "0.2em",
                        transition: "0.4s",
                        "&:hover": {
                          bgcolor: brandPink,
                          color: deepText,
                          transform: "translateY(-3px)",
                          boxShadow: `0 8px 25px rgba(255, 183, 206, 0.35)`,
                        },
                      }}
                    >
                      ADQUIRIR BOLETOS
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box> */}
      </Container>
    </Box>
  );
}
