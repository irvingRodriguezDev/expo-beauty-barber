import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import {
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Button,
  Stack,
} from "@mui/material";
import {
  QrCodeScanner,
  CheckCircle,
  Cancel,
  CenterFocusStrong,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// --- PALETA COHERENTE CON EL BRANDING ---
const COLORS = {
  brandPink: "#ee6f97ff",
  deepText: "#3D2B2F",
  softBg: "#FFF5F7",
  white: "#ffffff",
  success: "#4caf50",
  error: "#f44336",
};

const playSound = (type) => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  if (type === "success") {
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioCtx.currentTime + 0.3,
    );
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.3);
  } else {
    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
  }
};

const ScannerView = () => {
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [lastStatus, setLastStatus] = useState(null);

  const handleScan = async (data) => {
    if (data && !loading && isScanning) {
      const code = typeof data === "object" ? data.text : data;
      setIsScanning(false);
      setLoading(true);

      try {
        const response = await fetch(
          "https://api.beautyworldmexico.com.mx/check-in/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
          },
        );

        const result = await response.json();

        if (response.ok) {
          playSound("success");
          setLastStatus("success");
          MySwal.fire({
            icon: "success",
            title: `<span style="font-family: 'Syne'; font-weight: 900; color: ${COLORS.deepText}">ACCESO AUTORIZADO</span>`,
            html: `
              <div style="padding: 10px;">
                <b style="font-size: 1.4rem; color: ${COLORS.deepText}">${result.fullname.toUpperCase()}</b><br/>
                <div style="margin-top: 10px; display: inline-block; padding: 5px 15px; border-radius: 20px; background: ${COLORS.brandPink}; color: ${COLORS.deepText}; font-weight: 800; font-size: 0.8rem;">
                  ${result.accessType}
                </div>
              </div>
            `,
            background: COLORS.white,
            confirmButtonColor: COLORS.deepText,
            confirmButtonText: "CONTINUAR",
            customClass: { popup: "premium-swal-border" },
          }).then(() => setLastStatus(null));
        } else {
          playSound("error");
          setLastStatus("error");
          MySwal.fire({
            icon: "error",
            title: "ENTRADA DENEGADA",
            text: result.message,
            confirmButtonColor: COLORS.error,
          }).then(() => setLastStatus(null));
        }
      } catch (err) {
        playSound("error");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box
      sx={{
        background: COLORS.softBg,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth='xs'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 1,
              overflow: "hidden",
              background: COLORS.white,
              p: 4,
              textAlign: "center",
              border: `1px solid rgba(61, 43, 47, 0.1)`,
              boxShadow: "0 40px 80px rgba(61, 43, 47, 0.08)",
            }}
          >
            <Stack spacing={1} sx={{ mb: 4 }}>
              <Typography
                sx={{
                  letterSpacing: 6,
                  fontWeight: 900,
                  color: COLORS.brandPink,
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                }}
              >
                Control de Acceso
              </Typography>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 900,
                  color: COLORS.deepText,
                  // fontFamily: "'Syne', sans-serif",
                }}
              >
                CHECK-IN DE ASISTENTES
              </Typography>
            </Stack>

            {/* Visor de Cámara de Alta Precisión */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: 1,
                overflow: "hidden",
                bgcolor: COLORS.deepText,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: `4px solid ${
                  isScanning
                    ? COLORS.brandPink
                    : lastStatus === "success"
                      ? COLORS.success
                      : lastStatus === "error"
                        ? COLORS.error
                        : "rgba(61, 43, 47, 0.1)"
                }`,
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <AnimatePresence mode='wait'>
                {isScanning ? (
                  <motion.div
                    key='scanner'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ width: "100%", height: "100%" }}
                  >
                    {/* Guía visual de escaneo */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 2,
                        pointerEvents: "none",
                        border: "40px solid rgba(0,0,0,0.4)",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          border: `2px solid ${COLORS.brandPink}`,
                          borderRadius: 2,
                        }}
                      />
                    </Box>
                    <QrScanner
                      delay={300}
                      onError={(err) => console.log(err)}
                      onScan={handleScan}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      constraints={{ video: { facingMode: "environment" } }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key='status'
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    {loading ? (
                      <CircularProgress sx={{ color: COLORS.brandPink }} />
                    ) : lastStatus === "success" ? (
                      <CheckCircle
                        sx={{ fontSize: 100, color: COLORS.success }}
                      />
                    ) : lastStatus === "error" ? (
                      <Cancel sx={{ fontSize: 100, color: COLORS.error }} />
                    ) : (
                      <Stack
                        alignItems='center'
                        spacing={2}
                        sx={{ opacity: 0.3 }}
                      >
                        <CenterFocusStrong
                          sx={{ fontSize: 80, color: COLORS.white }}
                        />
                        <Typography
                          sx={{
                            color: COLORS.white,
                            fontWeight: 800,
                            fontSize: "0.7rem",
                            letterSpacing: 2,
                          }}
                        >
                          ESPERANDO...
                        </Typography>
                      </Stack>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>

            {/* Acciones */}
            <Stack spacing={2} sx={{ mt: 4 }}>
              <Button
                fullWidth
                variant='contained'
                disabled={loading}
                onClick={() => setIsScanning(true)}
                sx={{
                  py: 2.5,
                  borderRadius: 1,
                  bgcolor: COLORS.deepText,
                  color: COLORS.white,
                  fontWeight: 900,
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                  boxShadow: "0 10px 25px rgba(61, 43, 47, 0.2)",
                  display: isScanning ? "none" : "flex",
                  "&:hover": {
                    bgcolor: COLORS.brandPink,
                    color: COLORS.deepText,
                  },
                }}
              >
                {lastStatus ? "SIGUIENTE ESCANEO" : "INICIAR LECTOR"}
              </Button>

              {isScanning && (
                <Button
                  fullWidth
                  variant='outlined'
                  onClick={() => setIsScanning(false)}
                  sx={{
                    py: 2,
                    borderRadius: 1,
                    borderColor: COLORS.deepText,
                    color: COLORS.deepText,
                    fontWeight: 900,
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                      borderColor: COLORS.brandPink,
                      color: COLORS.brandPink,
                    },
                  }}
                >
                  CANCELAR
                </Button>
              )}
            </Stack>

            <Typography
              sx={{
                mt: 3,
                fontSize: "0.65rem",
                color: "rgba(61, 43, 47, 0.4)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              World Trade Center • Ciudad de México
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ScannerView;
