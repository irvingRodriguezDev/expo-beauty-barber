import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Box } from "@mui/material";
import EventCard from "./EventCard";

// Importación de estilos obligatorios de Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade"; // Estilo para transición fluida de una tarjeta

export default function EventsSlider({
  eventos = [],
  onViewDetails,
  onOpenPurchase,
  brandPink = "#EE6F97",
  deepText = "#3D2B2F",
}) {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "10px 5px",
        // Paginación premium estilo barra estirada para Wapizima
        "& .swiper-pagination-bullet": {
          bgcolor: "rgba(61, 43, 47, 0.2)",
          opacity: 1,
        },
        "& .swiper-pagination-bullet-active": {
          bgcolor: brandPink,
          width: "30px",
          borderRadius: "4px",
          transition: "all 0.4s ease",
        },
        "& .swiper-pagination": {
          position: "relative",
          marginTop: "25px",
        },
      }}
    >
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1} // <-- Fuerza estrictamente 1 tarjeta a la vez en cualquier pantalla
        effect={"fade"} // <-- Hace un efecto cross-fade elegante (puedes quitarlo si prefieres slide horizontal)
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        loop={eventos.length > 1} // Solo hace ciclo infinito si hay más de 1 evento
        autoplay={{
          delay: 4000, // Tus 4 segundos exactos
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // Si el usuario pasa el mouse para comprar, se pausa temporalmente
        }}
        style={{ width: "100%", height: "auto" }}
      >
        {eventos.map((evento, index) => (
          <SwiperSlide key={evento.id || index} style={{ height: "auto" }}>
            <Box sx={{ px: { xs: 1, sm: 3 } }}>
              {" "}
              {/* Un pequeño colchón interno para que luzcan las sombras */}
              <EventCard
                evento={evento}
                onViewDetails={onViewDetails}
                onOpenPurchase={onOpenPurchase}
                brandPink={brandPink}
                deepText={deepText}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
