import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Card, CardContent } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StorefrontIcon from "@mui/icons-material/Storefront";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ShareIcon from "@mui/icons-material/Share";
import HandshakeIcon from "@mui/icons-material/Handshake";

const benefits = [
  {
    Icon: TrendingUpIcon,
    title: "Ventas directas y generación de leads",
    desc: "Contacto con estilistas, barberos y dueños de salones listos para comprar.",
  },
  {
    Icon: StorefrontIcon,
    title: "Distribución B2B",
    desc: "Oportunidad de cerrar acuerdos con distribuidores y mayoristas.",
  },
  {
    Icon: EmojiEventsIcon,
    title: "Posicionamiento de marca",
    desc: "Visibilidad frente a miles de profesionales del sector.",
  },
  {
    Icon: OndemandVideoIcon,
    title: "Demostraciones en vivo",
    desc: "Presentación de productos en escenarios y pasarelas.",
  },
  {
    Icon: ShareIcon,
    title: "Contenido y marketing",
    desc: "Material para redes, influencers y medios especializados.",
  },
  {
    Icon: HandshakeIcon,
    title: "Networking",
    desc: "Alianzas con academias, marcas y compradores institucionales.",
  },
];

const activities = [
  "Stands comerciales",
  "Demostraciones de producto",
  "Pasarelas",
  "Barber Shows",
  "Talleres patrocinados",
  "Networking VIP",
];
const audience = [
  "Estilistas",
  "Barberos",
  "Maquilladores",
  "Dueños de salones",
  "Distribuidores",
  "Academias",
  "Influencers",
];

export default function Exhibitors() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Box
      ref={ref}
      component='section'
      sx={{
        py: 16,
        background: "#0A0A0A",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Container maxWidth={false}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              justifyContent: "space-between",
              alignItems: { lg: "flex-end" },
              gap: 4,
              mb: 8,
            }}
          >
            <Box>
              <Typography variant='overline' display='block' sx={{ mb: 2 }}>
                Sección expositores
              </Typography>
              <Typography
                variant='h2'
                sx={{
                  fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                  color: "#F5F0E8",
                }}
              >
                ¿Por qué
              </Typography>
              <Typography
                variant='h2'
                sx={{
                  fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                  background:
                    "linear-gradient(135deg, #C9A84C, #E8C96A, #C9A84C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                exponer con nosotros?
              </Typography>
            </Box>
            <Typography variant='body2' sx={{ maxWidth: 360 }}>
              El espacio ideal para que las marcas conecten directamente con
              compradores, distribuidores y profesionales del mercado.
            </Typography>
          </Box>
        </motion.div>

        {/* Benefits */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2,1fr)",
              lg: "repeat(3,1fr)",
            },
            gap: 2,
            mb: 12,
          }}
        >
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <Card
                sx={{
                  height: "100%",
                  "&:hover .benefit-icon": {
                    background: "rgba(201,168,76,0.2)",
                    borderColor: "rgba(201,168,76,0.55)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    className='benefit-icon'
                    sx={{
                      width: 44,
                      height: 44,
                      border: "1px solid rgba(201,168,76,0.22)",
                      background: "rgba(201,168,76,0.07)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <b.Icon sx={{ color: "#C9A84C", fontSize: 20 }} />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      color: "#F0EAD6",
                      mb: 1,
                    }}
                  >
                    {b.title}
                  </Typography>
                  <Typography
                    variant='caption'
                    sx={{ color: "#ABABAB", lineHeight: 1.65 }}
                  >
                    {b.desc}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>

        {/* Bottom 3-col */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "repeat(3,1fr)" },
            gap: 8,
            alignItems: "start",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <Typography variant='overline' display='block' sx={{ mb: 3 }}>
              Perfil del visitante
            </Typography>
            {audience.map((a, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  py: 1.2,
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#C9A84C",
                    flexShrink: 0,
                  }}
                />
                <Typography variant='body2'>{a}</Typography>
              </Box>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <Typography variant='overline' display='block' sx={{ mb: 3 }}>
              Actividades para marcas
            </Typography>
            {activities.map((a, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  py: 1.2,
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#E8407A",
                    flexShrink: 0,
                  }}
                />
                <Typography variant='body2'>{a}</Typography>
              </Box>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <Box
              sx={{
                aspectRatio: "1/1",
                overflow: "hidden",
                position: "relative",
                background: "#1A1A1A",
              }}
            >
              <Box
                component='img'
                src='https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=80'
                alt='Expo stand'
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.6,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(10,10,10,0.8), transparent)",
                }}
              />
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
