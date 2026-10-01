import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Divider,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ShieldIcon from "@mui/icons-material/Shield";
import { formatMexicanCurrency } from "../../utils/FormatCurrency";
import FormatDate from "../../utils/FormatDate";

export default function EventCheckoutCard({
  evento,
  isAgotado,
  onOpenPurchase,
  brandPink = "#E11D74",
  darkText = "#2B1E22",
  borderTone = "rgba(225, 29, 116, 0.15)",
}) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "24px",
        bgcolor: "#FFFFFF",
        border: `1px solid ${isAgotado ? "rgba(43, 30, 34, 0.12)" : borderTone}`,
        boxShadow: "0 15px 35px -10px rgba(225, 29, 116, 0.12)",
        p: { xs: 1, sm: 2 },
      }}
    >
      <CardContent>
        {/* Subtítulo de Precio u / Agotado */}
        <Typography
          variant='caption'
          sx={{
            textTransform: "uppercase",
            fontWeight: 800,
            color: isAgotado ? "rgba(43, 30, 34, 0.4)" : brandPink,
            letterSpacing: "0.08em",
            fontSize: "0.68rem",
          }}
        >
          {isAgotado ? "Estado del Inventario" : "Costo por boleto"}
        </Typography>

        {/* Bloque del Precio */}
        {isAgotado ? (
          <Typography
            variant='h4'
            sx={{
              fontWeight: 900,
              color: "rgba(43, 30, 34, 0.35)",
              mt: 0.5,
              mb: 3,
            }}
          >
            BOLETOS AGOTADOS
          </Typography>
        ) : (
          <Typography
            variant='h3'
            sx={{
              fontWeight: 900,
              color: darkText,
              mt: 0.5,
              mb: 3,
              fontSize: { xs: "2rem", sm: "2.4rem" },
            }}
          >
            {formatMexicanCurrency(Number(evento.costo)) || "0.00"}{" "}
            <Box
              component='span'
              sx={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "rgba(43, 30, 34, 0.45)",
              }}
            >
              MXN
            </Box>
          </Typography>
        )}

        {/* Metadatos (Fecha y Sede) */}
        <Stack spacing={2.5} sx={{ mb: 3 }}>
          {/* Fecha */}
          <Stack direction='row' spacing={2} alignItems='center'>
            <Box
              sx={{
                bgcolor: isAgotado ? "rgba(43, 30, 34, 0.05)" : "#FFF5F8",
                border: `1px solid ${isAgotado ? "transparent" : borderTone}`,
                p: 1.2,
                borderRadius: "14px",
                display: "flex",
              }}
            >
              <CalendarMonthIcon
                sx={{
                  color: isAgotado ? "rgba(43, 30, 34, 0.35)" : brandPink,
                  fontSize: 20,
                }}
              />
            </Box>
            <Box>
              <Typography
                variant='caption'
                sx={{
                  color: "rgba(43, 30, 34, 0.45)",
                  fontWeight: 800,
                  fontSize: "0.65rem",
                  letterSpacing: "0.05em",
                  display: "block",
                }}
              >
                FECHA DEL EVENTO
              </Typography>
              <Typography
                variant='body2'
                sx={{ fontWeight: 800, color: darkText }}
              >
                {FormatDate(evento.fecha)}
              </Typography>
            </Box>
          </Stack>

          {/* Ubicación */}
          <Stack direction='row' spacing={2} alignItems='flex-start'>
            <Box
              sx={{
                bgcolor: isAgotado ? "rgba(43, 30, 34, 0.05)" : "#FFF5F8",
                border: `1px solid ${isAgotado ? "transparent" : borderTone}`,
                p: 1.2,
                borderRadius: "14px",
                display: "flex",
              }}
            >
              <LocationOnIcon
                sx={{
                  color: isAgotado ? "rgba(43, 30, 34, 0.35)" : brandPink,
                  fontSize: 20,
                }}
              />
            </Box>
            <Box>
              <Typography
                variant='caption'
                sx={{
                  color: "rgba(43, 30, 34, 0.45)",
                  fontWeight: 800,
                  fontSize: "0.65rem",
                  letterSpacing: "0.05em",
                  display: "block",
                }}
              >
                LUGAR / SEDE
              </Typography>
              <Typography
                variant='body2'
                sx={{ fontWeight: 800, color: darkText }}
              >
                {evento.lugar}
              </Typography>
              {evento.ubicacion_detallada && (
                <Typography
                  variant='caption'
                  sx={{
                    color: "rgba(43, 30, 34, 0.6)",
                    fontWeight: 500,
                    display: "block",
                    mt: 0.3,
                  }}
                >
                  {evento.ubicacion_detallada}
                </Typography>
              )}
            </Box>
          </Stack>
        </Stack>

        <Divider sx={{ my: 3, borderColor: borderTone }} />

        {/* Botón Principal CTA */}
        <Button
          variant='contained'
          fullWidth
          disabled={isAgotado}
          onClick={() => onOpenPurchase(evento)}
          startIcon={<ConfirmationNumberIcon />}
          sx={{
            bgcolor: brandPink,
            color: "#FFF",
            borderRadius: "50px",
            fontWeight: 800,
            fontSize: "0.95rem",
            py: 1.6,
            textTransform: "none",
            boxShadow: isAgotado
              ? "none"
              : "0 8px 20px rgba(225, 29, 116, 0.3)",
            "&:hover": {
              bgcolor: "#c91361",
              boxShadow: "0 12px 25px rgba(225, 29, 116, 0.4)",
            },
            "&:disabled": {
              bgcolor: "rgba(43, 30, 34, 0.08) !important",
              color: "rgba(43, 30, 34, 0.35) !important",
            },
            transition: "all 0.25s ease",
          }}
        >
          {isAgotado ? "Venta Terminada (Agotado)" : "Adquirir Boleto"}
        </Button>

        {/* Garantía de Seguridad */}
        <Stack
          direction='row'
          spacing={1}
          justifyContent='center'
          alignItems='center'
          sx={{ mt: 2.5, color: "rgba(43, 30, 34, 0.5)" }}
        >
          <ShieldIcon
            sx={{
              fontSize: "0.9rem",
              color: isAgotado ? "gray" : brandPink,
            }}
          />
          <Typography
            variant='caption'
            sx={{ fontWeight: 700, fontSize: "0.72rem" }}
          >
            {isAgotado
              ? "Soporte de eventos: contacto@wapizima.info"
              : "Pago 100% seguro encriptado vía Stripe"}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
