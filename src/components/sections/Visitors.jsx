import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Button, Stack, Grid } from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const perks = [
  {
    label: "Shows de Barberia",
    description: "Espectáculos en vivo con referentes de la barbería mundial.",
  },
  {
    label: "Zona de Maquillaje",
    description: "Espacios de vanguardia dedicados a la alta cosmética.",
  },
  {
    label: "Masterclasses",
    description: "Capacitación técnica de alto nivel para profesionales.",
  },
  {
    label: "Ofertas Exclusivas",
    description: "Acceso privilegiado a lanzamientos y precios de expo.",
  },
  {
    label: "Lugar para Creadores",
    description: "Zonas diseñadas para la creación de contenido digital.",
  },
  {
    label: "Relaciones Comerciales",
    description: "Conecta con dueños de negocio y líderes del sector.",
  },
];

const profiles = [
  "Estilistas",
  "Barberos",
  "Makeup Artists",
  "Dueños de Salón",
  "Distribuidores",
  "Emprendedores",
];

export default function Visitors() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box
      ref={ref}
      component='section'
      id='visitantes'
      sx={{
        py: { xs: 10, md: 15 },
        // CAMBIO: Gradiente Esmeralda a Salvia
        background: "linear-gradient(180deg, #062C22 0%, #668678 100%)",
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
                  fontFamily: "'Syne'",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  letterSpacing: "0.5em",
                  color: "#D4AF37", // CAMBIO: Dorado
                  mb: 3,
                  textTransform: "uppercase",
                }}
              >
                — Experiencia de Clase Mundial
              </Typography>
              <Typography
                variant='h2'
                sx={{
                  fontFamily: "'Syne'",
                  fontSize: { xs: "3.5rem", md: "6rem" },
                  fontWeight: 800,
                  color: "#FFFFFF", // CAMBIO: Blanco
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                }}
              >
                La cima del <br />
                <span
                  style={{
                    color: "#D4AF37",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  arte técnico
                </span>
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.7)", // Blanco suave
                fontSize: "1.1rem",
                lineHeight: 1.8,
                maxWidth: "450px",
                // CAMBIO: Borde Dorado
                borderLeft: "2px solid #D4AF37",
                pl: 3,
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
                    // CAMBIO: Fondo oscuro translúcido (Glassmorphism esmeralda)
                    backgroundColor: "rgba(6, 44, 34, 0.4)",
                    border: "1px solid rgba(212, 175, 55, 0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "2px", // Esquinas rectas
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      backgroundColor: "rgba(6, 44, 34, 0.8)",
                      transform: "translateY(-10px)",
                      borderColor: "#D4AF37", // Hover Dorado
                    },
                    "&:hover .bg-text": {
                      opacity: 0.08,
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Typography
                    className='bg-text'
                    sx={{
                      position: "absolute",
                      fontFamily: "'Syne'",
                      fontSize: "6rem",
                      fontWeight: 900,
                      color: "#D4AF37", // Texto de fondo Dorado
                      opacity: 0.03,
                      right: -20,
                      bottom: -20,
                      transition: "0.8s ease",
                      pointerEvents: "none",
                    }}
                  >
                    {p.label.split(" ")[0]}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "'Syne'",
                      fontWeight: 800,
                      fontSize: "1.5rem",
                      color: "#FFFFFF",
                      mb: 1,
                    }}
                  >
                    {p.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: "rgba(255, 255, 255, 0.6)",
                      lineHeight: 1.6,
                      zIndex: 1,
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
            <Grid item xs={12} md={11} sx={{ borderRadius: "0px" }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Box
                  sx={{
                    // CAMBIO: Fondo Negro Esmeralda Profundo
                    background: "#041C16",
                    color: "#FFF",
                    borderRadius: "0px",
                    p: { xs: 4, md: 8 },
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: 6,
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                  }}
                >
                  {/* Decoración de fondo sutil Dorado */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: -50,
                      right: -50,
                      width: 400,
                      height: 400,
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)",
                    }}
                  />

                  <Box
                    sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "'Syne'",
                        fontSize: { xs: "4rem", md: "7rem" },
                        fontWeight: 800,
                        lineHeight: 1,
                        mb: 2,
                        color: "#FFFFFF",
                      }}
                    >
                      5-6{" "}
                      <span style={{ color: "#D4AF37", fontSize: "0.5em" }}>
                        FEB
                      </span>
                    </Typography>
                    <Typography
                      sx={{
                        letterSpacing: "0.5em",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: "#D4AF37", // Dorado
                      }}
                    >
                      WTC • CIUDAD DE MÉXICO
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1, width: "100%" }}>
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        mb: 3,
                        letterSpacing: "0.3em",
                        color: "rgba(255, 255, 255, 0.5)",
                        textAlign: "center",
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
                            borderRadius: "0px",
                            fontSize: "0.75rem",
                            border: "1px solid rgba(212, 175, 55, 0.2)",
                            color: "#D4AF37",
                            fontFamily: "'Syne'",
                            letterSpacing: "0.1em",
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
                        // CAMBIO: Botón Dorado con texto Negro
                        bgcolor: "#D4AF37",
                        color: "#041C16",
                        borderRadius: 0,
                        py: 2.5,
                        fontWeight: 900,
                        fontFamily: "'Syne'",
                        letterSpacing: "0.3em",
                        transition: "0.4s",
                        "&:hover": {
                          bgcolor: "#FFFFFF",
                          color: "#041C16",
                          transform: "scale(1.02)",
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
