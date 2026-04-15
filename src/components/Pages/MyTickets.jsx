import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stack,
  Paper,
  Divider,
  Alert,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SearchIcon from "@mui/icons-material/Search";
import { TicketModal } from "../Modal/TicketModal";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
const MyTickets = () => {
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const brandCyan = "#72F8FF";
  const darkPetroleum = "#02181B";

  // Función de búsqueda reutilizable
  const fetchTickets = useCallback(
    async (isSilent = false) => {
      if (!email) return;
      if (!executeRecaptcha) return;
      if (!isSilent) {
        setLoading(true);
        setError("");
      }

      try {
        const captchaToken = await executeRecaptcha("search_tickets");
        const response = await axios.get(
          `https://api.expobellezaybarberias.com/search-tickets`,
          {
            params: {
              email: email.toLowerCase().trim(),
              captchaToken: captchaToken,
            },
            headers: { "Content-Type": "application/json" },
          },
        );

        // Si el ticket que el usuario tiene abierto ya no está en la lista (fue usado), cerramos el modal
        const newTickets = response.data.tickets || [];
        if (
          selectedTicket &&
          !newTickets.find((t) => t.ticketCode === selectedTicket.ticketCode)
        ) {
          setModalOpen(false);
        }

        setTickets(newTickets);
        setSearched(true);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        if (!isSilent) {
          setError(
            err.response?.data?.message ||
              "No pudimos conectar con el servidor. Revisa tu conexión.",
          );
        }
      } finally {
        if (!isSilent) setLoading(false);
      }
    },
    [email, selectedTicket],
  );
  const refreshTickets = useCallback(
    async (silent = false) => {
      try {
        const response = await axios.get(
          `https://api.expobellezaybarberias.com/search-tickets`,
          { params: { email: email.toLowerCase().trim() } },
        );

        const newTickets = response.data.tickets || [];

        // SOLO actualizamos el estado si hubo un cambio real en la cantidad o IDs
        // Esto evita re-renders innecesarios cada 3 segundos
        setTickets((prev) => {
          if (JSON.stringify(prev) === JSON.stringify(newTickets)) return prev;
          return newTickets;
        });

        // Si el ticket que estaba abierto ya no existe, cerramos el modal al instante
        if (
          selectedTicket &&
          !newTickets.find((t) => t.ticketCode === selectedTicket.ticketCode)
        ) {
          setModalOpen(false);
          setSelectedTicket(null);
        }
      } catch (e) {
        console.error("Silent refresh failed");
      }
    },
    [email, selectedTicket],
  );
  useEffect(() => {
    if (!searched || tickets.length === 0) return;

    // Si el modal está abierto, el usuario está en la entrada.
    // Necesitamos velocidad máxima: cada 3 segundos.
    // Si está cerrado, bajamos a 20 segundos para ahorrar batería/datos.
    const intervalTime = modalOpen ? 3000 : 20000;

    const interval = setInterval(() => {
      refreshTickets(true);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [modalOpen, searched, tickets.length, refreshTickets]);
  const handleSearch = (e) => {
    e.preventDefault();
    fetchTickets(false);
  };

  const handleOpenTicket = (ticket) => {
    setSelectedTicket(ticket);
    setModalOpen(true);
  };

  // Lógica de Polling: Refresca la lista cada 30 segundos si hay boletos visibles
  useEffect(() => {
    let interval;
    if (searched && tickets.length > 0) {
      interval = setInterval(() => {
        fetchTickets(true);
      }, 30000); // 30 segundos para balancear UX y costos de DynamoDB
    }
    return () => clearInterval(interval);
  }, [searched, tickets.length, fetchTickets]);

  return (
    <Container maxWidth='sm' sx={{ py: { xs: 8, md: 12 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <ConfirmationNumberIcon
            sx={{ color: brandCyan, fontSize: 48, mb: 2 }}
          />
          <Typography
            variant='h2'
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 900,
              color: "#FFFFFF",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Mis <span style={{ color: brandCyan }}>Boletos</span>
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.6)", mt: 2 }}>
            Consulta y presenta tus accesos para el ingreso al evento.
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(20px)",
            borderRadius: 4,
            border: `1px solid rgba(114, 248, 255, 0.1)`,
          }}
        >
          <form onSubmit={handleSearch}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label='CORREO ELECTRÓNICO'
                variant='outlined'
                type='email'
                autoComplete='off'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    backgroundColor: "rgba(255, 255, 255, 0.03)", // Fondo ultra tenue para integración total
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease-in-out",

                    "& fieldset": {
                      borderColor: "rgba(114, 248, 255, 0.2)", // Borde Cian sutil
                      borderWidth: "1px",
                      borderRadius: 4,
                    },

                    "&:hover fieldset": {
                      borderColor: `${brandCyan} !important`, // Cian fuerte al pasar el mouse
                      borderRadius: 4,
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: `${brandCyan} !important`,
                      borderWidth: "2px",
                      boxShadow: `0 0 20px rgba(114, 248, 255, 0.15)`,
                      borderRadius: 4,
                    },
                  },

                  "& .MuiInputBase-input": {
                    color: "#FFFFFF", // Texto blanco para legibilidad en fondo oscuro
                    padding: "18px 20px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    "&::placeholder": {
                      color: "rgba(255, 255, 255, 0.4)",
                    },
                  },

                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.6)",
                    fontWeight: "700",
                    fontSize: "13px",
                    fontFamily: "'Syne', sans-serif",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: brandCyan,
                    opacity: 1,
                  },

                  "& .MuiFormHelperText-root": {
                    fontSize: "12px",
                    color: brandCyan,
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  },

                  "& .MuiSelect-icon": {
                    color: brandCyan,
                  },
                }}
              />
              <Button
                type='submit'
                variant='contained'
                fullWidth
                disabled={loading || !email}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color='inherit' />
                  ) : (
                    <SearchIcon />
                  )
                }
                sx={{
                  py: 2,
                  bgcolor: brandCyan,
                  color: darkPetroleum,
                  fontWeight: 900,
                  borderRadius: 3,
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                  "&:hover": { bgcolor: "#FFF" },
                }}
              >
                {loading ? "BUSCANDO..." : "BUSCAR MIS ACCESOS"}
              </Button>
            </Stack>
          </form>

          <AnimatePresence mode='popLayout'>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Alert
                  severity='error'
                  sx={{
                    mt: 3,
                    borderRadius: 2,
                    bgcolor: "rgba(211, 47, 47, 0.1)",
                    color: "#ff8a80",
                  }}
                >
                  {error}
                </Alert>
              </motion.div>
            )}

            {searched && tickets.length === 0 && !error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Typography
                  sx={{
                    color: "#ff8a80",
                    mt: 3,
                    textAlign: "center",
                    fontSize: "0.9rem",
                  }}
                >
                  No se encontraron boletos activos asociados a este correo.
                </Typography>
              </motion.div>
            )}

            {tickets.length > 0 && (
              <Box sx={{ mt: 5 }}>
                <Divider
                  sx={{ mb: 4, borderColor: "rgba(114, 248, 255, 0.1)" }}
                />
                <Typography
                  sx={{
                    color: brandCyan,
                    fontWeight: 800,
                    mb: 2,
                    fontSize: "0.8rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  TICKETS DISPONIBLES ({tickets.length})
                </Typography>

                <Stack spacing={2}>
                  {tickets.map((ticket) => (
                    <motion.div
                      key={ticket.ticketCode}
                      layout // Animación de reordenamiento automática
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0.5,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <Paper
                        sx={{
                          p: 3,
                          bgcolor: "rgba(114, 248, 255, 0.03)",
                          border: "1px solid rgba(114, 248, 255, 0.1)",
                          borderRadius: 3,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: "rgba(114, 248, 255, 0.08)",
                            borderColor: brandCyan,
                            transform: "translateX(5px)",
                          },
                        }}
                        onClick={() => handleOpenTicket(ticket)}
                      >
                        <Box>
                          <Typography
                            sx={{
                              color: "#FFF",
                              fontWeight: 700,
                              fontSize: "1rem",
                            }}
                          >
                            {ticket.fullname}
                          </Typography>
                          <Typography
                            sx={{
                              color: "rgba(255,255,255,0.5)",
                              fontSize: "0.75rem",
                            }}
                          >
                            ID: {ticket.ticketCode}
                          </Typography>
                        </Box>
                        <Button
                          variant='contained'
                          size='small'
                          sx={{
                            bgcolor: "#021619",
                            color: brandCyan,
                            fontWeight: 900,
                            fontSize: "0.65rem",
                            borderRadius: 2,
                            border: `1px solid ${brandCyan}`,
                            "&:hover": {
                              bgcolor: brandCyan,
                              color: darkPetroleum,
                            },
                          }}
                        >
                          ABRIR QR
                        </Button>
                      </Paper>
                    </motion.div>
                  ))}
                </Stack>
                <Typography
                  variant='caption'
                  sx={{
                    display: "block",
                    mt: 4,
                    textAlign: "center",
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  La lista se actualiza automáticamente al ser escaneados los
                  boletos.
                </Typography>
              </Box>
            )}
          </AnimatePresence>
        </Paper>
      </motion.div>

      <TicketModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        ticket={selectedTicket}
      />
    </Container>
  );
};

export default MyTickets;
