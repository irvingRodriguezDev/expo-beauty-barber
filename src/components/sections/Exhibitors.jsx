import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  TrendingUp,
  Store,
  Award,
  MonitorPlay,
  Share2,
  Handshake,
} from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Ventas directas y generación de leads",
    desc: "Contacto con estilistas, barberos y dueños de salones listos para comprar.",
  },
  {
    icon: Store,
    title: "Distribución B2B",
    desc: "Oportunidad de cerrar acuerdos con distribuidores y mayoristas.",
  },
  {
    icon: Award,
    title: "Posicionamiento de marca",
    desc: "Visibilidad frente a miles de profesionales del sector.",
  },
  {
    icon: MonitorPlay,
    title: "Demostraciones en vivo",
    desc: "Presentación de productos en escenarios y pasarelas.",
  },
  {
    icon: Share2,
    title: "Contenido y marketing",
    desc: "Material para redes, influencers y medios especializados.",
  },
  {
    icon: Handshake,
    title: "Networking",
    desc: "Alianzas con academias, marcas y compradores institucionales.",
  },
];

const activities = [
  "Stands comerciales",
  "Demostraciones de producto",
  "Pasarelas",
  "Barber Shows",
  "Talleres patrocinados",
  "Networking VIP",
];

const audience = [
  "Estilistas",
  "Barberos",
  "Maquilladores",
  "Dueños de salones",
  "Distribuidores",
  "Academias",
  "Influencers",
];

export default function Exhibitors() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className='py-32 bg-[#0A0A0A] border-t border-white/8 relative'
    >
      <div className='container-site'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className='mb-20'
        >
          <p
            className='text-[#C9A84C] text-xs tracking-[0.35em] uppercase mb-4'
            style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600 }}
          >
            Sección expositores
          </p>
          <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6'>
            <h2
              className='text-[clamp(2.5rem,5vw,4.5rem)] text-[#F5F0E8] leading-tight'
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              ¿Por qué
              <br />
              <span className='text-gradient-gold'>exponer con nosotros?</span>
            </h2>
            <p
              className='text-[#777] text-sm max-w-sm leading-relaxed'
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              El espacio ideal para que las marcas conecten directamente con
              compradores, distribuidores y profesionales del mercado.
            </p>
          </div>
        </motion.div>

        {/* Benefits grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20'>
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className='bg-[#141414] border border-white/8 p-8 group hover:bg-[#1C1C1C] hover:border-[#C9A84C]/30 transition-all duration-300'
            >
              <div className='w-10 h-10 border border-[#C9A84C]/25 bg-[#C9A84C]/8 flex items-center justify-center mb-5 group-hover:border-[#C9A84C]/60 group-hover:bg-[#C9A84C]/15 transition-all'>
                <b.icon size={18} className='text-[#C9A84C]' />
              </div>
              <h3
                className='text-[#F0EAD6] font-semibold text-sm mb-2'
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {b.title}
              </h3>
              <p
                className='text-[#ABABAB] text-xs leading-relaxed'
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom: audience + activities + image */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 items-start'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <p
              className='text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4'
              style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600 }}
            >
              Perfil del visitante
            </p>
            <ul className='space-y-2'>
              {audience.map((a, i) => (
                <li
                  key={i}
                  className='flex items-center gap-2 text-[#ABABAB] text-sm'
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  <span className='w-1 h-1 rounded-full bg-[#C9A84C]' />
                  {a}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <p
              className='text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4'
              style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600 }}
            >
              Actividades para marcas
            </p>
            <ul className='space-y-2'>
              {activities.map((a, i) => (
                <li
                  key={i}
                  className='flex items-center gap-2 text-[#ABABAB] text-sm'
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  <span className='w-1 h-1 rounded-full bg-[#E8407A]' />
                  {a}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className='aspect-square overflow-hidden relative'
          >
            {/* Replace with real image */}
            <img
              src='https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=80'
              alt='Expo stand'
              className='w-full h-full object-cover opacity-60'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent' />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
