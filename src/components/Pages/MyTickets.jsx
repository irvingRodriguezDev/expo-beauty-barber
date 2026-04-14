import React, { useState } from "react";
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

const MyTickets = () => {
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const brandCyan = "#72F8FF";
  const darkPetroleum = "#02181B";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");
    setSearched(false);

    try {
      // Reemplaza con tu URL real del API Gateway
      const response = await axios.get(
        `https://api.expobellezaybarberias.com/Prod/search-tickets`,
        {
          params: { email: email.toLowerCase().trim() },
        },
      );

      setTickets(response.data.tickets || []);
      setSearched(true);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Ocurrió un error al buscar tus boletos. Intenta de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  };

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
            Ingresa el correo electrónico que utilizaste al realizar tu compra.
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
                {loading ? "BUSCANDO..." : "RECUPERAR ACCESOS"}
              </Button>
            </Stack>
          </form>

          <AnimatePresence>
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
                  No se encontraron boletos asociados a este correo.
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
                  RESULTADOS ENCONTRADOS ({tickets.length})
                </Typography>
                <Stack spacing={2}>
                  {tickets.map((ticket) => (
                    <motion.div
                      key={ticket.ticketCode}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
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
                          transition: "0.3s",
                          "&:hover": {
                            bgcolor: "rgba(114, 248, 255, 0.08)",
                            borderColor: brandCyan,
                          },
                        }}
                        onClick={() =>
                          (window.location.href = `/ticket/${ticket.ticketCode}`)
                        }
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
                            Código: {ticket.ticketCode}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            color: brandCyan,
                            fontWeight: 900,
                            fontSize: "0.7rem",
                          }}
                        >
                          VER TICKET
                        </Typography>
                      </Paper>
                    </motion.div>
                  ))}
                </Stack>
              </Box>
            )}
          </AnimatePresence>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default MyTickets;
