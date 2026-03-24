import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function MapSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box ref={ref} component='section' sx={{ py: 16, background: "#0A0A0A" }}>
      <Container maxWidth={false}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant='overline' display='block' sx={{ mb: 2 }}>
              Sede del evento
            </Typography>
            <Typography
              variant='h2'
              sx={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#F5F0E8",
                mb: 1.5,
              }}
            >
              WTC Ciudad de México
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
              }}
            >
              <LocationOnIcon sx={{ fontSize: 14, color: "#E8407A" }} />
              <Typography variant='caption'>
                Montecito 38, Col. Nápoles, CDMX
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ position: "relative" }}
        >
          <Box
            sx={{
              aspectRatio: { xs: "4/3", md: "16/7" },
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              position: "relative",
            }}
          >
            <iframe
              title='WTC Ciudad de México'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.0585258397654!2d-99.17808512394628!3d19.389218981879734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff4601a5785f%3A0x2553d5a4c3e39b09!2sWorld%20Trade%20Center%20Ciudad%20de%20M%C3%A9xico!5e0!3m2!1ses!2smx!4v1710000000000'
              width='100%'
              height='100%'
              style={{
                border: 0,
                filter: "invert(90%) hue-rotate(180deg)",
                display: "block",
              }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            />
          </Box>

          {/* Info card */}
          <Box
            sx={{
              position: "absolute",
              bottom: 24,
              left: 24,
              background: "rgba(10,10,10,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              p: 2.5,
              maxWidth: 260,
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                color: "#F5F0E8",
                mb: 0.5,
              }}
            >
              World Trade Center CDMX
            </Typography>
            <Typography variant='caption' display='block' sx={{ mb: 1.5 }}>
              Montecito 38, Nápoles, Benito Juárez
            </Typography>
            <Box
              component='a'
              href='https://maps.google.com/?q=World+Trade+Center+Mexico+City'
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                color: "#C9A84C",
                fontSize: "0.7rem",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                textDecoration: "none",
                "&:hover": { color: "#E8C96A" },
              }}
            >
              <OpenInNewIcon sx={{ fontSize: 12 }} /> Ver en Google Maps
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
