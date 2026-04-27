import { Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import viktoria from "../../assets/images/LogoViktoria.png";
import wapizima from "../../assets/images/LogoWapizima.png";
import princess from "../../assets/images/LogoPrincess.png";
import princessspa from "../../assets/images/LogoPrincessSPA.png";
import carolina from "../../assets/images/LogoCarolina.png";
import spawapizima from "../../assets/images/LogoSpaWapizima.png";
import tokyo from "../../assets/images/LogoTokyo.png";
// --- PALETA COHERENTE CON EL DISEÑO ANTERIOR ---
const brandPink = "#E53888";
const softPink = "#FFD9E2";
const goldAccent = "#FFD700"; // Para detalles de "Aniversario"

// Asumo que tienes los logos importados como en tu código original
const BRANDS = [
  { name: "VIKTORYA", image: viktoria },
  { name: "Princess", image: princess },
  { name: "Wapizima", image: wapizima },
  { name: "Princess SPA", image: princessspa },
  { name: "Carolina Tavera", image: carolina },
  { name: "Wapizima SPA", image: spawapizima },
  { name: "Tokyo", image: tokyo },
];

function BrandCard({ image, name }) {
  return (
    <Box sx={{ mx: 3, flexShrink: 0 }}>
      <Paper
        elevation={0}
        sx={{
          background: "rgba(255, 255, 255, 0.4)", // Glassmorphism
          backdropFilter: "blur(8px)",
          border: `1px solid rgba(229, 56, 136, 0.15)`,
          borderRadius: "24px",
          px: 4,
          py: 3,
          width: 220,
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.4s ease",
          "&:hover": {
            borderColor: brandPink,
            transform: "translateY(-5px)",
            boxShadow: `0 15px 35px rgba(229, 56, 136, 0.1)`,
            background: "rgba(255, 255, 255, 0.8)",
          },
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "70px",
            objectFit: "contain",
            filter: "grayscale(100%) opacity(0.7)", // Efecto elegante inicial
            transition: "all 0.4s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.filter = "grayscale(0%) opacity(1)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.filter = "grayscale(100%) opacity(0.7)")
          }
        />
      </Paper>
    </Box>
  );
}

export default function Brands() {
  // Duplicamos el array para que el scroll sea infinito y no tenga saltos
  const duplicatedBrands = [...BRANDS, ...BRANDS];

  return (
    <Box
      component='section'
      sx={{
        py: { xs: 8, md: 10 },
        background: softPink,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 6, px: 2 }}>
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 800,
            letterSpacing: "0.4em",
            color: brandPink,
            textTransform: "uppercase",
            mb: 1,
          }}
        >
          Aliados Estratégicos
        </Typography>
        <Typography
          variant='h3'
          sx={{
            fontWeight: 900,
            color: "#3D2B2F",
            fontFamily: "'Syne', sans-serif",
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Marcas que <span style={{ color: brandPink }}>nos acompañan</span>
        </Typography>
      </Box>

      {/* Contenedor del Marquee */}
      <Box
        sx={{
          display: "flex",
          width: "max-content",
          position: "relative",
        }}
      >
        <motion.div
          animate={{
            x: ["0%", "-50%"], // Se mueve la mitad para que sea infinito
          }}
          transition={{
            ease: "linear",
            duration: 30, // Ajusta la velocidad aquí
            repeat: Infinity,
          }}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <BrandCard key={`${brand.name}-${index}`} {...brand} />
          ))}
        </motion.div>
      </Box>

      {/* Degradados laterales para ocultar el corte del marquee */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "150px",
          height: "100%",
          //   background: `,
          zIndex: 3,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "150px",
          height: "100%",
          background: `linear-gradient(-90deg, ${softPink} 0%, transparent 100%)`,
          zIndex: 3,
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}
