import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ArticleIcon from "@mui/icons-material/Article";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import FormatDate from "../utils/FormatDate";
import { formatMexicanCurrency } from "../utils/FormatCurrency";
import PurchaseModal from "./PurchaseModal";

export default function EventCard({
  evento,
  brandPink = "#E53888",
  deepText = "#1A1A1A",
  isHighlighted = false,
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

  const brandPinkHover = "#D82E7A";
  const cardBg = "#FFFFFF";
  const textMuted = "#64748B";

  return (
    <Paper
      elevation={5}
      sx={{
        background: cardBg,
        borderRadius: "24px",
        padding: "12px 12px",
        marginTop: { xs: isHighlighted ? 4 : 2, lg: isHighlighted ? -2 : 0 },
        boxShadow: isHighlighted
          ? "0 15px 35px -5px rgba(229, 56, 136, 0.2)"
          : "0 10px 30px -5px rgba(229, 56, 136, 0.05)",
        border: isHighlighted
          ? `3px solid ${brandPink}`
          : "1px solid rgba(229, 56, 136, 0.8)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textAlign: "center",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative",
        width: "100%",
        height: "100%", // Obliga a que todas las tarjetas midan lo mismo en altura
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 40px -10px rgba(229, 56, 136, 0.25)",
          borderColor: brandPink,
        },
      }}
    >
      {/* Badge de Opción Recomendada o Agotado */}
      {(isHighlighted || isAgotado) && (
        <Box
          sx={{
            position: "absolute",
            top: "-16px",
            left: "50%",
            transform: "translateX(-50%)",
            background: isAgotado
              ? "#64748B"
              : `linear-gradient(135deg, ${brandPink} 0%, ${brandPinkHover} 100%)`,
            color: "#FFFFFF",
            fontSize: "0.8rem",
            fontWeight: 800,
            padding: "6px 20px",
            borderRadius: "50px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            boxShadow: "0 4px 12px rgba(229, 56, 136, 0.3)",
            whiteSpace: "nowrap",
            zIndex: 2,
          }}
        >
          {isAgotado ? "Agotado" : "Opción Recomendada"}
        </Box>
      )}

      <Box>
        {/* Miniatura del Flyer */}
        <Box
          sx={{
            width: "100%",
            height: "140px",
            borderRadius: "16px",
            overflow: "hidden",
            mb: 2,
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
              alt={evento.titulo || evento.nombre}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <LocalActivityIcon
              sx={{ fontSize: "3rem", color: `${brandPink}30` }}
            />
          )}
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant='h2'
            sx={{
              fontSize: "1.4rem",
              fontWeight: 700,
              mb: 1,
              color: deepText,
            }}
          >
            {evento.titulo || evento.nombre}
          </Typography>
          <Typography
            sx={{ color: textMuted, fontSize: "0.9rem", fontWeight: 500 }}
          >
            {FormatDate(evento.fecha)}
          </Typography>
        </Box>

        <Box
          sx={{
            my: -4,
            py: 2,
            borderTop: "1px dashed #F1F5F9",
            borderBottom: "1px dashed #F1F5F9",
          }}
        >
          <Typography
            variant='h3'
            sx={{
              fontWeight: 800,
              color: deepText,
              fontSize: "2.5rem",
              letterSpacing: "-1px",
            }}
          >
            {formatMexicanCurrency(Number(evento.costo))}
          </Typography>
        </Box>
      </Box>

      {/* Botones de Acción */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 2 }}>
        <Button
          variant='contained'
          disabled={isAgotado}
          onClick={() => handleClickOpenPurchase(evento)}
          startIcon={<ConfirmationNumberIcon />}
          fullWidth
          sx={{
            bgcolor: brandPink,
            color: "#FFF",
            borderRadius: "12px",
            py: 1.5,
            fontWeight: 800,
            fontSize: "0.95rem",
            textTransform: "none",
            boxShadow: `0 6px 20px rgba(238, 111, 151, 0.25)`,
            "&:hover": { bgcolor: brandPinkHover },
          }}
        >
          {isAgotado ? "Agotado" : "Comprar Boletos"}
        </Button>

        <Link
          to={`/evento/${evento.slug}`}
          style={{ textDecoration: "none", width: "100%" }}
        >
          <Button
            variant='outlined'
            startIcon={<ArticleIcon />}
            fullWidth
            sx={{
              borderColor: deepText,
              color: deepText,
              borderWidth: "1.5px",
              borderRadius: "12px",
              py: 1.5,
              fontWeight: 800,
              fontSize: "0.95rem",
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

      {/* Modal de compra encapsulado */}
      {selectedEvent && (
        <PurchaseModal
          open={openPurchase}
          onClose={handleClosePurchase}
          evento={selectedEvent}
        />
      )}
    </Paper>
  );
}
