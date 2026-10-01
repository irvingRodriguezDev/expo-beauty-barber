import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Button,
  Card,
  Divider,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PurchaseModal from "../components/purchases/PurchaseModal";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import MethodGet from "../config/service";
import EventCheckoutCard from "../components/events/EventCheckoutCard";
import { formatMexicanCurrency } from "../utils/FormatCurrency";

export default function EventDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  // Detecta si la pantalla es móvil (menor a breakpoint 'md')
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Paleta Unificada de Marca
  const brandPink = "#E11D74";
  const darkText = "#2B1E22";
  const lightBg = "#FFF5F8";
  const borderTone = "rgba(225, 29, 116, 0.15)";

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
        console.error("Ocurrió un error al obtener el evento", error);
        setLoading(false);
      });
  }, [slug]);

  const handleClickOpenPurchase = (evt) => {
    if (evt.is_sold_out || evt.isSoldOut) return;
    setSelectedEvent(evt);
    setOpenPurchase(true);
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
        bgcolor={lightBg}
      >
        <CircularProgress sx={{ color: brandPink }} />
      </Box>
    );
  }

  if (!evento) {
    return (
      <Box bgcolor={lightBg} minHeight='100vh' pt={12}>
        <Navbar />
        <Container sx={{ py: 8, textAlign: "center" }}>
          <Typography variant='h5' color={darkText} fontWeight={800}>
            El evento no fue encontrado.
          </Typography>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              mt: 3,
              bgcolor: brandPink,
              color: "#FFF",
              borderRadius: "50px",
              px: 3,
              fontWeight: 700,
              "&:hover": { bgcolor: "#c91361" },
            }}
          >
            Volver a eventos
          </Button>
        </Container>
      </Box>
    );
  }

  const isAgotado = evento.is_sold_out || evento.isSoldOut || false;

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
          bgcolor: lightBg,
          backgroundImage: `radial-gradient(circle at 80% 0%, rgba(225, 29, 116, 0.08) 0%, transparent 60%)`,
          pb: isMobile ? 12 : 8, // Margen inferior adicional en móvil para evitar que la barra tape contenido
          pt: { xs: 10, md: 14 },
        }}
      >
        {/* Botón Superior de Navegación */}
        <Container maxWidth='lg' sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon fontSize='small' />}
            onClick={() => navigate(-1)}
            sx={{
              color: darkText,
              fontWeight: 800,
              fontSize: "0.85rem",
              textTransform: "none",
              borderRadius: "50px",
              bgcolor: "#FFFFFF",
              border: `1px solid ${borderTone}`,
              px: 2.5,
              py: 0.8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              "&:hover": {
                borderColor: brandPink,
                color: brandPink,
              },
            }}
          >
            Regresar a eventos
          </Button>
        </Container>

        {/* Contenido Principal */}
        <Container maxWidth='lg'>
          <Grid container spacing={{ xs: 4, md: 5 }}>
            {/* COLUMNA IZQUIERDA: Flyer e información */}
            <Grid item xs={12} md={7}>
              <Stack spacing={4}>
                {/* Contenedor del Flyer */}
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: "28px",
                    overflow: "hidden",
                    border: `1px solid ${borderTone}`,
                    boxShadow: "0 15px 40px -10px rgba(225, 29, 116, 0.12)",
                    position: "relative",
                    filter: isAgotado ? "grayscale(20%)" : "none",
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

                  {/* Sello de Agotado */}
                  {isAgotado && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        bgcolor: "rgba(43, 30, 34, 0.45)",
                        backdropFilter: "blur(4px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#FFF",
                          fontWeight: 950,
                          fontSize: { xs: "2rem", sm: "2.8rem" },
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          border: "4px solid #FFF",
                          px: 4,
                          py: 1,
                          borderRadius: "20px",
                          transform: "rotate(-8deg)",
                          boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
                        }}
                      >
                        Agotado
                      </Typography>
                    </Box>
                  )}
                </Card>

                {/* Detalles Informativos */}
                <Box sx={{ px: { xs: 0.5, md: 1 } }}>
                  <Typography
                    variant='h3'
                    sx={{
                      fontWeight: 900,
                      color: darkText,
                      mb: 2.5,
                      fontSize: { xs: "1.8rem", sm: "2.3rem" },
                      lineHeight: 1.15,
                    }}
                  >
                    {evento.titulo}
                  </Typography>

                  <Typography
                    variant='h6'
                    sx={{
                      fontWeight: 800,
                      color: darkText,
                      mb: 1.5,
                      fontSize: "1.1rem",
                    }}
                  >
                    Acerca del evento
                  </Typography>

                  <Box
                    sx={{
                      color: "rgba(43, 30, 34, 0.75)",
                      lineHeight: 1.7,
                      fontSize: "0.95rem",
                      fontWeight: 450,
                      "& p": { mb: 1.5 },
                    }}
                    dangerouslySetInnerHTML={{ __html: evento.descripcion }}
                  />

                  {evento.mapa && (
                    <>
                      <Divider sx={{ my: 4, borderColor: borderTone }} />
                      <Typography
                        variant='h6'
                        sx={{
                          fontWeight: 800,
                          color: darkText,
                          mb: 2,
                          fontSize: "1.1rem",
                        }}
                      >
                        Ubicación en el mapa
                      </Typography>
                      <Box
                        sx={{
                          width: "100%",
                          height: "360px",
                          borderRadius: "24px",
                          overflow: "hidden",
                          border: `1px solid ${borderTone}`,
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
                    </>
                  )}
                </Box>
              </Stack>
            </Grid>

            {/* COLUMNA DERECHA: Sticky Checkout Panel (Solo visible en Desktop) */}
            <Grid item xs={12} md={5}>
              <Box sx={{ position: { md: "sticky" }, top: "110px" }}>
                <EventCheckoutCard
                  evento={evento}
                  isAgotado={isAgotado}
                  onOpenPurchase={() => handleClickOpenPurchase(evento)}
                  brandPink={brandPink}
                  darkText={darkText}
                  borderTone={borderTone}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* BARRA FLOTANTE INFERIOR PARA MÓVILES */}
      {isMobile && (
        <Paper
          elevation={10}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1100,
            p: 2,
            bgcolor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
            borderTop: `1px solid ${borderTone}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 -10px 25px rgba(43, 30, 34, 0.1)",
          }}
        >
          <Box>
            <Typography
              variant='caption'
              sx={{ color: "rgba(43, 30, 34, 0.6)", fontWeight: 700 }}
            >
              Precio individual
            </Typography>
            <Typography
              variant='h6'
              sx={{ fontWeight: 900, color: darkText, lineHeight: 1 }}
            >
              {formatMexicanCurrency(Number(evento.costo) || 0)}{" "}
              <Typography
                component='span'
                variant='caption'
                sx={{ fontWeight: 800, color: brandPink }}
              >
                MXN
              </Typography>
            </Typography>
          </Box>

          <Button
            variant='contained'
            disabled={isAgotado}
            onClick={() => handleClickOpenPurchase(evento)}
            startIcon={<ConfirmationNumberIcon />}
            sx={{
              bgcolor: brandPink,
              color: "#FFF",
              borderRadius: "50px",
              px: 3,
              py: 1.2,
              fontWeight: 800,
              fontSize: "0.9rem",
              textTransform: "none",
              boxShadow: `0 6px 20px rgba(225, 29, 116, 0.35)`,
              "&:hover": {
                bgcolor: "#c91361",
              },
            }}
          >
            {isAgotado ? "Agotado" : "Comprar Acceso"}
          </Button>
        </Paper>
      )}

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
