import { motion } from "framer-motion";
import { Box, Container, Typography, Button, Chip } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#0A0A0A",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "25%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: "25%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,64,122,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Grid */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.025,
            backgroundImage:
              "linear-gradient(#E040A0 1px, transparent 1px), linear-gradient(90deg, #E040A0 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </Box>

      {/* Background image */}
      <Box sx={{ position: "absolute", inset: 0 }}>
        <Box
          component='img'
          src='https://images.unsplash.com/photo-1566833963559-bfbbacad87e5?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.18,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, transparent 50%, #0A0A0A 100%)",
          }}
        />
      </Box>

      {/* Content */}
      <Container
        maxWidth={false}
        sx={{ position: "relative", zIndex: 1, pt: 16 }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              border: "1px solid rgba(201,168,76,0.3)",
              px: 2,
              py: 0.75,
              mb: 4,
              background: "rgba(201,168,76,0.05)",
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#E8407A",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%, 100%": { opacity: 1 },
                  "50%": { opacity: 0.4 },
                },
              }}
            />
            <Typography
              sx={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#E040A0",
              }}
            >
              Edición 2026
            </Typography>
          </Box>
        </motion.div>

        {/* Headline */}
        <Box sx={{ overflow: "hidden", mb: 0.5 }}>
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Typography
              variant='h1'
              sx={{ fontSize: "clamp(3rem, 10vw, 9rem)", color: "#F5F0E8" }}
            >
              EXPO BEAUTY
            </Typography>
          </motion.div>
        </Box>
        <Box sx={{ overflow: "hidden", mb: 3 }}>
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Typography
              variant='h1'
              sx={{
                fontSize: "clamp(3rem, 10vw, 9rem)",
                background:
                  "linear-gradient(135deg, #E040A0, #E8C96A, #E040A0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              & BARBER EMPRENDE
            </Typography>
          </motion.div>
        </Box>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Typography
            variant='body1'
            sx={{
              fontSize: { xs: "1rem", md: "1.1rem" },
              maxWidth: 520,
              mb: 5,
              color: "#ABABAB",
            }}
          >
            El punto de encuentro para la industria de la belleza, barbería y
            maquillaje en México.
          </Typography>
        </motion.div>

        {/* Date & Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 5 }}>
            {[
              {
                icon: (
                  <CalendarMonthIcon sx={{ fontSize: 14, color: "#E040A0" }} />
                ),
                text: "14, 15 y 16 de Marzo 2026",
              },
              {
                icon: (
                  <LocationOnIcon sx={{ fontSize: 14, color: "#E8407A" }} />
                ),
                text: "WTC Ciudad de México",
              },
            ].map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  border: "1px solid rgba(255,255,255,0.1)",
                  px: 2,
                  py: 1,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                {item.icon}
                <Typography
                  sx={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.8rem",
                    color: "#F5F0E8",
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Button
              variant='contained'
              color='primary'
              size='large'
              onClick={() => scrollTo("expositores")}
            >
              Quiero exponer
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              size='large'
              onClick={() => scrollTo("visitantes")}
            >
              Quiero asistir
            </Button>
          </Box>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          cursor: "pointer",
        }}
        onClick={() => scrollTo("inicio")}
      >
        <Typography
          sx={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            color: "#444",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </Typography>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <KeyboardArrowDownIcon sx={{ color: "#E040A0", fontSize: 18 }} />
        </motion.div>
      </motion.div>
    </Box>
  );
}
