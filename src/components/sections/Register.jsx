import { useRef, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { PassSelection } from "./PassSelection";
import { RegistrationForm } from "./RegistrationForm";
import { SuccessTicket } from "./SuccessTicket";

// Importa tus nuevos componentes aquí
// import { PassSelection } from "./PassSelection"; ...

export default function Register() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState("idle"); // idle | form | success
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
      color: "#D4AF37", // Acento Dorado
    },
    {
      id: "full_experience",
      title: "ELITE FULL PASS",
      price: 200,
      desc: "Acceso VIP los dos días del evento, lugares preferenciales en seminarios y kit de bienvenida exclusivo.",
      color: "#FFFFFF", // Acento Blanco
    },
  ];

  return (
    <Box
      ref={ref}
      component='section'
      id='register'
      sx={{
        py: { xs: 8, md: 15 },
        background: "linear-gradient(180deg, #668678 0%, #062C22 100%)",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth='lg'>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <motion.div
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          >
            <Typography
              sx={{
                fontFamily: "'DM Sans'",
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.4em",
                color: "#D4AF37",
                mb: 2,
              }}
            >
              REGISTRO EDICIÓN 2027
            </Typography>
            <Typography
              variant='h2'
              sx={{
                fontFamily: "'Syne'",
                fontSize: { xs: "2.5rem", md: "4rem" },
                fontWeight: 800,
                color: "#FFFFFF",
              }}
            >
              {status === "idle"
                ? "Selecciona tu Acceso"
                : "Completa tu Registro"}
            </Typography>
          </motion.div>
        </Box>

        <AnimatePresence mode='wait'>
          {status === "idle" && (
            <PassSelection
              options={passOptions}
              onSelect={(pass) => {
                setSelectedPass(pass);
                setStatus("form");
              }}
            />
          )}

          {status === "form" && (
            <RegistrationForm
              selectedPass={selectedPass}
              onBack={() => setStatus("idle")}
              onSubmit={handleOnSubmit}
              visitorTypes={visitorTypes}
              inputStyles={inputStyles}
            />
          )}

          {status === "success" && (
            <SuccessTicket
              registration={registration}
              onReset={() => setStatus("idle")}
            />
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
