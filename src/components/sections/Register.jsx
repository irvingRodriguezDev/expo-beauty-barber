import { useRef, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { PassSelection } from "./PassSelection";
import { RegistrationForm } from "./RegistrationForm";
import { useCaptcha } from "../../hooks/useCaptcha";
import Swal from "sweetalert2";

const visitorOptions = [
  "Barberos",
  "Maquillistas Profesionales",
  "Estilistas",
  "Dueños de Salón",
];

// --- PALETA COHERENTE ---
const brandPink = "#ee6f97ff"; // Rosa pastel claro
const deepText = "#3D2B2F"; // Texto oscuro cálido
const lightBg = "#FFD9E2"; // Fondo crema rosado
// -------------------------

const inputStyles = {
  mb: 3,
  "& .MuiOutlinedInput-root": {
    borderRadius: 1,
    backgroundColor: "#FFFFFF",
    transition: "all 0.3s ease-in-out",

    "& fieldset": {
      borderColor: "rgba(255, 183, 206, 0.4)", // Borde Rosa sutil
      borderWidth: "1px",
      borderRadius: 1,
    },

    "&:hover fieldset": {
      borderColor: `${brandPink} !important`,
      borderRadius: 1,
    },

    "&.Mui-focused fieldset": {
      borderColor: `${brandPink} !important`,
      borderWidth: "2px",
      boxShadow: `0 0 20px rgba(255, 183, 206, 0.15)`,
      borderRadius: 1,
    },
  },

  "& .MuiInputBase-input": {
    color: deepText,
    padding: "18px 20px",
    fontSize: "15px",
    fontWeight: 500,
    "&::placeholder": {
      color: "rgba(61, 43, 47, 0.4)",
    },
  },

  "& .MuiInputLabel-root": {
    color: "rgba(61, 43, 47, 0.6)",
    fontWeight: "800",
    fontSize: "13px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: brandPink,
    opacity: 1,
  },

  "& .MuiFormHelperText-root": {
    fontSize: "12px",
    color: brandPink,
    fontWeight: 600,
    letterSpacing: "0.02em",
  },

  "& .MuiSelect-icon": {
    color: brandPink,
  },
};

export default function Register() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState("idle");
  const [selectedPass, setSelectedPass] = useState(null);
  const [loading, setLoading] = useState(false);

  const urlRegister = import.meta.env.VITE_BACKEND_URL_REGISTER;
  const { getCaptchaToken } = useCaptcha();

  const handleOnSubmit = async (data) => {
    setLoading(true);
    const token = await getCaptchaToken("formulario_registro");
    const dataForm = {
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
      profile: data.profile,
      businessName: data.businessName,
      accessType: selectedPass.id,
      captcha: token,
    };
    try {
      const response = await fetch(urlRegister, {
        method: "POST",
        body: JSON.stringify({ dataForm }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const resData = await response.json();
        window.location.href = resData.url;
      } else {
        setLoading(false);
        setStatus("idle");
        Swal.fire({
          title: "Ocurrió un problema",
          text: "Hubo un error al procesar tu registro. Por favor, intenta de nuevo.",
          icon: "error",
          confirmButtonColor: deepText,
        });
      }
    } catch (error) {
      console.error("Error en el registro", error);
      setLoading(false);
      setStatus("idle");
    }
  };

  const passOptions = [
    {
      id: "SINGLE_DAY",
      title: "ACCESO INDIVIDUAL 1 DÍA",
      price: 150,
      desc: "Acceso completo por 1 día a todas las áreas de exposición.",
      color: brandPink,
    },
    {
      id: "TWO_DAYS",
      title: "ACCESO INDIVIDUAL 2 DÍAS",
      price: 200,
      desc: "Inmersión total los dos días del evento con beneficios exclusivos.",
      color: deepText,
    },
    {
      id: "GROUP_SINGLE",
      title: "ACCESO GRUPAL 1 DÍA",
      price: 1500,
      desc: "Paquete corporativo (11 boletos) para un día de actualización.",
      color: deepText,
    },
    {
      id: "GROUP_TWO",
      title: "ACCESO GRUPAL 2 DÍAS",
      price: 2000,
      desc: "La máxima experiencia grupal (11 boletos) para ambos días.",
      color: deepText,
    },
  ];

  return (
    <Box
      ref={ref}
      component='section'
      id='register'
      sx={{
        py: { xs: 8, md: 15 },
        background: lightBg,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Container maxWidth='xl'>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 800,
                letterSpacing: "0.5em",
                color: "",
                mb: 2,
                textTransform: "uppercase",
                bgcolor: "#FFCBDA",
                width: "fit-content",
                display: "inline-block",
              }}
            >
              REGISTRO EDICIÓN 2027
            </Typography>
            <Typography
              variant='h2'
              sx={{
                fontSize: { xs: "2.5rem", md: "4rem" },
                fontWeight: 900,
                color: deepText,
                letterSpacing: "-0.02em",
                fontFamily: "'Syne', sans-serif",
              }}
            >
              {status === "idle"
                ? "Selecciona tu Acceso"
                : status === "form"
                  ? "Datos del Profesional"
                  : "Redirigiendo al Pago..."}
            </Typography>
          </motion.div>
        </Box>

        <AnimatePresence mode='wait'>
          {status === "idle" && (
            <motion.div
              key='selection'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <PassSelection
                options={passOptions}
                onSelect={(pass) => {
                  setSelectedPass(pass);
                  setStatus("form");
                }}
              />
            </motion.div>
          )}

          {status === "form" && (
            <motion.div
              key='form'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <RegistrationForm
                selectedPass={selectedPass}
                onBack={() => setStatus("idle")}
                onSubmit={handleOnSubmit}
                visitorTypes={visitorOptions}
                inputStyles={inputStyles}
                isSubmitting={loading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
