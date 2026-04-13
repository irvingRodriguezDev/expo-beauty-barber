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
import Marquee from "react-fast-marquee";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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

const brandItems = [
  "L'Oréal Pro",
  "Babyliss",
  "Wahl",
  "Schwarzkopf",
  "Andis",
  "Madelon",
  "Ghd",
  "Nioxin",
  "OPI",
];
const message =
  "Me interesa ser expositor, en la expo Belleza y Barberias 2027, me podrias brindar más detalles, sobre los stands para expositores, costos, etc.";

export default function Exhibitors() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const brandCyan = "#72F8FF";
  const deepPetroleum = "#02181B";

  return (
    <Box
      ref={ref}
      component='section'
      id='expositores'
      sx={{
        background: `linear-gradient(180deg, #042F35 0%, ${deepPetroleum} 100%)`,
        overflow: "hidden",
      }}
    >
      {/* 1. HEADER SECTION */}
      <Container maxWidth='xl' sx={{ py: { xs: 8, md: 15 } }}>
        <Grid container spacing={{ xs: 4, lg: 10 }} alignItems='flex-end'>
          <Grid item xs={12} lg={7}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Typography
                sx={{
                  // fontFamily: "'DM Sans'",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  letterSpacing: "0.5em",
                  color: brandCyan,
                  mb: 3,
                  textAlign: { xs: "center", lg: "left" },
                }}
              >
                PARTNERSHIPS 2027
              </Typography>
              <Typography
                variant='h2'
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: { xs: "2.8rem", sm: "4rem", md: "5.5rem" },
                  fontWeight: 900,
                  color: "#FFFFFF",
                  lineHeight: { xs: 1.1, md: 0.9 },
                  mb: { xs: 4, lg: 0 },
                  textAlign: { xs: "center", lg: "left" },
                }}
              >
                IMPULSA TU <br />
                <span
                  style={{
                    color: brandCyan,
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
                  borderLeft: { xs: "none", lg: `4px solid ${brandCyan}` },
                  borderTop: {
                    xs: `1px solid rgba(114, 248, 255, 0.3)`,
                    lg: "none",
                  },
                  pl: { lg: 4 },
                  pt: { xs: 4, lg: 0 },
                  textAlign: { xs: "center", lg: "left" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.15rem",
                    color: "rgba(255, 255, 255, 0.7)",
                    mb: 4,
                    lineHeight: 1.7,
                    fontWeight: 300,
                  }}
                >
                  Convertimos el WTC en el epicentro de negocios más vibrante de
                  Latinoamérica. Asegura tu lugar frente a los tomadores de
                  decisión.
                </Typography>
                {/* <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    // fontFamily: "'Syne'",
                    fontWeight: 800,
                    color: brandCyan,
                    letterSpacing: "0.1em",
                    "&:hover": {
                      bgcolor: "transparent",
                      color: "#FFFFFF",
                      transform: "translateX(10px)",
                    },
                    transition: "0.3s",
                  }}
                >
                  DESCARGAR BROCHURE COMERCIAL
                </Button> */}
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* 2. MARQUEE DE MARCAS */}
      {/* <Box
        sx={{
          bgcolor: "#02181B",
          py: { xs: 3, md: 5 },
          transform: "rotate(-1deg) scale(1.02)",
          my: 4,
          borderY: `1px solid rgba(114, 248, 255, 0.1)`,
        }}
      >
        <Marquee speed={60} gradient={false}>
          {brandItems.concat(brandItems).map((brand, i) => (
            <Typography
              key={i}
              sx={{
                // fontFamily: "'Syne'",
                fontSize: { xs: "1.2rem", md: "2.2rem" },
                fontWeight: 800,
                color: brandCyan,
                mx: { xs: 4, md: 8 },
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                opacity: 0.4,
                "&:hover": { opacity: 1, color: "#FFFFFF" },
                transition: "0.3s",
              }}
            >
              {brand} •
            </Typography>
          ))}
        </Marquee>
      </Box> */}

      {/* 3. BENEFITS GRID */}
      <Box sx={{ py: { xs: 10, md: 15 } }}>
        <Container maxWidth='xl'>
          <Grid container spacing={4}>
            {benefits.map((b, i) => (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      p: { xs: 4, md: 6 },
                      bgcolor: "rgba(255, 255, 255, 0.02)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: 4,
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                      display: "flex",
                      flexDirection: "column",

                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "2px",
                        background: brandCyan,
                        transform: "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform 0.5s ease",
                      },

                      "&:hover": {
                        bgcolor: "rgba(114, 248, 255, 0.04)",
                        transform: "translateY(-15px)",
                        borderColor: "rgba(114, 248, 255, 0.3)",
                        "&::before": { transform: "scaleX(1)" },
                        "& .benefit-number": {
                          opacity: 0.1,
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
                        color: brandCyan,
                        opacity: 0.03,
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
                          color: "#FFFFFF",
                          mb: 3,
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: -8,
                            left: 0,
                            width: "30px",
                            height: "2px",
                            bgcolor: brandCyan,
                          },
                        }}
                      >
                        {b.title}
                      </Typography>

                      <Typography
                        variant='body1'
                        sx={{
                          color: "rgba(255, 255, 255, 0.5)",
                          lineHeight: 1.9,
                          fontWeight: 300,
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

      {/* 4. CTA FINAL */}
      <Container maxWidth='lg' sx={{ pb: { xs: 10, md: 20 } }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Box
            sx={{
              p: { xs: 5, md: 8 },
              background: "#02181B",
              textAlign: "center",
              border: `1px solid rgba(114, 248, 255, 0.2)`,
              borderRadius: 4,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Glow decorativo de fondo */}
            <Box
              sx={{
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                background: `radial-gradient(circle, rgba(114, 248, 255, 0.03) 0%, transparent 50%)`,
                pointerEvents: "none",
              }}
            />

            <Typography
              sx={{
                // fontFamily: "'DM Sans'",
                fontSize: "0.75rem",
                fontWeight: 900,
                letterSpacing: "0.5em",
                color: brandCyan,
                mb: 3,
              }}
            >
              OPORTUNIDAD COMERCIAL
            </Typography>

            <Typography
              variant='h3'
              sx={{
                fontFamily: "'Syne'",
                fontWeight: 900,
                mb: 3,
                color: "#FFFFFF",
                fontSize: { xs: "2rem", md: "3.5rem" },
                lineHeight: 1,
              }}
            >
              ¿LISTO PARA{" "}
              <span style={{ color: brandCyan, fontStyle: "italic" }}>
                LIDERAR
              </span>{" "}
              EL SECTOR?
            </Typography>

            <Typography
              sx={{
                mb: 6,
                maxWidth: 600,
                mx: "auto",
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.8,
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
                to={`https://wa.me/+525546184541?text=${message}`}
                target='__blank'
              >
                <Button
                  variant='contained'
                  sx={{
                    bgcolor: brandCyan,
                    color: "#02181B",
                    px: { xs: 4, md: 6 },
                    py: 2,
                    borderRadius: 4,
                    // fontFamily: "'Syne'",
                    fontWeight: 900,
                    letterSpacing: "0.2em",
                    "&:hover": {
                      bgcolor: "#FFFFFF",
                      transform: "translateY(-5px)",
                      boxShadow: `0 10px 30px rgba(114, 248, 255, 0.3)`,
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
    </Box>
  );
}
