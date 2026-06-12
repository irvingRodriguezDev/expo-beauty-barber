import React, { useRef, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
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
import { MethodPost } from "../../config/service";

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
  const scanLock = useRef(false);

  const lastScanRef = useRef({
    code: null,
    time: 0,
  });
  const [isScanning, setIsScanning] = useState(false);
  const [lastStatus, setLastStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleScan = async (detectedCodes) => {
    // LOCK ABSOLUTO INMEDIATO
    if (scanLock.current) return;

    scanLock.current = true;

    try {
      if (!detectedCodes || detectedCodes.length === 0) {
        scanLock.current = false;
        return;
      }

      const code = detectedCodes[0]?.rawValue;

      if (!code) {
        scanLock.current = false;
        return;
      }

      const now = Date.now();

      if (
        lastScanRef.current.code === code &&
        now - lastScanRef.current.time < 3000
      ) {
        scanLock.current = false;
        return;
      }

      lastScanRef.current = {
        code,
        time: now,
      };

      setIsScanning(false);
      setLoading(true);

      // 🚀 Disparamos la petición enviando el código en el objeto
      const response = await MethodPost("/ticket/validate", { code });
      console.log(response, "la respuesta");

      // 💡 NOTA: Si MethodPost usa Axios, los datos están en response.data.
      // Si usa fetch nativo, dejas el await response.json().
      // Supongamos que es Axios o maneja data limpia:
      const result = response.data || (await response.json());

      // Evaluamos el status de la respuesta HTTP
      if (response.status === 200 || result.valid === true) {
        playSound("success");
        setLastStatus("success");

        // 💡 EXTRAEMOS EL NOMBRE DEL COMPRADOR (Mapeado desde la relación que agregamos)
        const nombreComprador =
          result.ticket?.orden?.buyerName || "Boleto Válido";

        await MySwal.fire({
          icon: "success",
          title: "ACCESO AUTORIZADO",
          text: `Cliente: ${nombreComprador}`, // 🎨 Muestra el nombre real del comprador
          confirmButtonText: "CONTINUAR",
          showConfirmButton: false,
          timer: 1500, // Le damos un poquito más de tiempo para que el staff alcance a leer
        });
      } else {
        playSound("error");
        setLastStatus("error");

        await MySwal.fire({
          icon: "error",
          title: "ENTRADA DENEGADA",
          text: result.message || "Boleto inválido o ya usado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log("Error en el escaneo:", error);

      // 🚨 Si el servidor responde un 400 o 404, Axios lo manda directo al catch.
      // Capturamos el error para pintar la alerta roja de todos modos:
      playSound("error");
      setLastStatus("error");

      const errorMsg =
        error.response?.data?.message || "Error al conectar con el servidor";

      await MySwal.fire({
        icon: "error",
        title: "ENTRADA DENEGADA",
        text: errorMsg,
        showConfirmButton: false,
        timer: 2500,
      });
    } finally {
      setLoading(false);

      setTimeout(() => {
        setIsScanning(true);
        // LIBERA EL LOCK HASTA EL FINAL
        scanLock.current = false;
      }, 1500);
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
              borderRadius: 2,
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
                borderRadius: 2,
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
                    <Scanner
                      formats={["qr_code"]}
                      onScan={handleScan}
                      onError={(error) => console.log(error)}
                      constraints={{
                        facingMode: "environment",
                      }}
                      styles={{
                        container: {
                          width: "100%",
                          height: "100%",
                        },
                        video: {
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        },
                      }}
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
                  borderRadius: 2,
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
                    borderRadius: 2,
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
              EVENTOS • WAPIZIMA
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ScannerView;
