import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Button, Stack, Grid } from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

// Importación de ilustraciones (Idealmente .svg para máxima calidad)
import Barber from "../../assets/images/barber.svg";
import Makeup from "../../assets/images/makeup.svg";
import Masterclass from "../../assets/images/masterclass.svg";
import Deal from "../../assets/images/deal.svg";
import Spot from "../../assets/images/spot.svg";
import Networking from "../../assets/images/networking.svg";

const perks = [
  { img: Barber, label: "Barber Shows" },
  { img: Makeup, label: "Makeup Zone" },
  { img: Masterclass, label: "Masterclasses" },
  { img: Deal, label: "Exclusive Deals" },
  { img: Spot, label: "Creator Spot" },
  { img: Networking, label: "Networking" },
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
        py: { xs: 10, md: 20 },
        background: "linear-gradient(180deg, #FCE7F3 0%, #FDF2F8 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth='xl'>
        <Grid container spacing={0} alignItems='center'>
          {/* LADO IZQUIERDO: GRID 6 (CONTENIDO + MARQUEE) */}
          <Grid item xs={12} md={6} sx={{ pr: { md: 4 } }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Typography
                sx={{
                  fontFamily: "'DM Sans'",
                  fontSize: "0.8rem",
                  fontWeight: 900,
                  letterSpacing: "0.6em",
                  color: "#BE185D",
                  mb: 2,
                }}
              >
                VISITANTES
              </Typography>
              <Typography
                variant='h2'
                sx={{
                  fontFamily: "'Syne'",
                  fontSize: { xs: "3rem", md: "5.5rem" },
                  fontWeight: 800,
                  color: "#2D0A1A",
                  lineHeight: 0.85,
                  mb: 6,
                }}
              >
                La cima del <br />
                <span className='gradient-text'>arte técnico</span>
              </Typography>
            </motion.div>

            {/* CONTENEDOR MARQUEE GIGANTE */}
            <Box
              sx={{
                width: "100%",
                position: "relative",
                mt: 4,
                overflow: "hidden",
                // Desvanecido elegante en los bordes
                "&::before, &::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  width: "15%",
                  height: "100%",
                  zIndex: 2,
                },
                "&::before": {
                  left: 0,
                  background:
                    "linear-gradient(to right, transparent, transparent)",
                },
                "&::after": {
                  right: 0,
                  background:
                    "linear-gradient(to left, transparent, transparent)",
                },
              }}
            >
              <motion.div
                animate={{ x: [0, -3000] }} // Ajustado para un loop suave de imágenes grandes
                transition={{
                  repeat: Infinity,
                  duration: 50, // Velocidad tipo "Gallery Walk"
                  ease: "linear",
                }}
                style={{ display: "flex", gap: "120px", width: "max-content" }}
              >
                {/* Triplicamos el contenido para un loop sin saltos visibles */}
                {[...perks, ...perks, ...perks].map((p, i) => (
                  <Stack key={i} alignItems='center' sx={{ minWidth: 300 }}>
                    <Box
                      component='img'
                      src={p.img}
                      alt={p.label}
                      sx={{
                        width: "100%",
                        height: 250, // ALTURA GIGANTE PARA IMPACTO
                        objectFit: "contain",
                        filter:
                          "drop-shadow(0 25px 40px rgba(236,72,153,0.12))",
                        mb: 3,
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "'Syne'",
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        color: "#2D0A1A",
                        letterSpacing: "0.2em",
                        textAlign: "center",
                      }}
                    >
                      {p.label.toUpperCase()}
                    </Typography>
                  </Stack>
                ))}
              </motion.div>
            </Box>
          </Grid>

          {/* LADO DERECHO: GRID 6 (INVITACIÓN) */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: { xs: 8, md: 0 },
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1 }}
              style={{ width: "100%", maxWidth: "550px" }}
            >
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(25px)",
                  p: { xs: 5, md: 8 },
                  border: "2px solid #FFF",
                  boxShadow: "0 60px 120px rgba(190, 24, 93, 0.08)",
                  position: "relative",
                  borderRadius: 0, // Estilo Luxury Square
                }}
              >
                {/* Badge Flotante */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "#2D0A1A",
                    color: "#FFF",
                    px: 4,
                    py: 1.2,
                    fontFamily: "'Syne'",
                    fontWeight: 800,
                    fontSize: "0.7rem",
                    letterSpacing: "0.4em",
                    whiteSpace: "nowrap",
                  }}
                >
                  SAVE THE DATE
                </Box>

                <Stack spacing={6}>
                  <Box textAlign='center'>
                    <Typography
                      sx={{
                        fontFamily: "'Syne'",
                        fontSize: { xs: "5rem", md: "8rem" }, // FECHA MASIVA
                        fontWeight: 800,
                        lineHeight: 0.8,
                        color: "#2D0A1A",
                        letterSpacing: "-0.06em",
                      }}
                    >
                      14<span style={{ color: "#EC4899" }}>.</span>16
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'DM Sans'",
                        fontWeight: 800,
                        letterSpacing: "0.4em",
                        color: "#BE185D",
                        fontSize: "0.85rem",
                        mt: 4,
                      }}
                    >
                      MARZO • CDMX • WTC
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      textAlign='center'
                      sx={{
                        fontSize: "0.6rem",
                        fontWeight: 900,
                        mb: 3,
                        color: "#2D0A1A",
                        letterSpacing: "0.3em",
                        opacity: 0.4,
                      }}
                    >
                      COMUNIDAD EXCLUSIVA:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 1.5,
                      }}
                    >
                      {profiles.map((p, i) => (
                        <Box
                          key={i}
                          sx={{
                            px: 3,
                            py: 1,
                            fontSize: "0.7rem",
                            fontWeight: 800,
                            color: "#BE185D",
                            border: "1px solid rgba(236,72,153,0.3)",
                            fontFamily: "'Syne'",
                            transition: "0.4s",
                            "&:hover": {
                              bgcolor: "#2D0A1A",
                              color: "#FFF",
                              borderColor: "#2D0A1A",
                            },
                          }}
                        >
                          {p.toUpperCase()}
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Button
                    variant='contained'
                    fullWidth
                    startIcon={<ConfirmationNumberIcon />}
                    sx={{
                      bgcolor: "#2D0A1A",
                      color: "#FFF",
                      borderRadius: 0,
                      py: 3,
                      fontSize: "0.9rem",
                      fontWeight: 800,
                      fontFamily: "'Syne'",
                      letterSpacing: "0.2em",
                      "&:hover": {
                        bgcolor: "#EC4899",
                        transform: "translateY(-5px)",
                        boxShadow: "0 20px 40px rgba(236,72,153,0.3)",
                      },
                    }}
                  >
                    REGISTRO GRATUITO
                  </Button>
                </Stack>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
