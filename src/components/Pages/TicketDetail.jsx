import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Container,
  Fade,
  useTheme,
  useMediaQuery,
  Button,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import MethodGet from "../../config/service";

const TicketView = () => {
  const { code } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // --- PALETA COHERENTE ---
  const brandPink = "#E53888";
  const champagneGold = "#C5A059";
  const deepText = "#2B1E22";
  const mutedText = "#6E5D62";
  const softPinkBg = "#FFF5F8";

  const qrSize = isMobile ? 190 : 225;

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await MethodGet(`/ticket/${code}`);
        setTicketData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener ticket:", err);
        setError(true);
        setLoading(false);
      }
    };

    if (code) {
      fetchTicket();
    }
  }, [code]);

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100dvh'
        sx={{
          bgcolor: "#FFFFFF",
          backgroundImage:
            "radial-gradient(circle at 50% 35%, rgba(229, 56, 136, 0.08) 0%, #FFFFFF 70%)",
        }}
      >
        <CircularProgress sx={{ color: brandPink }} />
      </Box>
    );
  }

  if (error || !ticketData) {
    return (
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        minHeight='100dvh'
        px={2}
        sx={{
          bgcolor: "#FFFFFF",
          backgroundImage:
            "radial-gradient(circle at 50% 35%, rgba(229, 56, 136, 0.08) 0%, #FFFFFF 70%)",
          textAlign: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: "24px",
            maxWidth: 420,
            width: "100%",
            border: "1px solid rgba(197, 160, 89, 0.35)",
            boxShadow: "0 20px 50px rgba(43, 30, 34, 0.06)",
          }}
        >
          <Typography
            variant='h5'
            sx={{ color: deepText, fontWeight: 900, mb: 1 }}
          >
            PASE NO ENCONTRADO
          </Typography>
          <Typography
            sx={{
              color: mutedText,
              fontSize: "0.9rem",
              mb: 3,
              fontWeight: 500,
            }}
          >
            No pudimos localizar un boleto activo con este código. Verifica el
            enlace e inténtalo de nuevo.
          </Typography>
          <Button
            component={Link}
            to='/'
            variant='contained'
            sx={{
              background: `linear-gradient(135deg, ${brandPink} 0%, #C8236E 100%)`,
              color: "#FFFFFF",
              borderRadius: "999px",
              px: 4,
              py: 1.2,
              fontWeight: 700,
              textTransform: "none",
              boxShadow: "0 10px 24px rgba(229, 56, 136, 0.28)",
            }}
          >
            Regresar al inicio
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        bgcolor: "#FFFFFF",
        backgroundImage:
          "radial-gradient(circle at 50% 15%, rgba(229, 56, 136, 0.08) 0%, rgba(255, 245, 248, 0.65) 38%, #FFFFFF 75%)",
        pb: 10,
        position: "relative",
        overflow: "hidden",
        fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
      }}
    >
      {/* Destellos ambientales sutiles */}
      <Box
        sx={{
          position: "absolute",
          top: "-120px",
          left: "-120px",
          width: "440px",
          height: "440px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(229, 56, 136, 0.09) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(35px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-140px",
          right: "-120px",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(197, 160, 89, 0.13) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(35px)",
          pointerEvents: "none",
        }}
      />

      <Fade in={true} timeout={800}>
        <Container
          maxWidth='sm'
          sx={{ pt: { xs: 6, md: 9 }, position: "relative", zIndex: 1 }}
        >
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              borderRadius: "28px",
              overflow: "hidden",
              bgcolor: "#FFFFFF",
              border: "1px solid rgba(197, 160, 89, 0.4)",
              boxShadow: "0 24px 65px rgba(43, 30, 34, 0.08)",
              position: "relative",
            }}
          >
            {/* Sección Superior: Branding en fondo blanco/rosa elegante */}
            <Box
              sx={{
                px: 4,
                pt: 4,
                pb: 3,
                textAlign: "center",
                background: "linear-gradient(180deg, #FFF5F8 0%, #FFFFFF 100%)",
                borderBottom: "1px solid rgba(197, 160, 89, 0.2)",
              }}
            >
              <Chip
                label='✦ PASE DE ACCESO EXCLUSIVO ✦'
                size='small'
                sx={{
                  bgcolor: "#FFFFFF",
                  color: brandPink,
                  border: "1px solid rgba(229, 56, 136, 0.25)",
                  fontWeight: 800,
                  fontSize: "0.66rem",
                  letterSpacing: "2.2px",
                  px: 1,
                  mb: 1.8,
                }}
              />

              <Typography
                variant='h4'
                sx={{
                  fontWeight: 900,
                  letterSpacing: "-0.8px",
                  textTransform: "uppercase",
                  lineHeight: 1.1,
                  background: `linear-gradient(135deg, ${brandPink} 15%, ${champagneGold} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {ticketData.evento?.titulo || "CHRISTMAS NAILS"}
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.78rem",
                  color: mutedText,
                  mt: 1,
                  fontWeight: 700,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                }}
              >
                {ticketData.evento?.lugar || "EXPO REFORMA • CDMX"}
              </Typography>
            </Box>

            {/* QR Section Limpio */}
            <Box sx={{ px: 4, pt: 3.5, pb: 3, textAlign: "center" }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2.2,
                  bgcolor: "#FFFFFF",
                  borderRadius: "24px",
                  border: `1.5px solid ${champagneGold}`,
                  boxShadow: "0 12px 30px rgba(229, 56, 136, 0.08)",
                }}
              >
                <QRCodeCanvas
                  value={code}
                  size={qrSize}
                  level='H'
                  includeMargin={true}
                  fgColor={deepText}
                  bgColor='#FFFFFF'
                />
              </Box>

              <Typography
                sx={{
                  mt: 2.5,
                  fontWeight: 900,
                  letterSpacing: "3.5px",
                  color: deepText,
                  fontSize: { xs: "0.95rem", sm: "1.1rem" },
                  fontFamily: "monospace",
                }}
              >
                {code}
              </Typography>
            </Box>

            {/* Divisor punteado con muescas laterales */}
            <Box sx={{ px: 4, position: "relative", my: 0.5 }}>
              <Divider
                sx={{
                  borderStyle: "dashed",
                  borderColor: "rgba(197, 160, 89, 0.55)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  left: -14,
                  top: -14,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  bgcolor: "#FFF5F8",
                  border: "1px solid rgba(197, 160, 89, 0.4)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  right: -14,
                  top: -14,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  bgcolor: "#FFF5F8",
                  border: "1px solid rgba(197, 160, 89, 0.4)",
                }}
              />
            </Box>

            {/* Información del Titular */}
            <Box sx={{ p: 4 }}>
              <Stack spacing={2.5}>
                <Box>
                  <Typography
                    variant='caption'
                    sx={{
                      color: champagneGold,
                      fontWeight: 800,
                      letterSpacing: "1.8px",
                      display: "block",
                    }}
                  >
                    TITULAR DEL ACCESO
                  </Typography>
                  <Typography
                    variant='h5'
                    sx={{
                      color: deepText,
                      fontWeight: 900,
                      textTransform: "uppercase",
                      fontSize: { xs: "1.2rem", sm: "1.4rem" },
                      mt: 0.3,
                    }}
                  >
                    {ticketData.orden?.buyerName || ticketData.buyerName}
                  </Typography>
                </Box>

                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                  sx={{
                    bgcolor: softPinkBg,
                    p: 2,
                    borderRadius: "16px",
                    border: "1px solid rgba(229, 56, 136, 0.14)",
                  }}
                >
                  <Box>
                    <Typography
                      variant='caption'
                      sx={{
                        color: brandPink,
                        fontWeight: 800,
                        letterSpacing: "1.6px",
                        display: "block",
                      }}
                    >
                      CATEGORÍA
                    </Typography>
                    <Typography
                      sx={{
                        color: deepText,
                        fontWeight: 800,
                        fontSize: "1rem",
                        mt: 0.2,
                      }}
                    >
                      {ticketData?.accessType || "ACCESO GENERAL"}
                    </Typography>
                  </Box>
                  <ConfirmationNumberIcon
                    sx={{ color: brandPink, fontSize: 34 }}
                  />
                </Stack>
              </Stack>
            </Box>

            {/* Footer Informativo dentro del boleto */}
            <Box
              sx={{
                bgcolor: softPinkBg,
                borderTop: "1px solid rgba(197, 160, 89, 0.25)",
                py: 2,
                px: 3,
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  color: brandPink,
                  fontWeight: 800,
                  letterSpacing: "1px",
                }}
              >
                ESCANEABLE UNA SOLA VEZ • PRESENTA ESTE PASE AL INGRESAR
              </Typography>
            </Box>
          </Paper>

          {/* Acciones Finales */}
          <Stack
            direction='column'
            alignItems='center'
            spacing={2}
            sx={{ mt: 4 }}
          >
            <Button
              component={Link}
              to='/'
              fullWidth
              variant='contained'
              sx={{
                background: `linear-gradient(135deg, ${brandPink} 0%, #C8236E 100%)`,
                color: "#FFFFFF",
                py: 1.7,
                borderRadius: "999px",
                fontWeight: 800,
                letterSpacing: "1.4px",
                boxShadow: "0 12px 28px rgba(229, 56, 136, 0.28)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #D82E7A 0%, #AD1A5D 100%)",
                },
              }}
            >
              VOLVER AL PORTAL
            </Button>
            <Typography
              variant='caption'
              sx={{ color: mutedText, fontWeight: 700, letterSpacing: "1px" }}
            >
              © 2026 EVENTOS WAPIZIMA
            </Typography>
          </Stack>
        </Container>
      </Fade>
    </Box>
  );
};

export default TicketView;
