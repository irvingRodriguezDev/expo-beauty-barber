import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    // Temporizador para el redireccionamiento
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    // Redirigir cuando llegue a 0
    if (seconds === 0) {
      navigate("/convencion-wtc-mexico");
    }

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(timer);
  }, [seconds, navigate]);

  const containerStyle = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFD9E2", // Fondo oscuro profundo
    color: "#3D2B2F",
    fontFamily: "Inter, sans-serif",
    textAlign: "center",
    padding: "20px",
  };

  const glassCardStyle = {
    padding: "40px",
    borderRadius: "24px",
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.8)",
  };

  const timerStyle = {
    marginTop: "20px",
    fontSize: "0.9rem",
    color: "#EE6F97",
    letterSpacing: "1px",
  };

  return (
    <div style={containerStyle}>
      <div style={glassCardStyle}>
        <h1 style={{ fontSize: "5rem", margin: 0, fontWeight: "200" }}>404</h1>
        <h2 style={{ fontWeight: "400", marginBottom: "10px" }}>
          Página no encontrada
        </h2>
        <p style={{ color: "#EE6F97", maxWidth: "300px", lineHeight: "1.6" }}>
          Lo sentimos, el enlace al que intentas acceder no existe o ha sido
          movido.
        </p>

        <div style={timerStyle}>
          Serás redirigido al inicio en{" "}
          <span style={{ color: "#000", fontWeight: "bold" }}>{seconds}</span>{" "}
          segundos...
        </div>

        <button
          onClick={() => navigate("/convencion-wtc-mexico")}
          style={{
            marginTop: "30px",
            padding: "12px 24px",
            backgroundColor: "#EE6F97",
            color: "#3D2B2F",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "opacity 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.opacity = "0.8")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          Ir al inicio ahora
        </button>
      </div>
    </div>
  );
};

export default NotFound;
