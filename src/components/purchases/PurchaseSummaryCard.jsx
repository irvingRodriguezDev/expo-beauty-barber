import React from "react";
import { Box, Typography } from "@mui/material";
import { formatMexicanCurrency } from "../../utils/FormatCurrency";
export default function PurchaseSummaryCard({
  totalPago,
  brandPink = "#E11D74",
  darkText = "#2B1E22",
}) {
  return (
    <Box sx={{ mt: 2.5, mb: 3 }}>
      {/* Caja de Métodos de Pago Aceptados */}
      <Box
        sx={{
          bgcolor: "rgba(225, 29, 116, 0.05)",
          border: "1px solid rgba(225, 29, 116, 0.12)",
          p: 1.5,
          borderRadius: "12px",
          mb: 2,
        }}
      >
        <Typography
          variant='caption'
          sx={{
            color: darkText,
            fontWeight: 600,
            display: "block",
            fontSize: "0.75rem",
          }}
        >
          💳 Aceptamos <strong>Tarjetas de Débito/Crédito</strong> y pagos en
          efectivo vía <strong>OXXO</strong>.
        </Typography>
      </Box>

      {/* Contenedor del Total */}
      <Box
        sx={{
          p: 2,
          borderRadius: "16px",
          border: `1.5px dashed ${brandPink}50`,
          bgcolor: "#FFF",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant='body2'
            sx={{ fontWeight: 800, color: "rgba(43, 30, 34, 0.5)" }}
          >
            Total a pagar:
          </Typography>
          <Typography variant='h4' sx={{ fontWeight: 900, color: darkText }}>
            {formatMexicanCurrency(Number(totalPago))}{" "}
            <Box
              component='span'
              sx={{
                fontSize: "0.85rem",
                fontWeight: 800,
                color: "rgba(43, 30, 34, 0.4)",
              }}
            >
              MXN
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
