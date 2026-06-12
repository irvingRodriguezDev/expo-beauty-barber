import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Button,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ShieldIcon from "@mui/icons-material/Shield";
import FormatDate from "../../utils/FormatDate";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import MethodGet from "../../config/service";
import { formatMexicanCurrency } from "../../utils/FormatCurrency";
import PurchaseModal from "../PurchaseModal";

export default function EventDetail({
  brandPink = "#EE6F97",
  deepText = "#3D2B2F",
}) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openPurchase, setOpenPurchase] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    MethodGet(`/events/${slug}`)
      .then((res) => {
        setEvento(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Ocurrió un error al obtener el evento", error);
        setLoading(false);
      });
  }, [slug]);

  const handleClickOpenPurchase = (evt) => {
    if (evt.isSoldOut) return; // 🔒 Protección extra en la función
    setOpenPurchase(true);
    setSelectedEvent(evt);
  };

  const handleClosePurchase = () => {
    setOpenPurchase(false);
    setSelectedEvent(null);
  };

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='80vh'
      >
        <CircularProgress sx={{ color: brandPink }} />
      </Box>
    );
  }

  if (!evento) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant='h5' color={deepText} fontWeight={700}>
          El evento no fue encontrado.
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mt: 3, color: brandPink }}
        >
          Volver al inicio
        </Button>
      </Container>
    );
  }

  // 💡 Guardamos el estado booleano para fácil lectura limpia en el código
  const isAgotado = evento.is_sold_out || false;

  return (
    <>
      <Navbar />
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        sx={{
          minHeight: "100vh",
          bgcolor: "#FFD8E2", // Tu tono de fondo premium unificado
          pb: 8,
          pt: 8,
        }}
      >
        {/* Barra de Navegación Superior Sutil */}
        <Container maxWidth='xl' sx={{ pt: 3, pb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              color: deepText,
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "10px",
              "&:hover": { bgcolor: "rgba(61,43,47,0.04)" },
            }}
          >
            Regresar a eventos
          </Button>
        </Container>

        {/* Contenedor Principal de la Página */}
        <Container maxWidth='lg'>
          <Grid container spacing={{ xs: 4, md: 5 }}>
            {/* COLUMNA IZQUIERDA: Contenido e Imagen */}
            <Grid item xs={12} md={7}>
              <Stack spacing={4}>
                {/* Contenedor del Flyer Premium */}
                <Card
                  sx={{
                    borderRadius: "28px",
                    overflow: "hidden",
                    boxShadow: "0 20px 50px rgba(61, 43, 47, 0.08)",
                    border: isAgotado
                      ? "1px solid rgba(61, 43, 47, 0.15)"
                      : "1px solid rgba(238, 111, 151, 0.15)",
                    position: "relative",
                    filter: isAgotado ? "grayscale(15%)" : "none",
                  }}
                >
                  <Box
                    component='img'
                    src={evento.flyer}
                    alt={evento.titulo}
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />

                  {/* 🚨 MARCA DE AGUA SOBRE EL FLYER PRINCIPAL */}
                  {isAgotado && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        bgcolor: "rgba(61, 43, 47, 0.4)",
                        backdropFilter: "blur(3px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#FFF",
                          fontWeight: 950,
                          fontSize: { xs: "2rem", sm: "3rem" },
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          border: "5px solid #FFF",
                          px: 4,
                          py: 1.5,
                          borderRadius: "16px",
                          transform: "rotate(-10deg)",
                          boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
                          textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                        }}
                      >
                        Agotado
                      </Typography>
                    </Box>
                  )}
                </Card>

                {/* Detalles Informativos del Evento */}
                <Box sx={{ px: { xs: 1, md: 2 } }}>
                  <Typography
                    variant='h4'
                    sx={{
                      fontWeight: 900,
                      color: deepText,
                      mb: 3,
                      lineHeight: 1.2,
                    }}
                  >
                    {evento.titulo}
                  </Typography>

                  <Typography
                    variant='h6'
                    sx={{ fontWeight: 800, color: deepText, mb: 1.5 }}
                  >
                    Acerca del evento
                  </Typography>
                  <Box
                    sx={{
                      color: "#4a3a50",
                      lineHeight: 1.7,
                      "& p": { mb: 1.5 },
                    }}
                    dangerouslySetInnerHTML={{ __html: evento.descripcion }}
                  />

                  <Divider
                    sx={{ my: 3, borderColor: "rgba(238, 111, 151, 0.15)" }}
                  />

                  {evento.mapa && (
                    <Box
                      sx={{
                        width: "100%",
                        height: "350px",
                        borderRadius: "16px",
                        overflow: "hidden",
                        mt: 4,
                        filter: isAgotado ? "grayscale(30%)" : "none",
                      }}
                    >
                      <iframe
                        src={evento.mapa}
                        width='100%'
                        height='100%'
                        style={{ border: 0 }}
                        allowFullScreen=''
                        loading='lazy'
                        referrerPolicy='no-referrer-when-downgrade'
                      />
                    </Box>
                  )}
                </Box>
              </Stack>
            </Grid>

            {/* COLUMNA DERECHA: Sticky Checkout Panel */}
            <Grid item xs={12} md={5}>
              <Box sx={{ position: { md: "sticky" }, top: "24px" }}>
                <Card
                  sx={{
                    borderRadius: "24px",
                    bgcolor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    border: isAgotado
                      ? `1px solid rgba(61, 43, 47, 0.15)`
                      : `1px solid rgba(238, 111, 151, 0.25)`,
                    boxShadow: "0 20px 40px rgba(61, 43, 47, 0.05)",
                    p: { xs: 1, sm: 2 },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant='caption'
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: 800,
                        color: isAgotado ? "rgba(61, 43, 47, 0.5)" : brandPink,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {isAgotado ? "Estado del Inventario" : "Costo por boleto"}
                    </Typography>

                    {/* Modificación dinámica del Bloque de Precio */}
                    {isAgotado ? (
                      <Typography
                        variant='h4'
                        sx={{
                          fontWeight: 900,
                          color: "rgba(61, 43, 47, 0.4)",
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
                          color: deepText,
                          mt: 0.5,
                          mb: 3,
                        }}
                      >
                        {formatMexicanCurrency(Number(evento.costo)) || "0.00"}{" "}
                        <Box
                          component='span'
                          sx={{
                            fontSize: "1.2rem",
                            fontWeight: 700,
                            color: "rgba(61, 43, 47, 0.5)",
                          }}
                        >
                          MXN
                        </Box>
                      </Typography>
                    )}

                    <Stack spacing={2.5} sx={{ mb: 4 }}>
                      {/* Fecha */}
                      <Stack direction='row' spacing={2} alignItems='center'>
                        <Box
                          sx={{
                            bgcolor: isAgotado
                              ? "rgba(61, 43, 47, 0.05)"
                              : `${brandPink}15`,
                            p: 1,
                            borderRadius: "10px",
                            display: "flex",
                          }}
                        >
                          <CalendarMonthIcon
                            sx={{
                              color: isAgotado
                                ? "rgba(61, 43, 47, 0.4)"
                                : brandPink,
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant='caption'
                            sx={{
                              color: "rgba(61, 43, 47, 0.5)",
                              fontWeight: 700,
                              display: "block",
                            }}
                          >
                            FECHA DEL EVENTO
                          </Typography>
                          <Typography
                            variant='body2'
                            sx={{ fontWeight: 800, color: deepText }}
                          >
                            {FormatDate(evento.fecha)}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* Ubicación */}
                      <Stack
                        direction='row'
                        spacing={2}
                        alignItems='flex-start'
                      >
                        <Box
                          sx={{
                            bgcolor: isAgotado
                              ? "rgba(61, 43, 47, 0.05)"
                              : `${brandPink}15`,
                            p: 1,
                            borderRadius: "10px",
                            display: "flex",
                          }}
                        >
                          <LocationOnIcon
                            sx={{
                              color: isAgotado
                                ? "rgba(61, 43, 47, 0.4)"
                                : brandPink,
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant='caption'
                            sx={{
                              color: "rgba(61, 43, 47, 0.5)",
                              fontWeight: 700,
                              display: "block",
                            }}
                          >
                            LUGAR / SEDE
                          </Typography>
                          <Typography
                            variant='body2'
                            sx={{ fontWeight: 800, color: deepText }}
                          >
                            {evento.lugar}
                          </Typography>
                          <Typography
                            variant='caption'
                            sx={{
                              color: "rgba(61, 43, 47, 0.6)",
                              fontWeight: 500,
                              display: "block",
                              mt: 0.5,
                            }}
                          >
                            {evento.ubicacion_detallada}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>

                    <Divider
                      sx={{ my: 3, borderColor: "rgba(238, 111, 151, 0.15)" }}
                    />

                    {/* CTA Transaccional Principal Deshabilitado Dinámicamente */}
                    <Button
                      variant='contained'
                      fullWidth
                      disabled={isAgotado} // 🔒 Inhabilita el botón de manera nativa en HTML
                      onClick={() => handleClickOpenPurchase(evento)}
                      startIcon={<ConfirmationNumberIcon />}
                      sx={{
                        background: isAgotado
                          ? "rgba(61, 43, 47, 0.12) !important"
                          : `linear-gradient(135deg, ${brandPink} 0%, #D64C77 100%)`,
                        color: isAgotado
                          ? "rgba(61, 43, 47, 0.4) !important"
                          : "#FFF",
                        borderRadius: "14px",
                        fontWeight: 800,
                        fontSize: "1rem",
                        py: 1.8,
                        textTransform: "none",
                        boxShadow: isAgotado
                          ? "none"
                          : `0 10px 25px rgba(238, 111, 151, 0.35)`,
                        "&:hover": {
                          background: isAgotado
                            ? "rgba(61, 43, 47, 0.12) !important"
                            : `linear-gradient(135deg, #F080A3 0%, ${brandPink} 100%)`,
                          boxShadow: isAgotado
                            ? "none"
                            : "0 10px 25px rgba(61, 43, 47, 0.2)",
                        },
                        transition: "all 0.3s",
                      }}
                    >
                      {isAgotado
                        ? "Venta Terminada (Agotado)"
                        : "Adquirir Boleto"}
                    </Button>

                    {/* Beneficio de Compra Segura / Leyenda de Sold Out */}
                    <Stack
                      direction='row'
                      spacing={1}
                      justifyContent='center'
                      alignItems='center'
                      sx={{ mt: 2.5, color: "rgba(61, 43, 47, 0.5)" }}
                    >
                      <ShieldIcon
                        sx={{
                          fontSize: "1rem",
                          color: isAgotado ? "grey" : "green",
                        }}
                      />
                      <Typography variant='caption' sx={{ fontWeight: 700 }}>
                        {isAgotado
                          ? "Soporte de eventos: contacto@wapizima.info"
                          : "Pago seguro encriptado vía Stripe"}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {selectedEvent && (
        <PurchaseModal
          open={openPurchase}
          onClose={handleClosePurchase}
          evento={selectedEvent}
        />
      )}
      <Footer />
    </>
  );
}
