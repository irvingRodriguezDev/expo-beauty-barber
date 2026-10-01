import React from "react";
import { Box, Typography, Container, Chip } from "@mui/material";
import Marquee from "react-fast-marquee";
import HandshakeIcon from "@mui/icons-material/Handshake";

import viktoria from "../../assets/images/LogoViktoria.png";
import wapizima from "../../assets/images/LogoWapizima.png";
import princess from "../../assets/images/LogoPrincess.png";
import princessspa from "../../assets/images/LogoPrincessSPA.png";
import carolina from "../../assets/images/LogoCarolina.png";
import spawapizima from "../../assets/images/LogoSpaWapizima.png";
import tokyo from "../../assets/images/LogoTokyo.png";

const BRANDS = [
  { name: "VIKTORYA", image: viktoria },
  { name: "Princess", image: princess },
  { name: "Wapizima", image: wapizima },
  { name: "Princess SPA", image: princessspa },
  { name: "Carolina Tavera", image: carolina },
  { name: "Wapizima SPA", image: spawapizima },
  { name: "Tokyo", image: tokyo },
];

function BrandCard({ image, name, brandPink, borderTone }) {
  return (
    <Box
      sx={{
        mx: 1.5,
        my: 1,
        bgcolor: "#FFFFFF",
        border: `1px solid ${borderTone}`,
        borderRadius: "20px",
        px: 3,
        py: 2,
        width: { xs: 180, md: 220 },
        height: { xs: 90, md: 105 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 15px rgba(225, 29, 116, 0.04)",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "&:hover": {
          borderColor: brandPink,
          transform: "translateY(-4px)",
          boxShadow: "0 12px 28px rgba(225, 29, 116, 0.15)",
          "& img": {
            filter: "grayscale(0%) opacity(1)",
            transform: "scale(1.05)",
          },
        },
      }}
    >
      <Box
        component='img'
        src={image}
        alt={name}
        sx={{
          maxWidth: "85%",
          maxHeight: "60px",
          objectFit: "contain",
          filter: "grayscale(100%) opacity(0.55)",
          transition: "all 0.4s ease",
        }}
      />
    </Box>
  );
}

export default function Brands() {
  // Paleta Unificada
  const brandPink = "#E11D74";
  const darkText = "#2B1E22";
  const lightBg = "#FFF5F8";
  const borderTone = "rgba(225, 29, 116, 0.12)";

  return (
    <Box
      component='section'
      sx={{
        py: { xs: 7, md: 10 },
        bgcolor: lightBg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth='xl' sx={{ mb: 4, textAlign: "center" }}>
        <Chip
          icon={
            <HandshakeIcon
              sx={{ color: `${brandPink} !important`, fontSize: 16 }}
            />
          }
          label='PATROCINADORES Y MARCAS OFICIALES'
          size='small'
          sx={{
            bgcolor: "#FFFFFF",
            color: darkText,
            fontWeight: 800,
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            borderRadius: "50px",
            border: `1px solid ${borderTone}`,
            mb: 2,
            px: 0.5,
            py: 1.8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
        />

        <Typography
          variant='h3'
          sx={{
            fontWeight: 900,
            color: darkText,
            fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" },
            letterSpacing: "-0.02em",
          }}
        >
          Marcas que{" "}
          <Typography
            component='span'
            sx={{
              color: brandPink,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "inherit",
              fontFamily: "serif",
            }}
          >
            nos acompañan
          </Typography>
        </Typography>
      </Container>

      {/* Contenedor Marquee con Gradientes Laterales Integrados */}
      <Box sx={{ position: "relative", width: "100%" }}>
        {/* Degradado Izquierdo */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: { xs: 40, md: 140 },
            height: "100%",
            background: `linear-gradient(90deg, ${lightBg} 0%, transparent 100%)`,
            zIndex: 3,
            pointerEvents: "none",
          }}
        />

        {/* Degradado Derecho */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: { xs: 40, md: 140 },
            height: "100%",
            background: `linear-gradient(-90deg, ${lightBg} 0%, transparent 100%)`,
            zIndex: 3,
            pointerEvents: "none",
          }}
        />

        <Marquee speed={40} pauseOnHover gradient={false}>
          {BRANDS.map((brand, index) => (
            <BrandCard
              key={`${brand.name}-${index}`}
              {...brand}
              brandPink={brandPink}
              borderTone={borderTone}
            />
          ))}
        </Marquee>
      </Box>
    </Box>
  );
}
