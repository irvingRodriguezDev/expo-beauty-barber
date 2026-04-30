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
} from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import axios from "axios";

const TicketView = () => {
  const { code } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // --- PALETA COHERENTE ---
  const brandPink = "#ee6f97";
  const deepText = "#3D2B2F";
  const softBg = "#FFD9E2";

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        // Con Axios, la respuesta ya viene parseada en .data
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/tickets/show/${code}`,
          {
            // Este header le dice a ngrok que no muestre la página de advertencia
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        // En Axios, si llega aquí es porque el status es 2xx
        setTicketData(response.data.ticket); // Accedemos a .ticket que envías desde el backend
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

  if (loading)
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
        bgcolor={softBg}
      >
        <CircularProgress sx={{ color: brandPink }} />
      </Box>
    );

  if (error)
    return (
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        height='100vh'
        bgcolor={softBg}
      >
        <Typography
          variant='h5'
          sx={{ color: deepText, fontWeight: 900, mb: 2 }}
        >
          PASE NO ENCONTRADO
        </Typography>
        <Button
          component={Link}
          to='/'
          variant='contained'
          sx={{ bgcolor: deepText }}
        >
          Regresar
        </Button>
      </Box>
    );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: softBg, pb: 10 }}>
      <Fade in={true} timeout={1000}>
        <Container maxWidth='sm' sx={{ pt: { xs: 8, md: 12 } }}>
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              borderRadius: "32px",
              overflow: "hidden",
              bgcolor: "#FFFFFF",
              border: `1px solid rgba(255, 183, 206, 0.4)`,
              boxShadow: "0 30px 80px rgba(61, 43, 47, 0.08)",
              position: "relative",
            }}
          >
            {/* Sección Superior: Branding */}
            <Box
              sx={{
                p: 4,
                textAlign: "center",
                bgcolor: deepText,
                color: "#FFF",
              }}
            >
              <Typography
                sx={{
                  letterSpacing: 6,
                  fontWeight: 900,
                  fontSize: "0.65rem",
                  color: brandPink,
                  mb: 2,
                }}
              >
                PASE DE ACCESO EXCLUSIVO
              </Typography>
              <Typography
                variant='h4'
                sx={{
                  // fontFamily: "'Syne', sans-serif",
                  fontWeight: 900,
                  letterSpacing: -1,
                }}
              >
                CONVENCIÓN{" "}
                <span style={{ color: brandPink }}>WAPIZIMA 2026</span>
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  opacity: 0.7,
                  mt: 1,
                  fontWeight: 600,
                }}
              >
                WORLD TRADE CENTER • CDMX
              </Typography>
            </Box>

            {/* Troquelado Superior */}
            <Box sx={{ position: "relative", height: 20 }}>
              <Box
                sx={{
                  position: "absolute",
                  left: -15,
                  top: -10,
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  bgcolor: softBg,
                  border: "1px solid rgba(255, 183, 206, 0.4)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  right: -15,
                  top: -10,
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  bgcolor: softBg,
                  border: "1px solid rgba(255, 183, 206, 0.4)",
                }}
              />
            </Box>

            {/* QR Section */}
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Box
                sx={{
                  display: "inline-block",
                  p: 2,
                  bgcolor: "#FFF",
                  borderRadius: 1,
                  border: `2px solid #ee6f97`,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                }}
              >
                <QRCodeCanvas
                  value={code}
                  size={isMobile ? 180 : 220}
                  level='H'
                  fgColor={deepText}
                />
              </Box>
              <Typography
                sx={{
                  mt: 3,
                  fontWeight: 900,
                  letterSpacing: 4,
                  color: deepText,
                  // fontFamily: "monospace",
                }}
              >
                {code}
              </Typography>
            </Box>

            {/* Divisor con línea punteada */}
            <Box sx={{ px: 4, position: "relative" }}>
              <Divider
                sx={{
                  borderStyle: "dashed",
                  borderColor: "#ee6f97",
                  opacity: 0.9,
                }}
              />
              {/* Troquelado Central */}
              <Box
                sx={{
                  position: "absolute",
                  left: -15,
                  top: -15,
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  bgcolor: softBg,
                  border: "1px solid rgba(255, 183, 206, 0.4)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  right: -15,
                  top: -15,
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  bgcolor: softBg,
                  border: "1px solid rgba(255, 183, 206, 0.4)",
                }}
              />
            </Box>

            {/* Información del Titular */}
            <Box sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant='caption'
                    sx={{ color: "#ee6f97", fontWeight: 900, letterSpacing: 2 }}
                  >
                    TITULAR DEL ACCESO
                  </Typography>
                  <Typography
                    variant='h5'
                    sx={{
                      color: deepText,
                      fontWeight: 900,
                      textTransform: "uppercase",
                      // fontFamily: "'Syne', sans-serif",
                    }}
                  >
                    {ticketData?.buyerName}
                  </Typography>
                </Box>

                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='flex-end'
                >
                  <Box>
                    <Typography
                      variant='caption'
                      sx={{
                        color: "#ee6f97",
                        fontWeight: 900,
                        letterSpacing: 2,
                      }}
                    >
                      CATEGORÍA
                    </Typography>
                    <Typography
                      sx={{
                        color: deepText,
                        fontWeight: 800,
                        fontSize: "1.1rem",
                      }}
                    >
                      {ticketData?.accessType || "GENERAL PASS"}
                    </Typography>
                  </Box>
                  <ConfirmationNumberIcon
                    sx={{ color: "#ee6f97", fontSize: 40, opacity: 0.9 }}
                  />
                </Stack>
              </Stack>
            </Box>

            {/* Footer Informativo */}
            <Box sx={{ bgcolor: "#ee6f97", p: 3, textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  color: "#FFF",
                  fontWeight: 700,
                  opacity: 0.9,
                  px: 2,
                }}
              >
                ESCANEABLE UNA SOLA VEZ • PRESENTE AL INGRESAR
              </Typography>
            </Box>
          </Paper>

          {/* Acciones Finales */}
          <Stack
            direction='column'
            alignItems='center'
            spacing={2}
            sx={{ mt: 6 }}
          >
            <Button
              component={Link}
              to='/'
              fullWidth
              variant='contained'
              sx={{
                bgcolor: deepText,
                py: 2,
                borderRadius: 2,
                fontWeight: 900,
                letterSpacing: 2,
                boxShadow: "0 10px 30px rgba(61, 43, 47, 0.15)",
                "&:hover": { bgcolor: brandPink, color: deepText },
              }}
            >
              VOLVER AL PORTAL
            </Button>
            <Typography
              variant='caption'
              sx={{ color: "rgba(61, 43, 47, 0.5)", fontWeight: 700 }}
            >
              © 2026 BEAUTY WORL MEXICO
            </Typography>
          </Stack>
        </Container>
      </Fade>
    </Box>
  );
};

export default TicketView;
