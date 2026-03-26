import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Card, Stack, Button } from "@mui/material";
import Marquee from "react-fast-marquee";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StorefrontIcon from "@mui/icons-material/Storefront";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ShareIcon from "@mui/icons-material/Share";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const benefits = [
  {
    Icon: TrendingUpIcon,
    title: "VENTAS DIRECTAS",
    desc: "Contacto inmediato con profesionales y dueños de salones listos para invertir.",
  },
  {
    Icon: StorefrontIcon,
    title: "CANALES B2B",
    desc: "La plataforma perfecta para expandir tu red de distribución a nivel nacional.",
  },
  {
    Icon: EmojiEventsIcon,
    title: "BRAND AWARENESS",
    desc: "Posiciona tu marca en el 'top of mind' de la industria de la belleza en México.",
  },
  {
    Icon: OndemandVideoIcon,
    title: "LIVE DEMOS",
    desc: "Escenarios equipados para mostrar la eficacia de tus productos en tiempo real.",
  },
  {
    Icon: ShareIcon,
    title: "IMPACTO DIGITAL",
    desc: "Presencia en contenido capturado por influencers y medios especializados.",
  },
  {
    Icon: HandshakeIcon,
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

export default function Exhibitors() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box
      ref={ref}
      component='section'
      id='expositores'
      sx={{ background: "#FFFFFF", overflow: "hidden" }}
    >
      {/* Header Section: Editorial Style */}
      <Container maxWidth='xl' sx={{ py: { xs: 10, md: 15 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 0.8fr" },
            gap: 6,
            alignItems: "end",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Typography
              sx={{
                fontFamily: "'DM Sans'",
                fontSize: "0.75rem",
                fontWeight: 800,
                letterSpacing: "0.4em",
                color: "#BE185D",
                mb: 2,
              }}
            >
              PARTNERSHIPS 2027
            </Typography>
            <Typography
              variant='h2'
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontSize: { xs: "3rem", md: "5rem" },
                fontWeight: 800,
                color: "#2D0A1A",
                lineHeight: 0.9,
                mb: 4,
              }}
            >
              Impulsa tu <br />
              <span className='gradient-text'>crecimiento B2B</span>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <Typography
              sx={{
                fontSize: "1.2rem",
                color: "#552F3F",
                mb: 4,
                borderLeft: "4px solid #EC4899",
                pl: 3,
              }}
            >
              Convertimos el recinto en el epicentro de negocios más vibrante de
              Latinoamérica. No solo expones, conectas con el futuro de tu
              industria.
            </Typography>
            <Button
              endIcon={<ArrowForwardIcon />}
              sx={{
                fontFamily: "'Syne'",
                fontWeight: 800,
                color: "#EC4899",
                letterSpacing: "0.1em",
              }}
            >
              DESCARGAR BROCHURE COMERCIAL
            </Button>
          </motion.div>
        </Box>
      </Container>

      {/* Marquee de Marcas - Estética Minimalista */}
      <Box sx={{ bgcolor: "#FBE8F3", py: 4 }}>
        <Marquee speed={50} gradient gradientColor={[45, 10, 26]}>
          {brandItems.concat(brandItems).map((brand, i) => (
            <Typography
              key={i}
              sx={{
                fontFamily: "'Syne'",
                fontSize: { xs: "1.5rem", md: "2.5rem" },
                fontWeight: 800,
                color: "#EC4899",
                mx: 6,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                transition: "0.3s",
                "&:hover": { color: "#EC4899" },
              }}
            >
              {brand}
            </Typography>
          ))}
        </Marquee>
      </Box>

      {/* Benefits Grid: Glassmorphism / Clean Style */}
      <Box
        sx={{
          py: 15,
          background: "linear-gradient(180deg, #FAF8F5 0%, #FFFFFF 100%)",
        }}
      >
        <Container maxWidth='xl'>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 4,
            }}
          >
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    p: 4,
                    bgcolor: "transparent",
                    border: "1px solid rgba(0,0,0,0.05)",
                    borderRadius: 0,
                    transition: "0.4s",
                    "&:hover": {
                      bgcolor: "#FFF",
                      boxShadow: "0 30px 60px rgba(45,10,26,0.08)",
                      borderColor: "#F9A8D4",
                      transform: "translateY(-10px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      mb: 4,
                      display: "inline-flex",
                      p: 1.5,
                      bgcolor: "#FCE7F3",
                      color: "#BE185D",
                    }}
                  >
                    <b.Icon />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "'Syne'",
                      fontWeight: 800,
                      fontSize: "1rem",
                      letterSpacing: "0.1em",
                      color: "#2D0A1A",
                      mb: 2,
                    }}
                  >
                    {b.title}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ color: "#7D4A5F", lineHeight: 1.8 }}
                  >
                    {b.desc}
                  </Typography>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Final para Expositores */}
      <Container maxWidth='lg' sx={{ pb: 15, position: "relative" }}>
        {/* Decoración de fondo para dar profundidad */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            p: { xs: 6, md: 10 },
            // FONRO ROSA ULTRA-LIGHT CON CRISTAL
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(10px)",
            textAlign: "center",
            // BORDE ROSA VIBRANTE
            border: "1px solid rgba(236, 72, 153, 0.3)",
            position: "relative",
            zIndex: 1,
            // SOMBRA ELEVADA
            boxShadow: "0 40px 100px rgba(190, 24, 93, 0.08)",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'DM Sans'",
              fontSize: "0.7rem",
              fontWeight: 900,
              letterSpacing: "0.4em",
              color: "#BE185D",
              mb: 2,
              textTransform: "uppercase",
            }}
          >
            OPORTUNIDAD COMERCIAL
          </Typography>

          <Typography
            variant='h4'
            sx={{
              fontFamily: "'Syne'",
              fontWeight: 800,
              mb: 3,
              color: "#2D0A1A",
              fontSize: { xs: "2rem", md: "3rem" },
              lineHeight: 1,
            }}
          >
            ¿LISTO PARA <span style={{ color: "#EC4899" }}>LIDERAR</span> EL
            MERCADO?
          </Typography>

          <Typography
            sx={{
              mb: 6,
              maxWidth: 600,
              mx: "auto",
              color: "#552F3F",
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            Quedan pocos espacios disponibles para la edición 2027. Solicita una
            cotización personalizada de stand hoy mismo.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent='center'
          >
            <Button
              variant='contained'
              disableElevation
              sx={{
                bgcolor: "#2D0A1A",
                color: "#FFF",
                px: 6,
                py: 2.5,
                borderRadius: 0,
                fontFamily: "'Syne'",
                fontWeight: 800,
                letterSpacing: "0.1em",
                transition: "0.4s",
                "&:hover": {
                  bgcolor: "#EC4899",
                  transform: "translateY(-5px)",
                  boxShadow: "0 15px 30px rgba(236, 72, 153, 0.3)",
                },
              }}
            >
              CONTACTAR VENTAS
            </Button>

            <Button
              variant='outlined'
              sx={{
                borderColor: "#2D0A1A",
                color: "#2D0A1A",
                px: 6,
                py: 2.5,
                borderRadius: 0,
                fontFamily: "'Syne'",
                fontWeight: 800,
                letterSpacing: "0.1em",
                transition: "0.4s",
                "&:hover": {
                  borderColor: "#EC4899",
                  color: "#EC4899",
                  transform: "translateY(-5px)",
                },
              }}
            >
              VER PLANO DEL EVENTO
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
