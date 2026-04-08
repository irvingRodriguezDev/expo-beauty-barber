import { useRef, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { PassSelection } from "./PassSelection";
import { RegistrationForm } from "./RegistrationForm";
import { SuccessTicket } from "./SuccessTicket";

const visitorOptions = [
  "Barberos",
  "Maquillistas Profesionales",
  "Estilistas",
  "Dueños de Salón",
];

// Configuración de colores para consistencia
const brandCyan = "#72F8FF";
const darkPetroleum = "#042F35";

const inputStyles = {
  mb: 3,
  "& .MuiOutlinedInput-root": {
    borderRadius: "0px",
    backgroundColor: "rgba(255, 255, 255, 0.03)", // Fondo ultra tenue para integración total
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease-in-out",

    "& fieldset": {
      borderColor: "rgba(114, 248, 255, 0.2)", // Borde Cian sutil
      borderWidth: "1px",
    },

    "&:hover fieldset": {
      borderColor: `${brandCyan} !important`, // Cian fuerte al pasar el mouse
    },

    "&.Mui-focused fieldset": {
      borderColor: `${brandCyan} !important`,
      borderWidth: "2px",
      boxShadow: `0 0 20px rgba(114, 248, 255, 0.15)`,
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
};

export default function Register() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState("idle");
  const [selectedPass, setSelectedPass] = useState(null);
  const [registration, setRegistration] = useState(null);

  const handleOnSubmit = (data) => {
    const code = "EBB-" + Math.random().toString(36).substr(2, 6).toUpperCase();
    setRegistration({ ...data, code, passTitle: selectedPass.title });
    setStatus("success");
  };

  const passOptions = [
    {
      id: "general_access",
      title: "PROFESSIONAL PASS",
      price: 150,
      desc: "Acceso total de un día a la zona de exposición, shows en plataforma principal y área de networking.",
      color: brandCyan, // Ahora es el acento principal
    },
    {
      id: "full_experience",
      title: "ELITE FULL PASS",
      price: 200,
      desc: "Acceso VIP los dos días del evento, lugares preferenciales en seminarios y kit de bienvenida exclusivo.",
      color: "#FFFFFF",
    },
  ];

  return (
    <Box
      ref={ref}
      component='section'
      id='register'
      sx={{
        py: { xs: 8, md: 15 },
        // Gradiente coherente: de petróleo medio a profundo
        background: `linear-gradient(180deg, #064E57 0%, ${darkPetroleum} 100%)`,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Container maxWidth='lg'>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Typography
              sx={{
                // fontFamily: "'DM Sans'",
                fontSize: "0.75rem",
                fontWeight: 800,
                letterSpacing: "0.5em",
                color: brandCyan,
                mb: 2,
              }}
            >
              REGISTRO EDICIÓN 2027
            </Typography>
            <Typography
              variant='h2'
              sx={{
                // fontFamily: "'Syne'",
                fontSize: { xs: "2.5rem", md: "4rem" },
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
              }}
            >
              {status === "idle"
                ? "Selecciona tu Acceso"
                : status === "form"
                  ? "Datos del Profesional"
                  : "¡Registro Exitoso!"}
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
              />
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key='success'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <SuccessTicket
                registration={registration}
                onReset={() => setStatus("idle")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
