import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { EventTimeline } from "../sections/EventTimeLine";

const SoldOutEvent = () => {
  return (
    <Box
      sx={{
        // Asegura el 100% del alto y ancho dinámico del viewport
        minHeight: "100dvh",
        width: "100dvw",
        // Fondo con un sutil gradiente radial simulando la iluminación de la imagen original
        background:
          "radial-gradient(circle at 50% 50%, #FFE3EC 0%, #FFD1DF 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: 3,
        boxSizing: "border-box",
        fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
      }}
    >
      {/* Elemento decorativo abstracto de fondo (Simulando las ondas rosas de seda) */}
      <Box
        sx={{
          position: "absolute",
          right: "-10%",
          bottom: "-10%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(224,82,151,0.15) 0%, rgba(255,210,223,0) 70%)",
          borderRadius: "50%",
          filter: "blur(50px)",
          zIndex: 1,
        }}
      />

      <Container
        maxWidth='md'
        sx={{
          textAlign: "center",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* Logo / Badge superior */}
        <Typography
          variant='overline'
          sx={{
            color: "#E05297",
            letterSpacing: "4px",
            fontWeight: 700,
            fontSize: "0.9rem",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            padding: "6px 20px",
            borderRadius: "50px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            textTransform: "uppercase",
          }}
        >
          CONVENCIÓN WAPIZIMA CDMX
        </Typography>

        {/* Título Principal de Impacto */}
        <Box sx={{ my: 2 }}>
          <Typography
            variant='h1'
            sx={{
              fontSize: { xs: "3.5rem", sm: "5.5rem", md: "7rem" },
              fontWeight: 900,
              color: "#322125", // Marrón oscuro de la imagen original
              lineHeight: 0.9,
              textTransform: "uppercase",
              letterSpacing: "-2px",
            }}
          >
            BOLETOS
          </Typography>
          <Typography
            variant='h1'
            sx={{
              fontSize: { xs: "4rem", sm: "6.5rem", md: "8.5rem" },
              fontWeight: 900,
              color: "#E05297", // Rosa vibrante característico
              lineHeight: 0.9,
              textTransform: "uppercase",
              fontStyle: "italic",
              letterSpacing: "-1px",
              mt: -1,
            }}
          >
            AGOTADOS
          </Typography>
        </Box>

        {/* Subtexto descriptivo */}
        <Typography
          variant='body1'
          sx={{
            color: "#5C4A4E",
            maxWidth: "500px",
            fontSize: { xs: "1rem", sm: "1.2rem" },
            fontWeight: 500,
            lineHeight: 1.6,
          }}
        >
          ¡Gracias por tu increíble respuesta! La celebración más exclusiva de
          la industria ha colgado el cartel de <b>Sold Out</b>. Nos vemos muy
          pronto en el corazón de la CDMX.
        </Typography>

        {/* Botón de acción secundaria (ej. Lista de espera o Ver Programa) */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            to={"/convencion-wtc-mexico/mis-boletos"}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant='contained'
              disabled
              sx={{
                backgroundColor: "#322125 !important",
                color: "#FFF !important",
                borderRadius: "50px",
                padding: "12px 35px",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "1px",
                opacity: "0.6 !important",
              }}
            >
              Mis Boletos
            </Button>
          </Link>
          <EventTimeline />
        </Box>
      </Container>

      {/* Footer Branding sutil */}
      <Box
        sx={{
          position: "absolute",
          bottom: "30px",
          zIndex: 2,
          opacity: 0.5,
        }}
      >
        <Typography
          variant='caption'
          sx={{ color: "#322125", fontWeight: 600, letterSpacing: "1px" }}
        >
          WAPIZIMA © 2026 • 7º ANIVERSARIO
        </Typography>
      </Box>
    </Box>
  );
};

export default SoldOutEvent;
