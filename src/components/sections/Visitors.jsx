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

  const brandCyan = "#72F8FF";
  const darkPetroleum = "#042F35";

  return (
    <Box
      ref={ref}
      component='section'
      id='visitantes'
      sx={{
        py: { xs: 10, md: 15 },
        // GRADIENTE: Transición de petróleo profundo
        background: `linear-gradient(180deg, #02181B 0%, ${darkPetroleum} 100%)`,
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
                  // fontFamily: "'Syne'",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  letterSpacing: "0.5em",
                  color: brandCyan, // Acento Cian
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
                  color: "#FFFFFF",
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                }}
              >
                La cima del <br />
                <span
                  style={{
                    color: brandCyan,
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
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "1.1rem",
                lineHeight: 1.8,
                maxWidth: "450px",
                borderLeft: `2px solid ${brandCyan}`, // Borde Cian
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
                    // Fondo Glassmorphism Dark Petroleum
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(15px)",
                    borderRadius: "2px",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                    "&:hover": {
                      backgroundColor: "rgba(114, 248, 255, 0.05)",
                      transform: "translateY(-10px)",
                      borderColor: brandCyan,
                    },
                    "&:hover .bg-text": {
                      opacity: 0.1,
                      transform: "scale(1.1) translateX(-10%)",
                    },
                  }}
                >
                  <Typography
                    className='bg-text'
                    sx={{
                      position: "absolute",
                      // fontFamily: "'Syne'",
                      fontSize: "6rem",
                      fontWeight: 900,
                      color: brandCyan,
                      opacity: 0.03,
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
                      // fontFamily: "'Syne'",
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
            <Grid item xs={12} md={11}>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Box
                  sx={{
                    // Fondo Petróleo más profundo para el call-out
                    background: "#02181B",
                    color: "#FFF",
                    borderRadius: "0px",
                    p: { xs: 4, md: 8 },
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: 6,
                    position: "relative",
                    overflow: "hidden",
                    border: `1px solid rgba(114, 248, 255, 0.2)`,
                  }}
                >
                  {/* Glow Radial en Cian */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -150,
                      left: -150,
                      width: 400,
                      height: 400,
                      borderRadius: "50%",
                      background: `radial-gradient(circle, rgba(114,248,255,0.08) 0%, transparent 70%)`,
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
                        // fontFamily: "'Syne'",
                        fontSize: { xs: "4rem", md: "7rem" },
                        fontWeight: 800,
                        lineHeight: 1,
                        mb: 2,
                        color: "#FFFFFF",
                      }}
                    >
                      5-6{" "}
                      <span style={{ color: brandCyan, fontSize: "0.5em" }}>
                        FEB
                      </span>
                    </Typography>
                    <Typography
                      sx={{
                        letterSpacing: "0.5em",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: brandCyan,
                      }}
                    >
                      WTC • CIUDAD DE MÉXICO
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1, width: "100%", zIndex: 1 }}>
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
                            fontSize: "0.75rem",
                            border: `1px solid rgba(114, 248, 255, 0.3)`,
                            color: brandCyan,
                            // fontFamily: "'Syne'",
                            letterSpacing: "0.1em",
                            backgroundColor: "rgba(114, 248, 255, 0.05)",
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
                        // Botón Cian Eléctrico
                        bgcolor: brandCyan,
                        color: "#02181B",
                        borderRadius: 0,
                        py: 2.5,
                        fontWeight: 900,
                        // fontFamily: "'Syne'",
                        letterSpacing: "0.3em",
                        transition: "0.4s",
                        "&:hover": {
                          bgcolor: "#FFFFFF",
                          color: "#02181B",
                          transform: "translateY(-5px)",
                          boxShadow: `0 10px 30px rgba(114, 248, 255, 0.3)`,
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
