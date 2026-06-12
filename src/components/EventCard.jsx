import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Stack,
  Button,
  Chip,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import FormatDate from "../utils/FormatDate";
import { formatMexicanCurrency } from "../utils/FormatCurrency";
import { Link } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import PurchaseModal from "./PurchaseModal";

export default function EventCard({
  evento,
  brandPink = "#EE6F97",
  deepText = "#3D2B2F",
}) {
  const precioFormateado = evento.costo
    ? `${formatMexicanCurrency(Number(evento.costo))} MXN`
    : "Preventa Activa";

  const [openPurchase, setOpenPurchase] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleClickOpenPurchase = (evt) => {
    setOpenPurchase(true);
    setSelectedEvent(evt);
  };

  const handleClosePurchase = () => {
    setOpenPurchase(false);
    setSelectedEvent(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      whileHover={{ y: -6 }}
      style={{ paddingBottom: "15px", height: "100%" }}
    >
      <Card
        sx={{
          width: "100%",
          borderRadius: "24px",
          bgcolor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(238, 111, 151, 0.2)",
          boxShadow: "0 15px 35px rgba(61, 43, 47, 0.06)",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column", // 💡 Forzamos el flujo vertical siempre
        }}
      >
        {/* 🖼️ PARTE SUPERIOR: Imagen / Flyer en grande */}
        <Box
          sx={{
            width: "100%",
            position: "relative",
            overflow: "hidden",
            bgcolor: "rgba(61, 43, 47, 0.03)",
            // Proporción ideal para flyers verticales/cuadrados en tarjetas (Relación 4:3)
            aspectRatio: "4/3",
          }}
        >
          {evento.flyer ? (
            <Box
              component='img'
              src={evento.flyer}
              alt={evento.titulo}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          ) : (
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              height='100%'
              width='100%'
              sx={{
                background: `linear-gradient(45deg, ${brandPink}15, rgba(255,255,255,1))`,
              }}
            >
              <LocalActivityIcon
                sx={{ fontSize: "3rem", color: `${brandPink}40` }}
              />
            </Box>
          )}

          {/* Badge de Costo Flotando sobre el Flyer */}
          <Chip
            label={precioFormateado}
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              bgcolor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(5px)",
              color: deepText,
              fontWeight: 900,
              fontSize: ".9rem",
              padding: "3px",
              border: `1px solid ${brandPink}30`,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              "& .MuiChip-label": { px: 1.2 },
            }}
          />
        </Box>

        {/* 📝 PARTE INFERIOR: Detalles del Evento y Botones de Acción */}
        <CardContent
          sx={{
            p: { xs: 3, md: 3.5 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            bgcolor:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,233,238,0.15) 100%)", // Sutil degradado de fondo
            "&:last-child": { pb: { xs: 3, md: 3.5 } },
          }}
        >
          <Box>
            {/* Título con Efecto Premium */}
            <Typography
              variant='h6'
              sx={{
                fontWeight: 900,
                color: deepText,
                mb: 2.5,
                lineHeight: 1.2,
                fontSize: { xs: "1.25rem", md: "1.4rem" },
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                // Efecto de brillo sutil en el texto para marcas exclusivas
                background: `linear-gradient(135deg, ${deepText} 0%, #6E4F55 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {evento.titulo}
            </Typography>

            {/* 💎 BLOQUE DE METADATOS ESTILO BENTO (Estructura Premium) */}
            <Stack spacing={1} sx={{ mb: 4 }}>
              {/* Fila Fecha */}
              <Box
                display='flex'
                alignItems='center'
                gap={1.5}
                sx={{
                  bgcolor: "rgba(238, 111, 151, 0.05)",
                  px: 2,
                  py: 1.2,
                  borderRadius: "14px",
                  border: "1px solid rgba(238, 111, 151, 0.08)",
                }}
              >
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  sx={{
                    bgcolor: "#FFF",
                    p: 0.8,
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(238,111,151,0.1)",
                  }}
                >
                  <CalendarMonthIcon
                    sx={{ fontSize: "1.1rem", color: brandPink }}
                  />
                </Box>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 800, fontSize: "0.85rem", color: deepText }}
                >
                  {FormatDate(evento.fecha)}
                </Typography>
              </Box>

              {/* Fila Lugar */}
              <Box
                display='flex'
                alignItems='center'
                gap={1.5}
                sx={{
                  bgcolor: "rgba(61, 43, 47, 0.03)",
                  px: 2,
                  py: 1.2,
                  borderRadius: "14px",
                  border: "1px solid rgba(61, 43, 47, 0.05)",
                }}
              >
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  sx={{
                    bgcolor: "#FFF",
                    p: 0.8,
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.02)",
                  }}
                >
                  <LocationOnIcon
                    sx={{ fontSize: "1.1rem", color: brandPink }}
                  />
                </Box>
                <Typography
                  variant='body2'
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "rgba(61, 43, 47, 0.85)",
                  }}
                >
                  {evento.lugar}
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* ⚡ BOTONES DE ACCIÓN UNIFICADOS CON MICROINTERACCIONES */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            width='100%'
          >
            <Link
              to={`/evento/${evento.slug}`}
              style={{ textDecoration: "none", flex: 1, display: "flex" }}
            >
              <Button
                variant='outlined'
                startIcon={<ArticleIcon />}
                fullWidth
                sx={{
                  borderColor: "rgba(61, 43, 47, 0.2)",
                  color: deepText,
                  borderRadius: "14px", // Bordes más orgánicos
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  py: 1.4,
                  textTransform: "none",
                  letterSpacing: "0.02em",
                  backdropFilter: "blur(5px)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  "&:hover": {
                    borderColor: brandPink,
                    color: brandPink,
                    bgcolor: "rgba(238, 111, 151, 0.04)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Ver Detalles
              </Button>
            </Link>

            <Button
              variant='contained'
              onClick={() => handleClickOpenPurchase(evento)}
              startIcon={<ConfirmationNumberIcon />}
              sx={{
                // Gradiente premium característico de Wapizima
                background: `linear-gradient(135deg, ${brandPink} 0%, #D64C77 100%)`,
                color: "#FFF",
                borderRadius: "14px",
                fontWeight: 800,
                fontSize: "0.85rem",
                py: 1.4,
                flex: 1.3,
                textTransform: "none",
                letterSpacing: "0.02em",
                boxShadow: `0 8px 25px rgba(238, 111, 151, 0.35)`,
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                "&:hover": {
                  background: `linear-gradient(135deg, #F080A3 0%, ${brandPink} 100%)`,
                  boxShadow: `0 12px 28px rgba(238, 111, 151, 0.45)`,
                  transform: "translateY(-2px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              Adquirir Boleto
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {selectedEvent && (
        <PurchaseModal
          open={openPurchase}
          onClose={handleClosePurchase}
          evento={selectedEvent}
        />
      )}
    </motion.div>
  );
}
