import React, { useState } from "react";
import { motion } from "framer-motion";
import { Box, Typography, Button, Grid } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ArticleIcon from "@mui/icons-material/Article";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { Link } from "react-router-dom";
import FormatDate from "../utils/FormatDate";
import { formatMexicanCurrency } from "../utils/FormatCurrency";
import PurchaseModal from "./PurchaseModal";

export default function EventCard({
  evento,
  brandPink = "#EE6F97",
  deepText = "#3D2B2F",
}) {
  const isAgotado = evento.is_sold_out || false;
  const [openPurchase, setOpenPurchase] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleClickOpenPurchase = (evt) => {
    if (isAgotado) return;
    setOpenPurchase(true);
    setSelectedEvent(evt);
  };

  const handleClosePurchase = () => {
    setOpenPurchase(false);
    setSelectedEvent(null);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={4} alignItems='center'>
        {/* LADO IZQUIERDO: TEXTOS, DETALLES Y BOTONES DE ACCIÓN */}
        <Grid item xs={12} md={7} lg={6}>
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 900,
                letterSpacing: "0.4em",
                color: brandPink,
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              Próximo Evento Disponible
            </Typography>

            <Typography
              component='h1'
              sx={{
                fontSize: {
                  xs: "2.2rem",
                  sm: "3.2rem",
                  md: "3.5rem",
                  lg: "4rem",
                },
                lineHeight: 1.05,
                fontWeight: 900,
                color: deepText,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                mb: 3,
              }}
            >
              {evento.titulo || evento.nombre}
            </Typography>

            {/* Bloque de Fecha y Lugar usando Flex nativo */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                justifyContent: { xs: "center", md: "flex-start" },
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  bgcolor: "#FFCBDA",
                  px: 2,
                  py: 0.5,
                  borderRadius: "6px",
                  width: "fit-content",
                  mx: { xs: "auto", md: 0 },
                }}
              >
                <CalendarMonthIcon
                  sx={{ fontSize: "1.1rem", color: brandPink }}
                />
                <Typography
                  variant='subtitle1'
                  sx={{ fontWeight: 700, color: deepText }}
                >
                  {FormatDate(evento.fecha)}
                </Typography>
              </Box>

              <Typography
                variant='subtitle1'
                sx={{ fontWeight: 700, color: brandPink, py: 0.5 }}
              >
                📍 {evento.lugar || "Gran Forum, CDMX"}
              </Typography>
            </Box>

            {/* Precio Destacado */}
            <Typography
              variant='h3'
              sx={{
                fontWeight: 900,
                color: deepText,
                mb: 4,
                fontSize: { xs: "2.5rem", md: "3rem" },
              }}
            >
              💰 {formatMexicanCurrency(Number(evento.costo))}
            </Typography>

            {/* Botones Ergonomicos con Flex nativo */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Button
                variant='contained'
                disabled={isAgotado}
                onClick={() => handleClickOpenPurchase(evento)}
                startIcon={<ConfirmationNumberIcon />}
                sx={{
                  bgcolor: brandPink,
                  color: "#FFF",
                  borderRadius: "12px",
                  px: 4,
                  py: 1.8,
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  textTransform: "none",
                  boxShadow: `0 6px 20px rgba(238, 111, 151, 0.25)`,
                  "&:hover": { bgcolor: "#d65d83" },
                }}
              >
                {isAgotado ? "Agotado" : "Comprar Boletos"}
              </Button>

              <Link
                to={`/evento/${evento.slug}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant='outlined'
                  startIcon={<ArticleIcon />}
                  sx={{
                    borderColor: deepText,
                    color: deepText,
                    borderWidth: "1.5px",
                    borderRadius: "12px",
                    px: 4,
                    py: 1.8,
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    textTransform: "none",
                    "&:hover": {
                      borderWidth: "1.5px",
                      borderColor: brandPink,
                      bgcolor: "rgba(238, 111, 151, 0.05)",
                    },
                  }}
                >
                  Ver Detalles
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>

        {/* LADO DERECHO: EL FLYER CON ANIMACIÓN Y DISEÑO PREMIUM */}
        <Grid
          item
          xs={12}
          md={5}
          lg={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: { xs: "320px", sm: "380px", lg: "420px" },
              aspectRatio: "3/4",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "relative",
                borderRadius: "24px",
                boxShadow: "0px 20px 40px rgba(61, 43, 47, 0.25)",
                border: "4px solid #FFF",
                overflow: "hidden",
                bgcolor: "rgba(61, 43, 47, 0.02)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {evento.flyer ? (
                <Box
                  component='img'
                  src={evento.flyer}
                  alt={evento.titulo}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <LocalActivityIcon
                  sx={{ fontSize: "3rem", color: `${brandPink}30` }}
                />
              )}

              {/* Sello de Agotado sobre la imagen */}
              {isAgotado && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(61, 43, 47, 0.4)",
                    backdropFilter: "blur(4px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#FFF",
                      fontWeight: 900,
                      fontSize: "1.8rem",
                      textTransform: "uppercase",
                      border: "3px solid #FFF",
                      px: 3,
                      py: 0.5,
                      borderRadius: "8px",
                      transform: "rotate(-10deg)",
                    }}
                  >
                    Agotado
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Modal de compra encapsulado de forma nativa aquí */}
      {selectedEvent && (
        <PurchaseModal
          open={openPurchase}
          onClose={handleClosePurchase}
          evento={selectedEvent}
        />
      )}
    </Box>
  );
}
