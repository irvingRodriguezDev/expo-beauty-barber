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
  // 💡 Simulamos o leemos el estado de Sold Out (Cámbialo por tu propiedad real, ej: evento.sold_out)
  const isAgotado = evento.is_sold_out || false;

  const precioFormateado = evento.costo
    ? `${formatMexicanCurrency(Number(evento.costo))} MXN`
    : "Preventa Activa";

  const [openPurchase, setOpenPurchase] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleClickOpenPurchase = (evt) => {
    if (isAgotado) return; // Protección extra
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
      whileHover={!isAgotado ? { y: -6 } : {}} // No animar elevación si está agotado
      style={{ paddingBottom: "15px", height: "100%" }}
    >
      <Card
        sx={{
          width: "100%",
          borderRadius: "24px",
          bgcolor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(15px)",
          border: isAgotado
            ? "1px solid rgba(61, 43, 47, 0.1)"
            : "1px solid rgba(238, 111, 151, 0.2)",
          boxShadow: "0 15px 35px rgba(61, 43, 47, 0.06)",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          opacity: isAgotado ? 0.85 : 1, // Sutil opacidad general si está agotado
          filter: isAgotado ? "grayscale(20%)" : "none",
        }}
      >
        {/* 🖼️ PARTE SUPERIOR: Imagen / Flyer */}
        <Box
          sx={{
            width: "100%",
            position: "relative",
            overflow: "hidden",
            bgcolor: "rgba(61, 43, 47, 0.03)",
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

          {/* 🚨 MARCA DE AGUA PREMIUM "SOLD OUT" (Se sobrepone al flyer) */}
          {isAgotado && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "rgba(61, 43, 47, 0.55)", // Capa oscura traslúcida
                backdropFilter: "blur(4px)", // Efecto glassmorphism
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <Typography
                  sx={{
                    color: "#FFF",
                    fontWeight: 950,
                    fontSize: { xs: "1.8rem", md: "2.2rem" },
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    border: "4px solid #FFF",
                    px: 3,
                    py: 1,
                    borderRadius: "12px",
                    transform: "rotate(-12deg)", // Inclinación premium estilo sello
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                    fontStyle: "italic",
                  }}
                >
                  Agotado
                </Typography>
              </motion.div>
            </Box>
          )}

          {/* Badge de Costo (Oculto si está agotado para limpiar la UI) */}
          {!isAgotado && (
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
                fontSize: "0.8rem",
                border: `1px solid ${brandPink}30`,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                "& .MuiChip-label": { px: 1.2 },
              }}
            />
          )}
        </Box>

        {/* 📝 PARTE INFERIOR: Detalles del Evento */}
        <CardContent
          sx={{
            p: { xs: 3, md: 3.5 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            "&:last-child": { pb: { xs: 3, md: 3.5 } },
          }}
        >
          <Box>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 900,
                color: isAgotado ? "rgba(61, 43, 47, 0.6)" : deepText,
                mb: 2.5,
                lineHeight: 1.2,
                fontSize: { xs: "1.25rem", md: "1.4rem" },
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {evento.titulo}
            </Typography>

            <Stack spacing={1} sx={{ mb: 4 }}>
              <Box
                display='flex'
                alignItems='center'
                gap={1.5}
                sx={{
                  bgcolor: "rgba(238, 111, 151, 0.03)",
                  px: 2,
                  py: 1.2,
                  borderRadius: "14px",
                }}
              >
                <CalendarMonthIcon
                  sx={{
                    fontSize: "1.1rem",
                    color: isAgotado ? "rgba(61,43,47,0.4)" : brandPink,
                  }}
                />
                <Typography
                  variant='body2'
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    color: isAgotado ? "rgba(61,43,47,0.5)" : deepText,
                  }}
                >
                  {FormatDate(evento.fecha)}
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* ⚡ BOTONES DE ACCIÓN */}
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
                  borderRadius: "14px",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  py: 1.4,
                  textTransform: "none",
                }}
              >
                Ver Detalles
              </Button>
            </Link>
            {/* Cambia dinámicamente si está agotado */}
            <Button
              variant='contained'
              disabled={isAgotado} // 🔒 Deshabilitamos la interacción nativa
              onClick={() => handleClickOpenPurchase(evento)}
              startIcon={<ConfirmationNumberIcon />}
              sx={{
                background: isAgotado
                  ? "rgba(61, 43, 47, 0.12) !important"
                  : `linear-gradient(135deg, ${brandPink} 0%, #D64C77 100%)`,
                color: isAgotado ? "rgba(61, 43, 47, 0.4) !important" : "#FFF",
                borderRadius: "14px",
                fontWeight: 800,
                fontSize: "0.85rem",
                py: 1.4,
                flex: 1.3,
                textTransform: "none",
                boxShadow: isAgotado
                  ? "none"
                  : `0 8px 25px rgba(238, 111, 151, 0.35)`,
              }}
            >
              {isAgotado ? "Agotado" : "Adquirir Boleto"}
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
