import { motion } from "framer-motion";
import { MapPin, Calendar, ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className='relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0A0A0A]'>
      {/* Background gradient mesh */}
      <div className='absolute inset-0 pointer-events-none'>
        <div
          className='absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-10'
          style={{
            background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)",
          }}
        />
        <div
          className='absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-8'
          style={{
            background: "radial-gradient(circle, #E8407A 0%, transparent 70%)",
          }}
        />
        {/* Grid lines */}
        <div
          className='absolute inset-0 opacity-[0.03]'
          style={{
            backgroundImage:
              "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Placeholder image — replace src with real photo */}
      <div className='absolute inset-0'>
        <img
          src='https://images.unsplash.com/photo-1582095133179-bfd08e2fb6b8?w=1600&q=80'
          alt='Expo Beauty & Barber'
          className='w-full h-full object-cover opacity-20'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]' />
      </div>

      {/* Content */}
      <div className='relative z-10 container-site pt-28'>
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='inline-flex items-center gap-2 border border-[#C9A84C]/30 px-4 py-1.5 mb-8 bg-[#C9A84C]/5'
        >
          <span className='w-1.5 h-1.5 rounded-full bg-[#E8407A] animate-pulse' />
          <span
            className='text-[#C9A84C] text-xs tracking-[0.25em] uppercase'
            style={{ fontFamily: "Outfit, sans-serif", fontWeight: 500 }}
          >
            Edición 2026
          </span>
        </motion.div>

        {/* Main headline */}
        <div className='overflow-hidden mb-2'>
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className='text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-tight text-[#F5F0E8]'
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            EXPO BEAUTY
          </motion.h1>
        </div>
        <div className='overflow-hidden mb-6'>
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className='text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-tight text-gradient-gold'
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            & BARBER EMPRENDE
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='text-[#ABABAB] text-base md:text-lg max-w-xl mb-10 leading-relaxed'
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          El punto de encuentro para la industria de la belleza, barbería y
          maquillaje en México.
        </motion.p>

        {/* Date & Location badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='flex flex-wrap gap-4 mb-10'
        >
          <div className='flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2'>
            <Calendar size={14} className='text-[#C9A84C]' />
            <span
              className='text-sm text-[#F5F0E8]'
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              14, 15 y 16 de Marzo 2026
            </span>
          </div>
          <div className='flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2'>
            <MapPin size={14} className='text-[#E8407A]' />
            <span
              className='text-sm text-[#F5F0E8]'
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              WTC Ciudad de México
            </span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='flex flex-wrap gap-4'
        >
          <button
            onClick={() => scrollTo("expositores")}
            className='px-8 py-4 bg-[#C9A84C] text-[#0A0A0A] font-semibold text-sm tracking-widest uppercase hover:bg-[#E8C96A] transition-all duration-200 active:scale-95'
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Quiero exponer
          </button>
          <button
            onClick={() => scrollTo("visitantes")}
            className='px-8 py-4 border border-white/20 text-[#F5F0E8] font-semibold text-sm tracking-widest uppercase hover:border-white/40 hover:bg-white/5 transition-all duration-200 active:scale-95'
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Quiero asistir
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className='absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer'
        onClick={() => scrollTo("inicio")}
      >
        <span
          className='text-[#666] text-xs tracking-[0.3em] uppercase'
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} className='text-[#C9A84C]' />
        </motion.div>
      </motion.div>
    </div>
  );
}
