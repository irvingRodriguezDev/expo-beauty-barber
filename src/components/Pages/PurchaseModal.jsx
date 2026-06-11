import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500 },
  bgcolor: "#fff",
  boxShadow: 24,
  p: 4,
  borderRadius: "24px", // Mantenemos tus esquinas curvadas premium
  border: "1px solid rgba(216, 46, 122, 0.2)",
  outline: "none",
};

export default function PurchaseModal({
  open,
  handleClose,
  eventId,
  eventTitle,
  eventCost,
}) {
  const [form, setForm] = useState({
    buyerName: "",
    buyerEmail: "",
    buyerPhone: "",
    cantidadBoletos: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Petición a tu AWS SAM Lambda Local
      const response = await fetch("http://localhost:3000/reservar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          cantidadBoletos: parseInt(form.cantidadBoletos),
          buyerEmail: form.buyerEmail,
          buyerName: form.buyerName,
          buyerPhone: form.buyerPhone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al procesar la reserva");
      }

      // Si el backend nos regresa la URL de Stripe, redirigimos de inmediato
      if (data.stripeUrl) {
        window.location.href = data.stripeUrl;
      } else {
        throw new Error("No se recibió la URL de pasarela de pago.");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <AnimatePresence>
        <Box
          sx={modalStyle}
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <Box
            display='flex'
            justifyContent='between'
            alignItems='center'
            mb={2}
          >
            <Typography
              variant='h5'
              sx={{ color: "#D82E7A", fontWeight: "bold" }}
            >
              Asegura tu lugar
            </Typography>
            <IconButton
              onClick={handleClose}
              sx={{ ml: "auto", color: "#666" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography
            variant='subtitle1'
            gutterBottom
            sx={{ fontWeight: "500" }}
          >
            {eventTitle} —{" "}
            <span style={{ color: "#E53888", fontWeight: "bold" }}>
              ${eventCost} MXN
            </span>{" "}
            c/u
          </Typography>

          {error && (
            <Typography
              variant='body2'
              sx={{
                color: "red",
                mb: 2,
                backgroundColor: "#ffebee",
                p: 1,
                borderRadius: "8px",
              }}
            >
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label='Nombre Completo'
              name='buyerName'
              value={form.buyerName}
              onChange={handleChange}
              required
              margin='normal'
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />
            <TextField
              fullWidth
              label='Email'
              name='buyerEmail'
              type='email'
              value={form.buyerEmail}
              onChange={handleChange}
              required
              margin='normal'
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />
            <TextField
              fullWidth
              label='WhatsApp (10 dígitos)'
              name='buyerPhone'
              value={form.buyerPhone}
              onChange={handleChange}
              required
              margin='normal'
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />
            <TextField
              fullWidth
              label='Cantidad de Boletos'
              name='cantidadBoletos'
              type='number'
              inputProps={{ min: 1, max: 10 }}
              value={form.cantidadBoletos}
              onChange={handleChange}
              required
              margin='normal'
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />

            <Typography
              variant='h6'
              sx={{
                my: 2,
                textAlign: "right",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Total: $
              {(
                parseFloat(eventCost || 0) * form.cantidadBoletos
              ).toLocaleString("es-MX", { style: "currency", currency: "MXN" })}
            </Typography>

            <Button
              fullWidth
              type='submit'
              variant='contained'
              disabled={loading}
              sx={{
                background: "linear-gradient(45deg, #D82E7A 30%, #E53888 90%)",
                color: "white",
                padding: "12px",
                borderRadius: "12px",
                fontWeight: "bold",
                fontSize: "16px",
                boxShadow: "0 4px 10px rgba(216, 46, 122, 0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #b52063 30%, #c42970 90%)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                "Proceder al Pago Seguro"
              )}
            </Button>
          </form>
        </Box>
      </AnimatePresence>
    </Modal>
  );
}
