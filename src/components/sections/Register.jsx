import { useRef, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { RegistrationForm } from "./RegistrationForm"; // Asumo que este ya maneja los campos
import { useCaptcha } from "../../hooks/useCaptcha";
import Swal from "sweetalert2";

// --- PERFILES ADAPTADOS A MANICURISTAS ---
const visitorOptions = [
  "Manicurista Profesional",
  "Dueña de Salón",
  "Técnica en Uñas",
  "Educadora / Master",
  "Emprendedora",
  "Distribuidor",
];

// --- PALETA COHERENTE (Wapizima Style) ---
const brandPink = "#E53888"; // Rosa vibrante de la marca
const deepText = "#3D2B2F";
const lightBg = "#FFD9E2";

const inputStyles = {
  mb: 3,
  "& .MuiOutlinedInput-root": {
    borderRadius: 1,
    backgroundColor: "#FFFFFF",
    transition: "all 0.3s ease-in-out",
    "& fieldset": {
      borderColor: "rgba(229, 56, 136, 0.2)",
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: `${brandPink} !important`,
    },
    "&.Mui-focused fieldset": {
      borderColor: `${brandPink} !important`,
      borderWidth: "2px",
      boxShadow: `0 0 20px rgba(229, 56, 136, 0.1)`,
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(61, 43, 47, 0.6)",
    fontWeight: "800",
    fontSize: "12px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: brandPink,
  },
};

export default function Register() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Seteamos el pase único por defecto
  const singlePass = {
    id: "ANNIVERSARY_PASS",
    title: "ACCESO TOTAL 7º ANIVERSARIO",
    price: 500,
    desc: "Incluye Masterclasses, acceso a venta exclusiva, música en vivo y kit de bienvenida.",
  };

  // Eliminamos el estado 'idle' de selección para ir directo al formulario
  const [status, setStatus] = useState("form");
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
      businessName: data.businessName || "N/A", // Si no tiene negocio, enviamos N/A
      accessType: singlePass.id, // Siempre enviamos el ID del pase único
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
        // Redirección directa a Stripe
        window.location.href = resData.url;
      } else {
        throw new Error("Error en respuesta");
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "¡Ups!",
        text: "No pudimos procesar el pago. Intenta de nuevo o contacta a soporte.",
        icon: "error",
        confirmButtonColor: brandPink,
      });
    }
  };

  return (
    <Box
      ref={ref}
      component='section'
      id='register'
      sx={{
        py: { xs: 8, md: 12 },
        background: `linear-gradient(180deg, ${lightBg} 0%)`,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth='sm'>
        {" "}
        {/* Reducimos a 'sm' para que el formulario se vea elegante y centrado */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 900,
                letterSpacing: "0.3em",
                color: brandPink,
                mb: 1,
                textTransform: "uppercase",
                bgcolor: "rgba(229, 56, 136, 0.1)",
                px: 2,
                py: 0.5,
                borderRadius: "50px",
                display: "inline-block",
              }}
            >
              Asegura tu lugar • 06 de Junio
            </Typography>

            <Typography
              variant='h2'
              sx={{
                fontSize: { xs: "2.2rem", md: "3.2rem" },
                fontWeight: 900,
                color: deepText,
                lineHeight: 1.1,
                mb: 2,
                fontFamily: "'Syne', sans-serif",
              }}
            >
              {loading ? "Procesando..." : "Compra tu Boleto"}
            </Typography>

            <Typography
              sx={{
                fontSize: "1.1rem",
                color: "rgba(61, 43, 47, 0.7)",
                maxWidth: "400px",
                margin: "0 auto",
                lineHeight: 1.4,
              }}
            >
              Solo <strong>$500 MXN</strong> para vivir la experiencia completa
              de nuestro aniversario en el WTC.
            </Typography>
          </motion.div>
        </Box>
        <AnimatePresence mode='wait'>
          <motion.div
            key='form'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            {/* He quitado PassSelection. 
                RegistrationForm ahora recibe directamente el 'singlePass' 
            */}
            <RegistrationForm
              selectedPass={singlePass}
              onSubmit={handleOnSubmit}
              visitorTypes={visitorOptions}
              inputStyles={inputStyles}
              isSubmitting={loading}
              // Ya no necesitamos onBack porque es opción única
            />
          </motion.div>
        </AnimatePresence>
        <Typography
          sx={{
            mt: 4,
            textAlign: "center",
            fontSize: "0.8rem",
            color: "rgba(61, 43, 47, 0.5)",
          }}
        >
          Al proceder al pago serás redirigido de forma segura a Stripe. <br />
          Tu boleto llegará automáticamente a tu correo.
        </Typography>
      </Container>
    </Box>
  );
}
