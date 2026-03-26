import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography } from "@mui/material";
import Marquee from "react-fast-marquee";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MicIcon from "@mui/icons-material/Mic";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import StorefrontIcon from "@mui/icons-material/Storefront";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const items = [
  { Icon: StorefrontIcon, label: "STANDS COMERCIALES" },
  { Icon: AutoAwesomeIcon, label: "DEMOSTRACIONES EN VIVO" },
  { Icon: ContentCutIcon, label: "BARBER SHOWS" },
  { Icon: AutoAwesomeIcon, label: "ZONA DE MAQUILLAJE" },
  { Icon: MicIcon, label: "TALLERES Y CONFERENCIAS" },
  { Icon: GroupsIcon, label: "NETWORKING VIP" },
  { Icon: ShoppingBagIcon, label: "MARKETPLACE PROFESIONAL" },
  { Icon: CameraAltIcon, label: "ZONA DE CREADORES" },
  { Icon: EmojiEventsIcon, label: "PREMIACIONES" },
  { Icon: AutoAwesomeIcon, label: "PASARELAS DE MODA" },
];

function MarqueeItem({ Icon, label, variant = "light" }) {
  const isDark = variant === "dark";
  const isOutline = variant === "outline";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mx: 1,
        px: 5,
        py: 3,
        // Variaciones de diseño premium
        background: isDark
          ? "#2D0A1A"
          : isOutline
            ? "transparent"
            : "rgba(255,255,255,0.4)",
        backdropFilter: isOutline ? "none" : "blur(10px)",
        borderLeft: isOutline
          ? "none"
          : `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(236,72,153,0.2)"}`,
        transition: "all 0.3s ease",
      }}
    >
      <Icon sx={{ color: isDark ? "#F9A8D4" : "#EC4899", fontSize: 20 }} />
      <Typography
        sx={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "0.9rem",
          color: isDark ? "#FAF8F5" : "#2D0A1A",
          whiteSpace: "nowrap",
          letterSpacing: "0.15em",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export default function Highlights() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box
      ref={ref}
      component='section'
      sx={{
        py: { xs: 10, md: 4 },
        background: "linear-gradient(180deg, #FAF8F5 0%, #FCE7F3 100%)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Título de Sección */}
      <Container maxWidth='xl'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: "left", mb: 8, maxWidth: 800 }}>
            <Typography
              sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.4em",
                color: "#BE185D",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              LA EXPERIENCIA
            </Typography>
            <Typography
              variant='h2'
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontSize: { xs: "2.5rem", md: "4rem" },
                color: "#2D0A1A",
                lineHeight: 1.1,
              }}
            >
              Un ecosistema diseñado <br />
              <span
                className='gradient-text'
                style={{ fontStyle: "italic", fontWeight: 500 }}
              >
                para tu crecimiento
              </span>
            </Typography>
          </Box>
        </motion.div>
      </Container>

      {/* Marquee row 1 — Look Minimalista/Claro */}
      <Box
        sx={{
          borderTop: "1px solid rgba(236,72,153,0.1)",
          borderBottom: "1px solid rgba(236,72,153,0.1)",
        }}
      >
        <Marquee speed={50} gradient={false}>
          {items.map((item, i) => (
            <MarqueeItem
              key={i}
              Icon={item.Icon}
              label={item.label}
              variant='light'
            />
          ))}
        </Marquee>
      </Box>

      {/* Marquee row 2 — El "Impacto" en Dark Rose */}
      <Box
        sx={{
          background:
            "linear-gradient(90deg, #2D0A1A 0%, #831843 50%, #2D0A1A 100%)",
          boxShadow: "0 20px 50px rgba(45,10,26,0.2)",
          transform: "rotate(-1deg) scale(1.02)", // Inclinación sutil para dinamismo editorial
          my: 4,
          zIndex: 2,
          position: "relative",
        }}
      >
        <Marquee speed={40} direction='right' gradient={false}>
          {[...items].reverse().map((item, i) => (
            <MarqueeItem
              key={i}
              Icon={item.Icon}
              label={item.label}
              variant='dark'
            />
          ))}
        </Marquee>
      </Box>

      {/* Marquee row 3 — Look Outline/Sutil */}
      <Box>
        <Marquee speed={30} gradient={false}>
          {items
            .slice(5)
            .concat(items.slice(0, 5))
            .map((item, i) => (
              <MarqueeItem
                key={i}
                Icon={item.Icon}
                label={item.label}
                variant='outline'
              />
            ))}
        </Marquee>
      </Box>

      {/* Decoración Final: Línea de firma */}
      <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: "1px",
            height: "100px",
            background: "linear-gradient(to bottom, #EC4899, transparent)",
          }}
        />
      </Box>
    </Box>
  );
}
