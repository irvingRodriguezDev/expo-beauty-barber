import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Box } from "@mui/material";
import EventCard from "./EventCard";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

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
        padding: "0px 5px",
        width: "100%",
        maxWidth: "460px", // Limita el ancho máximo para mantener las proporciones estilizadas del flyer vertical
        margin: "0 auto",
        "& .swiper-pagination-bullet": {
          bgcolor: "rgba(61, 43, 47, 0.2)",
          opacity: 1,
        },
        "& .swiper-pagination-bullet-active": {
          bgcolor: brandPink,
          width: "25px",
          borderRadius: "4px",
          transition: "all 0.4s ease",
        },
        "& .swiper-pagination": {
          position: "relative",
          marginTop: "15px",
        },
      }}
    >
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        loop={eventos.length > 1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        style={{ width: "100%", height: "auto" }}
      >
        {eventos.map((evento, index) => (
          <SwiperSlide key={evento.id || index}>
            <Box sx={{ p: 1, height: "100%" }}>
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
