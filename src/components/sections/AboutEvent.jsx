import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutEvent() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className='py-32 bg-[#0D0D0D] border-t border-white/8 relative'
    >
      <div className='absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-[#C9A84C] to-transparent' />
      <div className='container-site'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className='text-[#C9A84C] text-xs tracking-[0.35em] uppercase mb-4'
              style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600 }}
            >
              Sobre el evento
            </p>
            <h2
              className='text-[clamp(2.5rem,5vw,4.5rem)] leading-tight text-[#F5F0E8] mb-6'
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              Donde la industria
              <br />
              <span className='text-gradient-gold'>se encuentra</span>
            </h2>
            <div className='section-divider mb-8' />
            <p
              className='text-[#ABABAB] text-base leading-relaxed mb-4'
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Expo Beauty & Barber Emprende reúne a{" "}
              <span className='text-[#F5F0E8]'>
                marcas, emprendedores y profesionales
              </span>{" "}
              del sector belleza para generar relaciones comerciales,
              posicionamiento de marca y nuevas oportunidades de negocio.
            </p>
            <p
              className='text-[#777] text-sm leading-relaxed'
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              El evento es organizado por{" "}
              <span className='text-[#ABABAB]'>Publicidad Mahur</span>, empresa
              con más de{" "}
              <span className='text-[#C9A84C]'>15 años de experiencia</span> en
              la organización de exposiciones comerciales.
            </p>
          </motion.div>

          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className='relative'
          >
            <div className='aspect-[4/3] bg-[#1A1A1A] overflow-hidden relative'>
              {/* Replace with real image */}
              <img
                src='https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80'
                alt='Expo'
                className='w-full h-full object-cover opacity-70'
              />
              <div className='absolute inset-0 bg-gradient-to-tr from-[#0A0A0A]/60 to-transparent' />
            </div>
            {/* Decorative accent */}
            <div className='absolute -bottom-4 -right-4 w-24 h-24 border-2 border-[#C9A84C]/30 -z-10' />
            <div className='absolute -top-4 -left-4 w-16 h-16 border border-[#E8407A]/20 -z-10' />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
