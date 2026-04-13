import { useRef, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { PassSelection } from "./PassSelection";
import { RegistrationForm } from "./RegistrationForm";
import { SuccessTicket } from "./SuccessTicket";
import Swal from "sweetalert2";

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
};

export default function Register() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState("idle");
  const [selectedPass, setSelectedPass] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(false);
  const urlRegister = import.meta.env.VITE_BACKEND_URL_REGISTER;

  const handleOnSubmit = async (data) => {
    setLoading(true);
    const dataForm = {
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
      profile: data.profile,
      businessName: data.businessName,
      accessType: selectedPass.id,
    };

    try {
      const response = await fetch(urlRegister, {
        method: "POST",
        body: JSON.stringify(dataForm),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const resData = await response.json();

        window.location.href = resData.url;
      } else {
        setLoading(false); // Si hay error del server, liberamos el botón
        Swal.fire({
          title: "Ocurrio un problema",
          text: "Ocurrio un problema al realizar el registro",
          icon: "error",
          timer: 2500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error en el registro", error);
      setLoading(false);
    }
    const code = "EBB-" + Math.random().toString(36).substr(2, 6);
    setRegistration({ ...data, code, passTitle: selectedPass.title });
    setStatus("success");
  };

  const passOptions = [
    {
      id: "SINGLE_DAY",
      title: "ACCESO INDIVIDUAL 1 DIA",
      price: 150,
      desc: "Obten tu acceso individual, con acceso completo por 1 dia",
      color: brandCyan, // Ahora es el acento principal
    },
    {
      id: "TWO_DAYS",
      title: "ACCESO INDIVIDUAL 2 DIAS",
      price: 200,
      desc: "Acceso VIP los dos días del evento, lugares preferenciales en seminarios y kit de bienvenida exclusivo.",
      color: "#FFFFFF",
    },
    {
      id: "GROUP_SINGLE",
      title: "ACCESO GRUPAL 1 DIA (obten 11 boletos)",
      price: 1500,
      desc: "Acceso VIP los dos días del evento, lugares preferenciales en seminarios y kit de bienvenida exclusivo.",
      color: "#FFFFFF",
    },
    {
      id: "GROUP_TWO",
      title: "ACCESO GRUPAL 2 DIA (obten 11 boletos) ",
      price: 2000,
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
      <Container maxWidth='xl'>
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
                isSubmitting={loading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
