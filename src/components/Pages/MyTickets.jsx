import { useState, useCallback, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  CircularProgress,
  Stack,
  Paper,
  Divider,
  IconButton,
  Grid,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { TicketModal } from "../Modal/TicketModal";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const MyTickets = () => {
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const brandPink = "#ee6f97ff";
  const deepText = "#3D2B2F";
  const ivory = "#FFFBFB";

  const fetchTickets = useCallback(
    async (isSilent = false) => {
      if (!email || !executeRecaptcha) return;
      if (!isSilent) {
        setLoading(true);
      }
      try {
        // CORRECCIÓN: Un solo objeto para toda la configuración
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/tickets/search-tickets`,
          {
            params: {
              email: email.toLowerCase().trim(),
            },
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          },
        );

        setTickets(response.data.tickets || []);
        setSearched(true);
      } catch (err) {
        console.error("Error en fetchTickets:", err);
      } finally {
        if (!isSilent) setLoading(false);
      }
    },
    [email],
  );
  useEffect(() => {
    let interval = null;

    // Solo activamos el polling si ya se realizó una búsqueda inicial
    // y si hay boletos en la lista
    if (searched && tickets.length > 0) {
      interval = setInterval(() => {
        console.log("Actualizando estado de boletos...");
        fetchTickets(true); // isSilent = true para que sea invisible al usuario
      }, 40000); // 40 segundos
    }

    // Limpieza al desmontar o cambiar condiciones
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [searched, tickets.length, fetchTickets]);

  return (
    <Box sx={{ bgcolor: "#FFD9E2", minHeight: "100vh", py: 10, px: 2 }}>
      <Container maxWidth='md'>
        <Stack spacing={8} alignItems='center'>
          {/* Header con Estilo de Marca */}
          <Box sx={{ textAlign: "center", position: "relative" }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Typography
                sx={{
                  letterSpacing: "0.6em",
                  fontSize: "0.7rem",
                  fontWeight: 900,
                  color: brandPink,
                  mb: 1,
                  textTransform: "uppercase",
                }}
              >
                Portal de Invitados
              </Typography>
              <Typography
                variant='h1'
                sx={{
                  // fontFamily: "'Syne', sans-serif",
                  fontWeight: 900,
                  fontSize: { xs: "3rem", md: "5rem" },
                  color: deepText,
                  lineHeight: 0.9,
                  mb: 2,
                }}
              >
                BUSCAR <br /> <span style={{ color: brandPink }}>BOLETOS</span>
              </Typography>
              <Box
                sx={{
                  width: 60,
                  height: 4,
                  bgcolor: deepText,
                  mx: "auto",
                  borderRadius: 2,
                }}
              />
            </motion.div>
          </Box>

          {/* Buscador Estilo "Lounge" */}
          <Paper
            elevation={0}
            sx={{
              p: 1,
              borderRadius: 10,
              bgcolor: "#FFF",
              width: "100%",
              maxWidth: 500,
              display: "flex",
              alignItems: "center",
              border: "1px solid rgba(61, 43, 47, 0.08)",
              boxShadow: "0 20px 40px rgba(61, 43, 47, 0.05)",
            }}
          >
            <TextField
              fullWidth
              placeholder='Ingresa tu correo'
              variant='standard'
              value={email}
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <MailOutlineIcon sx={{ ml: 2, mr: 1, color: brandPink }} />
                ),
                sx: { fontWeight: 600, color: deepText, px: 1 },
              }}
            />
            <IconButton
              onClick={() => fetchTickets()}
              disabled={loading}
              sx={{
                bgcolor: deepText,
                color: "#FFF",
                p: 2,
                "&:hover": { bgcolor: brandPink },
                transition: "0.3s",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                <ArrowForwardIosIcon fontSize='small' />
              )}
            </IconButton>
          </Paper>

          {/* Lista de Tickets - Layout Editorial */}

          <Grid container spacing={3} sx={{ mt: 4 }}>
            <AnimatePresence>
              {tickets.map((ticket, index) => (
                <Grid item xs={12} md={6} key={ticket.code}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Box
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setModalOpen(true);
                      }}
                      sx={{
                        display: "flex",
                        bgcolor: "#FFF",
                        borderRadius: 1,
                        overflow: "hidden",
                        height: 140,
                        cursor: "pointer",
                        position: "relative",
                        border: "1px solid rgba(255, 183, 206, 0.3)",
                        boxShadow: "0 15px 30px rgba(61, 43, 47, 0.04)",
                        "&:hover": { borderColor: brandPink },
                      }}
                    >
                      {/* Lado izquierdo del ticket (ID Vertical) */}
                      <Box
                        sx={{
                          width: 40,
                          bgcolor: deepText,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: brandPink,
                            transform: "rotate(-90deg)",
                            whiteSpace: "nowrap",
                            fontSize: "0.6rem",
                            fontWeight: 900,
                            letterSpacing: "0.2em",
                          }}
                        >
                          PASS # {ticket.code.slice(-4)}
                        </Typography>
                      </Box>

                      {/* Cuerpo del Ticket */}
                      <Box
                        sx={{
                          flexGrow: 1,
                          p: 3,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 900,
                            color: deepText,
                            fontSize: "1.1rem",
                            textTransform: "uppercase",
                            lineHeight: 1.2,
                          }}
                        >
                          {ticket.buyerName}
                        </Typography>
                        <Typography
                          sx={{
                            color: brandPink,
                            fontWeight: 700,
                            fontSize: "0.7rem",
                            mt: 0.5,
                          }}
                        >
                          CONVENCIÓN WAPIZIMA 2026
                        </Typography>
                      </Box>

                      {/* Perforación Visual del Ticket */}
                      <Box
                        sx={{
                          position: "absolute",
                          right: 80,
                          top: -10,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          bgcolor: "#FED9E1",
                          border: "1px solid rgba(255, 183, 206, 0.9)",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          right: 80,
                          bottom: -10,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          bgcolor: "#FED9E1",
                          border: "1px solid rgba(255, 183, 206, 0.9)",
                        }}
                      />
                      <Divider
                        orientation='vertical'
                        flexItem
                        sx={{ borderStyle: "dashed", my: 2, mr: 10 }}
                      />

                      {/* Botón Acción Lateral */}
                      <Box
                        sx={{
                          position: "absolute",
                          right: 0,
                          top: 0,
                          bottom: 0,
                          width: 80,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ConfirmationNumberIcon
                          sx={{ color: brandPink, fontSize: 30 }}
                        />
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>

          {searched && tickets.length === 0 && !loading && (
            <Typography sx={{ color: deepText, opacity: 0.5, fontWeight: 700 }}>
              No se encontraron registros. Intenta con otro correo.
            </Typography>
          )}
          {tickets.length > 0 && (
            <Typography
              variant='caption'
              sx={{ color: brandPink, opacity: 0.7, marginTop: -14 }}
            >
              • La lista se actualiza automáticamente
            </Typography>
          )}
        </Stack>

        <TicketModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          ticket={selectedTicket}
        />
      </Container>
    </Box>
  );
};

export default MyTickets;
