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
  IconButton,
  Chip,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ShieldIcon from "@mui/icons-material/Shield";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import FormatDate from "../../utils/FormatDate";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import MethodGet from "../../config/service";
import { formatMexicanCurrency } from "../../utils/FormatCurrency";

export default function EventDetai({
  onOpenPurchase,
  brandPink = "#EE6F97",
  deepText = "#3D2B2F",
}) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    MethodGet(`/events/${slug}`)
      .then((res) => {
        setEvento(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("ocurrio un error al obtener el evento", error);
      });
  }, [slug]);

  // Simulación de fetch a tu API Gateway de AWS usando el slug
  //   useEffect(() => {
  //     // Aquí conectarías con tu: axios.get(`${VITE_API_BASE_URL}/events/${slug}`)
  //     const fetchEventDetail = async () => {
  //       try {
  //         setLoading(true);
  //         // Mock temporal para desarrollo basado en tu ecosistema
  //         setTimeout(() => {
  //           setEvento({
  //             id: 1,
  //             titulo: "Chrismast Nails Masterclass",
  //             slug: "chrismast-nails",
  //             fecha: "2026-06-19",
  //             lugar: "Grand Forum CDMX",
  //             ubicacion_detallada:
  //               "Calz. de Tlalpan 3155, Ojo de Agua, Coyoacán, 04650 Ciudad de México, CDMX",
  //             precio: 1250,
  //             flyer_url:
  //               "https://eventos-wapizima.s3.us-east-2.amazonaws.com/flyers/1781202754087-717668510_1906828490134056_1614804637812860953_n.jpg",
  //             descripcion:
  //               "Llega el evento más esperado del año para la industria de las uñas en México. Una capacitación intensiva de diseño de alta gama enfocada en las tendencias globales de la temporada decembrina. Aprende técnicas avanzadas de estructura, mano alzada y aplicación de efectos premium de la mano de los mejores instructores internacionales del ecosistema.",
  //             incluye: [
  //               "Acceso completo a las conferencias magistrales",
  //               "Kit de productos premium Wapizima de regalo",
  //               "Certificación oficial de asistencia",
  //               "Coffee break y zona de networking con líderes del sector",
  //             ],
  //           });
  //           setLoading(false);
  //         }, 600);
  //       } catch (error) {
  //         console.error("Error al obtener el evento:", error);
  //         setLoading(false);
  //       }
  //     };

  //     fetchEventDetail();
  //   }, [slug]);

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
          bgcolor: "#FFD8E2", // Fondo rosa pastel suave unificado
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
                    border: "1px solid rgba(238, 111, 151, 0.15)",
                    position: "relative",
                  }}
                >
                  <Box
                    component='img'
                    src={evento.flyer}
                    alt={evento.titulo}
                    sx={{
                      width: "100%",
                      height: "auto",
                      //   maxHeight: "550px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
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
                  <Typography
                    variant='body1'
                    sx={{
                      color: "rgba(61, 43, 47, 0.8)",
                      lineHeight: 1.7,
                      mb: 4,
                      textAlign: "justify",
                    }}
                  >
                    {evento.descripcion}
                  </Typography>

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
                    border: `1px solid rgba(238, 111, 151, 0.25)`,
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
                        color: brandPink,
                        letterSpacing: "0.05em",
                      }}
                    >
                      Costo por boleto
                    </Typography>
                    <Typography
                      variant='h3'
                      sx={{ fontWeight: 900, color: deepText, mt: 0.5, mb: 3 }}
                    >
                      {formatMexicanCurrency(Number(evento.costo))}{" "}
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

                    <Stack spacing={2.5} sx={{ mb: 4 }}>
                      {/* Fecha */}
                      <Stack direction='row' spacing={2} alignItems='center'>
                        <Box
                          sx={{
                            bgcolor: `${brandPink}15`,
                            p: 1,
                            borderRadius: "10px",
                            display: "flex",
                          }}
                        >
                          <CalendarMonthIcon sx={{ color: brandPink }} />
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
                            bgcolor: `${brandPink}15`,
                            p: 1,
                            borderRadius: "10px",
                            display: "flex",
                          }}
                        >
                          <LocationOnIcon sx={{ color: brandPink }} />
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

                    {/* CTA Transaccional Principal */}
                    <Button
                      variant='contained'
                      fullWidth
                      onClick={() => onOpenPurchase?.(evento)}
                      startIcon={<ConfirmationNumberIcon />}
                      sx={{
                        bgcolor: brandPink,
                        color: "#FFF",
                        borderRadius: "14px",
                        fontWeight: 800,
                        fontSize: "1rem",
                        py: 1.8,
                        textTransform: "none",
                        boxShadow: `0 10px 25px rgba(238, 111, 151, 0.35)`,
                        "&:hover": {
                          bgcolor: brandPink,
                          color: "#fff",
                          boxShadow: "0 10px 25px rgba(61, 43, 47, 0.2)",
                        },
                        transition: "all 0.3s",
                      }}
                    >
                      Adquirir Boleto{" "}
                    </Button>

                    {/* Beneficio de Compra Segura */}
                    <Stack
                      direction='row'
                      spacing={1}
                      justifyContent='center'
                      alignItems='center'
                      sx={{ mt: 2.5, color: "rgba(61, 43, 47, 0.5)" }}
                    >
                      <ShieldIcon sx={{ fontSize: "1rem", color: "green" }} />
                      <Typography variant='caption' sx={{ fontWeight: 700 }}>
                        Pago seguro encriptado vía Stripe
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
