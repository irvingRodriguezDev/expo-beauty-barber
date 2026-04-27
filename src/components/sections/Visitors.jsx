import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const perks = [
  {
    label: "Técnicas de Vanguardia",
    description:
      "Aprende micropintura, relieves y estructuras de salón con las mejores másteres.",
  },
  {
    label: "Venta de Aniversario",
    description:
      "Acceso exclusivo a todo el stock de productos Wapizima con precios de locura.",
  },
  {
    label: "Masterclasses En Vivo",
    description:
      "Capacitación técnica presencial para elevar el nivel de tu mesa de trabajo.",
  },
  {
    label: "Rifas y Premios",
    description:
      "Participa por más de 50 sorpresas y dinámicas especiales durante todo el día.",
  },
  {
    label: "Reconocimientos",
    description:
      "Forma parte de 'El Salón de tus Sueños' y recibe tu certificado de asistencia.",
  },
  {
    label: "Comunidad VIP",
    description:
      "Conecta con miles de manicuristas y comparte tu pasión en el mejor ambiente.",
  },
];

const profiles = [
  "Manicuristas",
  "Técnicas en Uñas",
  "Nail Artists",
  "Dueñas de Salón",
  "Educadoras",
  "Emprendedoras",
];
export default function Visitors() {
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
      id='visitantes'
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: lightBg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth='xl'>
        {/* CABECERA DE SECCIÓN */}
        <Grid container spacing={6} alignItems='flex-end' sx={{ mb: 10 }}>
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  letterSpacing: "0.5em",
                  color: "",
                  mb: 3,
                  textTransform: "uppercase",
                  bgcolor: "#FFCBDA",
                  width: "fit-content",
                  display: "inline-block",
                }}
              >
                — TU CRECIMIENTO ES NUESTRA PASIÓN
              </Typography>
              <Typography
                variant='h2'
                sx={{
                  fontSize: { xs: "3.5rem", md: "6rem" },
                  fontWeight: 800,
                  color: deepText,
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
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
                color: "rgba(61, 43, 47, 0.7)",
                fontSize: "1.1rem",
                lineHeight: 1.8,
                maxWidth: "450px",
                borderLeft: `3px solid ${brandPink}`,
                pl: 3,
                fontWeight: 500,
              }}
            >
              Un ecosistema diseñado para elevar el estándar de la industria.
              Convergencia de talento, negocios y vanguardia estética.
            </Typography>
          </Grid>
        </Grid>

        {/* GRID DE EXPERIENCIAS (PERKS) */}
        <Grid container spacing={3} sx={{ mb: 15 }}>
          {perks.map((p, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Box
                  sx={{
                    height: "280px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    p: 4,
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(255, 183, 206, 0.2)",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 1,
                    transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                    boxShadow: "0 10px 30px rgba(61, 43, 47, 0.03)",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      borderColor: brandPink,
                      boxShadow: "0 20px 40px rgba(255, 183, 206, 0.15)",
                    },
                    "&:hover .bg-text": {
                      opacity: 0.15,
                      transform: "scale(1.1) translateX(-10%)",
                    },
                  }}
                >
                  <Typography
                    className='bg-text'
                    sx={{
                      position: "absolute",
                      fontSize: "6rem",
                      fontWeight: 900,
                      color: brandPink,
                      opacity: 0.06,
                      right: -10,
                      bottom: -20,
                      transition: "0.8s ease",
                      pointerEvents: "none",
                    }}
                  >
                    {p.label.split(" ")[0]}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: "1.5rem",
                      color: deepText,
                      mb: 1,
                    }}
                  >
                    {p.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.95rem",
                      color: "rgba(61, 43, 47, 0.6)",
                      lineHeight: 1.6,
                      zIndex: 1,
                      fontWeight: 500,
                    }}
                  >
                    {p.description}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* ÁREA DE REGISTRO E INVITACIÓN */}
        <Box sx={{ position: "relative" }}>
          <Grid container justifyContent='center'>
            <Grid item xs={12} md={11}>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Box
                  sx={{
                    background: "#FFFFFF",
                    color: deepText,
                    borderRadius: 1,
                    p: { xs: 4, md: 8 },
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: 6,
                    position: "relative",
                    overflow: "hidden",
                    border: `1px solid rgba(255, 183, 206, 0.4)`,
                    boxShadow: "0 40px 100px rgba(61, 43, 47, 0.08)",
                  }}
                >
                  {/* Glow Radial en Rosa */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -150,
                      right: -150,
                      width: 400,
                      height: 400,
                      borderRadius: "50%",
                      background: `radial-gradient(circle, rgba(255,183,206,0.2) 0%, transparent 70%)`,
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
                        fontSize: { xs: "4rem", md: "7rem" },
                        fontWeight: 900,
                        lineHeight: 1,
                        mb: 2,
                        color: deepText,
                      }}
                    >
                      6{" "}
                      <span style={{ color: brandPink, fontSize: "0.5em" }}>
                        JUN
                      </span>
                    </Typography>
                    <Typography
                      sx={{
                        letterSpacing: "0.5em",
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        color: brandPink,
                      }}
                    >
                      WTC • CIUDAD DE MÉXICO
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1, width: "100%", zIndex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: 800,
                        mb: 3,
                        letterSpacing: "0.3em",
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
                        gap: 1.5,
                        justifyContent: "center",
                        mb: 5,
                      }}
                    >
                      {profiles.map((p, i) => (
                        <Box
                          key={i}
                          sx={{
                            px: 2,
                            py: 0.5,
                            fontSize: "0.75rem",
                            border: `1px solid ${brandPink}`,
                            color: brandPink,
                            borderRadius: 2,
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            backgroundColor: "rgba(255, 183, 206, 0.05)",
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
                        const element = document.getElementById("register");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      startIcon={<ConfirmationNumberIcon />}
                      sx={{
                        bgcolor: deepText,
                        color: "#FFFFFF",
                        borderRadius: 2,
                        py: 2.5,
                        fontWeight: 800,
                        letterSpacing: "0.3em",
                        transition: "0.4s",
                        "&:hover": {
                          bgcolor: brandPink,
                          color: deepText,
                          transform: "translateY(-5px)",
                          boxShadow: `0 10px 30px rgba(255, 183, 206, 0.4)`,
                        },
                      }}
                    >
                      REGÍSTRATE AQUÍ
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
