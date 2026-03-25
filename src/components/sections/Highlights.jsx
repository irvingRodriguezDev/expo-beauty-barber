import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Card, CardContent } from "@mui/material";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MicIcon from "@mui/icons-material/Mic";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import StorefrontIcon from "@mui/icons-material/Storefront";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const items = [
  {
    Icon: StorefrontIcon,
    label: "Stands comerciales",
    desc: "Expositores con los mejores productos del sector.",
  },
  {
    Icon: AutoAwesomeIcon,
    label: "Demostraciones en vivo",
    desc: "Técnicas y productos presentados en tiempo real.",
  },
  {
    Icon: ContentCutIcon,
    label: "Barber Shows",
    desc: "Los mejores barberos en escena.",
  },
  {
    Icon: AutoAwesomeIcon,
    label: "Zona de maquillaje",
    desc: "Arte y tendencias del maquillaje profesional.",
  },
  {
    Icon: MicIcon,
    label: "Talleres y conferencias",
    desc: "Aprende de los referentes de la industria.",
  },
  {
    Icon: GroupsIcon,
    label: "Networking con marcas",
    desc: "Conecta con distribuidores y compradores.",
  },
  {
    Icon: ShoppingBagIcon,
    label: "Marketplace profesional",
    desc: "Compra y negocia directamente con marcas.",
  },
  {
    Icon: CameraAltIcon,
    label: "Contenido para redes",
    desc: "Fotobooth y zonas para crear contenido.",
  },
];

export default function Highlights() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box
      ref={ref}
      component='section'
      sx={{
        py: 16,
        background: "#0A0A0A",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.015,
          backgroundImage:
            "linear-gradient(#E040A0 1px, transparent 1px), linear-gradient(90deg, #E040A0 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <Container maxWidth={false} sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant='overline' display='block' sx={{ mb: 2 }}>
              Lo que encontrarás
            </Typography>
            <Typography
              variant='h2'
              sx={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", color: "#F5F0E8" }}
            >
              Una experiencia completa
            </Typography>
          </Box>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 2,
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Card
                sx={{
                  height: "100%",
                  cursor: "default",
                  "&:hover .card-icon-wrap": {
                    background: "rgba(201,168,76,0.2)",
                    borderColor: "rgba(201,168,76,0.5)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    className='card-icon-wrap'
                    sx={{
                      width: 40,
                      height: 40,
                      background: "rgba(201,168,76,0.08)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2.5,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <item.Icon sx={{ color: "#E040A0", fontSize: 18 }} />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      color: "#F0EAD6",
                      mb: 1,
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant='caption'
                    sx={{ color: "#ABABAB", lineHeight: 1.6 }}
                  >
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
