import { motion } from "framer-motion";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WomenEbb from "../../assets/images/WONDER EBB.png";
import MenEbb from "../../assets/images/MAN EBB.png";
const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        /* Fondo Premium: Degradado de seda rosada */
        background:
          "radial-gradient(circle at 20% 30%, #FFF5F7 0%, #FCE7F3 40%, #F9A8D4 120%)",
        overflow: "hidden",
      }}
    >
      {/* Elementos Decorativos de Alta Gama */}
      <Box
        sx={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: "70vw",
          height: "70vw",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 60%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      {/* Patrón de líneas finas (Luxury Grid) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage: `linear-gradient(to right, #BE185D 1px, transparent 1px), 
                            linear-gradient(to bottom, #BE185D 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(circle, black, transparent 80%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth='xl' sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.2fr 0.8fr" },
            gap: { xs: 6, lg: 2 },
            alignItems: "center",
          }}
        >
          {/* Contenido Izquierdo */}
          <Box>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.5em",
                  color: "#BE185D",
                  textTransform: "uppercase",
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  "&::after": {
                    content: '""',
                    width: "60px",
                    height: "1px",
                    bgcolor: "#BE185D",
                  },
                }}
              >
                Edición 2027
              </Typography>
            </motion.div>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant='h1'
                sx={{
                  fontSize: { xs: "4rem", md: "6rem", lg: "8.5rem" },
                  lineHeight: 0.85,
                  fontWeight: 800,
                  fontFamily: "'Syne', sans-serif",
                  color: "#2D0A1A",
                  mb: 1,
                }}
              >
                EXPO <br />
                <span
                  className='gradient-text'
                  style={{ fontStyle: "italic", fontWeight: 400 }}
                >
                  BEAUTY
                </span>
                <br /> & BARBER
              </Typography>
            </Box>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Typography
                variant='body1'
                sx={{
                  fontSize: "1.1rem",
                  maxWidth: 500,
                  mb: 5,
                  color: "#7D4A5F",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                Donde el arte de la estética se encuentra con la visión
                empresarial. Sé parte del evento más prestigioso de México.
              </Typography>
            </motion.div>

            {/* Info Badges Glassmorphism */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              gap={2}
              sx={{ mb: 6 }}
            >
              {[
                { icon: <CalendarMonthIcon />, text: "14–16 Marzo, 2027" },
                { icon: <LocationOnIcon />, text: "WTC Ciudad de México" },
              ].map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 3,
                    py: 1.5,
                    bgcolor: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.6)",
                    borderRadius: "100px",
                  }}
                >
                  <Box sx={{ color: "#EC4899", display: "flex" }}>
                    {item.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      color: "#2D0A1A",
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Stack>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 3 }}>
              <Button
                variant='contained'
                onClick={() => scrollTo("expositores")}
                sx={{
                  bgcolor: "#2D0A1A",
                  color: "#FFF",
                  borderRadius: "0px", // Corte recto para look más arquitectónico/premium
                  px: 5,
                  py: 2,
                  "&:hover": { bgcolor: "#BE185D" },
                }}
              >
                QUIERO EXPONER
              </Button>
              <Button
                variant='text'
                onClick={() => scrollTo("visitantes")}
                sx={{
                  color: "#2D0A1A",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  "&:hover": { color: "#EC4899" },
                }}
              >
                QUIERO ASISTIR —
              </Button>
            </Box>
          </Box>

          {/* Imagen Derecha con Efecto de Profundidad */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <Box
                sx={{
                  width: { xs: "300px", md: "450px" },
                  height: { xs: "400px", md: "700px" },
                  borderRadius: "200px 200px 0 0", // Forma de arco de salón de belleza
                  overflow: "hidden",
                  // border: "12px solid rgba(195, 23, 23, 0.5)",
                  // boxShadow: "0 40px 100px rgba(131, 24, 67, 0.15)",
                }}
              >
                <Box
                  component='img'
                  src={WomenEbb}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    mt: "30px",
                  }}
                />
              </Box>
            </motion.div>

            {/* Floating Element: El logo u objeto destacado */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", bottom: "10%", left: "-5%" }}
            >
              <Box
                sx={{
                  bgcolor: "#FFF",
                  p: 3,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  border: "1px solid #FCE7F3",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Syne'",
                    fontWeight: 800,
                    color: "#BE185D",
                  }}
                >
                  EDICIÓN <br /> LIMITADA
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Container>

      {/* Scroll Down Custom */}
      <Box
        onClick={() => scrollTo("visitantes")}
        sx={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          cursor: "pointer",
          textAlign: "center",
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <KeyboardArrowDownIcon sx={{ color: "#BE185D", fontSize: 30 }} />
        </motion.div>
      </Box>
    </Box>
  );
}
