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
  brandPink = "#E11D74",
  darkText = "#2B1E22",
}) {
  if (!eventos || eventos.length === 0) return null;

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2 },
        py: 1,
        width: "100%",
        maxWidth: "460px",
        margin: "0 auto",
        "& .swiper-pagination-bullet": {
          bgcolor: "rgba(43, 30, 34, 0.2)",
          opacity: 1,
          height: "6px",
          width: "6px",
          transition: "all 0.3s ease",
        },
        "& .swiper-pagination-bullet-active": {
          bgcolor: brandPink,
          width: "24px",
          borderRadius: "10px",
        },
        "& .swiper-pagination": {
          position: "relative",
          marginTop: "16px",
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
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        style={{ width: "100%", height: "auto" }}
      >
        {eventos.map((evento, index) => (
          <SwiperSlide key={evento.id || index}>
            <Box sx={{ p: 0.5, height: "100%" }}>
              <EventCard
                evento={evento}
                onViewDetails={onViewDetails}
                onOpenPurchase={onOpenPurchase}
                brandPink={brandPink}
                darkText={darkText}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
