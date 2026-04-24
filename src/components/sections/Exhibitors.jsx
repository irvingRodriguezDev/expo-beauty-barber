import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  Card,
  Stack,
  Button,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

const benefits = [
  {
    title: "VENTAS DIRECTAS",
    desc: "Contacto inmediato con profesionales y dueños de salones listos para invertir.",
  },
  {
    title: "CANALES B2B",
    desc: "La plataforma perfecta para expandir tu red de distribución a nivel nacional.",
  },
  {
    title: "BRAND AWARENESS",
    desc: "Posiciona tu marca en el 'top of mind' de la industria de la belleza en México.",
  },
  {
    title: "LIVE DEMOS",
    desc: "Escenarios equipados para mostrar la eficacia de tus productos en tiempo real.",
  },
  {
    title: "IMPACTO DIGITAL",
    desc: "Presencia en contenido capturado por influencers y medios especializados.",
  },
  {
    title: "NETWORKING ELITE",
    desc: "Acceso exclusivo a la zona VIP para cerrar alianzas estratégicas de alto nivel.",
  },
];

const message =
  "Me interesa ser expositor, en Beauty World Mexico, me podrias brindar más detalles, sobre los stands para expositores, costos, etc.";

export default function Exhibitors() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // --- PALETA COHERENTE ---
  const brandPink = "#ee6f97ff"; // Rosa pastel claro
  const deepText = "#3D2B2F"; // Texto oscuro cálido
  const lightBg = "#FAD3DC"; // Fondo crema rosado
  // -------------------------

  return (
    <Box
      ref={ref}
      component='section'
      id='expositores'
      sx={{
        bgcolor: "#FFD9E2",
        overflow: "hidden",
      }}
    >
      {/* 1. HEADER SECTION */}
      <Container
        maxWidth='xl'
        sx={{ py: { xs: 8, md: 15 }, bgcolor: "#FFD9E2" }}
      >
        <Grid container spacing={{ xs: 4, lg: 10 }} alignItems='flex-end'>
          <Grid item xs={12} lg={7}>
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
                  width: "fit-content",
                  display: "inline-block",
                  bgcolor: "#FFCBDA",
                  mb: 3,
                  textAlign: { xs: "center", lg: "left" },
                  textTransform: "uppercase",
                }}
              >
                PARTNERSHIPS 2027
              </Typography>
              <Typography
                variant='h2'
                sx={{
                  // fontFamily: "'Syne', sans-serif",
                  fontSize: { xs: "2.8rem", sm: "4rem", md: "5.5rem" },
                  fontWeight: 900,
                  color: deepText,
                  lineHeight: { xs: 1.1, md: 0.9 },
                  mb: { xs: 4, lg: 0 },
                  textAlign: { xs: "center", lg: "left" },
                }}
              >
                IMPULSA TU <br />
                <span
                  style={{
                    color: brandPink,
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  CRECIMIENTO B2B
                </span>
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} lg={5}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Box
                sx={{
                  borderLeft: { xs: "none", lg: `4px solid ${brandPink}` },
                  pl: { lg: 4 },
                  textAlign: { xs: "center", lg: "left" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.15rem",
                    color: "rgba(61, 43, 47, 0.7)",
                    mb: 4,
                    lineHeight: 1.7,
                    fontWeight: 500,
                  }}
                >
                  Convertimos el WTC en el epicentro de negocios más vibrante de
                  Latinoamérica. Asegura tu lugar frente a los tomadores de
                  decisión.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* 2. CARD CENTRAL DE CONTACTO */}
      <Container
        maxWidth='lg'
        sx={{ pb: { xs: 10, md: 20 }, bgcolor: "#FFD9E2" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Box
            sx={{
              p: { xs: 5, md: 8 },
              background: "#FFFFFF",
              textAlign: "center",
              border: `1px solid rgba(255, 183, 206, 0.4)`,
              borderRadius: 1,
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 40px 100px rgba(61, 43, 47, 0.05)",
            }}
          >
            <Typography
              variant='h3'
              sx={{
                // fontFamily: "'Syne'",
                fontWeight: 900,
                mb: 3,
                color: deepText,
                fontSize: { xs: "2rem", md: "3.5rem" },
                lineHeight: 1,
              }}
            >
              ¿LISTO PARA{" "}
              <span style={{ color: brandPink, fontStyle: "italic" }}>
                LIDERAR
              </span>{" "}
              EL SECTOR?
            </Typography>

            <Typography
              sx={{
                mb: 6,
                maxWidth: 600,
                mx: "auto",
                color: "rgba(61, 43, 47, 0.6)",
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.8,
                fontWeight: 500,
              }}
            >
              Quedan pocos espacios disponibles para la edición 2027 en el WTC.
              Asegura tu presencia en el evento élite de la industria.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent='center'
            >
              <Link
                to={`https://wa.me/+525651580683?text=${message}`}
                target='__blank'
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant='contained'
                  sx={{
                    bgcolor: deepText,
                    color: "#FFFFFF",
                    px: { xs: 4, md: 6 },
                    py: 2,
                    borderRadius: 2,
                    fontWeight: 900,
                    letterSpacing: "0.2em",
                    "&:hover": {
                      bgcolor: brandPink,
                      color: deepText,
                      transform: "translateY(-5px)",
                      boxShadow: `0 10px 30px rgba(255, 183, 206, 0.3)`,
                    },
                    transition: "0.3s",
                  }}
                >
                  CONTACTAR VENTAS
                </Button>
              </Link>
            </Stack>
          </Box>
        </motion.div>
      </Container>

      {/* 3. BENEFITS GRID */}
      <Box sx={{ py: { xs: 10, md: 15 }, bgcolor: "#FFD9E2" }}>
        <Container maxWidth='xl'>
          <Grid container spacing={4}>
            {benefits.map((b, i) => (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      p: { xs: 4, md: 6 },
                      bgcolor: "#FFFFFF",
                      border: "1px solid rgba(255, 183, 206, 0.2)",
                      borderRadius: 1,
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "0 10px 30px rgba(61, 43, 47, 0.02)",

                      "&:hover": {
                        transform: "translateY(-15px)",
                        borderColor: brandPink,
                        boxShadow: "0 20px 50px rgba(255, 183, 206, 0.2)",
                        "& .benefit-number": {
                          opacity: 0.15,
                          transform: "translateX(-15px)",
                        },
                      },
                    }}
                  >
                    <Typography
                      className='benefit-number'
                      sx={{
                        position: "absolute",
                        top: -10,
                        right: 20,
                        fontSize: "8rem",
                        fontWeight: 900,
                        // fontFamily: "'Syne'",
                        color: brandPink,
                        opacity: 0.05,
                        lineHeight: 1,
                        transition: "0.6s ease",
                        pointerEvents: "none",
                        zIndex: 0,
                      }}
                    >
                      0{i + 1}
                    </Typography>

                    <Box sx={{ position: "relative", zIndex: 1 }}>
                      <Typography
                        sx={{
                          // fontFamily: "'Syne'",
                          fontWeight: 900,
                          fontSize: "1.25rem",
                          letterSpacing: "0.05em",
                          color: deepText,
                          mb: 3,
                          position: "relative",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: -8,
                            left: 0,
                            width: "30px",
                            height: "3px",
                            bgcolor: brandPink,
                          },
                        }}
                      >
                        {b.title}
                      </Typography>

                      <Typography
                        variant='body1'
                        sx={{
                          color: "rgba(61, 43, 47, 0.6)",
                          lineHeight: 1.8,
                          fontWeight: 500,
                          fontSize: "1rem",
                          mt: 2,
                        }}
                      >
                        {b.desc}
                      </Typography>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
