import React, { useState, useRef } from "react";
import QrScanner from "react-qr-scanner";
import {
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  QrCodeScanner,
  Replay,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const COLORS = {
  petrolBlue: "#004d4d",
  petrolDark: "#001a1a",
  white: "#ffffff",
  textSecondary: "#a0d1d1",
  borderWhite: "rgba(255,255,255,0.2)",
  success: "#4caf50",
  error: "#f44336",
};

// --- SONIDOS ---
const playSound = (type) => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  if (type === "success") {
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // Nota La5
    oscillator.frequency.exponentialRampToValueAtTime(
      1320,
      audioCtx.currentTime + 0.1,
    );
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioCtx.currentTime + 0.3,
    );
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.3);
  } else {
    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(150, audioCtx.currentTime); // Grave/Buzzer
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
  }
};

const ScannerView = () => {
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [lastStatus, setLastStatus] = useState(null); // 'success', 'error' o null

  const handleScan = async (data) => {
    if (data && !loading && isScanning) {
      const code = typeof data === "object" ? data.text : data;

      setIsScanning(false); // Apagamos cámara inmediatamente al leer
      setLoading(true);

      try {
        const response = await fetch(
          "https://api.expobellezaybarberias.com/check-in/",
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
            title: "¡ACCESO CONCEDIDO!",
            html: `<b style="font-size: 1.2rem;">${result.fullname}</b><br/><span style="color: ${COLORS.textSecondary}">${result.accessType}</span>`,
            background: COLORS.petrolDark,
            color: COLORS.white,
            confirmButtonColor: COLORS.petrolBlue,
            confirmButtonText: "SIGUIENTE ESCANEO",
          }).then(() => {
            // Reset para el siguiente
            setLastStatus(null);
          });
        } else {
          playSound("error");
          setLastStatus("error");
          MySwal.fire({
            icon: "error",
            title: "DENEGADO",
            text: result.message,
            background: COLORS.petrolDark,
            color: COLORS.white,
            confirmButtonColor: COLORS.petrolBlue,
            confirmButtonText: "REINTENTAR",
          }).then(() => {
            setLastStatus(null);
          });
        }
      } catch (err) {
        playSound("error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container maxWidth='xs' sx={{ mt: 4, mb: 4 }}>
      <Paper
        elevation={24}
        sx={{
          borderRadius: 8,
          overflow: "hidden",
          background: `linear-gradient(165deg, ${COLORS.petrolDark} 0%, ${COLORS.petrolBlue} 100%)`,
          color: COLORS.white,
          p: 3,
          textAlign: "center",
          border: `1px solid ${COLORS.borderWhite}`,
        }}
      >
        <Typography variant='overline' sx={{ letterSpacing: 4, opacity: 0.7 }}>
          Staff WTC CDMX
        </Typography>
        <Typography variant='h5' sx={{ fontWeight: 900, mb: 3, mt: 1 }}>
          CHECK-IN EBB
        </Typography>

        {/* Contenedor de Cámara o Feedback */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "1/1",
            borderRadius: 6,
            overflow: "hidden",
            bgcolor: "rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: `2px solid ${isScanning ? COLORS.textSecondary : COLORS.borderWhite}`,
            transition: "all 0.3s ease",
          }}
        >
          {isScanning ? (
            <QrScanner
              delay={300}
              onError={(err) => console.log(err)}
              onScan={handleScan}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              constraints={{ video: { facingMode: "environment" } }}
            />
          ) : (
            <Box sx={{ textAlign: "center", p: 3 }}>
              {loading ? (
                <CircularProgress sx={{ color: COLORS.white }} />
              ) : lastStatus === "success" ? (
                <CheckCircle sx={{ fontSize: 80, color: COLORS.success }} />
              ) : lastStatus === "error" ? (
                <Cancel sx={{ fontSize: 80, color: COLORS.error }} />
              ) : (
                <QrCodeScanner sx={{ fontSize: 80, opacity: 0.2 }} />
              )}
            </Box>
          )}
        </Box>

        {/* Botón de Acción Principal */}
        <Button
          fullWidth
          variant='contained'
          size='large'
          disabled={loading}
          onClick={() => setIsScanning(true)}
          startIcon={
            isScanning ? (
              <CircularProgress size={20} color='inherit' />
            ) : (
              <Replay />
            )
          }
          sx={{
            mt: 4,
            py: 2,
            borderRadius: 4,
            bgcolor: COLORS.white,
            color: COLORS.petrolDark,
            fontWeight: "bold",
            fontSize: "1.1rem",
            "&:hover": { bgcolor: COLORS.textSecondary },
            display: isScanning ? "none" : "flex",
          }}
        >
          {lastStatus ? "ESCANEAR SIGUIENTE" : "INICIAR ESCANEO"}
        </Button>

        {isScanning && (
          <Button
            fullWidth
            color='inherit'
            onClick={() => setIsScanning(false)}
            sx={{ mt: 2, opacity: 0.6 }}
          >
            CANCELAR
          </Button>
        )}
      </Paper>
    </Container>
  );
};

export default ScannerView;
