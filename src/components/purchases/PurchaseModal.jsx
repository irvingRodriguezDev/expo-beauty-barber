import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FormatDate from "../../utils/FormatDate";
import { MethodPost } from "../../config/service";
import Swal from "sweetalert2";
import PurchaseModalForm from "./PurchaseModalForm";
import { PrivacyPolicyModal } from "../sections/PrivacyPolicyModal";

export default function PurchaseModal({
  open,
  onClose,
  evento,
  brandPink = "#E11D74",
  darkText = "#2B1E22",
}) {
  const [openPolicyModal, setOpenPolicyModal] = useState(false);

  if (!evento) return null;
  const isAgotado = evento.is_sold_out || evento.isSoldOut || false;

  const handleConfirmPurchase = async (payload) => {
    onClose();
    Swal.fire({
      title: "Procesando tu solicitud...",
      text: "Te estamos redireccionando a la pasarela de pago seguro.",
      icon: "info",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await MethodPost("/reservar", payload);

      if (res.data && res.data.stripeUrl) {
        window.location.href = res.data.stripeUrl;
      } else {
        Swal.fire({
          title: "Ha habido un problema",
          text:
            res.data?.message ||
            "Ocurrió un problema al generar el link de pago.",
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: darkText,
        });
      }
    } catch (error) {
      console.error("Ocurrió un error en el checkout:", error);
      Swal.fire({
        title: "Ocurrió un problema durante la compra",
        text: error.response?.data?.message || "Error de conexión",
        icon: "error",
        showConfirmButton: true,
        confirmButtonColor: darkText,
      });
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth='xs'
        fullWidth
        scroll='body'
        PaperProps={{
          sx: {
            borderRadius: "28px",
            bgcolor: "#FFFFFF",
            boxShadow: "0 24px 60px rgba(43, 30, 34, 0.18)",
            border: "1px solid rgba(225, 29, 116, 0.2)",
            overflow: "hidden",
          },
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 18,
            right: 18,
            color: "rgba(43, 30, 34, 0.4)",
            "&:hover": { color: darkText, bgcolor: "rgba(43, 30, 34, 0.05)" },
            zIndex: 10,
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ p: { xs: 3, sm: 4 } }}>
          {/* Encabezado del Evento */}
          <Box sx={{ mb: 2.5, pr: 3 }}>
            <Typography
              variant='caption'
              sx={{
                textTransform: "uppercase",
                fontWeight: 900,
                color: brandPink,
                letterSpacing: "0.1em",
                fontSize: "0.68rem",
                display: "block",
              }}
            >
              Estás adquiriendo accesos para:
            </Typography>
            <Typography
              variant='h5'
              sx={{
                fontWeight: 900,
                color: darkText,
                lineHeight: 1.2,
                mt: 0.5,
                fontSize: "1.3rem",
              }}
            >
              {evento.titulo}
            </Typography>
            <Typography
              variant='caption'
              sx={{
                color: "rgba(43, 30, 34, 0.6)",
                fontWeight: 700,
                display: "block",
                mt: 0.8,
              }}
            >
              📍 {evento.lugar} • 📅 {FormatDate(evento.fecha)}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3, borderColor: "rgba(225, 29, 116, 0.15)" }} />

          {/* Formulario */}
          <PurchaseModalForm
            key={open ? "open" : "closed"} // Reinicia el formulario automáticamente al abrir
            evento={evento}
            isAgotado={isAgotado}
            onSubmit={handleConfirmPurchase}
            onOpenPolicyModal={() => setOpenPolicyModal(true)}
            brandPink={brandPink}
            darkText={darkText}
          />
        </DialogContent>
      </Dialog>

      <PrivacyPolicyModal
        open={openPolicyModal}
        onClose={() => setOpenPolicyModal(false)}
      />
    </>
  );
}
