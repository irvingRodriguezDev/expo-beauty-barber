import { motion, AnimatePresence } from "framer-motion";
import { Box, Container, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useEffect, useState } from "react";
import MethodGet from "../../config/service";
import EventCard from "../EventCard";

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero({ loading }) {
  const brandPink = "#ee6f97ff";
  const lightBg = "#FFD9E2";
  const deepText = "#3D2B2F";

  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let url = "/events";
    MethodGet(url)
      .then((res) => {
        setEvents(res.data || []);
      })
      .catch((error) => {
        console.log(error, "ocurrio un error");
      });
  }, []);

  const nextEvents = events ? events.slice(0, 5) : [];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % nextEvents.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + nextEvents.length) % nextEvents.length,
    );
  };

  if (loading || nextEvents.length === 0) return null;

  const currentEvent = nextEvents[currentIndex];

  return (
    <Box
      component='section'
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100vw",
        bgcolor: lightBg,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth='xl'
        sx={{ position: "relative", zIndex: 1, py: { xs: 8, md: 0 } }}
      >
        <AnimatePresence mode='wait'>
          {/* El contenedor animado envuelve directamente a la tarjeta completa */}
          <motion.div
            key={currentEvent.id || currentIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <EventCard
              evento={currentEvent}
              brandPink={brandPink}
              deepText={deepText}
            />
          </motion.div>
        </AnimatePresence>
      </Container>

      {/* CONTROLES LATERALES DEL SLIDER */}
      {nextEvents.length > 1 && (
        <>
          <Button
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: 20,
              top: "50%",
              transform: "translateY(-50%)",
              color: deepText,
              zIndex: 2,
              minWidth: "auto",
              p: 1.5,
              borderRadius: "50%",
              "&:hover": { bgcolor: "rgba(255,255,255,0.4)" },
            }}
          >
            <ArrowBackIosNewIcon fontSize='large' />
          </Button>
          <Button
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: 20,
              top: "50%",
              transform: "translateY(-50%)",
              color: deepText,
              zIndex: 2,
              minWidth: "auto",
              p: 1.5,
              borderRadius: "50%",
              "&:hover": { bgcolor: "rgba(255,255,255,0.4)" },
            }}
          >
            <ArrowForwardIosIcon fontSize='large' />
          </Button>
        </>
      )}

      {/* Flecha Scroll Down */}
      <Box
        onClick={() => scrollTo("visitantes")}
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          cursor: "pointer",
          zIndex: 2,
          display: { xs: "none", md: "block" },
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <KeyboardArrowDownIcon
            sx={{ color: brandPink, fontSize: 36, opacity: 0.8 }}
          />
        </motion.div>
      </Box>
    </Box>
  );
}
